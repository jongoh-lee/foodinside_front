import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import SetDayComponent from "./SetDayComponent";
import constants from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ShadowInput from "../Custom/ShadowInput";
import BasicButton from "../Custom/BasicButton";
import Modal from "react-native-modal";
import priceInput from "../../hooks/priceInput";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { EDIT_CALENDAR } from "../../screens/Owner/OwnerQueries";
import ScreenLoader from "../Custom/ScreenLoader";
import PriceInputModal from "./PriceInputModal";
import { object } from "prop-types";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';


const SetCalendar = ({ 
  ownerState,
  calendar,
  franchiseState,
  refetch
  }) => {
    const [editCalendarMutation] = useMutation(EDIT_CALENDAR,{
      refetchQueries:[`shopOnSale`]
    });
    const [loading, setLoading] = React.useState(false);
    const [selectedMonth, setSelectedMonth] = React.useState();
    const [numberOfSelf, setNumberOfSelf] = React.useState();
    const [selfOver, setSelfOver] = React.useState(false)
    
    const markedDates = calendar?.reduce(
      (emptyObject, date) => {
        var dateString = date.dateString;
        emptyObject[dateString] = {id: date.id, priceState: date.priceState, isBooked: date.isBooked };
        return emptyObject
      }, {}
    );

    // today
    let now = new Date()
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`
  
    // price modal
    const [priceInputModal, setPriceInputModal] = React.useState(false);
    const price = priceInput('');

    // Mutation
    const [updateList, setUpdateList] = React.useState({});

    //냘짜 선택
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
   
    const getDates = (startDate, stopDate) => {
      var dateArray = new Array;
      var currentDate = startDate;
      while (currentDate <= stopDate) {
          dateArray.push(new Date (currentDate));
          currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }

    const onDatePress = (date, marking) => {
        if(ownerState !== 3) {
            return null
        }else{
        //선택된 날짜
        setSelfOver(false)
        const selectedMonth = date.dateString.slice(0,7);
        const numberOfSelf = Object.entries(markedDates).filter(([key, value]) => key.slice(0, 7) === selectedMonth && value.priceState === "self").length

        setSelectedMonth(selectedMonth);
        setNumberOfSelf(numberOfSelf);

          //1. 리스트에 아무것도 없을 경우 그 날짜를 추가 합니다.
        if(Object.keys(updateList).length == 0){
          setUpdateList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
        //2. 리스트에 값이 담겨 있는 경우 다음 값과 비교 합니다.
        }else if(Object.keys(updateList).length == 1){
          let firstNumber = Object.keys(updateList)[0]
            //두 번째 날짜가 첫 날짜 보다 적은 경우 날짜를 바꿉니다.
            if(date.dateString < firstNumber){
              setUpdateList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
            //첫번째 날짜를 또 누른경우 초기화 됩니다.
            }else if(date.dateString == firstNumber){
              setUpdateList({});
            //두번째 날짜가 정상적으로 눌린경우
            }else{
                //첫번째 날짜와 두번째 날짜를 리스트에 담습니다.
                let _firstDate = new Date( firstNumber );
                let _lastDate = new Date( date.dateString );
                let datelist = getDates(_firstDate, _lastDate);
                let selected = datelist.map(el => el.toISOString().substring(0, 10));

                const updateList = selected.reduce(
                  (emptyObject, date) => {
                    if(markedDates[date]?.isBooked !== true){
                      if(markedDates[date]?.id){
                        emptyObject[date] = {id: markedDates[date].id, priceState: markedDates[date].priceState, active:true};
                      }else{
                        emptyObject[date] = {active: true}
                      }
                    }
                    return emptyObject
                  }, {}
                );
                setUpdateList(updateList);
            }
        }else{
          // 리스트가 꽉 찬 상태에서 다음 숫자를 누를 경우 그 숫자가 첫번째가 됩니다.
          setUpdateList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
        }
      }
    };

    
  const onPressErase = async () => {
    setLoading(true);
    let deleteList = [];
    Object.entries(updateList).filter( ([key, value]) => value.id ? deleteList.push({id: value.id, dateString: key, priceState: value.priceState}) : null);
    try{
      if(deleteList.length > 0){
        await editCalendarMutation({
          variables:{
            createPrice: [],
            deletePrice: deleteList,
            updatePrice: []
          }
        });
      }
    }catch(e){
      console.log("가격 초기화 에러", e);
      Alert.alert(
        '알림',
        `방금 누군가 공간을 예약했습니다.`,[
        { text: '확인', onPress: () => refetch() }
        ]
      )
    }finally{
      setUpdateList({})
      setLoading(false);
    }
  }
  
  const onPressSelf = async () => {
    setLoading(true);
    let _updateList = []
    let _createList = []
    
    // update와 create 나누기
    Object.entries(updateList).map( ([key, value]) => value.id ? value.priceState !== 'self' ? _updateList.push({ id: value.id, dateString: key, priceState:"self"}) : null : _createList.push({dateString: key, priceState:"self"}));

    //update가 모두 self인 경우 return
    const selfInUpdate = Object.values(updateList).filter(date => date.priceState === 'self').length
    // 모든 date 리스트
    const dateList = Object.keys(updateList);

    // 선택된 리스트 중 각 월별 날짜가 포함된 횟수
    const monthListArray = dateList.map(el => el.slice(0, 7));
    const monthNumberObject = monthListArray.reduce((monthNum, month) => { if (monthNum[month]) { monthNum[month]++ } else { monthNum[month] = 1 } return monthNum }, {});

    // 월별  선택한 self를 포함한 self 숫자를 가져온다 
    const selfExceptChosenSelf = Object.entries(markedDates).filter(([key, value]) => dateList.indexOf(key) < 0 && value.priceState === "self");
    const selfFilter = selfExceptChosenSelf.reduce((selfPerMonth, selfToCount) => {
      let dateString = selfToCount[0].slice(0, 7);
      if(selfPerMonth[dateString]) { 
        selfPerMonth[dateString]++ 
      } else { 
        selfPerMonth[dateString] = 1 
      }
        return selfPerMonth
      }, monthNumberObject);

    //월별 self의 총 합중 하나라도 7을 넘을 경우 false
    const result = Object.values(selfFilter).filter(totalSelf => totalSelf > 7);
    if(selfInUpdate !== dateList.length){
      if(result?.length > 0){
        setSelfOver(true)
        setLoading(false);
        setUpdateList({})
      }else{
        try{
          await editCalendarMutation({
            variables:{
              createPrice: _createList,
              deletePrice: [],
              updatePrice: _updateList
            }
          });
        }catch(e){
          console.log("직접 영업 에러", e);
          Alert.alert(
            '알림',
            `방금 누군가 공간을 예약했습니다.`,[
            { text: '확인', onPress: () => refetch() }
            ]
          )
        }finally{
          setUpdateList({})
          setLoading(false);
        }
      }
    }else{
      setLoading(false);
      setUpdateList({})
    }
  }
  const onPressPrice = async ( price ) => {
    setLoading(true);
    setPriceInputModal(false);
    let _updateList = []
    let _createList = []
    Object.entries(updateList).map( ([key, value]) => value.id ? _updateList.push({ id: value.id, dateString: key, priceState:String(price)}) : _createList.push({dateString: key, priceState:String(price)}));
    try{
      await editCalendarMutation({
        variables:{
          createPrice: _createList,
          deletePrice: [],
          updatePrice: _updateList
        }
      });
    }catch(e){
      console.log("가격 설정 에러", e);
      Alert.alert(
        '알림',
        `방금 누군가 공간을 예약했습니다.`,[
        { text: '확인', onPress: () => refetch() }
        ]
      )
    }finally{
      setUpdateList({})
      setLoading(false);
    }
  }

  React.useEffect(() => {
    
  },[price.value])
  return (
      <View>

        {loading ? <ScreenLoader /> : null}
        <CalendarList 
            // 디자인
            monthFormat={`${'yyyy년'}  ${'MM월'}`}
            theme={{
              textMonthFontSize:20,
              textDayHeaderFontSize: 18,
            }}
            hideArrows={true}
            calendarWidth={constants.width}
            calendarHeight={Platform.OS === 'ios'? 450 : 500}
            pagingEnabled={false}
            horizontal={false}

            //달력 값
            minDate={today.dateString}
            pastScrollRange={1}
            futureScrollRange={2}
            markingType={'period'}
            markedDates={{...markedDates, ...updateList}}
            dayComponent={({date, marking}) => <SetDayComponent date={date} marking={marking} today={today} onPress={onDatePress}/>}
        />
        <>
          {selfOver ? (
            <View style={styles.selfNotice}>
              <View style={{padding:5, backgroundColor:"rgba(0, 0, 0, .2)", borderRadius:10}}>
                <Text style={{color:'#ED4956', fontSize:12}}>월 최대 7일까지 직접 영업할 수 있습니다.</Text>
              </View>
            </View>
          ) : (Object.keys(updateList).length > 0) ? (
            <View style={styles.selfNotice}>
              <View style={{padding:5, backgroundColor:"rgba(0, 0, 0, .2)", borderRadius:10}}>
              <Text style={{color:'#ED4956', fontSize:12}}>{selectedMonth.slice(-2)}월 남은 직접 영업일: {7 - numberOfSelf}일</Text>
              </View>
            </View>
            ) : null}
          <LinearGradient style={styles.priceSet} colors={['rgba(255, 255, 255, .2)','rgba(255, 255, 255, .7)', 'rgb(255, 255, 255)']}>
              <TouchableOpacity onPress={onPressErase} style={{flexDirection:"row", alignItems:"center"}} disabled={Object.keys(updateList).length === 0? true: loading}>
                  <MaterialCommunityIcons name="eraser" size={20} color='#ED4956' />
                  <Text style={styles.closed}> 지우기</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onPressSelf} style={{flexDirection:"row", justifyContent:"center"}} disabled={Object.keys(updateList).length === 0 || franchiseState === 0 ? true: loading}>
                  <MaterialCommunityIcons name="silverware" size={20} color="black" />
                  <Text style={styles.self}> 직접 영업</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setPriceInputModal(true)} style={{flexDirection:"row", alignItems:"center"}} disabled={Object.keys(updateList).length === 0? true: loading}>
                  <FontAwesome name="won" size={16} color="#64C723" />
                  <Text style={styles.setPrice}> 가격 설정</Text>
              </TouchableOpacity>
          </LinearGradient>
        </>

    <Modal
      isVisible={priceInputModal}
      onBackdropPress={() => setPriceInputModal(false)}
      onBackButtonPress={() => setPriceInputModal(false)}
      onSwipeComplete={() => setPriceInputModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.5}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center", flex:1}}
      coverScreen={false}
    >
        <PriceInputModal onPressPrice={onPressPrice} loading={loading}/>
    </Modal>
    </View>
)};

const styles = StyleSheet.create({
    //남은 직접 영업 일 안내
    selfNotice:{
      position:"absolute",
      top: 10,
      left:0,
      right:0,
      alignItems:"center"
    },
    //가격 설정 바
    priceSet:{
      position:"absolute",
      bottom:0,
      left:0,
      right:0,
      flexDirection:'row',
      justifyContent:'space-around',
      paddingVertical:20,
    },
    closed:{
      fontSize:16,
      fontWeight:'bold',
      color:'#ED4956',
    },
    self:{
      fontSize:16,
      fontWeight:'bold',
    },
    setPrice:{
      fontSize:16,
      fontWeight:'bold',
      color:'#64C723'
    },
    icon:{
      alignSelf:"center"
    }
});

export default SetCalendar