import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MY_CALENDAR, EDIT_CALENDAR } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import SetCalendar from "../../components/Owner/SetCalendar";


export default () => {
  const { data, error, loading, refetch } = useQuery(MY_CALENDAR,{
    fetchPolicy:"network-only"
  });
  if(error) return console.log(error);
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
