import React from "react";
import {View, StyleSheet} from "react-native";
import ShopCard from "../../components/Owner/ShopCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FAVORITE } from "./ProfileQueries";
import ShopCardLoading from "../../components/Loading/ShopCardLoading";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  note:{
    color:"#999"
  }
});


export default () => {
  const { data, error, loading } = useQuery(MY_FAVORITE,{
    fetchPolicy:"network-only"
  });
  
  return(
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10, flexGrow:1}} >
      {loading? (
        <>
        <ShopCardLoading/>
        <ShopCardLoading/>
        <ShopCardLoading/>
        </>
      ) : data?.myFavorite.length > 0 ? data?.myFavorite.map((favorite, index) => (
        <ShopCard key={index} {...favorite.owner} />)
      ):(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Caption>목록이 없습니다</Caption></View>
      )}
    </ScrollView>
  </View>
)};