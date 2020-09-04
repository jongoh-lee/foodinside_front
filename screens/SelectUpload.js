import * as React from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, View, Image, ScrollView, Text, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import Loader from "../components/Custom/Loader";
import constants from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BackArrow from "../components/Custom/BackArrow";
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);
  

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    selectButton:{
        padding:5,
        paddingHorizontal:10,
        borderRadius:5,
        backgroundColor:"rgb(5, 230, 244)",
        marginRight:10,
    },
    selectText:{
        color:'#ffffff',
        fontSize:16,
    }
});

export default ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(true);
    const [active, setActive] = React.useState(true);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [bigImage, setBigImage] = React.useState();
    const [allPhotos, setAllPhotos] = React.useState();

    const merge = photo => {
        setBigImage(photo)
        let index = selected.indexOf(photo);

        if(selected.length < 5 ){
            if(index < 0){
                setSelected(selected.concat(photo));
            } else {
                setSelected(selected.filter(el => el.id !== photo.id));
            }
        }else{
            if(index > -1){
                setSelected(selected.filter(el => el.id !== photo.id));
            }
        }
    };
    
    const getPhotos = async () => {
        try{
            const { assets } = await MediaLibrary.getAssetsAsync();
            let _assets = await assets.sort((a,b)=>a.creationTime-b.creationTime) 
            const [firstPhoto] = _assets;
            setBigImage(firstPhoto);
            setAllPhotos(_assets);
        } catch (e) {
            console.log('사진 선택 에러:',e);
        } finally {
            setLoading(false);
        }
    };

    const askPermission = async () => {
        try{
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status === "granted"){
                setHasPermission(true);
                getPhotos();
            }
        } catch (e) {
            console.log(e);
            setHasPermission(false);
        }
    };

    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity style={selected.length > 0 ? styles.selectButton : [styles.selectButton, {backgroundColor:"rgba(5, 230, 244, .4)"}]}  onPress={() => navigation.navigate("포스트", { images: selected, id:route.params.id })}>
                <Text style={styles.selectText}>선택</Text>
           </TouchableOpacity>
        ),
    })

    React.useEffect(()=>{
        askPermission();
    }, []);

    return (
    <SafeAreaView style={styles.container}>
    
        {loading ? (
          <Loader />
        ) : (
        <View style={{flex:1}}>
            {hasPermission ? (
            <>

            <View>
                <Image
                    style={{ width: constants.width, height: constants.height / 2,}}
                    source={{ uri: bigImage.uri }}
                />
                {selected.length === 5 && (
                    <View style={{padding:5, borderRadius:15, backgroundColor:"rgba(5, 230, 244, .4)", position:"absolute", bottom:5, alignSelf:"center"}}>
                        <Text>최대 5장의 사진만 업로드 할 수 있습니다.</Text>
                    </View>
                )}
            </View>
            

              <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                {allPhotos.map(photo => (
                <TouchableWithoutFeedback key={photo.id} onPress={() => merge(photo)}>
                  <ImageBackground
                    key={photo.id}
                    source={{ uri: photo.uri }}
                    style={{
                      width: constants.width / 4,
                      height: constants.width / 4,
                      opacity: selected.indexOf(photo) > -1 ? 0.8 : 1
                    }}
                  >
                      {selected.indexOf(photo) > -1 ? (
                        <Text style={{position:"absolute", top: 10, right:10, fontSize:12, color:'#05e6f4', borderWidth:2, width:20, height:20, borderRadius:10, borderColor:'#05e6f4', textAlign:"center", textAlignVertical:"center"}}>{selected.indexOf(photo) + 1}</Text>
                      ) : null}
                  </ImageBackground>
                </TouchableWithoutFeedback>
                ))}
                </View>
            </ScrollView>
            </>
            ) : null }
        </View>
        )}
    </SafeAreaView>
    );
};
