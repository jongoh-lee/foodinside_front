import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    paddingHorizontal:5
  }
})

export default () => (
  <View style={styles.container}>
     <ScrollView
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false} >
    </ScrollView>
  </View>
);