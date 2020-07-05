import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image, SafeAreaView} from "react-native";
import constants from "../../constants";
import { useQuery } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { YellowBox } from 'react-native';
import { MY_PROFILE } from "./ProfileQueries";
import Loader from "../../components/Custom/Loader";

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default ({ navigation, route }) => {
  const {data, loading, error} = useQuery(MY_PROFILE);
  navigation.setOptions({
    headerRight:() => (<Text>hi1</Text>, <Text>hi2</Text>)
  })
  
  if (loading) return <Loader />;
  if (error) return console.log(error);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {data && data.myProfile &&
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>대표 메뉴</Text>
      </View>
      <Image style={styles.image} source={{uri: data.myProfile.mainMenu}} />


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
      
      <BasicButton text={'확인'} onPress={() => navigation.goBack()} />
      <BasicButton text={'수정하기'} onPress={() => navigation.navigate('프로필 수정(pre)',{
        myProfile: data.myProfile
      })} />
    </View>}
  </ScrollView>
)};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
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
    width:constants.width * 0.9,
    backgroundColor:'white',
    borderRadius:20,
    padding:15,
    justifyContent:'flex-start'
  },
})
