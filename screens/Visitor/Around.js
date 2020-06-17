import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { shopProfile } from "../../components/Franchise/data";
import Card3 from "../../components/Visitor/Card3";
import Card33 from "../../components/Visitor/Card33";
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
      <Card3 {...{shopProfile}}/>
      <Card33 {...{shopProfile}}/>
      <Card3 {...{shopProfile}}/>
    </ScrollView>
  </View>
);