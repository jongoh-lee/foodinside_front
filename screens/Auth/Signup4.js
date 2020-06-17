import * as React from "react";
import { StyleSheet, View, Text, Platform, Picker } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import constants from "../../constants";
// import DatePicker from '@react-native-community/datetimepicker';


export default ({ navigation, route }) => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>회원 가입하기(4/4단계)</Text>

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#666" />
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.inner}>
        <Text style={styles.title}>생년월일을 입력하세요</Text>
        <Text style={styles.text}>만 14세 미만 아동은 이용이 제한됩니다</Text>

        <View style={styles.inputContainer}>
          <TouchableWithoutFeedback style={styles.inputBox} onPress={showDatepicker}>
            <Text>{date}</Text>
          </TouchableWithoutFeedback>
        </View>
    
        {show && <DatePicker
        style={{width: 200}}
        value={date}
        mode={"date"}
        display="spinner"
        placeholder="날짜를 선택 하세요"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="확인"
        cancelBtnText="취소"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onChange={onChange}
      />}

        <AuthButton text="가입 완료" onPress={()=>console.log(route.params)} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  header:{
    flexDirection:"row",
    marginTop:25,
    paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor:"rgba(0, 0, 0, .1)",
    alignItems:"center",
  },
  headerTitle:{
    fontSize:16,
    color:"#666",
    width:'100%',
    position:"absolute",
    textAlign:"center"
  },
  inner:{
    padding:15,
    flex:1,
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    paddingTop:40
  },
  text:{
    paddingBottom:40
  },
  inputContainer:{
    marginBottom:15
  },
  inputBox:{
    width:constants.width * 0.9,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderBottomWidth:1,
    borderColor: "#05e6f4",
    borderRadius:6,
    alignItems:"center"
  }
})