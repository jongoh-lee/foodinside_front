import * as React from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { StyleSheet, View, Image, ScrollView, Text, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground, Platform } from "react-native";
import Loader from "../components/Custom/Loader";
import constants from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BackArrow from "../components/Custom/BackArrow";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    header:{
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"rgba(0, 0, 0, .1)",
        alignItems:"center",
        justifyContent:"space-between",
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
    },
    select:{
        padding:5,
        paddingHorizontal:10,
        borderRadius:5,
        backgroundColor:'#05e6f4',
        marginRight:10,
    },
    selectText:{
        color:'#ffffff',
        fontSize:16,
    }
});

export default ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(true);
    const [inactive, setInactive] = React.useState(false);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [allPhotos, setAllPhotos] = React.useState();
    const data = route.params.data? route.params.data : null;
    const merge = photo => {
        let index = selected.indexOf(photo);
        if(index > -1){
            setSelected(selected.filter(el => el.id !== photo.id));
        } else {
            setSelected(selected.concat(photo));
        }
    };

    const getPhotos = async () => {
        try{
            const { assets } = await MediaLibrary.getAssetsAsync({
                sortBy:"default",
                first:100
            });
            setAllPhotos(assets);
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
    const handleSelected = async () => {
        setInactive(true);
        const images = [];
        const results = selected.map( async (photo) => {
                const manipResult = await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [],
                    { compress: Platform.OS === 'ios'? 0 : 0.2, format: ImageManipulator.SaveFormat.JPEG }
                );
                return {...photo, height:manipResult.height, width:manipResult.width, uri:manipResult.uri};
            }
        );
        
        Promise.all(results).then((completed) => {
            images.push(...completed);
            navigation.goBack();
            route.params.onSelect({ photo : images, data: data});
        });
    };

    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity style={styles.select}  onPress={() => handleSelected()} disabled={inactive}>
                <Text style={styles.selectText}>선택</Text>
           </TouchableOpacity>
        ),
    })
    React.useEffect(()=>{
        askPermission()
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
              <ScrollView contentContainerStyle={{flexDirection:"row", flexWrap:"wrap"}}>
                {allPhotos?.map(photo => (
                <TouchableWithoutFeedback key={photo.id} onPress={() => merge(photo)}>
                  <ImageBackground
                    key={photo.id}
                    source={{ uri: photo.uri }}
                    style={{
                      width: constants.width / 3,
                      height: constants.width / 3,
                      opacity: selected.indexOf(photo) > -1 ? 0.8 : 1
                    }}
                  >
                      {selected.indexOf(photo) > -1 ? (
                        <Text style={{position:"absolute", top: 10, right:10, fontSize:12, color:'#05e6f4', borderWidth:2, width:20, height:20, borderRadius:10, borderColor:'#05e6f4', textAlign:"center", textAlignVertical:"center"}}>{selected.indexOf(photo) + 1}</Text>
                      ) : null}
                  </ImageBackground>
                </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </View>
            </>
            ) : null }
        </View>
        )}
    </SafeAreaView>
    );
};
