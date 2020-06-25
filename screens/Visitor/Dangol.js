import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { shopProfile } from "../../components/Franchise/data";
import Card2 from "../../components/Visitor/Card2";
import Card from "../../components/Visitor/Card";
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
    <ScrollView showsVerticalScrollIndicator={false}>
    <Card {...shopProfile}/>
    <Card {...shopProfile}/>
    <Card {...shopProfile}/>
    <Card {...shopProfile}/>
    <Card {...shopProfile}/>
    <Card {...shopProfile}/>
    </ScrollView>
  </View>
);