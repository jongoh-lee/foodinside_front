import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { profile } from "../../components/Franchise/data";
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
  const { data, error, loading, refetch } = useQuery(MY_DANGOL,{
    fetchPolicy:"network-only"
  });
  return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:10, flexGrow:1}}>
      {loading? <ScreenLoader/> : null}
      {data?.myDangol?.length < 1 ? (
        <View style={{flex:1, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
          <Caption>단골 목록이 없습니다</Caption>
        </View>
        ) : (
          data?.myDangol?.map( ({profile}) => <DangolCard key={profile.id} {...profile}/>)
        )
      }
    </ScrollView>
  </View>
)};