import React from "react";
import {View, StyleSheet} from "react-native";
import ShopCard from "../../components/Owner/ShopCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FAVORITE } from "./ProfileQueries";

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  note:{
    color:"#999"
  }
});


const listings = [
  {
    id: "1",
    shopName: "조명으로 포인트를 준 음식점 in 경리단길 먹자 골목",
    picture: [require("../../assets/ShopImage/img_picture1.png"), require("../../assets/ShopImage/img_picture2.png"), require("../../assets/ShopImage/img_picture3.png")],
    address: "경기도 경리단길시 원미구 심곡동 부일로 121",
    hashTags: '#오픈키친 #20평 #몽환적 분위기 #Pub 가능',
    sort: '일반',
    scale:27,
    comments:231,
    price:`110,000`
  }
]

export default () => {
  const { data, error, loading } = useQuery(MY_FAVORITE,{
    fetchPolicy:"network-only"
  });
  return(
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10}} >
      {listings.map((listing) => (
        <ShopCard key={listing.id} listing={listing}/>
      ))}
    </ScrollView>
  </View>
)};