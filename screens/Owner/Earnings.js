import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  monthBar:{
    flexDirection:"row",
    marginTop:10,
    justifyContent:"space-between",
    alignItems:"center"
  },
  month:{
    fontSize:16,
    fontWeight:"bold"
  },
  monthBtn_left:{
    width:100,
    alignItems:"flex-start"
  },
  monthBtn_right:{
    width:100,
    alignItems:"flex-end"
  },


  earningBox:{
    flex:4,
    alignItems:"center",
    paddingTop:60
  },
  earningTitle:{
    marginBottom:2,
    color:"rgba(0, 0, 0, .5)"
  },
  earningNum:{
    fontSize:40,
    fontWeight:"bold",
  },
  accountText:{
    textDecorationLine:"underline",
    position:"absolute",
    bottom:50,
    justifyContent:"center"
  },


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
    fontSize:16,
    fontWeight:"bold"
  },
  newsNum:{
    textDecorationLine:"underline"
  },
  empty:{
    flex:2
  }
})

export default () => {
  return(
    <View style={styles.container}>

      <View style={styles.monthBar}>
        <TouchableWithoutFeedback style={styles.monthBtn_left}>
          <EvilIcons name="chevron-left" size={40} />
        </TouchableWithoutFeedback>
        <Text style={styles.month}>6월</Text>
        <TouchableWithoutFeedback style={styles.monthBtn_right}>
          <EvilIcons name="chevron-right" size={40}/>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.earningBox}>
        <Text style={styles.earningTitle}>이번달 수익</Text>
        <Text style={styles.earningNum}>4,735,000원</Text>
        <Text style={styles.accountText}>계좌 등록하기</Text>
      </View>

      <View style={styles.newsBox}>
        <View style={styles.newsCol}>
          <Text style={styles.newsTitle}>새로운 댓글</Text>
          <Text style={styles.newsNum}>12</Text>
        </View>

        <View style={styles.newsCol}>
          <Text style={styles.newsTitle}>새로운 예약</Text>
          <Text style={styles.newsNum}>6</Text>
        </View>
      </View>

      <View style={styles.empty}/>
    </View>
  )
}