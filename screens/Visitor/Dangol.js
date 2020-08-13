import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { profile } from "../../components/Franchise/data";
import Card2 from "../../components/Visitor/Card2";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  }
})

export default () => (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10}}>
      <Card2 {...profile}/>
      <Card2 {...profile}/>
      <Card2 {...profile}/>
    </ScrollView>
  </View>
);