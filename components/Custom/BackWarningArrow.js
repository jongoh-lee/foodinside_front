import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Alert } from "react-native";

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=> (
            Alert.alert(
                '주의',
                '작성중인 내용이 저장되지 않습니다.',
                [
                  {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  { text: '확인', onPress: () => navigation.goBack() }
                ],
                { cancelable: true }
              )
        )}>
            <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
    )
}