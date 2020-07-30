import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Keyboard, Platform, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AuthInput from '../../components/Custom/AuthInput';
import AuthButton from '../../components/Custom/AuthButton';
import strickInput from "../../hooks/strickInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import constants from "../../constants";

export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const firstName = strickInput("");
  const lastName = strickInput("");
  const { value : lName } = lastName;
  const { value : fName } = firstName;
  
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables:{
      username: route.params.username,
      email: route.params.userEmail,
      firstName: fName,
      lastName: lName
    }
  })
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        navigation.replace("AuthHome2", { email: route.params.userEmail});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>회원 가입하기(3/4단계)</Text>

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
        <Text style={styles.title}>성함을 입력하세요</Text>
        <Text style={styles.text}>성과 이름을 입력해 주세요</Text>

        <View style={{flexDirection:"row", width: constants.width *  0.9, justifyContent:"space-between"}}>
        <AuthInput {...lastName} placeholder="성" keyboardType="default" autoFocus={true} width={.2} editable={!loading}/>
        <AuthInput {...firstName} placeholder="이름(성 제외)" keyboardType="default" width={.6} editable={!loading}/>
        </View>
        <AuthButton text="다음(3/4단계)" onPress={handleSignUp} loading={loading} />
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