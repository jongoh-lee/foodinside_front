import React from "react";
import Loader from "../../components/Custom/Loader";
import {View, StyleSheet} from "react-native";

import ShopList from "../../components/Franchise/ShopList";
import SearchBar from "../../components/Custom/SearchBar";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
// 스키마에서 필요한 데이터만 뽑아옵니다. 터치 시 기존 불러온 Data는 Route로 넘기고 새로운 데이터는 Screen에서 QUERY로 다시 호출 합니다. 
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
  },
  {
    id: "2",
    title: "깔끔한 화이트 식당 in 부천",
    picture: [require("../../assets/ShopImage/img_picture4.png"), require("../../assets/ShopImage/img_picture5.png"), require("../../assets/ShopImage/img_picture6.png")],
    address: "경기도 부천시 원미구 심곡동 부일로 124",
    hashTags: "#1인 좌석 #식사 위주 #10평 공간 #차분함 #착한 가격",
    sort: '일반',
    scale:17,
    comments:105,
    price:'125,000'
  },
  {
    id: "3",
    title: "뉴트로 분위기의 일반 음식점 in 부천대 상권",
    picture: [require("../../assets/ShopImage/img_picture7.png"), require("../../assets/ShopImage/img_picture8.png"), require("../../assets/ShopImage/img_picture9.png")],
    address: "경기도 부천시 원미구 심곡동 부일로 13",
    hashTags: "#뉴트로 #깔끔 #포차 영업 #35평 #주차정 완비",
    sort: "일반",
    scale:35,
    comments:124,
    price:'170,000'
  },
  {
    id: "4",
    title: "빈티지하고 아늑한 카페 in 부천 먹자 골목",
    picture: [require("../../assets/ShopImage/img_picture10.png"),require("../../assets/ShopImage/img_picture11.png"),require("../../assets/ShopImage/img_picture12.png")],
    address: "경기도 부천시 원미구 심곡동 부일로 311",
    hashTags: "#디저트 #20평 #친환경적 #오븐 완비 #안락함",
    sort: "휴게",
    scale:20,
    comments:215,
    price:'90,000'
  }
];

export default () => (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <SearchBar/>
      <View style={styles.container}>
        {listings.map((listing) => (
          <ShopList key={listing.id} {...{ listing }} />
          ))}
      </View>
      </ScrollView>
    </View>
);

