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
