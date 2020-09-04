import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  constainer:{
    width:'100%',
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