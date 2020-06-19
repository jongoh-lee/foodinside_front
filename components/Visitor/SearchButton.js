import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
            <Feather name={'search'} size={25} style={{marginRight:10}}/>        
        </TouchableWithoutFeedback>
    )
}
