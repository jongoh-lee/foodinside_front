import * as React from "react";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
import DangolCard from "../../components/Visitor/DangolCard";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_PROFILE } from "./VisitorQueries";
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

  return (
    <View style={styles.container}>
      {loading? <ScreenLoader/> : null}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{padding:10, paddingTop:0, flexGrow:1}} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
          {data?.searchProfile && (
            data?.searchProfile.reverse().map( (data, index) => <DangolCard key={index} {...data}/>)
          )}
        </ScrollView>
  </View>
)};