import * as React from "react";
import { StyleSheet, View, Image, ScrollView, Text, Platform, StatusBar, SafeAreaView } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../components/Custom/Loader";
import constants from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SubmitPhotoButton from "../components/Custom/SubmitPhotoButton";
import BackArrow from "../components/Custom/BackArrow";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    header:{
        flexDirection:"row",
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:"rgba(0, 0, 0, .1)",
        alignItems:"center",
        justifyContent:"space-between",
    },
    headerTitle:{
        fontSize:18,
        fontWeight:"bold",
        width:'100%',
        position:"absolute",
        textAlign:"center",
    },
    select:{
        paddingHorizontal:5
    },
    selectText:{
        color:'#05e6f4',
        fontSize:16,
    }
});

export default ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(true);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [selected, setSelected] = React.useState();
    const [allPhotos, setAllPhotos] = React.useState();
    const changeSelected = photo => {
        setSelected(photo);
      };
    const getPhotos = async () => {
        try{
            const { assets } = await MediaLibrary.getAssetsAsync();
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
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
    }
    const handleSelected = () => {
        navigation.goBack({ photo : selected });
        route.params.onSelect({ photo : selected });
    }
    React.useEffect(()=>{
        askPermission()
    }, [])
    return (
    <SafeAreaView style={styles.container}>
    
        <View style={[styles.header, {marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0}]}>
            <Text style={styles.headerTitle}>최근 항목</Text>
            <BackArrow />

            <TouchableWithoutFeedback onPress={handleSelected}>
                <View style={styles.select}>
                    <Text style={styles.selectText}>완료</Text>
                </View>
           </TouchableWithoutFeedback>
        </View>

        {loading ? (
          <Loader />
        ) : (
        <View>
            {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.height / 2.3 }}
                source={{ uri: selected.uri }}
              />

              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                {allPhotos.map(photo => (
                <TouchableWithoutFeedback key={photo.id} onPress={() => changeSelected(photo)}>
                  <Image
                    key={photo.id}
                    source={{ uri: photo.uri }}
                    style={{
                      width: constants.width / 3,
                      height: constants.height / 6,
                      opacity: photo.id === selected.id ? 0.4 : 1
                    }}
                  />
                </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            </>
            ) : null }
        </View>
        )}
    </SafeAreaView>
    );
};
