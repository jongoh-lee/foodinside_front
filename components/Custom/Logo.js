import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
      return (
        <TouchableOpacity>
          <Image 
          style={{width:100, height:28, resizeMode:"contain", marginLeft:-10}}
          source={require("../../assets/Logo.png")}
          />
        </TouchableOpacity>
    )
}
  