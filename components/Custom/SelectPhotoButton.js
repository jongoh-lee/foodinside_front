import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Image, } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import PropTypes from "prop-types";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    imageInput:{
        width:constants.width * 0.25,
        height:constants.width * 0.25,
        backgroundColor:'white', 
        borderRadius:20,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
      },
      image:{
        width:constants.width * 0.25,
        height:constants.width * 0.25,
        backgroundColor:'white', 
        borderRadius:20,
        margin:5,
      },
})

export default () => {
    const navigation = useNavigation();
    const [image, setImage] = React.useState(null);
    const onSelect = (photo) => {
    setImage(photo)
    };

    return (
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelect})}>
            {image === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: image.photo.uri}}/>}
        </TouchableOpacity>
    )
}

