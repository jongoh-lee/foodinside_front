import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { MaterialCommunityIcons, FontAwesome, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import Loader from "../../components/Custom/Loader";
import { SEE_FULL_PROFILE } from "./VisitorQueries";
import BackArrow from "../../components/Custom/BackArrow";
import FranchiseComponent from "../../components/Franchise/FranchiseComponent";
import Modal from "react-native-modal";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const [seeFullProfile, setSeeFullProfile] = React.useState(route.params.seeFullProfile? route.params.seeFullProfile : { id: "ckdra85bd1gjw0a3557xq2hnc"})
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
    const { data, loading, error, refetch } = useQuery(SEE_FULL_PROFILE,{
        variables: {
            id: seeFullProfile.id
        },
        fetchPolicy:"network-only"
    });
    if(error) return console.log(error);

  return (
    <>
        <View style={styles.container}>
            {data?.seeFullProfile && (
                <FranchiseComponent {...data?.seeFullProfile}/>
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
                <TouchableOpacity style={styles.modalList}>
                    <MaterialCommunityIcons name="message-text-outline" color="#666" size={22}/><Text style={styles.modalText}>프랜차이즈 문의</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList}>
                    <MaterialCommunityIcons name="alarm-light-outline" size={25} color="red"/><Text style={styles.modalText_red}>신고 하기</Text>
                </TouchableOpacity>
            </View>
                  
            <View style={styles.modalContent_bottom}>
                <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                    <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
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
