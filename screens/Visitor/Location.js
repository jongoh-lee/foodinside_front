import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default () => {
    return (
        <View style={styles.container}>
            <Text>Location</Text>
        </View>
    )
}
