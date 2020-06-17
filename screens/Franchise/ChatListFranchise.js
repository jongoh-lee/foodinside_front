import React from "react";
import {StyleSheet, View, Text} from "react-native";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center"
  },
  note:{
    color:"#999",
  }
})

export default () => (
  <View style={styles.container}>
    <Text style={styles.note}>내역이 없습니다.</Text>
  </View>
);