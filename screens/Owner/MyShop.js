import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons'; 
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import { MY_SHOP } from "./OwnerQueries";
import OwnerComponent from "../../components/Owner/OwnerComponent";
import Modal from "react-native-modal";
import Logo from "../../components/Custom/Logo";

export default ({ navigation, route }) => {
  const [visible, setVisible ] = React.useState(false);
  const { data, loading, error } = useQuery(MY_SHOP,{
    fetchPolicy:"network-only"
  });
  if(loading) return <Loader />
  if(error) return console.log("Owner Error",error);
  if(data?.myShop?.ownerState === 3){
    navigation.setOptions({
      headerTitle:() => null,
      headerLeft:() => <Text style={styles.headerTitle}>내 음식점 <Text style={styles.headerClassification}>{data?.myShop?.classification}음식점</Text></Text>,
      headerRight:() => (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}}/>
        </TouchableOpacity>
      )
    });
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
    {data?.myShop?.ownerState === 0 &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>심사 중</Text> 입니다</Text>
        
        <View style={styles.buttonBox}>
          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 보기",{
            id: "ckf23cjy16zop0a3581hz4o16",
            shopName:"내 가게",
            classification:"일반",
            isSelf:false, 
          })}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청서 보기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>신청서 보기</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 1 && (
      <>
        <Text style={styles.title}>죄송합니다. {`\n`}아쉽게도 사장님의 음식점은 <Text style={{color:"black"}}>{`\n`}푸드인사이드</Text>에 등록할 수 없습니다.</Text>
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 보기",{
            id: "ckf23cjy16zop0a3581hz4o16",
            shopName:"내 가게",
            classification:"일반",
            isSelf:false, 
          })}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청 하기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>다른 음식점 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 2 && (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>축하합니다. </Text>음식점을 등록해 주세요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 보기",{
            id: "ckf23cjy16zop0a3581hz4o16",
            shopName:"내 가게",
            classification:"일반",
            isSelf:false, 
          })}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("공간 완성")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 3 && (
        <OwnerComponent {...data?.myShop} />
    )}

    {data?.myShop === null &&  (
    <>
        <Text style={styles.title}>내 음식점도 <Text style={{color:"black"}}>공유 음식점</Text>이 될 수 있나요?</Text>
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 보기",{
            id: "ckf23cjy16zop0a3581hz4o16",
            shopName:"내 가게",
            classification:"일반",
            isSelf:false, 
          })}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청 하기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 신청</Text>
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
              navigation.navigate("공간 완성"),
              setVisible(false))}>
              <MaterialCommunityIcons name="square-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>정보수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
              <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.modalContent_bottom}>
        <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','공유 음식점을 삭제 하시겠습니까?',
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
            <MaterialCommunityIcons name="delete-empty-outline" size={25} color="red"/><Text style={styles.modalText_red}>공유 음식점 삭제</Text>
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
    headerTitle:{
      fontWeight:'bold',
      fontSize:20,
      alignSelf:"center",
      paddingLeft:10
    },
    headerClassification:{
      color:'#666',
      fontSize:10,
      marginLeft:12,
    },
    title:{
      fontSize:18,
      color:'#666',
      paddingBottom:50
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
});
