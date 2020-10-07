import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, Alert} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { BOOKING_SHOP, MY_PROFILE, PROFILE_CONTACT } from "./ProfileQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import Caption from "../../components/Custom/Caption";
import useInput from "../../hooks/useInput";
import DropDownPicker from 'react-native-dropdown-picker';
import ShadowInput from "../../components/Custom/ShadowInput";
import { SafeAreaView } from "react-native-safe-area-context";

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
    marginLeft:10,
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
  shadowBox:{
    margin:5,
    width:150,
    height:35,
  },
})

export default ({ route, navigation }) => {
  const { id:ownerId, mainImage, shopName, firstDate, lastDate, totalPrice, selectedList, district } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [bank, setbank] = React.useState("");
  const accountNumberInput = useInput("");
  const { data, loading: userLoading} = useQuery(PROFILE_CONTACT,{
    fetchPolicy:"network-only"
  });
  const [bookingShopMutation] = useMutation(BOOKING_SHOP,{
    refetchQueries: [`bookingLimit`,`myFavorite`, `bookingList`, `myProfile`]
  });
  const handleBooking = async () =>{
    setLoading(true)
    try{
      await bookingShopMutation({
        variables:{
          ownerId,
          firstDate,
          lastDate: lastDate? lastDate : firstDate,
          prices: Object.entries(selectedList).map(([key, value]) => ({ id: value.id, priceState: value.priceState, dateString: key})),
          totalPrice,
          username: data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName,
          contact: data?.myProfile?.contact,
          account: data?.myProfile?.account ? null : {
            bank,
            accountNumber: String(accountNumberInput.value),
            accountHolder: data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName,
          }
        }
      });
      navigation.goBack();
    }catch(e){
      Alert.alert(
        '알림',
        `${e.message}`,[
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
    <ScrollView contentContainerStyle={{paddingHorizontal:15, paddingBottom:60}} showsVerticalScrollIndicator={false}>
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

            <View style={[styles.reserveBox, {paddingBottom:0}]}>
              <Caption>결제 금액</Caption>
              <Text style={{fontSize:18, fontWeight:"bold"}}>{totalPrice}</Text>
            </View>

          </View>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>예약 정보</Text>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>성함: </Text>
          {userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : <Text style={styles.paymentInfo}>{data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName}</Text>}
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>연락처: </Text>
          {userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : <Text style={styles.paymentInfo}>{data?.myProfile?.contact}</Text>}
        </View>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>입금 마감일: </Text>
          <Text style={styles.paymentInfo}>금일 23시 59분 까지</Text>
        </View>

      </View>

      <View style={[styles.box, {zIndex:10}]}>
      <Text style={styles.title}>판매수익 입금계좌</Text>

        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>예금주: </Text>
          {userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : <Text style={styles.paymentInfo}>{data?.myProfile?.user?.lastName +' '+data?.myProfile?.user?.firstName}</Text>}
        </View>

        {userLoading ? null : data?.myProfile.account ? 
        <>
          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>은행명: </Text>
            {userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : <Text style={styles.paymentInfo}>{data?.myProfile?.account.bank}</Text>}
          </View>

          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>계좌 번호: </Text>
            {userLoading? <View style={{width:constants.width * 0.4, padding:7, backgroundColor:"#E0E0E0", borderRadius:5,}}/> : <Text style={styles.paymentInfo}>{data?.myProfile?.account.accountNumber}</Text>}
          </View>
        </> : 
        <>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.paymentTitle}>입금 계좌: </Text>
            <DropDownPicker
                placeholder={'은행'}
                defaultValue={bank}
                disabled={loading}
                items={[
                    {label: '카카오뱅크', value: '카카오뱅크'},
                    {label: '케이뱅크', value: '케이뱅크'},
                    {label: '기업은행', value: '기업은행'},
                    {label: '국민은행', value: '국민은행'},
                    {label: '우리은행', value: '우리은행'},
                    {label: '신한은행', value: '신한은행'},
                    {label: '하나은행', value: '하나은행'},
                    {label: '농협은행', value: '농협은행'},
                    {label: '지역농축협', value: '지역농축협'},
                    {label: 'SC은행', value: 'SC은행'},
                    {label: '한국씨티은행', value: '한국씨티은행'},
                    {label: '우체국', value: '우체국'},
                    {label: '경남은행', value: '경남은행'},
                    {label: '광주은행', value: '광주은행'},
                    {label: '대구은행', value: '대구은행'},
                    {label: '도이치', value: '도이치'},
                    {label: '부산은행', value: '부산은행'},
                    {label: '산림조합', value: '산림조합'},
                    {label: '산업은행', value: '산업은행'},
                    {label: '저축은행', value: '저축은행'},
                    {label: '새마을금고', value: '새마을금고'},
                    {label: '수협', value: '수협'},
                    {label: '신협', value: '신협'},
                    {label: '전북은행', value: '전북은행'},
                    {label: '제주은행', value: '제주은행'},
                    {label: 'BOA', value: 'BOA'},
                    {label: 'HSBC', value: 'HSBC'},
                    {label: 'JP모간', value: 'JP모간'},
                    {label: '중국공산은행', value: '중국공산은행'},
                    {label: '비엔피파리바은행', value: '비엔피파리바은행'},
                    {label: '중국건설은행', value: '중국건설은행'},
                    {label: '국세', value: '국세'},
                    {label: '지방세입', value: '지방세입'},
                ]}
                onChangeItem={item => setbank(item.value)}
                dropDownStyle={{backgroundColor: '#ffffff'}}
                containerStyle={[styles.shadowBox, {width:100}]}
                style={{
                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  borderWidth:0,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.20,
                  shadowRadius: 1.41,
                  elevation: 2,
              }}
              contentContainerStyle={{backgroundColor: '#ffffff'}}
              itemStyle={{
                  justifyContent: 'flex-start',
              }}
            />
            <ShadowInput {...accountNumberInput} placeholder={'입금 계좌'} width={'45%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} keyboardType={"number-pad"}/>
          </View>
        </>
        }

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
    <View>
      <TouchableOpacity onPress={() => handleBooking()} style={{position:"absolute", bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", padding:20, backgroundColor:"rgb(5, 230, 244)"}} disabled={loading || userLoading}>
        <Text style={{color:"#ffffff", fontWeight:"bold"}}>약관 동의 및 예약하기</Text>
      </TouchableOpacity>
    </View>  
  </SafeAreaView>
)};