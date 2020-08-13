import * as React from "react";
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { MaterialCommunityIcons, FontAwesome, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 
import Loader from "../../components/Custom/Loader";
import { SEE_FULL_PROFILE } from "./VisitorQueries";
import FullProfile from "../../components/Visitor/FullProfile";
import BackArrow from "../../components/Custom/BackArrow";
import Modal from "react-native-modal";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const [seeFullProfile, setSeeFullProfile] = React.useState(route.params.seeFullProfile? route.params.seeFullProfile : "ckdra85bd1gjw0a3557xq2hnc")
    const { data, loading, error, refetch } = useQuery(SEE_FULL_PROFILE,{
      fetchPolicy:"network-only",
        variables: {
            id: seeFullProfile.id
        }
    });

  if(loading) {
    navigation.setOptions({
        headerTitle:() => <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{seeFullProfile.profileName} <Text style={styles.headerSector}>{seeFullProfile.sector}</Text></Text>,
        headerLeft:() => <BackArrow />,
        headerRight:() =>(
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}}/>
            </TouchableOpacity>
        )
    });
    return <Loader />;
  }
  
  if(error) return console.log(error);

  return (
    <>
        <View style={styles.container}>
            {data?.seeFullProfile && (
                <FullProfile {...data?.seeFullProfile}/>
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
                    myProfile:data?.myProfile
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
                onPress: () => console.log("삭제"),
              },
              ],
              {cancelable: true},
              )}>
                <MaterialCommunityIcons name="alarm-light-outline" size={25} color="red"/><Text style={styles.modalText}>신고하기</Text>
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
   // 모달
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
})
