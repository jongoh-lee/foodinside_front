import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default ({nav}) => {
    const navigation = useNavigation();
      return (
        <TouchableOpacity onPress={()=>navigation.navigate(nav)}>
          <Image 
          style={{width:100, height:28, resizeMode:"contain", marginLeft:-10}}
          source={require("../../assets/Logo.png")}
          />
        </TouchableOpacity>
    )
}
  