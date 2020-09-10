import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import constants from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import Modal from "react-native-modal";
import numInput from "../../hooks/numInput";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MY_CALENDAR, EDIT_CALENDAR } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import SetCalendar from "../../components/Owner/SetCalendar";
import { Caption } from "react-native-paper";


export default () => {
  const { data, error, loading } = useQuery(MY_CALENDAR,{
    fetchPolicy:"network-only"
  });

  const markedDates = data?.myCalendar?.calendar.reduce(
    (emptyObject, date) => {
      var dateString = date.dateString;
      emptyObject[dateString] = {id: date.id, priceState: date.priceState };
      return emptyObject
    }, {}
  );
    
  if(error) return console.log(error);
  
  return(
    <View style={styles.container}>
      {loading ? <ScreenLoader /> : null}

      <SetCalendar markedDates={markedDates} ownerState={data?.myCalendar?.ownerState}/>

    </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
})
