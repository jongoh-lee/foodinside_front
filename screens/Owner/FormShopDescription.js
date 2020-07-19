import * as React from "react";
import { StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default () => (
    <View style={styles.container}> 
        <Text>설명</Text>
    </View>    
)