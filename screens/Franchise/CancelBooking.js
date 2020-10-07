import React, { useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import Caption from "../../components/Custom/Caption";
import { CANCEL_BOOKING } from "./ProfileQueries";

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
    paymentBar:{
        flex:1,
        flexDirection:"row",
        paddingTop:25
    },
    paymentBox:{
        flex:1,
    },
    captionStyle:{
        paddingBottom: 5
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
    const { id, firstDate, lastDate, totalPrice, isCancelled, isPaid, owner, mainImage, profile, prices } = route.params;
    const dateList = prices.map(el => el.dateString);
    const [loading, setLoading] = React.useState(false);
    const [refundPrice, setRefundPrice] = React.useState();
    const [cancelBookingMutation, {loading:cancelLoader}] = useMutation(CANCEL_BOOKING)
    let now = new Date()
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')}`

    //날짜 사이 날짜 리스트

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    
    const getDates = (start, end) => {
        var dateArray = 0;
        var currentDate = start;
        while (currentDate < end) {
            dateArray += 1;
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    const confirmCancel = () => {
        Alert.alert(
            '확인',
            '정말 예약을 취소하시겠습니까?',[
            {
                text: '취소',
                style: 'cancel'
            },
            { text: '확인', onPress: () => handleCancelBooking()},
          ]
        )
    }
    
    const handleCancelBooking = async () =>{
      setLoading(true)
      let _prices = [];
      prices.map( date => _prices.push({ id: date.id, dateString: date.dateString, priceState: date.priceState}))
      try{
        await cancelBookingMutation({
            variables:{
                ownerId:owner.id,
                bookingId: id,
                prices: _prices,
                refundPrice: isPaid ? String(refundPrice) : String("0"),
                contact: profile.contact,
                fullName: profile.user.fullName
            }
        });
        navigation.goBack();
      }catch(e){
       console.log("예약 취소 에러:", e);
      }
      setLoading(false)
    }
    
    React.useEffect(() => {
        const _today = new Date( today );
        const _firstDate = new Date( firstDate );
        const remainingDates = getDates(_today, _firstDate);
        
        if(remainingDates > 0){
        switch (remainingDates) {
            case 1:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0);
                break;
            case 2:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.4);
                break;
            case 3:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.5);
                break;
            case 4:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.6);
                break;
            case 5:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.7);
                break;
            case 6:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.8);
                break;
            case 7:
                setRefundPrice(parseInt((totalPrice).replace(',','')) * 0.9);
                break;
            default:
                setRefundPrice(parseInt((totalPrice).replace(',','')));
            }
        }else{
            setRefundPrice(0)
        }
    },[today]);
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{paddingHorizontal:15, paddingBottom:60}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
        {cancelLoader ? <ScreenLoader/> : null}
        <View style={styles.box}>
            <Text style={styles.title}>{owner.shopName} in {owner.district}</Text>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Image 
                  style={{width: constants.width / 2, height:constants.width / 2.3, borderRadius:10}}
                  resizeMode={"cover"}
                  source={{uri:mainImage.url}}
                />
                <View style={{flex:1, height:constants.width / 2.3, justifyContent:"flex-end",}}>
                    <View style={styles.reserveBox}>
                        <Caption style={styles.captionStyle}>시작일</Caption>
                        <Text>{firstDate.replace(/-/gi, '/')}</Text>
                    </View>

                    <View style={styles.reserveBox}>
                        <Caption style={styles.captionStyle}>종료일</Caption>
                        <Text>{lastDate? lastDate.replace(/-/gi, '/') : firstDate?.replace(/-/gi, '/')}</Text>
                    </View>

                    <View style={[styles.reserveBox, {paddingBottom:0}]}>
                        <Caption style={styles.captionStyle}>예약일</Caption>
                        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                        {dateList.map(date => <Text key={date}>{date.slice(-5).replace("-", "/") + ' '}</Text>)}
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.paymentBar}>
                <View style={styles.paymentBox}>
                    <Caption style={styles.captionStyle}>결제금액</Caption>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>{totalPrice}</Text>
                </View>

                <View style={styles.paymentBox}>
                    <Caption style={styles.captionStyle}>예약상태</Caption>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>{isCancelled ? "예약취소" : isPaid? "입점승인" : "예약완료"}</Text>
                </View>

                <View style={styles.paymentBox}>
                    <Caption style={styles.captionStyle}>환불예정</Caption>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>{isPaid ? refundPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0원"}</Text>
                </View>
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
            <Text style={styles.title}>환불 예정일</Text>

        <Text>취소 후 <Text style={{fontWeight:"bold"}}>3일</Text> 이내 입금 계좌로 환불됩니다.</Text>
            <Text style={{color:"red"}}>예약/취소를 반복할 경우 입점이 제한될 수 있습니다.</Text>
        </View>

    </ScrollView>
    <View>
        <TouchableOpacity onPress={confirmCancel} style={{position:"absolute", bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", padding:20, backgroundColor:"rgb(5, 230, 244)"}} disabled={loading}>
          <Text style={{color:"#ffffff", fontWeight:"bold"}}>예약 취소</Text>
        </TouchableOpacity>
    </View>
  </SafeAreaView>
)};