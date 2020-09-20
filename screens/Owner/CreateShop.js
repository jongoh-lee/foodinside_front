import * as React from "react";
import {StyleSheet, View, Text, Image, Platform, KeyboardAvoidingView, SafeAreaView} from "react-native";
import { TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import { RadioButton, } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons'; 
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_SHOP, MY_SHOP} from "./OwnerQueries";
import ShadowInput from "../../components/Custom/ShadowInput";

export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [ exterior, setExterior] = React.useState(null);
  const [ hall, setHall] = React.useState(null);
  const [ kitchen, setKitchen] = React.useState(null);
  const [registration, setRegistration] = React.useState(null);
  const [classification, setClassification] = React.useState("일반");
  const contactInput = numInput('');

  const addressDetailInput = useInput('');
  
  const onSelectExterior = ( image ) => {
    setExterior(image.photo);
  };
  const onSelectHall = ( image ) => {
    setHall(image.photo);
  };
  const onSelectKitchen = ( image ) => {
    setKitchen(image.photo);
  };
  const onSelectRegistration = ( image ) => {
    setRegistration(image.photo);
  };

  const [createShopMutation] = useMutation(CREATE_SHOP,{
    update(cache, {data: { createShop }}) {
      cache.writeQuery({
        query: MY_SHOP,
        data: { myShop: {
          ...createShop
        } },
      });
    }
  });

  const handleCreateShop = async () => {
    setLoading(true);
    try {
      let _shopImages = [exterior, hall, kitchen]
      let _registration = [];
      const formShopImages = new FormData();
      const formRegistration = new FormData();
      
      for (var i = 0; i < _shopImages.length; i++) {
        formShopImages.append('file', {
            name: _shopImages[i].filename,
            type: "image/jpeg",
            uri: _shopImages[i].uri
        });
      }

      const {
        data: { location : shopImagesUrl }
      } = await axios.post("http://172.30.1.11:4000/api/upload", formShopImages, {
          headers: {
            "content-type": "multipart/form-data"
          }
      });

      _shopImages[0]={
        url: shopImagesUrl[0].url,
        type: "EXTERIOR"
      }

      _shopImages[1]={
        url: shopImagesUrl[1].url,
        type: "HALL"
      }

      _shopImages[2]={
        url: shopImagesUrl[2].url,
        type: "KITCHEN"
      }


      formRegistration.append('file', {
        name: registration.filename,
        type: "image/jpeg",
        uri: registration.uri
      });
      
      const {
        data: { location }
      } = await axios.post("http://172.30.1.11:4000/api/upload", formRegistration, {
          headers: {
            "content-type": "multipart/form-data"
          }
      });

      _registration.push(location[0]);


      const {
        data : { createShop }
      } = await createShopMutation({
        variables:{
            shopImages: _shopImages,
            address: route.params?.address,
            addressDetail: addressDetailInput.value,
            registration: _registration[0].url,
            classification: classification,
            contact:String(contactInput.value),
            ownerState:0
        }
      });
      if(createShop){
        navigation.navigate("내 음식점");
      }
    } catch(e){
      console.log("가게 신청 에러:",e)
    } finally {
      setLoading(false);
    }
  }
  return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      style={{flex:1, justifyContent:"center"}}
      keyboardVerticalOffset={50}
      enabled
    >
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:20}}>

      <View style={[styles.textContainer, {marginTop:20}]}>
        <Text style={styles.title}>내 가게가 공유 음식점이 될 수 있나요?</Text>
      </View>
      <Text style={styles.warning}>가게 사진을 제출해주세요, 선정 결과는 이메일/문자로 알려드립니다</Text> 
    
      <View style={styles.imageBox}>
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectExterior, data: "EXTERIOR"})}>
          {exterior === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: exterior.uri}}/>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectHall, data: "HALL"})}>
          {hall === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: hall.uri}}/>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectKitchen, data: "KITCHEN"})}>
          {kitchen === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: kitchen.uri}}/>}
        </TouchableOpacity>
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

      <TouchableWithoutFeedback onPress={() => navigation.navigate("주소 입력")}>
        <View style={styles.addressButton}>
          <Text style={ route.params?.address? {color:"black"} : {color:"#8e8e8e"}}>{route.params?.address? route.params?.address: "주소 입력"}</Text>
        </View>
      </TouchableWithoutFeedback>

      <ShadowInput {...addressDetailInput} placeholder={"나머지 주소"} keyboardType="default" editable={!loading} textAlign={"left"}/>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업자등록증을 확인합니다</Text> 
      </View>
    
      <Text style={styles.warning}>영업 사실확인 용도로만 사용됩니다</Text> 
      
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectRegistration})}>
          {registration === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: registration.uri}}/>}
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
       <Text style={styles.title}>업종을 알려주세요</Text> 
      </View>
    
      <Text style={styles.warning}>일반/휴게 음식점만 등록할 수 있습니다</Text> 
      
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

      <View style={styles.textContainer}>
       <Text style={styles.title}>연락처를 알려주세요</Text> 
      </View>
    
      <Text style={styles.warning}>선정 결과는 문자로 안내해 드립니다</Text> 
      
      <ShadowInput {...contactInput} placeholder={"연락처"} keyboardType="numeric" editable={!loading} textAlign={'left'} blurOnSubmit={true}/>
    
      <BasicButton text={'제출하기'} onPress={handleCreateShop} disabled={exterior && hall && kitchen && registration && route.params?.address && addressDetailInput.value && contactInput.value ? loading : true} loading={loading} />
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
)};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffffff",
  },
  imageBox:{
    flexDirection:"row",
    justifyContent:"space-between",
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
    borderRadius:20,
    padding:10,
    borderWidth:1,
    borderColor:"#e7e7e7",
    justifyContent:'flex-start'
  },
  addressButton:{
    padding: 10,
    backgroundColor:"#ffffff",
    borderRadius:10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    lineHeight: 25,
    margin:3
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})