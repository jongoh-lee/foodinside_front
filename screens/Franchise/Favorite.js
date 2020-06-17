import React from "react";
import {View, StyleSheet} from "react-native";
import ShopList from "../../components/Franchise/ShopList";

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
    title: "조명으로 포인트를 준 음식점 in 부천 먹자 골목",
    picture: [require("../../assets/ShopImage/img_picture1.png"), require("../../assets/ShopImage/img_picture2.png"), require("../../assets/ShopImage/img_picture3.png")],
    address: "경기도 부천시 원미구 심곡동 부일로 121",
    hashTags: '#오픈키친 #20평 #몽환적 분위기 #Pub 가능',
    sort: '일반',
    scale:27,
    comments:231,
    price:`110,000`
  }
]

export default () => (
  <View style={styles.container}>
    <View style={styles.container}>
      {listings.map((listing) => (
        <ShopList key={listing.id} {...{ listing }} />
      ))}
    </View>
  </View>
);