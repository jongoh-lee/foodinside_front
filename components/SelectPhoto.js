import * as React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "./Custom/Loader";
import constants from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default () => {
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
    React.useEffect(()=>{
        askPermission()
    }, [])
    return (
    <View style={styles.container}>
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
    </View>
    );
};
