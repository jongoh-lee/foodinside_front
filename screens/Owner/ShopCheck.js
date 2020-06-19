import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import SubButton from "../../components/Custom/SubButton";
import { AntDesign } from '@expo/vector-icons'; 
import FindPhotoButton from "../../components/Custom/FindPhotoButton";

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    paddingHorizontal:20,
  },
  imageBox:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  textContainer:{
    marginTop:20,
    borderBottomWidth:2,
    borderBottomColor:'#50caef',
    alignSelf:"flex-start"
  },
  title:{
    fontWeight:'bold',
    fontSize:16,
  },
  text:{
    fontSize:15,
    width:constants.width * 0.25,
    textAlign:"center",
    marginTop: 4
  },
  warning:{
    fontSize:12,
    color:'#e0383e',
    marginVertical:10,
  },
  textInput:{
    fontSize:14,
    width:constants.width * 0.9,
    borderRadius:20,
    padding:10,
    borderWidth:1,
    borderColor:"#e7e7e7",
    justifyContent:'flex-start'
  }
})

export default () => {
  return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>내 가게가 공유 음식점이 될 수 있나요?</Text>
      </View>
        <Text style={styles.warning}>가게 사진을 보여주세요, 선정 결과는 이메일/문자로 알려드립니다</Text> 
    
      <View style={styles.imageBox}>
        <FindPhotoButton />

        <FindPhotoButton />

        <FindPhotoButton />
      </View>

      <View style={styles.imageBox}>
        <Text style={styles.text}>외부 사진</Text>
        <Text style={styles.text}>홀 사진</Text>
        <Text style={styles.text}>주방 사진</Text>
      </View>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업장 위치를 알려주세요</Text>
      </View>
      <Text style={styles.warning}>주변 음식점과 함께 신청하면 선정 될 확률이 높습니다</Text> 

      <TextInput 
      style={styles.textInput} 
      multiline={true} 
      placeholder={'주소/상권을 입력하세요'}/>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업자등록증을 확인합니다</Text> 
      </View>
    
      <Text style={styles.warning}>영업 사실확인 용도로만 사용됩니다</Text> 
      
      <View style={{flexDirection:"row"}}>
        <FindPhotoButton />

        <Text style={styles.text}>업종: 일반/ 휴게</Text> 
      </View>
    
      <SubButton text={'제출하기'}/>
    
    </ScrollView>
  </View>
)};