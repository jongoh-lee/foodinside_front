import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import { RadioButton, } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { MY_SHOP } from "./OwnerQueries";
import Loader from "../../components/Custom/Loader";
import BackArrow from "../../components/Custom/BackArrow";

export default ({ navigation }) => {
  const { data , loading, refetch } = useQuery(MY_SHOP);
  navigation.setOptions({
    headerRight:() => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("수정 하기",{
      myShop:data.myShop
    })}>
      <View style={styles.edit}>
        <Text style={styles.editText}>수정</Text>
      </View>
    </TouchableWithoutFeedback>
    ),
    headerLeft:() => <BackArrow />
  });

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
    {data?.myShop && 
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
      <View style={[styles.textContainer, {marginTop: 20}]}>
        <Text style={styles.title}>내 가게가 공유 음식점이 될 수 있나요?</Text>
      </View>
      <Text style={styles.warning}>가게 사진을 제출해주세요, 선정 결과는 이메일/문자로 알려드립니다</Text> 
    
      <View style={styles.imageBox}>
        {data?.myShop?.shopImages?.map(el => 
          <Image key={el.id} style={styles.image} source={{uri: el.url}}/>  
        )}
      </View>

      <View style={styles.imageBox}>
        <Text style={styles.text}>외부 사진</Text>
        <Text style={styles.text}>홀 사진</Text>
        <Text style={styles.text}>주방 사진</Text>
      </View>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업장 위치를 알려주세요</Text>
      </View>
      <Text style={styles.warning}>주변 음식점과 함께 신청할수록 선정 확률이 높아집니다</Text> 

        <Text style={styles.textInput}>{data.myShop.address + " " + data.myShop.addressDetail}</Text>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업자등록증을 확인합니다</Text> 
      </View>
    
      <Text style={styles.warning}>영업 사실확인 용도로만 사용됩니다</Text> 
      
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectRegistration})}>
          <Image style={styles.image} source={{uri: data.myShop.registration}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
       <Text style={styles.title}>업종을 알려주세요</Text> 
      </View>
    
      <Text style={styles.warning}>일반/휴게 음식점만 등록할 수 있습니다</Text> 
      
      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>업종:  </Text> 
        <RadioButton.Group value={data.myShop.classification} >
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton value="일반" color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'}/>
            <Text>일반 음식점</Text>
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <RadioButton value="휴게" color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'}/>
            <Text>휴게 음식점</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.textContainer}>
       <Text style={styles.title}>연락처를 알려주세요</Text> 
      </View>
    
      <Text style={styles.warning}>선정 결과는 문자로 안내해 드립니다</Text> 
      
      <Text style={styles.textInput}>{data.myShop.contact}</Text>
    
      <BasicButton text={'뒤로 가기'} onPress={() => navigation.goBack()}/>
    </ScrollView>}
  </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffffff"
  },
  edit:{
    paddingHorizontal:10
  },
  editText:{
    color:'#05e6f4',
    fontSize:16,
  },
  imageBox:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  image:{
    width:constants.width * 0.25,
    height:constants.width * 0.25,
    backgroundColor:'white', 
    borderRadius:20,
    margin:5,
  },
  textContainer:{
    marginTop:50,
    borderBottomWidth:2,
    borderBottomColor:'#05e6f4',
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
    borderRadius:10,
    padding:10,
    borderWidth:1,
    borderColor:"#e7e7e7",
    justifyContent:'flex-start'
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})