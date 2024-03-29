import * as React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, Alert} from "react-native";
import { TouchableWithoutFeedback, } from "react-native-gesture-handler";
import constants from "../../constants";
import { Entypo, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import { MY_PROFILE } from "./ProfileQueries";
import FranchiseComponent from "../../components/Franchise/FranchiseComponent";
import Modal from "react-native-modal";
import Logo from "../../components/Custom/Logo";

export default ({ navigation }) => {
  const [visible, setVisible ] = React.useState(false);
  const { data, loading, error, refetch } = useQuery(MY_PROFILE,{
    fetchPolicy:"network-only",
    pollInterval: 1800000,
  });
  if(loading) return <Loader />;

  if(data?.myProfile?.profileState === 3){
    navigation.setOptions({
      headerTitle:() => null,
      headerLeft:() => <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{data?.myProfile?.profileName} <Text style={styles.headerSector}>{data?.myProfile?.sector}</Text></Text>,
      headerRight:() => (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}}/>
        </TouchableOpacity>
      )
    })
  }else{
    navigation.setOptions({
      headerLeft:() => null,
      headerRight:() => null,
      headerTitle:() => <Logo />
    })
  }

  return (
    <>
    <View style={styles.container}>
    {data?.myProfile?.profileState === 0 &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>검토 중</Text> 입니다</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("심사 중")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>메뉴 보기</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
      )}

    {data?.myProfile?.profileState === 1 &&  (
      <>
        <Text style={styles.title}>메뉴를 <Text style={{color:"black"}}>보완해</Text> 주세요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 수정(pre)",{
            myProfile:data.myProfile
            })}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>다시 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
      )}

    {data?.myProfile?.profileState === 2 && (
      <>
        <Text style={styles.title}>내 <Text style={{color:"black"}}>음식점을</Text> 완성하세요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={()=> navigation.navigate("프로필 보기", {seeFullProfile : {
                        id: "ckg3od2mg00y70764juta30nv",
                        profileName: "업체 정보",
                        sector: "비알콜 음료점",
                        isSelf:false
                    }})}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="silverware-clean" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>완성 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 완성", {myProfile: data?.myProfile})}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>완성 하기</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myProfile?.profileState === 3 && (
        <FranchiseComponent {...data?.myProfile} visible={visible} setVisible={setVisible} refetch={refetch}/>
    )}

    {data?.myProfile === null &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>푸드인사이드 </Text>입점하기!</Text>
        
        <View style={styles.buttonBox}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 신청")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>메뉴 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}
    </View>

    <Modal
    isVisible={visible}
    onBackdropPress={() => setVisible(false)}
    onSwipeComplete={() => setVisible(false)}
    onBackButtonPress={() => setVisible(false)}
    swipeDirection={'down'}
    style={styles.modal}
    backdropOpacity={.4}
    >
      <View style={styles.modalContent_top}>
          <MaterialCommunityIcons name="chevron-down" size={26} color="#666" style={{alignSelf:"center"}} />
          <TouchableOpacity style={styles.modalList} onPress={()=> (
              navigation.navigate("프로필 완성", {
                myProfile: { ...data?.myProfile }
              }),
              setVisible(false))}>
              <MaterialCommunityIcons name="square-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>정보수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
              <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.modalContent_bottom}>
        <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','프로필을 삭제 하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {text: '확인',
            onPress: () => Alert.alert("알림", "홈페이지를 통해 문의해 주세요\nwww.foodinside.net", [{ text: "확인" }]),
          },
          ],
          {cancelable: true},
          )}>
            <MaterialCommunityIcons name="delete-empty-outline" size={25} color="red"/><Text style={styles.modalText_red}>프로필 삭제</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    
  </>
)};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
  },
  //프로필 완성
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
    alignSelf:"center",
    paddingLeft:10
  },
  headerSector:{
    color:'#666',
    fontSize:10,
    marginLeft:12,
  },

  //프로필 완성 전
  title:{
    fontSize:20,
    color:'#666',
    paddingBottom:50,
    lineHeight: 30
  },
  buttonBox:{
    flexDirection:"row",
    width:'100%',
    justifyContent:"space-around",
    alignItems:"center"
  },
  button:{
    width:constants.width * .2,
    height: constants.width * .2,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: constants.width * .1,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    backgroundColor:'white'
  },
  buttonText:{
      alignSelf:"center",
      paddingTop:10,
      color:'rgba(0,0,0, .6)'
  },

  //modal
  modal:{
    justifyContent:"flex-end",
    margin:0,
    paddingHorizontal:5
  },
  modalContent_top:{
      backgroundColor: 'white',
      paddingHorizontal: 22,
      borderRadius: 15,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom:20,
      marginBottom:10
  },
  modalContent_bottom:{
    backgroundColor: 'white',
    paddingHorizontal: 22,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical:10,
    marginBottom:10
},
  modalList:{
      width:'100%',
      paddingVertical:10,
      flexDirection:'row',
      alignItems:"center",
  },
  modalText:{
      fontSize:14,
      marginLeft:10
  },
  modalText_red:{
    fontSize:14,
    marginLeft:10,
    color:'red'
  }
})
