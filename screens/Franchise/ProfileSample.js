import React from "react";
import {StyleSheet, View} from "react-native";
import { shopProfile } from "../../components/Franchise/data";
import MenuInfo from "../../components/Franchise/MenuInfo";


const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
});

export default () => {
  return (
      <View style={styles.container}>
        <MenuInfo {...shopProfile}/>
      </View>
)};