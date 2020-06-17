import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, View, Text, ImageBackground } from "react-native";
import constants from "../../constants";

export default ({  navigation  }) => (
  <ImageBackground source={require('../../assets/FindAccountBack.png')} style={styles.background}>
    <View style={styles.container}>
        <Text style={styles.title}>내 계정은 어떻게 찾나요?</Text>

        <Text style={styles.text}>사용중인 이메일 수신 내역에 <Text style={styles.strongText}>'푸드인사이드'</Text>를 검색하세요.{`\n`}
        인증 메일이 있다면 푸드인사이드에 가입된 계정 입니다.</Text>

        <Text style={styles.title}>왜 푸드인사이드는 {`\n`}비밀번호가 없나요?</Text>

        <Text style={styles.text}> <Text style={styles.strongText}>'이건 가...? 저거였나...?'</Text> 비밀번호는 종종 우리를 괴롭힙니다. 그래서 푸드인사이드는 <Text style={styles.strongText}>비밀번호가 없습니다. </Text>
          인증키는 <Text style={styles.strongText}>로그인 즉시 파기</Text>되어 여러분의 계정을 안전하게 보호합니다.
        </Text>

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Text style={[styles.title, {alignSelf:"center"}]}>확인</Text>
        </TouchableWithoutFeedback>
    </View>

  </ImageBackground>
)


const styles = StyleSheet.create({
  background:{
    flex:1,
    width:constants.width,
    resizeMode:"cover"
  },
  container:{
    flex:1,
    backgroundColor:"rgba(0,0,0, .4)",
    padding:15,
  },
  title:{
    fontSize:26,
    fontWeight:"bold",
    paddingTop:50,
    paddingBottom:20,
    color:"rgba(255, 255, 255, .9)"
  },
  text:{
    lineHeight:35,
    fontSize:14,
    color:"white"
  },
  strongText:{
    fontSize:18,
  }
})