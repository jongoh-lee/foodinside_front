import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { profile } from "../../components/Franchise/data";
import Card2 from "../../components/Visitor/Card2";
import Card from "../../components/Visitor/Card";
import Card3 from "../../components/Visitor/Card3";
import Card4 from "../../components/Visitor/Card4";
import Card5 from "../../components/Visitor/Card5";
import Card33 from "../../components/Visitor/Card33";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  }
})

export default () => (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
    <Card {...profile}/>
    <Card2 {...profile}/>
    <Card3 {...profile}/>
    <Card4 {...profile}/>
    <Card5 {...profile}/>
    <Card33 {...profile}/>
    </ScrollView>
  </View>
);