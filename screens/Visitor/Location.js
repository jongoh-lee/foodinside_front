import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Postcode from 'react-native-daum-postcode';
import constants from '../../constants';

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

export default () => {
    return (
    <View style={styles.container}>
        <Postcode
        style={{ width: constants.width }}
        jsOptions={{ animated: true }}
        onSelected={(data) => alert(JSON.stringify(data))}

    />
    </View>
    )
}
