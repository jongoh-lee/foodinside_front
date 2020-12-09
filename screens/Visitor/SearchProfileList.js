import * as React from "react";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
import DangolCard from "../../components/Visitor/DangolCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_PROFILE } from "./VisitorQueries";
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
  const { data, error, loading, refetch } = useQuery(SEARCH_PROFILE,{
        fetchPolicy:"network-only",
        variables:{
            name: ""
        }
  });
  
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch()
    } catch(e){
      console.log(e, "프로필 리스트 새로고침 에러");
    } finally {
      setRefreshing(false);
    }
  }

  console.log(data);
  return (
  <View style={styles.container}>
      {loading? <ScreenLoader/> : null}
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{padding:10, paddingTop:0, flexGrow:1}} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>

      {data?.searchProfile && (
            data.searchProfile.map( ({profile}, index) => <DangolCard key={index} {...profile}/>)
      )}
    </ScrollView>
  </View>
)};