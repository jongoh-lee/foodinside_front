import * as React from "react";
import {StyleSheet, KeyboardAvoidingView, View, Platform, Text, Image, ImageBackground,TouchableOpacity, Alert, SafeAreaView, ActivityIndicator} from "react-native";
import ShadowInput from "../../components/Custom/ShadowInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import axios from "axios";
import { ScrollView, TouchableWithoutFeedback, TextInput, } from "react-native-gesture-handler";
import { MaterialCommunityIcons, } from "@expo/vector-icons";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import Modal from "react-native-modal";
import ModalSubmenu from "../../components/Franchise/ModalSubmenu";
import ModalMemberInfo from "../../components/Franchise/ModalMemberInfo";
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CHECK_PROFILE_NAME, COMPLETE_PROFILE } from "./ProfileQueries";
import Caption from "../../components/Custom/Caption";
import { Switch } from 'react-native-paper';


export default ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  //myProfile data
  const [release, setRelease] = React.useState(route.params.myProfile.release? route.params.myProfile.release : false)
  const profileNameInput = useInput(route.params.myProfile.profileName? route.params.myProfile.profileName : "");
  const [sector, setSector] = React.useState(route.params.myProfile.sector? route.params.myProfile.sector : "");
  const [bank, setBank] = React.useState(route.params.myProfile.account? route.params.myProfile.account.bank : "");
  const accountNumberInput = useInput(route.params.myProfile.account? route.params.myProfile.account.accountNumber : "");

  const tokenInput = numInput(route.params.myProfile.token? String(route.params.myProfile.token) : "0");
  const contactInput = useInput(route.params.myProfile.contact? route.params.myProfile.contact : "");
  
  const [mainImage, setMainImage] = React.useState(route.params.myProfile.mainImage? route.params.myProfile.mainImage : null);
  const foodGuideInput = useInput(route.params.myProfile.foodGuide? route.params.myProfile.foodGuide : "");
  const originInput = useInput(route.params.myProfile.origin? route.params.myProfile.origin : "");
  const [mainMenuImage, setMainMenuImage] = React.useState(route.params.myProfile.menuImage);
  const fullPriceInput = numInput(route.params.myProfile.fullPrice? String(route.params.myProfile.fullPrice) : "");
  const salePriceInput = numInput(route.params.myProfile.salePrice? String(route.params.myProfile.salePrice) : "");
  const [founderImage, setFounderImage] = React.useState(route.params.myProfile.founderImage? route.params.myProfile.founderImage : null);
  //check profile name
  const { data, error, loading: checkNameLoading } = useQuery(CHECK_PROFILE_NAME,{
    variables:{
      profileName: profileNameInput.value
    },
    fetchPolicy:"network-only"
  });
  const [ alert, setAlert ] = React.useState("")

  const togglePublic = () => setRelease(!release);
  //ref
  const scrollViewRef1 = React.useRef();

  //1. 모든 메뉴 > 유저 눈에 보이는 부분
  const [submenus, setSubmenus] = React.useState(route.params.myProfile.submenus? route.params.myProfile.submenus : []);

  //2. 메뉴 선택
  const [chosenMenu, setChosenMenu] = React.useState(null);

  //3. 메뉴 추가 > New
  const [newMenus, setNewMenus] = React.useState([]);
  
  //4. 메뉴 수정 > Edit(메뉴 삭제 시 edit 목록에서 삭제)
  const [editMenus, setEditMenus] = React.useState([]);
  
  //메뉴 삭제 리스트 > new는 리스트에서 삭제 / 모든메뉴에서 삭제하고 edit 리스트에 있으면 삭제하고 delete 리스트에 추가
  const [deleteMenus, setDeleteMenus] = React.useState([]);
  
  const deleteMenu = ({ id, index }) => {
    if(id){
      setEditMenus(editMenus.filter(menu => menu.id !== id));
      setDeleteMenus(deleteMenus.concat({ id: id }));
      setSubmenus(submenus.filter(el => el.id !== id ))
    }else {
      delete newMenus[index]
      setNewMenus(newMenus.filter( el => el !== false));
    }
    setMenuModal(false);
  };
  //1. 모든 멤버
  const [members, setMembers] = React.useState(route.params.myProfile.members? route.params.myProfile.members : []);
  
  //2. 선택된 팀원
  const [chosenMember, setChosenMember] = React.useState(null);
  
  //3. 새로운 멤버
  const [newMembers, setNewMembers] = React.useState([]);
  
  //4. 멤버 수정
  const [editMembers, setEditMembers] = React.useState([]);
  
  //5. 멤버 삭제
  const [deleteMembers, setDeleteMembers] = React.useState([]);

  const deleteMember = ({ id, index}) => {
    if(id){
      setEditMembers(editMembers.filter(member => member.id !== id));
      setDeleteMembers(deleteMembers.concat({ id: id }));
      setMembers(members.filter(el => el.id !== id ))
    }else {
      delete newMembers[index];
      setNewMembers(newMembers.filter(el => el !== false));
    }
    setMemberModal(false);
  };

  // 메뉴 모달 > 수정/삭제
  const [menuModal, setMenuModal] = React.useState(false);

  // 메뉴 모달 > 완성
  const [completeMenuModal, setCompleteMenuModal] = React.useState(false);

  //팀원 모달
  const [memberModal, setMemberModal] = React.useState(false);

  //팀원 모달 > 팀원 완성
  const [editMemberModal, setEditMemberModal] = React.useState(false);

  // changImage hook
  const onSelectMainImage = (image) => {
    setMainImage(image.photo)
  };

  const onSelectFounderImage = (image) => {
    setFounderImage(image.photo)
  };

  const onSelectMainMenuImage = (image) => [
    setMainMenuImage(image.photo)
  ]

  const [ completeProfileMutation ] = useMutation(COMPLETE_PROFILE);
  
  const handleCompleteProfile = async () => {
    let _mainImage = [];
    let _founderImage = [];
    let _mainMenuImage = [];
    setLoading(true); 
      // 메인 이미지 수정
      if(mainImage.uri){
        const formMainImage = new FormData();
        formMainImage.append('file',{
          name: mainImage.filename,
          type: "image/jpeg",
          uri: mainImage.uri
        })
        const { 
          data : { location : locationMainImage } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formMainImage, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        _mainImage.push(locationMainImage[0])
      }

      //메인메뉴 이미지 수정
      if(mainMenuImage.uri){
        const formMainMenuImage = new FormData();
        formMainMenuImage.append('file',{
          name: mainMenuImage.filename,
          type: "image/jpeg",
          uri: mainMenuImage.uri
        })
        const { 
          data : { location : locationMainMenuImage } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formMainMenuImage, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        _mainMenuImage.push(locationMainMenuImage[0])
      }
      
      // 새 메뉴 만들기
      if(newMenus.length > 0){
        const formNewMenus = new FormData();
        for (var i = 0; i < newMenus.length; i++) {
          formNewMenus.append('file', {
              name: newMenus[i].menuImage.filename,
              type: "image/jpeg",
              uri: newMenus[i].menuImage.uri
          });
        }
        
        const { 
          data : { location : locationNewMenuImages } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formNewMenus, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        for (var i = 0; i < locationNewMenuImages.length; i++) {
          newMenus[i].menuImage = locationNewMenuImages[i].url
        }
      }
      
      //메뉴 수정
      if(editMenus.length > 0){
        const formEditMenus = new FormData();
        for (var i = 0; i < editMenus.length; i++) {
          formEditMenus.append('file', {
              name: editMenus[i].menuImage.filename,
              type: "image/jpeg",
              uri: editMenus[i].menuImage.uri
          });
        }
        const { 
          data : { location : locationEditMenuImages } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formEditMenus, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        for (var i = 0; i < locationEditMenuImages.length; i++) {
          editMenus[i].menuImage = locationEditMenuImages[i].url
        }
      }

      //사장님 사진
      if(founderImage.uri){
        const formFounder = new FormData();
        formFounder.append('file',{
          name: founderImage.filename,
          type: "image/jpeg",
          uri: founderImage.uri
        });
        const { 
          data : { location : locationFounder } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formFounder, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        _founderImage.push(locationFounder[0]);
      }
      
      //새 팀원
      if(newMembers.length > 0){
        const formNewMembers = new FormData();
        for (var i = 0; i < newMembers.length; i++) {
          formNewMembers.append('file', {
            name: newMembers[i].image.filename,
            type: "image/jpeg",
            uri: newMembers[i].image.uri
          });
        }
        const { 
          data : { location : locationNewMembers } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formNewMembers, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        for (var i = 0; i < locationNewMembers.length; i++) {
          newMembers[i].image = locationNewMembers[i].url
        }
      }
      
      //팀원 수정
      if(editMembers.length > 0){
        const formEditMembers = new FormData();
        for (var i = 0; i < editMembers.length; i++) {
          formEditMembers.append('file', {
              name: editMembers[i].image.filename,
              type: "image/jpeg",
              uri: editMembers[i].image.uri
            });
        }
        const { 
          data : { location : locationEditMembers } 
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formEditMembers, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });
        for (var i = 0; i < locationEditMembers.length; i++) {
          editMembers[i].image = locationEditMembers[i].url
        }
      }
      try{
        const {
          data : { completeProfile }
        } = await completeProfileMutation({
          variables:{
            release: Boolean(release),
            profileName: profileNameInput.value,
            sector: sector,
            token: Number(tokenInput.value),
            contact: contactInput.value,
            mainImage: mainImage?.uri ? _mainImage[0].url : mainImage,
            foodGuide: foodGuideInput.value,
            origin: originInput.value,
            menuImage: mainMenuImage?.uri ? _mainMenuImage[0].url : mainMenuImage,
            fullPrice: Number(fullPriceInput.value),
            salePrice: Number(salePriceInput.value),
            createMenus: [...newMenus],
            editMenus: [...editMenus],
            deleteMenus: [...deleteMenus],
            founderImage: founderImage?.uri ? _founderImage[0].url : founderImage,
            createMembers: [...newMembers],
            editMembers: [...editMembers],
            deleteMembers: [...deleteMembers],
            profileState: 3,
            updateAccount: route.params.myProfile.account ? {
              id: route.params.myProfile.account.id,
              bank: bank,
              accountNumber: accountNumberInput.value
            } : null
          }
        });
      if(completeProfile){
        navigation.goBack()
      }
    } catch(e){
      console.log("프로필 생성 에러", e);
    } finally {
      setLoading(false)
    }
  };

  React.useEffect(() => {
    if(profileNameInput.value.length === 0){
      setAlert(0);
    }else{
      if(profileNameInput.value === route.params.myProfile.profileName){
        setAlert(null)
      }else{
        // 1 = 사용 가능 , 2 = 사용 할 수 없습니다.
        data?.checkProfileName ? setAlert(1) : setAlert(2)
      }
    }

  },[data, profileNameInput.value])

  return (
  <>
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, justifyContent:"center"}}
      keyboardVerticalOffset={50}
      enabled >
      <ScrollView contentContainerStyle={{padding:15}}>
        <View style={[{paddingBottom:15}, Platform.OS === 'ios' ? { zIndex:5 } : null]}>
          <Text style={[styles.title, {paddingVertical:10}]}>업체 정보 </Text>
          
          {/* 프로필 공개 설정 추가, 기본 비공개 */}
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingBottom: 1}}>
            <Text style={styles.subTitle}>공개 설정:  {release ? <Text style={{color:"#666", fontWeight:"600"}}>공개</Text> : <Text style={{color:"#666", fontWeight:"600"}}>비공개</Text>}</Text>
            <Switch disabled={loading} color="#05e6f4" value={release} onValueChange={togglePublic}/>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", paddingBottom: 1}}>
            <Text style={styles.subTitle}>업체명: </Text>
            <ShadowInput {...profileNameInput} placeholder={'업체명'} width={'80%'} textAlign={'left'} editable={!loading} returnKeyType={'done'}/>
          </View>
          {checkNameLoading ? <View style={{width:100, backgroundColor:"#E0E0E0", borderRadius: 10, padding:7}}/> : (alert === null ? <Text style={{fontSize:10, lineHeight:14}} /> : alert === 0 ? <Text style={{fontSize:10, color: "#e0383e", lineHeight:14}}>1글자 이상의 한글, 영문, 숫자, 특수기호를 사용해 주세요</Text> : alert === 1 ? <Text style={{fontSize:10, color: "green", lineHeight:14}}>사용할 수 있습니다.</Text> : <Text style={{fontSize:10, color: "#e0383e", lineHeight:14}}>사용할 수 없습니다.</Text>)}

          <View style={[{flexDirection:"row", alignItems:"center"}, Platform.OS === 'ios' ? { zIndex:4 } : null]}>
            <Text style={styles.subTitle}>세부 업종: </Text>
            <DropDownPicker
                placeholder={'업종'}
                defaultValue={sector}
                disabled={loading}
                items={[
                    {label: '한식', value: '한식'},
                    {label: '중식', value: '중식'},
                    {label: '일식', value: '일식'},
                    {label: '서양식', value: '서양식'},
                    {label: '기타 외국식', value: '기타 외국식'},
                    {label: '패스트푸드', value: '패스트푸드'},
                    {label: '치킨전문점', value: '치킨전문점'},
                    {label: '분식 및 김밥', value: '분식 및 김밥'},
                    {label: '주점', value: '주점'},
                    {label: '비알콜 음료점', value: '비알콜 음료점'},
                    {label: '그외 기타', value: '그외 기타'},
                ]}
                onChangeItem={item => setSector(item.value)}
                dropDownStyle={{backgroundColor: '#ffffff',}}
                containerStyle={[styles.shadowBox, {height: Platform.OS === 'ios' ? 35 : 40}]}
                style={{
                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  borderWidth:0,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.20,
                  shadowRadius: 1.41,
                  elevation: 2,
              }}
              contentContainerStyle={{backgroundColor: '#ffffff', zIndex:9000}}
              itemStyle={{
                  justifyContent: 'flex-start',
              }}
              dropDownMaxHeight={105}
            />
          </View>
          
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.subTitle}>리뷰가 좋아요를 받으면 발행하는 암호화폐: </Text>
            <ShadowInput {...tokenInput} placeholder={'암호화폐'} width={'20%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} keyboardType={"number-pad"}/>
          </View>

          <View style={{flexDirection:"row", alignItems:"center", zIndex: -1}}>
            <Text style={styles.subTitle}>연락처: </Text>
            <ShadowInput {...contactInput} placeholder={'연락처'} width={'50%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} keyboardType={"number-pad"}/>
          </View>

          {bank ? 
          (<View style={[{flexDirection:"row", alignItems:"center"}, Platform.OS === 'ios' ? { zIndex:3 } : null]}>
            <Text style={styles.subTitle}>입금 계좌: </Text>
            <DropDownPicker
                placeholder={'은행'}
                defaultValue={bank}
                disabled={loading}
                items={[
                    {label: '카카오뱅크', value: '카카오뱅크'},
                    {label: '케이뱅크', value: '케이뱅크'},
                    {label: '기업은행', value: '기업은행'},
                    {label: '국민은행', value: '국민은행'},
                    {label: '우리은행', value: '우리은행'},
                    {label: '신한은행', value: '신한은행'},
                    {label: '하나은행', value: '하나은행'},
                    {label: '농협은행', value: '농협은행'},
                    {label: '지역농축협', value: '지역농축협'},
                    {label: 'SC은행', value: 'SC은행'},
                    {label: '한국씨티은행', value: '한국씨티은행'},
                    {label: '우체국', value: '우체국'},
                    {label: '경남은행', value: '경남은행'},
                    {label: '광주은행', value: '광주은행'},
                    {label: '대구은행', value: '대구은행'},
                    {label: '도이치', value: '도이치'},
                    {label: '부산은행', value: '부산은행'},
                    {label: '산림조합', value: '산림조합'},
                    {label: '산업은행', value: '산업은행'},
                    {label: '저축은행', value: '저축은행'},
                    {label: '새마을금고', value: '새마을금고'},
                    {label: '수협', value: '수협'},
                    {label: '신협', value: '신협'},
                    {label: '전북은행', value: '전북은행'},
                    {label: '제주은행', value: '제주은행'},
                    {label: 'BOA', value: 'BOA'},
                    {label: 'HSBC', value: 'HSBC'},
                    {label: 'JP모간', value: 'JP모간'},
                    {label: '중국공산은행', value: '중국공산은행'},
                    {label: '비엔피파리바은행', value: '비엔피파리바은행'},
                    {label: '중국건설은행', value: '중국건설은행'},
                    {label: '국세', value: '국세'},
                    {label: '지방세입', value: '지방세입'},
                ]}
                onChangeItem={item => setBank(item.value)}
                dropDownStyle={{backgroundColor: '#ffffff'}}
                containerStyle={[styles.shadowBox, {width:120, height: Platform.OS === 'ios' ? 35 : 40}]}
                style={{
                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  borderWidth:0,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.20,
                  shadowRadius: 1.41,
                  elevation: 2,
              }}
              contentContainerStyle={{backgroundColor: '#ffffff'}}
              itemStyle={{
                  justifyContent: 'flex-start',
              }}
              zIndex={3000}
            />
            <ShadowInput {...accountNumberInput} placeholder={'입금 계좌'} width={'45%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} keyboardType={"number-pad"}/>
          </View> ) : null}
          
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title}>대표 이미지</Text>

          <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
              navigation.navigate('SelectMainPhoto', {
                onSelect : onSelectMainImage
              })
            )}>
            <MaterialCommunityIcons
              name="camera"
              size={20}
              color="#666"
              style={{
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:5
              }}
              />
            <Text style={{color:'#666'}}>사진 선택</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.innerBox}>
            <ImageBackground style={{width:'100%', height:constants.height / 4, alignItems:"center", justifyContent:"center", backgroundColor:'#e0e0e0'}} source={mainImage?.uri? {uri:mainImage.uri} : {uri: mainImage}}>
              {mainImage === null? <Text style={{color:'rgba(255,255,255, .6)', fontSize:24}}>이미지가 없습니다</Text> : null }
            </ImageBackground>
          </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title} numberOfLines={1}>메뉴 정보 <Caption style={{fontSize:10}}>왼쪽은 정상가, 오른쪽은 단골 할인가 입니다.</Caption></Text>
          <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
              setCompleteMenuModal(true),
              setChosenMenu({id:new Date().valueOf()})
            )}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color="#666"
              style={{
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:5
              }}
              />
            <Text style={{color:'#666'}}>메뉴 추가</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.imageRoll}>
          <ScrollView 
            ref={scrollViewRef1}
            onContentSizeChange={()=>{        
                scrollViewRef1.current.scrollToEnd({ animated: true });
            }}
            scrollEventThrottle={1} 
            contentContainerStyle={{flexGrow:1}}
            showsHorizontalScrollIndicator={false} 
            horizontal
            >

            <View style={styles.menuContainer}>
              <Text style={styles.menuName} numberOfLines={1}>{route.params.myProfile.menuName}</Text>
              <TouchableOpacity onPress={() => (
                navigation.navigate('SelectPhoto', {
                  onSelect : onSelectMainMenuImage
                })
              )} disabled={loading}>
                <Image style={styles.menuImage} source={mainMenuImage?.uri? {uri:mainMenuImage.uri} : {uri: mainMenuImage}}/>
              </TouchableOpacity>
              <View style={styles.priceBox}>
                <TextInput style={{borderBottomWidth:1, width:'40%', textAlign:"center",}} editable={!loading} value={fullPriceInput.value} onChangeText={fullPriceInput.onChange} placeholder={"정상가"} keyboardType={"number-pad"} returnKeyType={"default"}/>
                <TextInput style={{borderBottomWidth:1, width:'40%', textAlign:"center",}} editable={!loading} value={salePriceInput.value} onChangeText={salePriceInput.onChange} placeholder={"할인가"} keyboardType={"number-pad"} returnKeyType={"default"}/>
              </View>
            </View>
            
            {submenus && submenus.map((menu) => (
            <TouchableOpacity key={menu.id} onPress={() => (
              setMenuModal(true),
              setChosenMenu(menu)
              )} disabled={loading}>
              <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}>{menu.menuName}</Text>
                <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>
                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                    <Text style={styles.salePrice}>{menu.salePrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
            ))}

            {newMenus && newMenus.map((menu, index) => (
            <TouchableOpacity key={index} onPress={() => (
              setMenuModal(true),
              setChosenMenu({...menu, index})
              )} disabled={loading}>
              <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}><Text style={{fontSize:10, color:'red'}}>New </Text>{menu.menuName}</Text>
                <Image style={styles.menuImage} source={menu?.menuImage?.uri? {uri:menu.menuImage.uri} : {uri:menu.menuImage}}/>
                <View style={styles.priceBox}>
                  <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                  <Text style={styles.salePrice}>{menu.salePrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

          <View style={{paddingBottom:15}}>
            <Text style={[styles.subTitle,{padding:10}]}>푸드 가이드</Text>
            <ShadowInput {...foodGuideInput} placeholder={'푸드 가이드'} editable={!loading} blurOnSubmit={false} width={'100%'} multiline={true} returnKeyType={'none'} textAlign={'left'} textAlignVertical={'top'}/>
            <Text style={[styles.subTitle,{padding:10}]}>식재료 원산지</Text>
            <ShadowInput {...originInput} placeholder={'원산지'} editable={!loading} blurOnSubmit={false} width={'100%'} multiline={true} returnKeyType={'none'} textAlign={'left'} textAlignVertical={'top'}/>
          </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title}>팀원 정보</Text>
          <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
            setEditMemberModal(true),
            setChosenMember({id:new Date().valueOf()})
            )}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color="#666"
              style={{
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:5
              }}
              />
            <Text style={{color:'#666'}}>팀원 추가</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.innerBox}>
            <View style={styles.memberContainer}>

                <View style={styles.card}>
                    <View style={styles.member}>
                      <TouchableOpacity onPress={() => (
                        navigation.navigate('SelectMemberPhoto', {
                          onSelect : onSelectFounderImage
                        })
                      )} disabled={loading}>
                        {founderImage? (
                          <Image style={styles.image} source={founderImage?.uri? {uri: founderImage.uri} : {uri: founderImage}} />
                        ) : (
                          <View style={[styles.image, {backgroundColor:'#e0e0e0', justifyContent:"center", alignItems:"center"}]}>
                            <MaterialCommunityIcons
                              name="camera"
                              size={40}
                              color="#ffffff"
                              style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight:5
                              }}
                            />
                          </View>)}
                      </TouchableOpacity>
                        <View style={styles.position}>
                            <Text style={styles.text} numberOfLines={1}>{route.params.myProfile.user.username} <Caption>사장님</Caption></Text>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                        <View style={styles.careerBox}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.careerText}>{route.params.myProfile.career}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>

              {members && members.map((member) => 
              <TouchableOpacity key={member.id} disabled={loading} onPress={() => (
                setMemberModal(true),
                setChosenMember(member)
                )}>
                <View style={styles.card}>
                    <View style={styles.member}>
                        <Image style={styles.image} source={{uri:member.image}} />

                        <View style={styles.position}>
                            <Text style={styles.text} numberOfLines={1}>{member.name} <Caption>{member.position}</Caption></Text>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                        <View style={styles.careerBox}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.careerText}>{member.career}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>)}

              {newMembers && newMembers.map((member, index) => 
              <TouchableOpacity key={index} disabled={loading} onPress={() => (
                setMemberModal(true),
                setChosenMember({...member, index})
                )}>
                <View style={styles.card}>
                    <View style={styles.member}>
                        <Image style={styles.image} source={member?.image?.uri? {uri:member.image.uri}:{uri:member.image}} />

                        <View style={styles.position}>
                            <Text style={styles.text} numberOfLines={1}>{member.name} <Caption>{member.position}</Caption></Text>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                        <View style={styles.careerBox}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.careerText}>{member.career}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>)}
            </View>
          </View>

          <BasicButton text={'제출하기'} onPress={() => handleCompleteProfile()} marginVertical={10} loading={loading} disabled={profileNameInput.value && sector && tokenInput.value && mainImage && foodGuideInput.value && originInput.value && fullPriceInput.value && salePriceInput.value && founderImage? loading : true}/>
        </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>    
  
    <Modal
      isVisible={menuModal}
      onBackdropPress={() => setMenuModal(false)}
      onSwipeComplete={() => setMenuModal(false)}
      onBackButtonPress={() => setMenuModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.6}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{flex:1, justifyContent:"center", alignItems:"center"}}
      >
      <View style={styles.content}>
        <TouchableOpacity style={styles.modalList} onPress={()=> (
            setMenuModal(false),
            setCompleteMenuModal(true)
            )}>
            <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>메뉴 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','선택한 메뉴가 삭제됩니다.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {text: '확인',
              onPress: () => deleteMenu(chosenMenu),
            },
            ],
            {cancelable: true},
          )}>
            <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" /><Text style={[styles.modalText, {color:'red'}]}>메뉴 삭제</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    <Modal
      isVisible={completeMenuModal}
      onBackdropPress={() => setCompleteMenuModal(false)}
      onSwipeComplete={() => setCompleteMenuModal(false)}
      onBackButtonPress={() => setCompleteMenuModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.5}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{flex:1, justifyContent:"center", alignItems:"center"}}
      coverScreen={false}
      >
        <ModalSubmenu chosenMenu={chosenMenu} submenus={submenus} setSubmenus={setSubmenus} newMenus={newMenus} editMenus={editMenus} setNewMenus={setNewMenus} setEditMenus={setEditMenus} setCompleteMenuModal={setCompleteMenuModal}/>
    </Modal>
    

    <Modal
      isVisible={memberModal}
      onBackdropPress={() => setMemberModal(false)}
      onSwipeComplete={() => setMemberModal(false)}
      onBackButtonPress={() => setMemberModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.6}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      >
      <View style={styles.content}>
        <TouchableOpacity style={styles.modalList} onPress={()=> (
            setMemberModal(false),
            setEditMemberModal(true)
            )}>
            <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>정보 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','선택한 팀원이 사라집니다.',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {text: '확인',
            onPress: () => deleteMember(chosenMember),
          },
          ],
          {cancelable: true},
          )}>
          <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" /><Text style={[styles.modalText, {color:'red'}]}>멤버 삭제</Text>
          </TouchableOpacity>
      </View>
    </Modal>

    <Modal
      isVisible={editMemberModal}
      onBackdropPress={() => setEditMemberModal(false)}
      onSwipeComplete={() => setEditMemberModal(false)}
      onBackButtonPress={() => setEditMemberModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.5}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      coverScreen={false}
      >
        <ModalMemberInfo chosenMember={chosenMember} members={members} setMembers={setMembers} newMembers={newMembers} editMembers={editMembers} setNewMembers={setNewMembers} setEditMembers={setEditMembers} setEditMemberModal={setEditMemberModal}/>
    </Modal>
  </>
)};


