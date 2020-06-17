import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import SubButton from "../../components/Custom/SubButton";
import { AntDesign } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  imageBox:{
    width:100,
    height:100,
    backgroundColor:'white', 
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  textContainer:{
    borderBottomWidth:2,
    borderBottomColor:'#50caef',
    marginVertical:20
  },
  textContainer_last:{
    borderBottomWidth:2,
    borderBottomColor:'#50caef',
    marginTop:20
  },
  title:{
    fontWeight:'bold',
    fontSize:16,
  },
  warning:{
    fontSize:12,
    color:'#e0383e',
    marginVertical:10
  },
  textInput:{
    flex:1,
    fontSize:14,
    width:constants.width * 0.9,
    backgroundColor:'white',
    borderRadius:20,
    padding:15,
    justifyContent:'flex-start'
  }
})

export default () => {
  return (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

    <View style={styles.textContainer}>
      <Text style={styles.title}>대표 메뉴</Text>
    </View>
    
    <View style={styles.imageBox}>
      <AntDesign name="plus" size={30} color="black" />
    </View>

    <View style={styles.textContainer}>
     <Text style={styles.title}>푸드 가이드</Text>
    </View>

    <TextInput style={styles.textInput} multiline={true} 
    placeholder={`업체 컨셉, 식재료 원산지, 조리과정, 먹는 방법 등 \n대표 메뉴의 스토리를 작성해주세요`}/>

    <View style={styles.textContainer_last}>
     <Text style={styles.title}>경력</Text> 
    </View>

    <Text style={styles.warning}>선정 후 경력은 수정할 수 없고 모든 이용자가 볼 수 있습니다</Text> 
    <TextInput style={styles.textInput} multiline={true} 
    placeholder={`입문 연/월, 수상 내역, 자격증, 관련 경험 등 `}/>

    <View style={styles.textContainer_last}>
     <Text style={styles.title}>전화번호</Text> 
    </View>

    <Text style={styles.warning}>선정 결과는 이메일/문자로 안내드립니다</Text> 
    <TextInput style={styles.textInput} multiline={true} 
    placeholder={`( - ) 없이 번호만 입력해 주세요`}/>
      
    <SubButton text={'제출하기'}/>
    
    </View>
  </ScrollView>
)};