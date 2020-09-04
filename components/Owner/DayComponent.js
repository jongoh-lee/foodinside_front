import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Caption } from "react-native-paper";
import constants from "../../constants";

const textChanger = {
    self : "직접 영업",
    undefined: " "
}


export default ({date, today, marking, onPress }) => {
    //날짜 색 설정
    const { priceState, active } = marking;
    const dateColor = date.dateString.replace(/[^0-9]/g,'') - today;
    //배경색 설정
    return (
        <TouchableOpacity onPress={() => onPress(date, marking)} disabled={dateColor < 0} >
          <View style={active? styles.active : styles.inactive}>
              <Text style={dateColor < 0 ? styles.date_disabled : ( dateColor > 0 ? styles.date : styles.date_today)}>{date.day}</Text>
              <Caption style={styles.price} numberOfLines={1}>{textChanger[priceState]? textChanger[priceState] : priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Caption>
          </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    //날짜
  inactive:{
    justifyContent:"center",
    alignItems:"center",
    width: ( constants.width - 40 ) / 7
  },
  active:{
      backgroundColor: "rgba(5, 230, 244, .3)",
      justifyContent:"center",
      alignItems:"center",
      width: ( constants.width - 40 ) / 7
  },

  //날짜 색
  date_disabled:{
    fontSize: 18,
    color:"rgba(0, 0, 0, .3)",
    width:40,
    textAlign:"center"
  },
  date_today:{
    fontSize:18,
    color:"#05e6f4",
    width:40,
    textAlign:"center"
  },
  date:{
    fontSize:18,
    color:"black",
    width:40,
    textAlign:"center"
  },
  price:{
    alignSelf:"center",
    fontSize:10
  },
});