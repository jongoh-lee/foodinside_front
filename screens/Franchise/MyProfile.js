import * as React from "react";
import {StyleSheet, View} from "react-native";
import { shopProfile } from "../../components/Franchise/data";
import MenuInfo from "../../components/Franchise/MenuInfo";
import ShopHeader from "../../components/Franchise/ShopHeader";


const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
});

export default ({ navigation }) => {
  const { shopName, sort } = shopProfile;
  React.useEffect(()=>{
    if(shopName && sort) {
      navigation.setOptions({
        headerTitle: () => <ShopHeader shopName={shopName} sort={sort}/>
        })
      }
    }, [])
  return (
      <View style={styles.container}>
        <MenuInfo {...shopProfile}/>
      </View>
)};