import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
        </TouchableWithoutFeedback>
    )
}