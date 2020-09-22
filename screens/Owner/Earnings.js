import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import GetTotalPrice from "../../components/Owner/GetTotalPrice";
import { Caption } from "react-native-paper";
import constants from "../../constants";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
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

  //수익현황 dash board
  earningBox:{
    flex:4,
    alignItems:"center",
    paddingTop:100,
  },
  earningTitle:{
    marginBottom:20,
    color:"rgba(0, 0, 0, .5)"
  },
  accountText:{
    textDecorationLine:"underline",
    position:"absolute",
    bottom:50,
    justifyContent:"center",
    color:"#666"
  },

  //새로운 소식
  newsBox:{
    flex:1,
    flexDirection:"row",
  },
  newsCol:{
    flex:1,
    alignItems:"center",
    justifyContent:"space-around",
    paddingTop:10
  },
  newsTitle:{
    fontSize:14,
    fontWeight:"bold"
  },
  newsNum:{
    textDecorationLine:"underline"
  },
  //하단 빈공간
  empty:{
    flex:2,
  }
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

      <View style={styles.earningBox}>
        <Text style={styles.earningTitle}>수익 합계</Text>
        <GetTotalPrice year={year} month={month}/>
        <Text style={styles.accountText}>계좌 등록</Text>
      </View>

      {/* 새로운 소식 숨김
      <View style={styles.newsBox}>
        <View style={styles.newsCol}>
          <Text style={styles.newsTitle}>새로운 댓글</Text>
          <Caption style={styles.newsNum}>12</Caption>
        </View>

        <View style={styles.newsCol}>
          <Text style={styles.newsTitle}>새로운 예약</Text>
          <Caption style={styles.newsNum}>6</Caption>
        </View>
      </View>
      */}

      <View style={styles.empty}/>
    </View>
  )
}