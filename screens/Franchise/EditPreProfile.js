import * as React from "react";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image, SafeAreaView} from "react-native";
import constants from "../../constants";
import { AntDesign } from '@expo/vector-icons'; 
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import BasicInput from "../../components/Custom/BasicInput";
import { useMutation } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { YellowBox } from 'react-native';
import { EDIT_PROFILE, MY_PROFILE } from "./ProfileQueries";

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default ({ navigation, route }) => {
  const [image, setImage] = React.useState(route.params.myProfile.mainMenu);
  const [ loading, setLoading ] = React.useState(false);
  const conceptInput = useInput(route.params.myProfile.foodGuide);
  const careerInput = useInput(route.params.myProfile.career);
  const contactInput = numInput(String(route.params.myProfile.contact));
  const onSelect = (photo) => {
    setImage(photo)
  };
  const [editProfileMutation] = useMutation(EDIT_PROFILE, {
    update(cache, { data: { editProfile } }) {
      cache.writeQuery({
        query: MY_PROFILE,
        data: {
            myProfile: {...editProfile}
        },
      });
    },
    refetchQueries: [`chechProfile`]
  })
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { editProfile } 
      } = await editProfileMutation({
        variables:{
          mainMenu: image.photo? image.photo.uri : image, 
          foodGuide: conceptInput.value, 
          career: careerInput.value, 
          contact: String(contactInput.value),
        }
      });
      console.log(editProfile)
      if ( editProfile ) {
        navigation.goBack();
      }
    } catch (e) {
      console.log('프로필 에러:', e);
    } finally {
      setLoading(false)
    }
  }

  return (
  <SafeAreaView>
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>대표 메뉴</Text>
      </View>
      <TouchableWithoutFeedback style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelect})}>
            <Image style={styles.image} source={image.photo? {uri:image.photo.uri} : {uri: image}}/>
      </TouchableWithoutFeedback>

      <View style={styles.textContainer}>
        <Text style={styles.title}>업체 컨셉</Text>
      </View>
      <BasicInput {...conceptInput} placeholder={`메뉴 설명, 식재료 원산지, 조리과정, 먹는 방법 등 \n대표 메뉴의 스토리를 작성해주세요`} keyboardType="default" editable={!loading}/>

      <View style={styles.textContainer_last}>
       <Text style={styles.title}>경력</Text> 
      </View>
      <Text style={styles.warning}>선정 후 경력은 수정할 수 없고 모든 이용자가 볼 수 있습니다</Text> 
      <BasicInput {...careerInput} placeholder={`요리 입문 년도, 수상 내역, 자격증, 관련 경험 등 `} keyboardType="default" editable={!loading}/>

      <View style={styles.textContainer_last}>
        <Text style={styles.title}>연락처</Text>
      </View>
      <Text style={styles.warning}>선정 결과는 문자로 안내드립니다</Text> 
      <BasicInput {...contactInput} placeholder={`( - ) 없이 번호만 입력해 주세요`} keyboardType="numeric" editable={!loading}/>
      
      <BasicButton text={'제출하기'} onPress={handleSubmit} disabled={image && conceptInput.value && contactInput.value && careerInput.value? false : true} loading={loading}/>
    </View>
  </ScrollView>
  </SafeAreaView>
)};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  imageInput:{
    width:constants.width * 0.25,
    height:constants.width * 0.25,
    backgroundColor:'white', 
    borderRadius:20,
    margin:5,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
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
  textInput:{
    flex:1,
    fontSize:14,
    width:constants.width * 0.9,
    backgroundColor:'white',
    borderRadius:20,
    padding:15,
    justifyContent:'flex-start'
  },
})
