import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MY_CALENDAR, EDIT_CALENDAR } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import SetCalendar from "../../components/Owner/SetCalendar";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default ({navigation}) => {
  const { data, error, loading, refetch } = useQuery(MY_CALENDAR,{
    fetchPolicy:"network-only",
    notifyOnNetworkStatusChange: true
  });
  navigation.setOptions({
    headerRight:()=> (
      <TouchableOpacity onPress={() => refetch()}>
        <MaterialCommunityIcons 
          name="refresh"
          size={24}
          color={'black'}
          style={{paddingHorizontal:10}}
        />
      </TouchableOpacity>
    )
  })
  return(
    <View style={styles.container}>
      {loading ? <ScreenLoader /> : null}

      <SetCalendar ownerState={data?.myCalendar?.ownerState} franchiseState={data?.myCalendar?.franchiseState} calendar={data?.myCalendar?.calendar} refetch={refetch}/>

    </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
})
