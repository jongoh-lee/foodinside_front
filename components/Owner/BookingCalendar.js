import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import BookingDayComponent from "./BookingDayComponent";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/react-hooks";
import { BOOKING_LIMIT } from "../../screens/Franchise/ProfileQueries";
import ScreenLoader from "../Custom/ScreenLoader";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';


const Calendar = ({ id, calendarHeight,  franchiseState, isSelf, calendar, mainImage, shopName, district, minReserve, refetch}) => {
    let now = new Date()
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`
    const todayVariable = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + '01'].join('-')}`
    const [bookings, setBookings] = React.useState([]);
    const [remainsDate, setRemainsDate] = React.useState();
    const { data, error, loading } = useQuery(BOOKING_LIMIT,{
      variables: {
        today: todayVariable,
        ownerId: id
      },
      fetchPolicy:"network-only"
    });

    const [selectedList, setSelectedList] = React.useState({});
    const [firstDate, setFirstDate] = React.useState('');
    const [lastDate, setLastDate] = React.useState('');
    const [totalPrice, setTotalPrice] = React.useState(0);
    const navigation = useNavigation();
    const [alert, setAlert] = React.useState('');
    
    const markedDates = calendar.reduce(
      (emptyObject, date) => {
        var dateString = date.dateString;
        emptyObject[dateString] = {id: date.id, priceState: date.priceState, isBooked: date.isBooked };
        return emptyObject
      }, {}
    );
    
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

    const mergeDate = date => {
      const result = {}; //(1)
    
      date.forEach(basket => { //(2)
        for (let [key, value] of Object.entries(basket)) { //(3)
          if (result[key]) { //(4)
            result[key] += value; //(5)
          } else { //(6)
            result[key] = value;
          }
        }
      });
      return result; //(7)
    };

    const onFranchisePress = (date, marking) => {
      //유저가 음식점 주인 또는 프로필이 없는 경우 아무것도 하지 않습니다.
      if(franchiseState !== 3 || isSelf) {
          return null
      }else{
        //예약 가능 날짜 구하기
        const selectedMonth = date.dateString.slice(0,7);
        const reservedDates = bookings[selectedMonth]
        
        setRemainsDate(7 - (reservedDates ? reservedDates : 0));

        //리스트에 아무것도 없을 경우 그 날짜를 추가 합니다.
        if(Object.keys(selectedList).length == 0){
          setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
          setFirstDate(date.dateString)
          setLastDate(null);
          setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          setAlert("")
        //리스트에 날짜가 담긴 경우
        }else if(Object.keys(selectedList).length == 1){
          let firstNumber = Object.keys(selectedList)[0]
          //두 번째 날짜가 첫 날짜 보다 적은 경우 날짜를 바꿉니다.
            if(date.dateString < firstNumber){
              setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
              setFirstDate(date.dateString)
              setLastDate(null);
              setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
              setAlert("")
          //첫번째 날짜를 또 누른경우 초기화 됩니다.
            }else if(date.dateString == firstNumber){
              setSelectedList({});
              setFirstDate(null);
              setLastDate(null);
              setTotalPrice(0);
              setAlert("")
          //두번째 날짜가 정상적으로 눌린경우
            }else{
                //첫번째 날짜와 두번째 날짜를 리스트에 담습니다.
                let _firstDate = new Date( firstNumber );
                let _lastDate = new Date( date.dateString );
                let datelist = getDates(_firstDate, _lastDate);
                let selected = datelist.map(el => el.toISOString().substring(0, 10));

                const updateList = selected.reduce(
                  (emptyObject, date) => {
                    if(markedDates[date]?.id &&  markedDates[date]?.priceState !== 'self' && markedDates[date]?.isBooked !== true){
                      emptyObject[date] = {id: markedDates[date].id, priceState: markedDates[date].priceState, active:true};
                    }
                    return emptyObject
                  }, {}
                );
                const updateDateArray = Object.keys(updateList);

                //입점 제한을 위한 예약일 계산
                const monthListArray = updateDateArray.map(el => el.slice(0, 7));
                const monthNumberObject = monthListArray.reduce((monthNum, month) => { if (monthNum[month]) { monthNum[month]++ } else { monthNum[month] = 1 } return monthNum }, {});
                const result = mergeDate([bookings, monthNumberObject]);
                
                //리스트가 8보다 작은 경우

                  if(Object.values(result).filter(bookings => bookings > 7).length <= 0 && updateDateArray.length >= minReserve){
                    let priceStates = Object.values(updateList).map( el => el.priceState);
                    let totalPrice = priceStates.map(el => parseInt(el)).reduce((a, b) => a + b, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    setFirstDate(selected[0]);
                    setLastDate(selected[selected.length -1]);
                    setTotalPrice(totalPrice);
                    setSelectedList(updateList);
                    setAlert("")
                  }else if(Object.values(result).filter(bookings => bookings > 7).length > 0){
                    setSelectedList({});
                    setFirstDate(null);
                    setLastDate(null);
                    setTotalPrice(0);
                    setAlert("매월 최대 7일까지 영업 가능 합니다")
                  }else if(updateDateArray.length < minReserve){
                    setSelectedList({});
                    setFirstDate(null);
                    setLastDate(null);
                    setTotalPrice(0);
                    setAlert(`최소 ${minReserve}일부터 영업 가능 합니다`)
                  }
            }
        }else{
          //리스트가 다 찬 상태에서 새로운 날짜를 선택한 경우
          setSelectedList({[date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
          setFirstDate(date.dateString)
          setLastDate(null);
          setTotalPrice(marking.priceState.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
      }
    }
    React.useEffect(() => {
      let bookedDates = data?.bookingLimit?.filter(el => el.isCancelled !== true);
      if(bookedDates?.length > 0){
        let _dateList = []
        bookedDates.map(el => (el.prices.map(el => _dateList.push(el.dateString))))
        
        // 선택된 리스트 중 각 월별 날짜가 포함된 횟수
        const monthListArray = _dateList.map(el => el.slice(0, 7));
        const monthNumberObject = monthListArray.reduce((monthNum, month) => { if (monthNum[month]) { monthNum[month]++ } else { monthNum[month] = 1 } return monthNum }, {});
        setBookings(monthNumberObject)
      }

    },[data]);

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
      calendarWidth={constants.width - 30}
      calendarHeight={calendarHeight}
      pagingEnabled={false}
      horizontal={true}
      
      style={{borderRadius:15}}
      
      //달력 값
      minDate={today.dateString}
      pastScrollRange={1}
      futureScrollRange={2}
      markingType={'period'}
      markedDates={{...markedDates, ...selectedList}}

      dayComponent={({date, marking}) => <BookingDayComponent date={date} marking={marking} today={today} onPress={onFranchisePress}/>}
      />

      {isSelf === false && (
        <View style={{position:"absolute", bottom:10, right:15, left:15, justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
          <View>
              {alert ? <Text style={{color:"#666", fontSize:12}}>{alert}</Text> : (
                <Text style={{color:"#666", fontSize:12}}>{firstDate && firstDate.replace(/-/gi, '/')}{lastDate && ' - ' + lastDate.replace(/-/gi, '/')}</Text>
              )}
              <Text style={{color:"black", fontWeight:"bold", fontSize:16}}>합계: {totalPrice}</Text>
          </View>
          {franchiseState !== 3 ? (
            <TouchableOpacity onPress={() => {
              navigation.navigate("프로필 안내");
            }}>
              <View style={{padding: 5, borderRadius:10, backgroundColor:"#05e6f4"}}>
                <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:16}}>메뉴 등록</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={franchiseState === 3 && totalPrice !== 0 && Object.keys(selectedList).length >= minReserve? false : true} onPress={() => {
              navigation.navigate("결제하기",{
                id,
                mainImage,
                shopName,
                firstDate,
                lastDate,
                totalPrice,
                selectedList,
                district,
                refetch
              });
              setSelectedList({});
              setFirstDate(null);
              setLastDate(null);
              setTotalPrice(0);
              setAlert("")
            }}>
              <View style={franchiseState === 3 && totalPrice !== 0 && Object.keys(selectedList).length >= minReserve? {padding: 5, borderRadius:10, backgroundColor:"#05e6f4"} : {padding: 5, borderRadius:10, backgroundColor:"rgba(5, 230, 244, .3)"}}>
                {Object.keys(selectedList).length > 0 ? <Text style={{color:'red', fontSize:10, position:"absolute", top: -15, left:0, right:0, textAlign:"center"}}>{remainsDate}일 입점 가능 </Text> : null}
                <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:16}}>입점 하기</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
)};

export default Calendar