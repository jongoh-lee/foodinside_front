import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthInput from '../../components/Custom/AuthInput';
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useQuery } from "@apollo/react-hooks";
import { CHECK_EMAIL } from "./AuthQueries";


export default ({ route, navigation }) => {
  const alertList = ["", "확인중", "유효하지 않음", "접속 불가"]
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(route.params? alertList[1] : alertList[0]);
  const emailInput = useInput(route.params? route.params.email : "");
  const { value } = emailInput;
  const { data, error, loading: loadingProp} = useQuery(CHECK_EMAIL, {
    variables:{
      email: value
    },
    fetchPolicy:"network-only"
  });
  
  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(inputText)) {
        return true;
    } else {
        return false;
    }
  }

  const textAlert = (text) => {
    try{
      setLoading(true);
        if(text === undefined || text === ""){
          setAlert(alertList[0])
        }else if(text.length > 0 && !ValidateEmail(text)){
          setAlert(alertList[2])
        }else if (text.length > 0 && ValidateEmail(text)){
          if(data !== undefined){
            setAlert(alertList[1])
          }
        }
    }catch (e){
      console.log('이메일 입력 에러', e);
    } finally {
      setLoading(false);
    }
  }
  
  const handlecheckEmail = async () => {
    try {
      setLoading(true);
      navigation.navigate("Signup2", { userEmail: value });
    } catch (e) {
      console.log(e)
      setAlert(alertList[3])
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    textAlert(value);
  }, [value])
  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.inner}
      enabled>

      <DismissKeyboard>
        <View style={{height:'100%'}}>
          <Text style={styles.title}>이메일을 입력하세요</Text>
          <Text style={styles.text}>자주 사용하는 이메일을 입력해 주세요</Text>
    
          <AuthInput {...emailInput} placeholder="이메일을 입력하세요" keyboardType="email-address" autoFocus={true} editable={!loading}/>
            {!error && alert === alertList[0] && <Text  style={{fontSize:10}}>{` `}</Text>}
            {!error && alert === alertList[2] && <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{"유효한 형식을 입력해 주세요"}</Text>}
            {!error && alert === alertList[1] && loadingProp && <Text  style={{fontSize:10}}>{` `}</Text>}
            {!error && alert === alertList[1] && !loadingProp && data?.checkEmail && <Text style={{fontSize:10, color:"green", paddingLeft:5}}>{"사용 가능한 이메일 입니다"}</Text>}
            {!error && alert === alertList[1] && !loadingProp && !data?.checkEmail && <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{"이미 존재하는 이메일 입니다"}</Text>}
            {error !== undefined && <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{"네트워크 연결을 확인해 주세요"}</Text>}
          {/* {loadingProp? <Text  style={{fontSize:10}} /> : value?.length < 3 || !value ? <Text  style={{fontSize:10}} /> : data?.checkEmail ? <Text style={{fontSize:10, color:"green", paddingLeft:5}}>{"사용 가능한 이메일 입니다"}</Text> : <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{"사용할 수 없는 이메일 입니다"}</Text>} */}

          <AuthButton text="다음(1/4단계)" onPress={() => handlecheckEmail()} disabled={value?.length > 0 && data?.checkEmail ? loadingProp : true} loading={loading}/>
        </View>
      </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
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
