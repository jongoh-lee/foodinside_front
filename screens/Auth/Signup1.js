import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthInput from '../../components/Custom/AuthInput';
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { CHECK_EMAIL } from "./AuthQueries";


export default ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const emailInput = useInput(route.params? route.params.email : "");
  const { value } = emailInput;
  const [checkEmailMutation] = useMutation(CHECK_EMAIL, {
    variables:{
      email: value
    }
  });
  const handlecheckEmail = async () => {
    try {
      setLoading(true);
      const { data: { checkEmail } } = await checkEmailMutation();
      if(checkEmail) {
        navigation.navigate("Signup2", { userEmail: value });
        return;
      } else {
        setAlert("이미 존재하는 계정 입니다.")
      } 
    } catch (e) {
      console.log(e)
      setAlert("현재 서버에 접속할 수 없습니다.")
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    if(value === ""){
      setAlert("")
    }
  }, [value])
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>회원 가입하기(1/4단계)</Text>

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
          <Text style={styles.title}>이메일을 입력하세요</Text>
          <Text style={styles.text}>자주 사용하는 이메일을 입력해 주세요</Text>
    
          <AuthInput {...emailInput} placeholder="이메일을 입력하세요" keyboardType="email-address" autoFocus={true} editable={!loading}/>
          <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{alert}</Text>

          <AuthButton text="다음(1/4단계)" onPress={handlecheckEmail} disabled={value === "" ? true : loading} loading={loading}/>
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
