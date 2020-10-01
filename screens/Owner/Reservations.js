import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import ReservationList from "../../components/Owner/ReservationList";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
    },
    // 상단 버튼 바
    monthBar:{
      flexDirection:"row",
      marginTop:10,
      justifyContent:"space-between",
      alignItems:"center"
    },
    monthBox:{
      position:"absolute",
      left:0,
      right:0,
      top:0,
      bottom:0,
      justifyContent:"center",
      alignItems:"center",
      zIndex: -10
    },
    month:{
      fontSize:16,
      fontWeight:"bold",
    },
    monthBtn_left:{
      width:constants.width / 2,
      alignItems:"flex-start",
    },
    monthBtn_right:{
      width:constants.width / 2,
      alignItems:"flex-end",
    },

})

export default () => {
  const date = new Date();
  const [year,setYear] = React.useState(date.getFullYear());
  const [month, setMonth] = React.useState(date.getMonth());
  const onPressNext = () => {
    if(month === 11){
      setMonth(0),
      setYear(year + 1)
    }else{
      setMonth(month + 1)
    }
  }

  const onPressBack = () => {
    if(month === 0){
      setMonth(11),
      setYear(year - 1)
    }else{
      setMonth(month - 1)
    }
  }
  
  return(
    <View style={styles.container}>

      <View style={styles.monthBar}>
        <TouchableOpacity style={styles.monthBtn_left} onPress={onPressBack}>
          <EvilIcons name="chevron-left" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.monthBtn_right} onPress={onPressNext}>
          <EvilIcons name="chevron-right" size={40}/>
        </TouchableOpacity>
        <View style={styles.monthBox}>
        <Text style={styles.month}>{year}년 {month + 1}월</Text>
        </View>
      </View>

      <ReservationList year={year} month={month}/>

    </View>
  )
}