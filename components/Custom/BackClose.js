import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default () => {
    const navigation = useNavigation();
    const [inactive, setInactive] = React.useState(false);
    const handleBack = () =>{
        setInactive(true)
        navigation.goBack();
    }
    return (
        <TouchableOpacity style={{padding:5}} onPress={() => handleBack()} disabled={inactive}>
            <MaterialCommunityIcons name="window-close" size={24} color="black"/>
        </TouchableOpacity>
    )
}