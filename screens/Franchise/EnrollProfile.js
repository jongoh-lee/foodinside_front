import * as React from "react";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import {StyleSheet, View, Text, Image,} from "react-native";
import constants from "../../constants";
import { AntDesign } from '@expo/vector-icons'; 
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import AuthInput from "../../components/Custom/AuthInput";
import BasicInput from "../../components/Custom/BasicInput";
import { useMutation } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { YellowBox } from 'react-native';
import { CREATE_PROFILE, MY_PROFILE } from "./ProfileQueries";
import { RadioButton, } from "react-native-paper";

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

export default ({ navigation, route }) => {
  const [image, setImage] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false);
  const conceptInput = useInput("");
  const contactInput = numInput("");
  const careerInput = useInput("");
  const menuNameInput = useInput("");
  const salePriceInput = numInput("");
  const [sector, setSector] = React.useState('일반');
  const onSelect = (photo) => {
    setImage(photo)
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
      const {
        data: { createProfile } 
      } = await createProfileMutation({
        variables:{
          menuImage: image? image.photo.uri: null, 
          foodGuide: conceptInput.value, 
          career: careerInput.value, 
          contact: String(contactInput.value),
          menuName: menuNameInput.value,
          salePrice: Number(salePriceInput.value),
          sector: sector,
          profileState: 1
        }
      });
      console.log(createProfile)
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
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>대표 메뉴</Text>
      </View>

      <TouchableWithoutFeedback style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelect})}>
        {image === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: image.photo.uri}}/>}
      </TouchableWithoutFeedback>
        
      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>업종:  </Text> 
        <RadioButton.Group onValueChange={sector => setSector(sector)} value={sector}>
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
        <AuthInput {...menuNameInput} placeholder={"메뉴 이름"} width={0.5} padding={5} borderColor={'white'}/>
      </View>

      <View style={styles.action}>
        <Text style={{fontWeight:'bold'}}>희망 가격:  </Text> 
        <AuthInput {...salePriceInput} placeholder={"희망가격"} width={0.5} padding={5} borderColor={'white'} keyboardType="numeric"/>
      </View>

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
      
      <View style={{width:constants.width * .9}}>
        <BasicButton text={'제출하기'} onPress={handleSubmit} disabled={image && menuNameInput.value && salePriceInput.value && conceptInput.value && contactInput.value && careerInput.value? false : true} loading={loading}/>
      </View>
    </View>
  </ScrollView>
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})
