import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text,  } from "react-native";
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
  markedDates,
  franchiseState
  }) => {
    const [editCalendarMutation] = useMutation(EDIT_CALENDAR);
    const [loading, setLoading] = React.useState(false)
    
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

    console.log(price.value);

    const onDatePress = (date, marking) => {
        if(ownerState !== 3) {
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
    setLoading(true);
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
      setLoading(false);
    }
  }

  const onPressSelf = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }

  const onPressPrice = async ( price ) => {
    setLoading(true);
    setPriceInputModal(false);
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
      setLoading(false);
    }
  }

  React.useEffect(() => {
    
  },[price.value])

  return (
      <>

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
            futureScrollRange={1}
            markingType={'period'}
            markedDates={{...markedDates, ...updateList}}

            dayComponent={({date, marking}) => <SetDayComponent date={date} marking={marking} today={today} onPress={onDatePress}/>}
        />

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
    </>
)};

const styles = StyleSheet.create({
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