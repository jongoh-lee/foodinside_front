import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform} from "react-native"
import AuthInput from '../../components/Custom/AuthInput'
import AuthButton from '../../components/Custom/AuthButton';
import useInput from "../../hooks/useInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "./AuthQueries";
import { SafeAreaView } from "react-native-safe-area-context";

export default ({ navigation, route }) => {
  const [email, setEmail] = React.useState(route? route.params?.email : "");
  const onChange = text => {
    setEmail(text);
  };

  const [alert, setAlert] = React.useState("")
  const [requestSecretMutation ,{error, loading}] = useMutation(LOG_IN, {
    variables: {
      email: email
    }
  });
  
  const handleLogin = async () => {
    try {
      const { data: { requestSecret } } = await requestSecretMutation();
      if(requestSecret) {
        navigation.navigate("Confirm", { email: email });
      } else {
        setAlert("존재하지 않는 계정입니다.")
      } 
    } catch (e) {
      console.log(e)
      setAlert("현재 서버에 접속할 수 없습니다.")
    }
  }
  
  React.useEffect(()=>{
    if(email === ""){
      setAlert("")
    }
    setEmail(route?.params?.email)
  }, [route])
    return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
      enabled >
        <DismissKeyboard>
      
          <View style={styles.inner}>
            <Image style={styles.logoImage} source={require('../../assets/Logo.png')} />

            <View>
              <AuthInput value={email} onChange={onChange} placeholder="이메일, 아이디 또는 전화번호( - 생략)를 입력하세요" keyboardType="email-address" editable={!loading}/>

              <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{alert}</Text>

              <AuthButton text="로그인 키 요청하기" onPress={handleLogin} disabled={email ? loading : true} loading={loading}/>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("FindAccount")}>
              <Text style={styles.findIdText}>계정이 기억나지 않으세요?</Text>
            </TouchableWithoutFeedback>

          </View>

        </DismissKeyboard>
      </KeyboardAvoidingView>

      <TouchableOpacity style={{ borderTopWidth:1, borderTopColor:"rgba(0,0,0, .1)"}} onPress={() => navigation.navigate("Signup1", { email: email})} disabled={loading}>
        <View style={styles.signup}>
          <Text style={styles.signupText}>푸드인사이드 <Text style={{fontWeight:"bold"}}>가입하기</Text></Text>
        </View>
      </TouchableOpacity>
  </SafeAreaView>
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

