import * as React from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image, SafeAreaView, AsyncStorage} from "react-native";
import constants from "../../constants";
import { useQuery } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { MY_PROFILE } from "./ProfileQueries";
import Loader from "../../components/Custom/Loader";

export default ({ navigation }) => {
  const {data, loading, error} = useQuery(MY_PROFILE);
  navigation.setOptions({
    headerRight:() => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 수정(pre)",{
      myProfile:data.myProfile
    })}>
      <View style={styles.edit}>
        <Text style={styles.editText}>수정</Text>
      </View>
    </TouchableWithoutFeedback>
    )
  })
  if (loading) return <Loader />;
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:"center"}}>
    {data && data.myProfile &&
      <>
      <View style={styles.textContainer}>
        <Text style={styles.title}>대표 메뉴</Text>
      </View>
      <Image style={styles.image} source={{uri: data.myProfile.menuImage}} />

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>메뉴 이름:  </Text> 
        <Text style={styles.text}>{data.myProfile.menuName}</Text>
      </View>

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>희망 가격:  </Text> 
        <Text style={styles.text}>{data.myProfile.salePrice}</Text>
      </View>

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>업종:  </Text> 
        <Text style={styles.text}>{data.myProfile.classification} 음식점</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>업체 컨셉</Text>
      </View>
      <Text style={styles.text}>{data.myProfile.foodGuide}</Text>

      <View style={styles.textContainer_last}>
       <Text style={styles.title}>경력</Text> 
      </View>
      <Text style={styles.warning}>선정 후 경력은 수정할 수 없고 모든 이용자가 볼 수 있습니다</Text> 
      <Text style={styles.text}>{data.myProfile.career}</Text>

      <View style={styles.textContainer_last}>
        <Text style={styles.title}>연락처</Text>
      </View>
      <Text style={styles.warning}>선정 결과는 문자로 안내드립니다</Text> 
      <Text style={styles.text}>{data.myProfile.contact}</Text>
      
      <View style={{width:constants.width * .9}}>
        <BasicButton text={'확인'} onPress={() => navigation.goBack()} />
      </View>
      </>}
    </ScrollView>
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
  image:{
    width:constants.width * 0.25,
    height:constants.width * 0.25,
    backgroundColor:'white', 
    borderRadius:20,
    margin:5,
  },
  textContainer:{
    borderBottomWidth:2,
    borderBottomColor:'#05e6f4',
    marginVertical:20
  },
  textContainer_last:{
    borderBottomWidth:2,
    borderBottomColor:'#05e6f4',
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
  text:{
    flex:1,
    fontSize:14,
    width:constants.width * .9,
    backgroundColor:'white',
    borderRadius:10,
    padding:10,
    borderWidth:1,
    borderColor:"#e7e7e7",
    justifyContent:'flex-start'
  },
  action: {
    flexDirection: 'row',
    width:constants.width * .9,
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})
