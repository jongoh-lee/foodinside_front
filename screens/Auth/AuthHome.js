import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform} from "react-native"
import AuthInput from '../../components/Custom/AuthInput'
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "./AuthQueries";

export default ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState("")
  const [touchableActive, setTouchableActive] = React.useState(false)
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  });
  const handleLogin = async () => {
    setTouchableActive(true)
    const { value } = emailInput;
    try {
      setLoading(true);
      const { data: { requestSecret } } = await requestSecretMutation();
      console.log(requestSecret)
      if(requestSecret) {
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        setAlert("존재하지 않는 계정입니다.")
      } 
    } catch (e) {
      console.log(e)
      setAlert("현재 서버에 접속할 수 없습니다.")
    } finally {
      setLoading(false);
      setTouchableActive(false)
    }
  }
  React.useEffect(()=>{
    if(emailInput.value === ""){
      setAlert("")
    }
  }, [emailInput.value])
    return (
    <View style={{flex:1, backgroundColor:"white"}}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
      enabled >
        <DismissKeyboard>
      
          <View style={styles.inner}>
            <Image style={styles.logoImage} source={require('../../assets/Logo.png')} />

            <View>
              <AuthInput {...emailInput} placeholder="이메일, 아이디 또는 전화번호( - 생략)를 입력하세요" keyboardType="email-address" editable={!loading}/>

              <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{alert}</Text>

              <AuthButton text="로그인 키 요청하기" onPress={handleLogin} disabled={emailInput.value === ""? true : touchableActive} loading={loading}/>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("FindAccount")}>
              <Text style={styles.findIdText}>계정이 기억나지 않으세요?</Text>
            </TouchableWithoutFeedback>

          </View>

        </DismissKeyboard>
      </KeyboardAvoidingView>

      <TouchableOpacity style={{ borderTopWidth:1, borderTopColor:"rgba(0,0,0, .1)"}} onPress={() => navigation.navigate("Signup1", { email: emailInput.value})} disabled={loading}>
        <View style={styles.signup}>
          <Text style={styles.signupText}>푸드인사이드 <Text style={{fontWeight:"bold"}}>가입하기</Text></Text>
        </View>
      </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
  inner: {
    height:"100%",
    alignItems:"center",
    justifyContent:"center",
  },
  logoImage:{
    height:50,
    resizeMode:"contain",
    marginBottom:30,
  },
  findIdText:{
    fontSize:12,
    paddingTop:20
  },
  signup:{
    alignSelf:"center"
  },
  signupText:{
    paddingVertical:15,
    fontSize:12,
    color:"#666",
  }
})

