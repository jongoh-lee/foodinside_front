import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image, Alert} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { MaterialCommunityIcons, FontAwesome, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import Loader from "../../components/Custom/Loader";
import { SEE_FULL_PROFILE } from "./VisitorQueries";
import BackArrow from "../../components/Custom/BackArrow";
import FranchiseComponent from "../../components/Franchise/FranchiseComponent";
import Modal from "react-native-modal";
import ScreenLoader from "../../components/Custom/ScreenLoader";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const [seeFullProfile, setSeeFullProfile] = React.useState(route.params.seeFullProfile? route.params.seeFullProfile : { id: "ckdra85bd1gjw0a3557xq2hnc"})
    const { data, loading, refetch } = useQuery(SEE_FULL_PROFILE,{
        variables: {
            id: seeFullProfile.id
        },
        fetchPolicy:"cache-and-network"
    });

    navigation.setOptions({
        headerTitle:() => <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{seeFullProfile.profileName} <Text style={styles.headerSector}>{seeFullProfile.sector}</Text></Text>,
        headerRight:() => (
          route.params.seeFullProfile.isSelf? <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}} color={'white'}/> : (
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}} color={'black'}/>
            </TouchableOpacity>
          )
        )
    });

  return (
    <>
    {loading?<ScreenLoader /> : null}
        <View style={styles.container}>
            {data?.seeFullProfile && (
                <FranchiseComponent {...data?.seeFullProfile} refetch={refetch}/>
            )}
            <View style={{position:"absolute", bottom:20, right:20, justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity style={{ 
                    width:70, 
                    height:70, 
                    borderRadius:35,
                    backgroundColor:"rgba(255, 255, 255, .8)",
                    justifyContent:'center',
                    alignItems:'center',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2}} 
                    onPress={()=> Alert.alert('알림', '영업 준비중 입니다', [{text: '확인'}])}>
                    <Image style={{width:40, height:40, opacity:.8}} source={require('../../assets/Icons/foodDelivery_1.png')}/>
                    <Text style={{fontSize:10, fontWeight:"bold", alignSelf:"center"}}>주문하기</Text>
                </TouchableOpacity>
            </View>
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
                <TouchableOpacity style={styles.modalList} onPress={()=> Alert.alert('안내','정식 버전을 기대해 주세요',
                    [{
                        text: '확인',
                        onPress: () => setVisible(false),
                    }]
                )}>
                    <MaterialCommunityIcons name="message-text-outline" color="#666" size={22}/><Text style={styles.modalText}>프랜차이즈 문의</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                    <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
                </TouchableOpacity>
            </View>
                  
            <View style={styles.modalContent_bottom}>
                <TouchableOpacity style={styles.modalList}>
                    <MaterialCommunityIcons name="alarm-light-outline" size={25} color="red"/><Text style={styles.modalText_red}>위생 신고 하기</Text>
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
    //헤더
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
},


})
