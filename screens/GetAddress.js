import * as React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import Postcode from 'react-native-daum-postcode';
import constants from '../constants';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ navigation }) => {
    return (
        <Postcode
            style={{ width: constants.width, height:'100%'}}
            jsOptions={{ animated: true }}
            onSelected={(data) => navigation.navigate("신청 하기", {address: data.roadAddress})}
        />
    )
}
