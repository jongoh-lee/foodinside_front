import * as React from "react";
import { StyleSheet, View, Text, RefreshControl } from "react-native";
import DangolCard from "../../components/Visitor/DangolCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH_PROFILE } from "./VisitorQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import Caption from "../../components/Custom/Caption";

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

  const emptyComponent = () => (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Caption>목록이 없습니다</Caption>
    </View>
  )

  const renderItem = ({item}) => {
    return(
      <DangolCard {...item}/>
    )
  }

  return (
    <View style={styles.container}>
      {loading? <ScreenLoader/> : 
       <FlatList
       data={data?.searchProfile.sort((a, b) => b.dangolCount - a.dangolCount)}
       renderItem={renderItem}
       keyExtractor={item => item.id}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{padding:10, paddingTop:0, flexGrow:1}}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
       ListEmptyComponent={emptyComponent}
      />}
  </View>
)};