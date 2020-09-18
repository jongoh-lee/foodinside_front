import * as React from "react";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image, SafeAreaView} from "react-native";
import constants from "../../constants";
import axios from "axios";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import ShadowInput from "../../components/Custom/ShadowInput";
import { useMutation } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { EDIT_PROFILE, MY_PROFILE } from "./ProfileQueries";
import { RadioButton, } from "react-native-paper";

export default ({ navigation, route }) => {
  const [image, setImage] = React.useState(route.params.myProfile.menuImage);
  const [ loading, setLoading ] = React.useState(false);
  const conceptInput = useInput(route.params.myProfile.foodGuide);
  const careerInput = useInput(route.params.myProfile.career);
  const contactInput = numInput(String(route.params.myProfile.contact));
  const menuNameInput = useInput(route.params.myProfile.menuName);
  const salePriceInput = numInput(String(route.params.myProfile.salePrice));
  const [classification, setClassification] = React.useState(route.params.myProfile.classification);
  const onSelect = (image) => {
    setImage(image.photo)
  };
  const [editProfileMutation] = useMutation(EDIT_PROFILE)
  const handleSubmit = async () => {
    let _image = [];
    try {
      setLoading(true);
      if(image.uri){
        const formData = new FormData();
        formData.append('file',{
          name: image.filename,
          type: "image/jpeg",
          uri: image.uri
        });
        const {
          data: { location }
        } = await axios.post("http://172.30.1.21:4000/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        _image.push(location[0].url)
      }
  
      const {
        data: { editProfile } 
      } = await editProfileMutation({
        variables:{
          menuImage: image.uri? _image[0] : image,
          foodGuide: conceptInput.value, 
          career: careerInput.value, 
          contact: String(contactInput.value),
          menuName: menuNameInput.value,
          salePrice: Number(salePriceInput.value),
          classification: classification,
          profileState: 0
        }
      });
      if ( editProfile ) {
        navigation.goBack();
      }
    } catch (e) {
      console.log('프로필 수정 에러:', e);
    } finally {
      setLoading(false)
    }
  }

  return (
  <SafeAreaView>
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>대표 메뉴</Text>
      </View>
      <TouchableWithoutFeedback style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelect})}>
        <Image style={styles.image} source={image.uri? {uri:image.uri} : {uri: image}}/>
      </TouchableWithoutFeedback>

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>업종:  </Text> 
        <RadioButton.Group onValueChange={classification => setClassification(classification)} value={classification}>
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

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>메뉴 이름:  </Text> 
        <ShadowInput {...menuNameInput} placeholder={"메뉴 이름"} width={'70%'} padding={5} borderColor={'white'}/>
      </View>

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>희망 가격:  </Text> 
        <ShadowInput {...salePriceInput} placeholder={"희망가격"} width={'70%'} padding={5} borderColor={'white'}/>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>업체 컨셉</Text>
      </View>
      <ShadowInput {...conceptInput} textAlign={'left'} textAlignVertical={'top'} placeholder={`메뉴 설명, 식재료 원산지, 조리과정, 먹는 방법 등 \n대표 메뉴의 스토리를 작성해주세요`} keyboardType="default" editable={!loading}/>

      <View style={styles.textContainer_last}>
       <Text style={styles.title}>경력</Text> 
      </View>
      <Text style={styles.warning}>선정 후 경력은 수정할 수 없고 모든 이용자가 볼 수 있습니다</Text> 
      <ShadowInput {...careerInput} textAlign={'left'} placeholder={`요리 입문 년도, 수상 내역, 자격증, 관련 경험 등 `} keyboardType="default" editable={!loading}/>

      <View style={styles.textContainer_last}>
        <Text style={styles.title}>연락처</Text>
      </View>
      <Text style={styles.warning}>선정 결과는 문자로 안내드립니다</Text> 
      <ShadowInput {...contactInput} textAlign={'left'} placeholder={`( - ) 없이 번호만 입력해 주세요`} keyboardType="numeric" editable={!loading}/>
      
      <View style={{width:constants.width * .9}}>
        <BasicButton text={'수정하기'} onPress={handleSubmit} disabled={loading} loading={loading}/>
      </View>
      </View>
    </ScrollView>
  </SafeAreaView>
)};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center"
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})
