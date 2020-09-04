import * as React from "react";
import { StyleSheet, View, Text, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import { LocaleConfig, CalendarList } from "react-native-calendars";
import constants from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import DayComponent from "../../components/Owner/DayComponent"
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import Modal from "react-native-modal";
import numInput from "../../hooks/numInput";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MY_CALENDAR, EDIT_CALENDAR } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'fr';

export default () => {
  const { data, error, loading } = useQuery(MY_CALENDAR,{
    fetchPolicy:"network-only"
  });

  const [loader, setLoader] = React.useState(false);
  const [editCalendarMutation] = useMutation(EDIT_CALENDAR);
  const [markedDates, setMarkedDates] = React.useState();

  // price modal
  const [priceInputModal, setPriceInputModal] = React.useState(false);
  const priceInput = numInput('');

  // Mutation
  const [updateList, setUpdateList] = React.useState({});

  //오늘 today
  let now = new Date()
  let mm = now.getMonth() + 1;
  let dd = now.getDate();
  const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`

  const onPressDate = (date, marking) => {
    if(data?.myCalendar === null) {
      return null
    }else{
      if(updateList[date.dateString]){
        setUpdateList(Object.keys(updateList)
        .filter(key => key !== date.dateString)
        .reduce((obj, key) => {
          obj[key] = updateList[key];
          return obj;
        }, {}))
      }else{
        setUpdateList({...updateList, [date.dateString] : {id: marking.id, priceState:marking.priceState, active:true}});
      }
    }
  }

  const onPressErase = async () => {
    setLoader(true);
    let deleteList = Object.values(updateList).filter(el => el.id).map(el => el.id? {id: el.id} : null);
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
    }finally{
      setUpdateList({})
      setLoader(false);
    }
  }

  const onPressSelf = async () => {
    setLoader(true);
    let _updateList = []
    let _createList = []
    Object.entries(updateList).map( ([key, value]) => value.id ? _updateList.push({ id: value.id, dateString: key, priceState:"self"}) : _createList.push({dateString: key, priceState:"self"}));
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
    }finally{
      setUpdateList({})
      setLoader(false);
    }
  }

  const onPressPrice = async ( price ) => {
    setLoader(true);
    let _updateList = []
    let _createList = []
    Object.entries(updateList).map( ([key, value]) => value.id ? _updateList.push({ id: value.id, dateString: key, priceState:String(price) }) : _createList.push({dateString: key, priceState:String(price)}));
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
    }finally{
      setUpdateList({})
      setLoader(false);
    }
  }

  if(error) return console.log(error);

  React.useEffect(() => {
    let markedDates = data?.myCalendar?.calendar.reduce(
      (markedDates, date) => {
        var dateString = date.dateString;
        markedDates[dateString] = {id: date.id, priceState: date.priceState };
        return markedDates
      }, {}
      );
    setMarkedDates(markedDates)
  },[data])
  return(
    <>
    <View style={styles.container}>
      {loading || loader ? <ScreenLoader /> : null}
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
        minDate={() => today.dateString}
        pastScrollRange={1}
        futureScrollRange={1}
        markingType={'period'}
        markedDates={{...markedDates, ...updateList}}

        //날짜 디자인
        dayComponent={({date, marking}) => <DayComponent date={date} marking={marking} today={today} onPress={onPressDate}/>}
      />

      <LinearGradient style={styles.priceSet} colors={['rgba(255, 255, 255, .2)','rgba(255, 255, 255, .7)', 'rgb(255, 255, 255)']}>
        <TouchableOpacity onPress={onPressErase} style={{flexDirection:"row", alignItems:"center"}} disabled={Object.keys(updateList).length === 0? true: false}>
          <MaterialCommunityIcons name="eraser" size={20} color='#ED4956' />
          <Text style={styles.closed}> 지우기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressSelf} style={{flexDirection:"row", justifyContent:"center"}} disabled={Object.keys(updateList).length === 0? true: false}>
          <MaterialCommunityIcons name="silverware" size={20} color="black" />
          <Text style={styles.self}> 직접 영업</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPriceInputModal(true)} style={{flexDirection:"row", alignItems:"center"}} disabled={Object.keys(updateList).length === 0? true: false}>
          <FontAwesome name="won" size={16} color="#64C723" />
          <Text style={styles.setPrice}> 가격 설정</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>

    <Modal
    isVisible={priceInputModal}
    onBackdropPress={() => setPriceInputModal(false)}
    backdropColor={'#ffffff'}
    backdropOpacity={.5}
    animationIn="slideInLeft"
    animationOut="slideOutRight"
    style={{justifyContent:"center", alignItems:"center", flex:1}}
    coverScreen={false}
    >
      <ShadowInput  {...priceInput} keyboardType={'number-pad'} autoFocus={true} width={'70%'} placeholder={'가격'} editable={!loading}/>
      <View style={{width:'70%'}}>
        <BasicButton onPress={() => [setPriceInputModal(false), onPressPrice( priceInput.value )]} disabled={priceInput.value? false : true} padding={10} text={'확인'} marginVertical={10} width={'100%'}/>
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
