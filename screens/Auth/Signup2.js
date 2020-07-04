import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthInput from '../../components/Custom/AuthInput';
import AuthButton from '../../components/Custom/AuthButton';
import strickInput from "../../hooks/strickInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useQuery } from "@apollo/react-hooks";
import { CHECK_USERNAME } from "./AuthQueries";


export default ({ navigation, route }) => {
  const [alert, setAlert] = React.useState("");
  const [color, setColor] = React.useState('warn');
  const [edit, setEdit] = React.useState(true)
  const idInput = strickInput("");
  const { value } = idInput;
  const { data, error } = useQuery(CHECK_USERNAME, {
    variables:{
      username: value
    }
  });
  const handlecheckUsername = () => {
    setEdit(false)
    try {
      if(data.checkUsername) {
        navigation.navigate("Signup3", { 
          userEmail:route.params.userEmail,
          username: value
        });
        setEdit(true);
        return;
      }
    } catch (e) {
      console.log('아이디 설정 에러: ',error);
      setAlert("현재 서버에 접속할 수 없습니다.")
    } 
  }
  React.useEffect(()=>{
    if(value.length > 1 && data && data.checkUsername){
      setColor('pass')
      setAlert("사용 가능한 아이디 입니다")
    } else {
      setColor('warn')
      setAlert("사용할 수 없는 아이디 입니다")
    }
    if(value === ""){
      setAlert("")
    }
  }, [value])
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>회원 가입하기(2/4단계)</Text>

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#666" />
        </TouchableWithoutFeedback>
      </View>

      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.inner}
      enabled>

      <DismissKeyboard>
      <View style={{height:'100%'}}>
        <Text style={styles.title}>아이디를 입력하세요</Text>
        <Text style={styles.text}>2자 이상 한글, 영문, 숫자 조합만 사용 가능합니다</Text>

        <AuthInput {...idInput} placeholder="아이디를 입력하세요" keyboardType="default" autoFocus={true} editable={edit}/>
        <Text style={color === 'warn'? {fontSize:10, color:"red", paddingLeft:5} : {fontSize:10, color:"green", paddingLeft:5}}>{alert}</Text>

        <AuthButton text="다음(2/4단계)" disabled={color === 'warn'? true : false} onPress={handlecheckUsername}/>
      </View>
      </DismissKeyboard>
      </KeyboardAvoidingView>
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
  }
})