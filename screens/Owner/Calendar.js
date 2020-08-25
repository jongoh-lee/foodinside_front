import * as React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import constants from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import DayComponent from "../../components/Owner/DayComponent"
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import Modal from "react-native-modal";
import numInput from "../../hooks/numInput";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_PRICE } from "./OwnerQueries";
import { Caption } from "react-native-paper";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';

const calendar = [
{
  id: 'sodifj1',
  dateString: "2020-08-18",
  priceState: "100000",
},
{
  id: 'sodifj2',
  dateString: "2020-08-19",
  priceState: "110000",
},
{
  id: 'sodifj3',
  dateString: "2020-08-20",
  priceState: "120000",
},
{
  id: 'sodifj4',
  dateString: '2020-08-21',
  priceState: "self",
},
{
  id: 'sodifj5',
  dateString: '2020-08-22',
  priceState: "self",
},
{
  id: 'sodifj6',
  dateString: '2020-08-23',
  priceState: "off",
},
{
  id: 'sodifj7',
  dateString: '2020-08-24',
  priceState: "off",
},]

export default () => {
  const [ priceProp, setPriceProp ] = React.useState([...calendar]);
  // price modal
  const [priceModal, setPriceModal] = React.useState(false);
  const priceInput = numInput('');
  // 선택된 날짜

  // 가져온 데이터와 가곡된 데이터 구분
  let _markedDates = priceProp.reduce(
    (markedDates, date) => {
      var dateString = date.dateString;
      markedDates[dateString] = {id: date.id, priceState: date.priceState, active: false };
      return markedDates
    }, {}
  );
  
  const [ markedDates, setMarkedDates ] = React.useState(_markedDates);
  //가공된 데이터
  //update list 
  const [updateList, setUpdateList] = React.useState([]);

  //create list 
  const [createList, setCreateList] = React.useState([]);

  const [selected, setSelected] = React.useState([]);

  //오늘 today
  let now = new Date()
  let mm = now.getMonth() + 1;
  let dd = now.getDate();
  const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`

  // 이 함수는 받아온 리스트 전체를 바꿉니다. 때문에 크기를 비교함에 있어 어려움이 예상 됩니다.*/
  const onPressDate = ( day ) => {
    if(selected.includes(day.dateString)){
      setSelected(selected.filter(el => el !== day.dateString));

    }else{
      setSelected([...selected, day.dateString]);
    }
  }
  console.log(selected)

  const onPressOff = async () => {
    setSelected([]);
  }

  const onPressSelf = () => {
    let _markedDates = {};
    Object.entries(markedDates).map(
      ([key, value]) => {
        if(value.active){
          // 바로 뮤테이션 진행 > 아이디 부여
          if(value.id){
            setUpdateList(updateList.concat({
              id: value.id,
              dateString: key,
              isSelf: true,
              off:false,
              operDay: null
            }));
          }else{
            setCreateList(createList.concat({
              dateString: key,
              isSelf: true,
              off:false,
              operDay: null
            }));
          }

          try {

          }catch{

          }
          
          Object.assign(_markedDates,  { [key] : {isSelf: true, off: false, perDay: null, active: false} });
        }
      }
    );
    setMarkedDates({ ...markedDates, ..._markedDates });
  }

  const onPressPrice = ( price ) => {
    let _markedDates = {};
    Object.entries(markedDates).map(
      ([key, value]) => {
        if(value.active){
          // 바로 뮤테이션 진행
          if(value.id){
            setUpdateList(updateList.concat({
              id: value.id,
              dateString: key,
              isSelf: false,
              off:false,
              operDay: price
            }));
          }else{
            setCreateList(createList.concat({
              dateString: key,
              isSelf: false,
              off:false,
              operDay: price
            }));
          }
          
          Object.assign(_markedDates,  { [key] : {isSelf: true, off: false, perDay: price, active: false} });
        }
      }
    );
    setMarkedDates({ ...markedDates, ..._markedDates });
  }


  return(
    <>
    <View style={styles.container}>

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

        //함수
        onDayPress={onPressDate}

        //달력 값
        minDate={() => today.dateString}
        pastScrollRange={1}
        futureScrollRange={1}
        markingType={'period'}
        markedDates={markedDates}
        //날짜 디자인
        dayComponent={({date, marking, onPress}) => <DayComponent date={date} marking={marking} today={today} onPress={onPress}/>}
      />

      <LinearGradient style={styles.priceSet} colors={['rgba(255, 255, 255, .2)','rgba(255, 255, 255, .7)', 'rgb(255, 255, 255)']}>
        <TouchableOpacity onPress={onPressOff} style={{flexDirection:"row", alignItems:"center"}}>
          <MaterialCommunityIcons name="close-circle-outline" size={20} color='#ED4956' />
          <Text style={styles.closed}> 예약 불가</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressSelf} style={{flexDirection:"row", justifyContent:"center"}}>
          <MaterialCommunityIcons name="silverware" size={20} color="black" />
          <Text style={styles.self}> 직접 영업</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPriceModal(true)} style={{flexDirection:"row", alignItems:"center"}}>
          <FontAwesome name="won" size={16} color="#64C723" />
          <Text style={styles.setPrice}> 가격 설정</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>

    <Modal
    isVisible={priceModal}
    onBackdropPress={() => setPriceModal(false)}
    backdropColor={'#ffffff'}
    backdropOpacity={.5}
    animationIn="slideInLeft"
    animationOut="slideOutRight"
    style={{justifyContent:"center", alignItems:"center", flex:1}}
    coverScreen={false}
    >
      <ShadowInput  {...priceInput} keyboardType={'number-pad'} autoFocus={true} width={'70%'} placeholder={'가격'}/>
      <View style={{width:'70%'}}>
        <BasicButton onPress={() => [onPressPrice( priceInput.value ), setPriceModal(false)]} disabled={priceInput.value? false : true} padding={10} text={'확인'} marginVertical={10} width={'100%'}/>
      </View>
    </Modal>

  </>
)};


const styles = StyleSheet.create({
  container:{
    flex:1
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
})
