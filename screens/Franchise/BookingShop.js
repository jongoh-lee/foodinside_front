import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Alert} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { BOOKING_SHOP, MY_PROFILE, PROFILE_CONTACT } from "./ProfileQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";

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
  //결제 부분
  paymentBox:{
    flexDirection:"row", 
    alignItems:"flex-end",
    paddingBottom:4
  },
  paymentTitle:{
    color:"black",
    fontWeight:"bold"
  },
  paymentInfo:{
    color:'#666',
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

export default ({ route, navigation }) => {
  const { id:ownerId, mainImage, shopName, firstDate, lastDate, totalPrice, selectedList, district } = route.params;
  const [loading, setLoading] = React.useState(false)
  const { data, loading: userLoading} = useQuery(PROFILE_CONTACT,{
    fetchPolicy:"network-only"
  });
  const [bookingShopMutation] = useMutation(BOOKING_SHOP,{
    refetchQueries:[`seeFullShop`]
  })
  const handleBooking = async () =>{
    setLoading(true)
    try{
      await bookingShopMutation({
        variables:{
          ownerId,
          firstDate,
          lastDate: lastDate? lastDate : firstDate,
          dateList: Object.keys(selectedList),
          totalPrice,
          username: data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName,
          contact: data?.myProfile?.contact,
        }
      });
      navigation.goBack();
    }catch(e){
      Alert.alert(
        '알림',
        `방금 누군가 먼저 예약했습니다.`,[
        { text: '확인', onPress: () => {
          route.params.refetch();
          navigation.goBack();
        } }
        ]
      )
      console.log(e);
    }
    setLoading(false)
  } 
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{paddingHorizontal:15, paddingBottom:40}} showsVerticalScrollIndicator={false}>
    {loading ? <ScreenLoader/> : null }
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
        <Text style={styles.title}>예약 정보</Text>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>성함: </Text>
          <Text style={styles.paymentInfo}>{userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName}</Text>
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>연락처: </Text>
          <Text style={styles.paymentInfo}>{userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : data?.myProfile?.contact}</Text>
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>입금 마감일: </Text>
          <Text style={styles.paymentInfo}>금일 23시 59분 59초 까지</Text>
        </View>

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
      
    <TouchableOpacity onPress={handleBooking} style={{position:"absolute", bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", padding:20, backgroundColor:"rgb(5, 230, 244)"}} disabled={loading || userLoading}>
      <Text style={{color:"#ffffff", fontWeight:"bold"}}>약관 동의 및 예약하기</Text>
    </TouchableOpacity>
  </SafeAreaView>
)};