import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity >
        <Image style={{width:55, resizeMode:"contain", marginBottom:(Platform.OS === 'android') ? 0 : 5, marginRight:5}}
        source={require("../../assets/Icons/ico_hd1.png")}
        />
      </TouchableOpacity>
    )
}
