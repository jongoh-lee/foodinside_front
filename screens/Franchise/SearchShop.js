import React from "react";
import Loader from "../../components/Custom/Loader";
import {View, StyleSheet, RefreshControl} from "react-native";

import ShopCard from "../../components/Owner/ShopCard";
import SearchBar from "../../components/Custom/SearchBar";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_SHOP_LIST } from "./ProfileQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import ShopCardLoading from "../../components/Loading/ShopCardLoading";
import Caption from "../../components/Custom/Caption";

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, error, loading, refetch } = useQuery(SEARCH_SHOP_LIST,{
    fetchPolicy:"network-only"
  });

  const refresh = async () => {
    try {
        setRefreshing(true);
        await refetch()
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
    </View>
)};
