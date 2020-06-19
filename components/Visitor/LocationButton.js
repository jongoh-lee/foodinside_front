import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Location")}>
            <Feather name={'map-pin'} size={25} style={{marginLeft:10}}/>        
        </TouchableWithoutFeedback>
    )
}
