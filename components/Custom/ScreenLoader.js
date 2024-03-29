import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import constants from "../../constants";

const styles = StyleSheet.create({
  constainer:{
    width:constants.width,
    height:'100%', 
    position:'absolute', 
    alignItems:"center", 
    justifyContent:"center", 
    backgroundColor:"rgba(255, 255, 255, .5)", 
    zIndex:100
  }
});

export default ({ color = "#05e6f4", size= "large"}) => (
    <View style={styles.constainer}>
        <ActivityIndicator color={color} size={size} />
    </View>
);