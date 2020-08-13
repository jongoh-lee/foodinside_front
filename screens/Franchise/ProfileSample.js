import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import { profile } from "../../components/Franchise/data";
import MyProfile from "../../components/Franchise/MyProfile";


const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
  },
  headerSector:{
    color:'#666',
    fontSize:12,
  }
});

export default ({ navigation, router }) => {
  const { profileName, sector } = profile;
  if(profileName && sector) {
    navigation.setOptions({
      headerTitle: () => (
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{profileName} <Text style={styles.headerSector}> {sector}</Text></Text>
      )
    })
  }
  return (
      <View style={styles.container}>
        <MyProfile {...profile}/>
      </View>
)};