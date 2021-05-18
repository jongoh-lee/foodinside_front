import React from "react";
import Loader from "../../components/Custom/Loader";
import {View, StyleSheet, RefreshControl, Text} from "react-native";

import ShopCard from "../../components/Owner/ShopCard";
import SearchBar from "../../components/Custom/SearchBar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_SHOP_LIST, MY_PROFILE } from "./ProfileQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import ShopCardLoading from "../../components/Loading/ShopCardLoading";
import Caption from "../../components/Custom/Caption";
import constants from "../../constants";

const WIDTH = constants.width;
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
});

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, error, loading, refetch } = useQuery(SEARCH_SHOP_LIST,{
    fetchPolicy:"network-only"
  });

  const { data: profileData, loading: profileLoading, error: profileError, refetch: profileRefetch } = useQuery(MY_PROFILE,{
    fetchPolicy:"network-only",
  });

  const refresh = async () => {
    try {
        setRefreshing(true);
        await refetch()
        await profileRefetch()
    } catch(e){
        console.log(e, "가게 리스트 새로고침 에러");
    } finally {
        setRefreshing(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{padding:10, flexGrow:1}} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        >
        <SearchBar/>
        <View style={styles.container}>
          {loading? (
          <>
          <ShopCardLoading/>
          <ShopCardLoading/>
          <ShopCardLoading/>
          </>) : data?.searchShopList.length > 0 ? data?.searchShopList?.map((shop, index) => (
            <ShopCard key={index} {...shop} />
            )) : 
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
              <Caption>등록된 음식점이 없습니다</Caption>
            </View>}
        </View>
      </ScrollView>
      
      {
      //로딩 중 스크롤 금지
      profileLoading? (
        <ScreenLoader/>
      ) : 
      //프로필 없으면 신청 화면으로 이동
      profileData?.myProfile === null && (
        
        <View style={{position:"absolute", top:0, bottom:0,left:0, right:0, backgroundColor:"rgba(255, 255, 255, 0.5)", justifyContent:"center", alignItems:"center"}}>
          <TouchableOpacity style={{backgroundColor:"rgba(0, 0, 0, 0.7)", flexDirection:"row", alignItems:"center", width: 250, height: 80, borderRadius: 125}} onPress={()=> navigation.navigate("프로필")}>
              <View style={{width: 60, height: 60, borderRadius: 30, alignItems:"center", justifyContent:"center", backgroundColor:"#f0f0f0", marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>🍜</Text>
              </View>
              <Text style={{fontSize:14, color:"#f0f0f0", fontWeight:"bold"}}>{`메뉴 등록하고 입점하기`}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
)};
