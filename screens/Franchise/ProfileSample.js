import * as React from "react";
import {StyleSheet, View} from "react-native";
import { profile } from "../../components/Franchise/data";
import MenuInfo from "../../components/Franchise/MenuInfo";
import ShopHeader from "../../components/Franchise/ShopHeader";


const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
});

export default ({ navigation }) => {
  const { profileName, sort } = profile;
  React.useEffect(()=>{
    if(profileName && sort) {
      navigation.setOptions({
        headerTitle: () => <ShopHeader profileName={profileName} sort={sort}/>
        })
      }
    }, [])
  return (
      <View style={styles.container}>
        <MenuInfo {...profile}/>
      </View>
)};