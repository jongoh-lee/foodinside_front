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
import { SafeAreaView } from "react-native-safe-area-context";


export default ({ navigation, route }) => {
  const [edit, setEdit] = React.useState(true)
  const [alert, setAlert] = React.useState(false);
  const idInput = strickInput("");
  const { value } = idInput;
  const { data, error, loading } = useQuery(CHECK_USERNAME, {
    variables:{
      username: value
    },
    fetchPolicy:"network-only"
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
    if(value === ""){
      setAlert("")
    }
  }, [value])
  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.inner}
      enabled>

      <DismissKeyboard>
      <View style={{height:'100%'}}>
        <Text style={styles.title}>아이디를 입력하세요</Text>
        <Text style={styles.text}>2자 이상 한글, 영문, 숫자 조합만 사용 가능합니다</Text>

        <AuthInput {...idInput} placeholder="아이디를 입력하세요" keyboardType="default" autoFocus={true} editable={edit}/> 
        {value?.length < 2 ? <Text  style={{fontSize:10}} /> : data?.checkUsername ? <Text style={{fontSize:10, color:"green", paddingLeft:5}}>{"사용 가능한 아이디 입니다"}</Text> : <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{"사용할 수 없는 아이디 입니다"}</Text>}

        <AuthButton text="다음(2/4단계)" disabled={value?.length > 1 && data?.checkUsername? loading : true} onPress={() => handlecheckUsername()}/>
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