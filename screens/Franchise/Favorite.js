import React from "react";
import {View, StyleSheet, RefreshControl} from "react-native";
import ShopCard from "../../components/Owner/ShopCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FAVORITE } from "./ProfileQueries";
import ShopCardLoading from "../../components/Loading/ShopCardLoading";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffffff"
  },
  note:{
    color:"#999"
  }
});



export default () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, error, loading, refetch } = useQuery(MY_FAVORITE,{
    fetchPolicy:"network-only"
  });

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch()
    } catch(e){
      console.log(e, "즐겨찾기 새로고침 에러");
    } finally {
      setRefreshing(false);
    }
  }
  
  return(
  <View style={styles.container}>
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{padding:10, paddingTop:0, flexGrow:1}} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      >
      {loading? (
        <>
        <ShopCardLoading/>
        <ShopCardLoading/>
        <ShopCardLoading/>
        </>
      ) : data?.myFavorite?.length > 0 ? data?.myFavorite?.map((favorite, index) => (
        <ShopCard key={index} {...favorite.owner} />)
      ):(
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Caption>목록이 없습니다</Caption></View>
      )}
    </ScrollView>
  </View>
)};