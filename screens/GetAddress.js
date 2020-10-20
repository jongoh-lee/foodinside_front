import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar} from 'react-native';
import Postcode from 'react-native-daum-postcode';
import constants from '../constants';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ navigation }) => {
    React.useEffect(() => {
        StatusBar.setHidden(false, 'slide')
    },[])
    return (
        <>
        <StatusBar hidden={false} />
            <Postcode
                style={{ width: constants.width, height:'100%'}}
                jsOptions={{ animated: false }}
                onSelected={(data) => navigation.navigate("신청 하기", {address: data.roadAddress})}
                onS
            />
        </>
    )
}
