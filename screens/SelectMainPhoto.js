import * as React from "react";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet, View, Image, ScrollView, Text, StatusBar, SafeAreaView, TouchableOpacity, Platform, StatusBarIOS } from "react-native";
import Loader from "../components/Custom/Loader";
import constants from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImageManipulator from "expo-image-manipulator";
import BackArrow from "../components/Custom/BackArrow";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        paddingTop: StatusBar.currentHeight
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
    const [selected, setSelected] = React.useState();
    const [allPhotos, setAllPhotos] = React.useState();
    const changeSelected = photo => {
        setSelected(photo);
    };

    const getPhotos = async () => {
        try{
            const { assets } = await MediaLibrary.getAssetsAsync({
                sortBy:"default",
                first:100
            });
            if(assets.length > 0){
                const [firstPhoto] = assets;
                setSelected(firstPhoto);
                setAllPhotos(assets);
            }
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
        setInactive(true)
        const image = [];
        const manipResult =  await ImageManipulator.manipulateAsync(
            selected.uri,
            [],
            { compress: Platform.OS === 'ios' ? 0 : 0.2, format: ImageManipulator.SaveFormat.JPEG }
        );
        image.push({...selected, height: manipResult.height, width: manipResult.width, uri:manipResult.uri})
        navigation.goBack({ photo : image[0] });
        route.params.onSelect({ photo : image[0]});
    };

    React.useEffect(()=>{
        askPermission()
    }, []);

    
    return (
    <SafeAreaView style={styles.container}>
    
        <View style={styles.header}>
            <BackArrow />
            <Text style={styles.headerTitle}>최근 항목</Text>
            <TouchableOpacity style={styles.select}  onPress={() => handleSelected()} disabled={inactive}>
                <Text style={styles.selectText}>선택</Text>
           </TouchableOpacity>
        </View>

        {loading ? (
          <Loader />
        ) : (
        <View style={{flex:1}}>
            {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 4}}
                source={selected? { uri: selected.uri } : null}
              />

              <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                {allPhotos?.map(photo => (
                    <TouchableWithoutFeedback key={photo.id} onPress={() => changeSelected(photo)}>
                      <Image
                        key={photo.id}
                        source={{ uri: photo.uri }}
                        style={{
                          width: constants.width / 3,
                          height: constants.width / 3,
                          opacity: photo.id === selected.id ? 0.4 : 1
                        }}
                      />
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
