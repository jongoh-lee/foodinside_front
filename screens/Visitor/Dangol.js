import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { profile } from "../../components/Franchise/data";
import DangolCard from "../../components/Visitor/DangolCard";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  }
})

export default () => {
  
  return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10}}>
      <DangolCard {...profile}/>
      <DangolCard {...profile}/>
      <DangolCard {...profile}/>
    </ScrollView>
  </View>
)};