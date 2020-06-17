import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthInput from '../../components/Custom/AuthInput';
import AuthButton from '../../components/Custom/AuthButton';
import strickInput from "../../hooks/strickInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { CHECK_USERNAME } from "./AuthQueries";


export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const idInput = strickInput("");
  const { value } = idInput;
  const [checkUsernameMutation] = useMutation(CHECK_USERNAME, {
    variables:{
      username: value
    }
  });
  const handlecheckUsername = async () => {
    try {
      setLoading(true);
      const { data: { checkUsername } } = await checkUsernameMutation();
      if(checkUsername) {
        navigation.navigate("Signup3", { 
          userEmail:route.params.userEmail,
          username: value
         });
        return;
      } else {
        setAlert("이미 존재하는 아이디 입니다.")
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
        <Text style={styles.text}>한글, 영문, 숫자 조합만 사용 가능합니다</Text>

        <AuthInput {...idInput} placeholder="아이디를 입력하세요" keyboardType="default" autoFocus={true}/>
        <Text style={{fontSize:10, color:"red", paddingLeft:5}}>{alert}</Text>

        <AuthButton text="다음(2/4단계)" disabled={value === ""? true : false} onPress={handlecheckUsername} loading={loading}/>
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