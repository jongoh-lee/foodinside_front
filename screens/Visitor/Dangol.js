import React from "react";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
import DangolCard from "../../components/Visitor/DangolCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_DANGOL } from "./VisitorQueries";
import { Caption } from "react-native-paper";
import ScreenLoader from "../../components/Custom/ScreenLoader";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  }
})

export default () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, error, loading, refetch } = useQuery(MY_DANGOL,{
    fetchPolicy:"network-only"
  });
  
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch()
    } catch(e){
      console.log(e, "단골 새로고침 에러");
    } finally {
      setRefreshing(false);
    }
  }

  return (
  <View style={styles.container}>
      {loading? <ScreenLoader/> : null}
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{padding:10, flexGrow:1}} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}>

      {data?.myDangol?.length < 1 ? (
        <View style={{flex:1, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
          <Caption>단골 목록이 없습니다</Caption>
        </View>
        ) : (
          data?.myDangol?.map( ({profile}, index) => <DangolCard key={index} {...profile}/>)
        )
      }
    </ScrollView>
  </View>
)};