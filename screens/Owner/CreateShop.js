import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import { RadioButton, } from "react-native-paper";
import BasicInput from "../../components/Custom/BasicInput";
import { AntDesign } from '@expo/vector-icons'; 
import useInput from "../../hooks/strickInput";
import numInput from "../../hooks/numInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_SHOP, CHECK_SHOP } from "./OwnerQueries";

export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [ exterior, setExterior] = React.useState(null);
  const [ hall, setHall] = React.useState(null);
  const [ kitchen, setKitchen] = React.useState(null);
  const addressInput = useInput('');
  const [registration, setRegistration] = React.useState(null);
  const [classification, setClassification] = React.useState("일반");
  const contactInput = numInput('');
  const onSelectExterior = ({ photo, data }) => {
    setExterior({ url: photo.uri, type: data});
  };
  const onSelectHall = ({ photo, data }) => {
    setHall({ url: photo.uri, type: data});
  };
  const onSelectKitchen = ({ photo, data }) => {
    setKitchen({ url: photo.uri, type: data});
  };
  const onSelectRegistration = ({ photo }) => {
    setRegistration(photo.uri);
  };

  const [createShopMutation] = useMutation(CREATE_SHOP,{
    update(cache, {data: { createShop }}) {
      cache.writeQuery({
        query: CHECK_SHOP,
        data: { myShop: {
          __typename: "Owner",
         id:createShop.id,
         ownerState:createShop.ownerState,
        } },
      });
    }
  });
  const [shopImages, setShopImages] = React.useState([]);
  const handleCreateShop = async () => {
    setShopImages(shopImages.push(exterior, hall, kitchen));
    try {
      setLoading(true);
      const {
        data : { createShop }
      } = await createShopMutation({
        variables:{
            shopImages: shopImages,
            address: addressInput.value,
            registration: registration,
            classification: classification,
            contact:String(contactInput.value),
            ownerState:1
        }
      });
      if(createShop){
        navigation.navigate("신청 전");
      }
    } catch(e){
      console.log("가게 신청 에러:",e)
    } finally {
      setLoading(false);
    }
  }
  return (
  <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>내 가게가 공유 음식점이 될 수 있나요?</Text>
      </View>
      <Text style={styles.warning}>가게 사진을 제출해주세요, 선정 결과는 이메일/문자로 알려드립니다</Text> 
    
      <View style={styles.imageBox}>
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectExterior, data: "EXTERIOR"})}>
          {exterior === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: exterior.url}}/>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectHall, data: "HALL"})}>
          {hall === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: hall.url}}/>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectKitchen, data: "KITCHEN"})}>
          {kitchen === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: kitchen.url}}/>}
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

      <BasicInput {...addressInput} placeholder={"음식점 위치"} keyboardType="default" editable={!loading}/>

      <View style={styles.textContainer}>
       <Text style={styles.title}>사업자등록증을 확인합니다</Text> 
      </View>
    
      <Text style={styles.warning}>영업 사실확인 용도로만 사용됩니다</Text> 
      
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.imageInput} onPress={()=> navigation.navigate("SelectPhoto", {onSelect: onSelectRegistration})}>
          {registration === null? <AntDesign name="plus" size={30} color="black" /> : <Image style={styles.image} source={{uri: registration}}/>}
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
      
      <BasicInput {...contactInput} placeholder={"연락처"} keyboardType="numeric" editable={!loading}/>
    
      <BasicButton text={'제출하기'} onPress={handleCreateShop} disabled={exterior && hall && kitchen && registration && addressInput.value && contactInput.value ? false : true} loading={loading} />
    </ScrollView>
  </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:20,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems:"center"
  },
})