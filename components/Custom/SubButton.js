import * as React from "react";
import PropTypes from "prop-types";
import constants from "../../constants";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#50caef',
        padding: 10,
        margin: 20,
        borderRadius:4,
        width:constants.width / 2,
        alignSelf:"center"
    },
    text:{
        color:'#ffffff',
        textAlign:'center',
        fontWeight:'600'
    }
})


export default ({ text, onPress }) => (
  <TouchableOpacity>
    <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);