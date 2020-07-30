import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{padding:5}} onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={34} color="black"/>
        </TouchableOpacity>
    )
}