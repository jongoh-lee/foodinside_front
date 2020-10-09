import * as React from "react";
import { StyleSheet, View, Text, Platform, SafeAreaView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from '../../components/Custom/AuthButton';
import foodinsideRule from "../../assets/Rules/FOODINSIDE_TERMS_OF_USE";
import foodinsidePrivacyPolicy from "../../assets/Rules/FOODINSIDE_PRIVACY_POLICY";
import foodinsideLocationBasedService from "../../assets/Rules/FOODINSIDE_LOCATION_BASED_SERVICE_TERMS_OF_USE";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";

export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [agreeRules, setAgreeRules] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);
  const [agreeLocation, setAgreeLocation] = React.useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables:{
      username: route.params.username,
      email: route.params.email,
      firstName: route.params.firstName,
      lastName: route.params.lastName
    }
  })

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        navigation.navigate("AuthHome",{email: route.params.email});
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }


  const AgreeButton = ({ agree, setState }) => {
    return (
      <TouchableOpacity onPress={() => setState(!agree)} style={{flexDirection:"row", alignItems:"center", paddingRight:5}} disabled={loading}>
        <Text style={{paddingRight:5, fontSize:12, color: agree ? "rgb(5, 230, 244)" : "rgba(5, 230, 244, .5)"}}>동의</Text>
        <View style={{width:20, height:20, justifyContent:"center", alignItems:"center", borderColor: agree ? "rgb(5, 230, 244)" : "rgba(5, 230, 244, .3)", borderWidth:2, borderRadius:10}}>
          <View style={{width:12, height:12, borderRadius:6, backgroundColor: agree ? "rgb(5, 230, 244)" : "rgba(5, 230, 244, .3)"}}/>
        </View>
      </TouchableOpacity>
    )
  }

  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>푸드 인사이드 이용약관</Text>
          
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={styles.text}>푸드 인사이드 이용약관</Text>
            <AgreeButton agree={agreeRules} setState={setAgreeRules}/>
          </View>

            <View style={styles.textBox}>
              <ScrollView style={styles.inner}>
                <Text style={styles.termsOfUseText}>{foodinsideRule}</Text>
              </ScrollView>
            </View>

          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={styles.text}>푸드 인사이드 개인정보 처리방침</Text>
            <AgreeButton agree={agreePrivacy} setState={setAgreePrivacy}/>
          </View>
            <View style={styles.textBox}>
              <ScrollView style={styles.inner}>
                <Text style={styles.termsOfUseText}>{foodinsidePrivacyPolicy}</Text>
              </ScrollView>
            </View>
          
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={styles.text}>위치기반 서비스 이용약관</Text>
            <AgreeButton agree={agreeLocation} setState={setAgreeLocation}/>
          </View>
            <View style={styles.textBox}>
              <ScrollView style={styles.inner}>
                <Text style={styles.termsOfUseText}>{foodinsideLocationBasedService}</Text>
              </ScrollView>
            </View>

          <AuthButton text="가입 완료" onPress={handleSignUp} disabled={agreeRules && agreePrivacy && agreeLocation ? loading : true}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  inner:{
    padding:15,
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    paddingBottom:40,
    paddingTop:20
  },
  textBox:{
    height: 100, 
    borderWidth:1,
    borderColor:"rgba(0, 0, 0, .1)",
    borderRadius:10,
    marginBottom:30
  },
  text:{
    paddingBottom:10
  },
  termsOfUseText:{
    fontSize:12,
  }
})