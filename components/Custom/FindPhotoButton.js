import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet } from "react-native";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 

const styles=StyleSheet.create({
    imageInput:{
        width:constants.width * 0.25,
        height:constants.width * 0.25,
        backgroundColor:'white', 
        borderRadius:20,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
});

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto")}>
            <AntDesign name="plus" size={30} color="black" />
        </TouchableWithoutFeedback>
    )
}