const WIDTH = constants.width - 30;
const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
  },
  innerBox:{
    marginBottom:15
  },
  save:{
    paddingHorizontal:5
  },
  saveText:{
    color:'#05e6f4',
    fontSize:16,
  },
  title:{
    fontSize:16,
    fontWeight:"bold"
  },
  subTitle:{
    fontWeight:'bold',
    fontSize:14,
  },
  shadowBox:{
    margin:5,
    width:150,
  },

  //메뉴 스크롤
  menuContainer:{
    width: WIDTH /3,
    marginRight:5,
    alignItems:"center"
  },
  imageRoll:{
    flexDirection:"row", 
    width:'100%', 
    padding:5,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:'#e0e0e0',
    borderStyle:'dashed',
    borderRadius:10,
  },
  menuImage:{
    width: WIDTH /3,
    height: WIDTH / 3,
    resizeMode:"cover",
    borderRadius: 15,
  },
  menuName:{
    paddingVertical:5,
  },
  priceBox:{
    flexDirection:"row",
    width: WIDTH /3,
    padding:3,
    justifyContent:"space-between",
  },
  fullPrice:{
    width:'50%',
    textDecorationLine:"line-through",
    justifyContent:"flex-start",
    color:'#666',
    textAlignVertical:"center",
    alignSelf:"center",
    fontSize:14,
  },
  salePrice:{
    width:'50%',
    fontSize:14,
    textAlignVertical:"center",
    textAlign:"right",
    alignSelf:"center",
    marginRight:5,
    lineHeight:25,
  },

  //팀원 스크롤
  memberContainer:{
    padding:5
  },
  card:{
    flexDirection:"row",
    paddingTop:10
  },
  member:{
    width: WIDTH / 3,
    alignItems:"center"
  },
  image:{
    width: WIDTH / 3,
    height: WIDTH / 2.5,
    resizeMode:"cover",
    borderRadius:10
  },
  position:{
    flexDirection:"row",
    marginVertical:5,
    alignItems:"baseline"
  },
  text:{
    fontSize:14
  },
  careerBox:{
    marginHorizontal:20,
    height: WIDTH / 3.5,
  },
  careerText:{
    fontSize:13,
    color:"#666",
  },

  //모달
  content: {
    width:WIDTH / 2,
    backgroundColor: '#ffffff',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalList:{
    width:'100%',
    paddingVertical:10,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"center"
  },
  modalText:{
    fontSize:14,
    marginLeft:10
  },
});
