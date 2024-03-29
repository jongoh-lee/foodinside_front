import * as React from "react";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image, KeyboardAvoidingView, SafeAreaView} from "react-native";
import axios from "axios";
import constants from "../../constants";
import { AntDesign } from '@expo/vector-icons'; 
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicInput from "../../components/Custom/BasicInput";
import { useMutation } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { CREATE_PROFILE, MY_PROFILE } from "./ProfileQueries";
import { RadioButton, } from "react-native-paper";

export default ({ navigation, route }) => {
  const [image, setImage] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false);
  const conceptInput = useInput("");
  const contactInput = numInput("");
  const careerInput = useInput("");
  const menuNameInput = useInput("");
  const salePriceInput = numInput("");
  const [classification, setClassification] = React.useState('일반');
  const onSelect = (image) => {
    setImage(image.photo)
  };
  const [createProfileMutation] = useMutation(CREATE_PROFILE, {
    update(cache, { data: { createProfile } }) {
      cache.writeQuery({
        query: MY_PROFILE,
        data: { myProfile: {...createProfile} },
      });
    },
  })
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('file',{
        name: image.filename,
        type: "image/jpeg",
        uri: image.uri
      });

      const {
        data: { location }
      } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });

      const {
        data: { createProfile } 
      } = await createProfileMutation({
        variables:{
          menuImage: location[0].url, 
          foodGuide: conceptInput.value, 
          career: careerInput.value, 
          contact: String(contactInput.value),
          menuName: menuNameInput.value,
          salePrice: Number(salePriceInput.value),
          classification: classification,
          profileState: 0
        }
      });
      if ( createProfile ) {
        navigation.navigate("프로필 안내");
      }
    } catch (e) {
      console.log('프로필 생성 에러:', e);
    } finally {
      setLoading(false)
    }
  }

  return (
  <SafeAreaView style={styles.container}>
     <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, justifyContent:"center"}}
      keyboardVerticalOffset={50}
      enabled >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15, alignItems:"center"}}>

        <View style={styles.textContainer}>
          <Text style={styles.title}>대표 메뉴</Text>
        </View>

        <TouchableWithoutFeedback style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelect})} disabled={loading}>
          {image === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: image.uri}}/>}
        </TouchableWithoutFeedback>

        <View style={styles.action}>
          <Text style={{fontWeight:'bold'}}>메뉴 이름:  </Text> 
          <ShadowInput {...menuNameInput}  placeholder={"메뉴 이름"} width={'70%'} padding={5} borderColor={'white'} editable={!loading}/>
        </View>

        <View style={styles.action}>
          <Text style={{fontWeight:'bold'}}>희망 가격:  </Text> 
          <ShadowInput {...salePriceInput}  placeholder={"희망가격"} width={'70%'} padding={5} borderColor={'white'} keyboardType="numeric" editable={!loading}/>
        </View>

        <View style={styles.action}>
          <Text style={{fontWeight:'bold'}}>업종:  </Text> 
          <RadioButton.Group onValueChange={classification => setClassification(classification)} value={classification}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <RadioButton value="일반" color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'} disabled={loading}/>
              <Text>일반 음식점</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <RadioButton value="휴게" color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'} disabled={loading}/>
              <Text>휴게 음식점</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>업체 컨셉</Text>
        </View>
        <ShadowInput {...conceptInput} multiline={true} textAlign={'left'} blurOnSubmit={false} returnKeyType={'none'} textAlignVertical={'top'} placeholder={`메뉴 설명, 식재료 원산지, 조리과정, 먹는 방법 등 \n\n대표 메뉴의 스토리를 작성해주세요`} keyboardType={"default"} editable={!loading}/>

        <View style={styles.textContainer_last}>
         <Text style={styles.title}>경력</Text> 
        </View>
        <Text style={styles.warning}>입점 후 경력은 수정할 수 없고 모든 이용자가 볼 수 있습니다</Text> 
        <ShadowInput {...careerInput}  multiline={true} textAlign={'left'} placeholder={`요리 입문 년도, 수상 내역, 자격증, 관련 경험 등 `} blurOnSubmit={false} returnKeyType={'none'} editable={!loading}/>

        <View style={styles.textContainer_last}>
          <Text style={styles.title}>연락처</Text>
        </View>
        <Text style={styles.warning}>진행 과정은 문자로 안내드립니다</Text> 
        <ShadowInput {...contactInput} textAlign={'left'} placeholder={`( - ) 없이 번호만 입력해 주세요`} keyboardType="numeric" editable={!loading}/>

        <View style={{width:constants.width * .9}}>
          <BasicButton text={'제출하기'} onPress={() => handleSubmit()} disabled={image && menuNameInput.value && salePriceInput.value && conceptInput.value && contactInput.value && careerInput.value? loading : true} loading={loading}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
)};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffffff"
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
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image:{
    width:constants.width * 0.25,
    height:constants.width * 0.25,
    backgroundColor:'#f0f0f0', 
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
