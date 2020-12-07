import React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Alert, } from "react-native";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons'; 
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import OwnerComponent from "../../components/Owner/OwnerComponent";
import { SEE_FULL_SHOP, TOGGLE_FAVORITE } from "./ProfileQueries";
import Modal from "react-native-modal";
import ScreenLoader from "../../components/Custom/ScreenLoader";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const { data, loading, error, refetch } = useQuery(SEE_FULL_SHOP,{
      variables:{
        id: route.params.id
      },
      fetchPolicy:"cache-and-network"
    });
    navigation.setOptions({
        headerTitle:() => <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{route.params.shopName} <Text style={styles.headerClassification}>{route.params.classification}음식점</Text></Text>,
        headerRight:() => (
          route.params.isSelf? <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}} color={'white'}/> : (
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}} color={'black'}/>
            </TouchableOpacity>
          )
        ),
    });
    const [toggleFavoriteMutation, {loading: mutationLoading}] = useMutation(TOGGLE_FAVORITE,{
      variables:{
        id: route.params.id
      },
      refetchQueries:[`myFavorite`]
    })
    const handleFavorite = async () => {
      setVisible(false)
      try{
        const { 
          data : { toggleFavorite } 
      } = await toggleFavoriteMutation();
      if(!toggleFavorite){
        Alert.alert(
          '알림',
          "프로필을 등록해 주세요",[
          { text: '확인'}
          ]
        )
      }
      }catch(e){
        console.log("즐겨찾기 추가 에러",e);
      }
    }
    return (
      <>
        {loading || mutationLoading? <ScreenLoader/> : null}
        <View style={styles.container}>
          {data?.seeFullShop && (
            <OwnerComponent {...data?.seeFullShop} refetch={refetch}/>
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
              <TouchableOpacity style={styles.modalList} onPress={() => handleFavorite()}>
                  <MaterialCommunityIcons name="message-text-outline" color="#666" size={22}/><Text style={styles.modalText}>즐겨찾기 추가/삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                  <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
              </TouchableOpacity>
          </View>
                
          <View style={styles.modalContent_bottom}>
              <TouchableOpacity style={styles.modalList} onPress={()=> Alert.alert('안내','신고가 접수되었습니다.',
                  [{
                      text: '확인',
                      onPress: () => setVisible(false),
                  }]
              )}>
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
      justifyContent:"center",
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
});

