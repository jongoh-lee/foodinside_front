import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import { useQuery } from "@apollo/react-hooks";
import { MY_PROFILE, PROFILE_CONTACT } from "./ProfileQueries";
import numInput from "../../hooks/numInput";
import BasicInput from "../../components/Custom/BasicInput";

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:"#ffffff",
  },
  box:{
    paddingVertical:25,
    borderBottomWidth:1,
    borderBottomColor:"#e7e7e7",
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    paddingBottom:20
  },
  reserveBox:{
    padding:5,
    marginLeft:10
  },
  rowBox:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:5,
  },
  dateText:{
    fontSize:14,
    paddingBottom:10
  },
  rowBox_under:{
    flexDirection:"row",
    justifyContent:"space-around",
    paddingTop:20,
  },
  refundInner:{
    justifyContent:"space-around",
    alignItems:"center",
  },
  warnning:{
    fontSize:14,
    color:"#e0383e",
  },
})

export default ({ route }) => {
  const { mainImage, shopName, firstDate, lastDate, totalPrice, selectedList, district } = route.params;
  const { data, loading} = useQuery(PROFILE_CONTACT,{
    fetchPolicy:"network-only"
  });
  const [contact, setContact] = React.useState();
  const contactInput = numInput(data?.myProfile?.contact);
  //console.log(selectedList);
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{paddingHorizontal:15, paddingBottom:40}} showsVerticalScrollIndicator={false}>
      <View style={styles.box}>
        <Text style={styles.title}>{shopName} in {district}</Text>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Image 
            style={{width: constants.width / 2, height:constants.width / 2.3, borderRadius:10}}
            resizeMode={"cover"}
            source={{uri:mainImage}}
          />
          <View style={{flex:1, height:constants.width / 2.3, justifyContent:"flex-end",}}>

            <View style={styles.reserveBox}>
              <Caption>시작일</Caption>
              <Text>{firstDate.replace(/-/gi, '/')}</Text>
            </View>

            <View style={styles.reserveBox}>
              <Caption>종료일</Caption>
              <Text>{lastDate? lastDate.replace(/-/gi, '/') : firstDate?.replace(/-/gi, '/')}</Text>
            </View>

            <View style={styles.reserveBox}>
              <Caption>결제 금액</Caption>
              <Text style={{fontSize:16, fontWeight:"bold"}}>{totalPrice}</Text>
            </View>

          </View>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>결제 정보</Text>
        <BasicInput {...contactInput}/>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>환불 정책</Text>

          <View style={styles.rowBox}>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>8일 전</Text>
                  <Caption>100%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>7일 전</Text>
                  <Caption>90%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>6일 전</Text>
                  <Caption>80%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>5일 전</Text>
                  <Caption>70%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>4일 전</Text>
                  <Caption>60%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>3일 전</Text>
                  <Caption>50%</Caption>
              </View>
              <View style={styles.refundInner}>
                  <Text style={styles.dateText}>2일 전</Text>
                  <Caption>40%</Caption>
              </View>
          </View>

          <View>
              <View style={styles.rowBox_under}>
                  <Text style={styles.warnning}>1일 전: 0%</Text>
                  <Text style={styles.warnning}>당일: 0%</Text>
                  <Text style={styles.warnning}>영업 중: 0%</Text>
              </View>
          </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>이용 약관</Text>
          <Text>
            <Text>환불 정책, 점주의 입점 규칙, </Text>
            <Caption style={{fontSize:14}} onPress={() => console.log("hi")}>음식점 이용 규칙,</Caption>
            <Caption style={{fontSize:14}} onPress={() => console.log("hi")}>{' '}사고 발생 시 책임 범위</Caption>
            <Text>에 동의하며 공유 음식점 위생 관리에 의무와 책임을 다하겠습니다.</Text>
          </Text>
      </View>

    </ScrollView>
      
    <TouchableOpacity style={{position:"absolute", bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", padding:20, backgroundColor:"rgb(5, 230, 244)"}}>
      <Text style={{color:"#ffffff", fontWeight:"bold"}}>약관 동의 및 예약하기</Text>
    </TouchableOpacity>
  </SafeAreaView>
)};