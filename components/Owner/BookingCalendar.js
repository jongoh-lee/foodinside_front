import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import BookingDayComponent from "./BookingDayComponent";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';


const Calendar = ({ calendarHeight,  franchiseState, isSelf, calendar, mainImage, shopName, district}) => {
    const [selectedList, setSelectedList] = React.useState({});
    const [firstDate, setFirstDate] = React.useState(null);
    const [lastDate, setLastDate] = React.useState(null);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const navigation = useNavigation();
    const [alert, setAlert] = React.useState('');

    const markedDates = calendar.reduce(
      (emptyObject, date) => {
        var dateString = date.dateString;
        emptyObject[dateString] = {id: date.id, priceState: date.priceState };
        return emptyObject
      }, {}
    );
    
    let now = new Date()
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`

    //날짜 사이 날짜 리스트

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

    const onFranchisePress = (date, marking) => {
      if(franchiseState !== 3 || isSelf) {
          return null
      }else{
        if(Object.keys(selectedList).length == 0){
          setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
          setFirstDate(date.dateString)
          setLastDate(null);
          setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }else if(Object.keys(selectedList).length == 1){
          let firstNumber = Object.keys(selectedList)[0]
            if(date.dateString < firstNumber){
              setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
              setFirstDate(date.dateString)
              setLastDate(null);
              setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            }else if(date.dateString == firstNumber){
              setSelectedList({});
              setFirstDate(null);
              setLastDate(null);
              setTotalPrice(0);
            }else{
                let _firstDate = new Date( firstNumber );
                let _lastDate = new Date( date.dateString );
                let datelist = getDates(_firstDate, _lastDate);
                if(datelist.length < 8){
                  let selected = datelist.map(el => el.toISOString().substring(0, 10));
                  const updateList = selected.reduce(
                    (emptyObject, date) => {
                      if(markedDates[date] && markedDates[date].priceState !== 'self'){
                        emptyObject[date] = {id: markedDates[date].id, priceState: markedDates[date].priceState, active:true};
                      }
                      return emptyObject
                    }, {}
                  );
                  let priceStates = Object.values(updateList).map( el => el.priceState).filter(el => el !== 'self');
                  let totalPrice = priceStates.map(el => parseInt(el)).reduce((a, b) => a + b, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  
                  setFirstDate(selected[0]);
                  setLastDate(selected[selected.length -1]);
                  setTotalPrice(totalPrice);
                  setSelectedList(updateList);
                }else{
                  setSelectedList({});
                  setFirstDate(null);
                  setLastDate(null);
                  setTotalPrice(0);
                  setAlert("최대 7일까지 영업 가능 합니다")
                }
            }
        }else{
          //리스트 꽉 찬경우
          setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
          setFirstDate(date.dateString)
          setLastDate(null);
          setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
      }
    }
    

  return (
    <View>
      <CalendarList 
      // 디자인
      monthFormat={`${'yyyy년'}  ${'MM월'}`}
      theme={{
        textMonthFontSize:20,
        textDayHeaderFontSize: 18,
      }}
      hideArrows={true}
      calendarWidth={constants.width - 30}
      calendarHeight={calendarHeight}
      pagingEnabled={false}
      horizontal={true}
      
      style={{borderRadius:15}}
      
      //달력 값
      minDate={today.dateString}
      pastScrollRange={1}
      futureScrollRange={1}
      markingType={'period'}
      markedDates={{...markedDates, ...selectedList}}

      dayComponent={({date, marking}) => <BookingDayComponent date={date} marking={marking} today={today} onPress={onFranchisePress}/>}
      />

      {isSelf === false && (
        <View style={{position:"absolute", bottom:10, right:15, left:15, justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
          <View>
              <Caption>{alert? alert : firstDate && firstDate.replace(/-/gi, '/')}{lastDate && ' - ' + lastDate.replace(/-/gi, '/')}</Caption>
              <Text style={{color:"black", fontWeight:"bold", fontSize:16}}>합계: {totalPrice}</Text>
          </View>
          <TouchableOpacity disabled={franchiseState === 3 && totalPrice !== 0? false : true} onPress={() => navigation.navigate("결제하기",{
            mainImage,
            shopName,
            firstDate,
            lastDate,
            totalPrice,
            selectedList,
            district
          })}>
            <View style={franchiseState === 3 && totalPrice !== 0 ? {padding:10, borderRadius:10, backgroundColor:"#05e6f4"} : {padding:10, borderRadius:10, backgroundColor:"rgba(5, 230, 244, .3)"}}>
              <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:16}}>입점 하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
)};

export default Calendar