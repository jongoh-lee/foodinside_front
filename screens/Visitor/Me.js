import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert, TouchableHighlight } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import constants from "../../constants";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import { ME } from "./VisitorQueries";
import { useLogOut } from "../../AuthContext";
import UserComponent from "../../components/Visitor/UserComponent";
import { DELETE_ACCOUNT } from "../Auth/AuthQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const logOut = useLogOut();
    const { data, loading, error, refetch, networkStatus } = useQuery(ME,{
        fetchPolicy:"network-only",
    });
    const [deleteAccountMutation, { loading: mutationLoading }] = useMutation(DELETE_ACCOUNT, {
        variables:{
            id: data?.me?.id,
        }
    });
    const handleDeleteUser = async () => {
        setVisible(false)
        try {
          const {
            data: { deleteAccount }
          } = await deleteAccountMutation();
          if ( deleteAccount ) {
            logOut()
          }
        } catch (e) {
            console.log(e);
        }
    }
    
    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity onPress={() => setVisible(!visible)} >
            <Feather
            name="more-vertical"
            size={24}
            color={'black'}
            style={{paddingHorizontal:5}}
            />
          </TouchableOpacity>
        )
    });
    if(loading) return <Loader/>;
    return (
    <View style={{flex:1, backgroundColor:'#ffffff'}}>

        <UserComponent {...data?.me} route={route} refetch={refetch}/>
        
        <Modal
        isVisible={visible}
        onBackdropPress={ () => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        swipeDirection={'down'}
        style={styles.modal}
        backdropOpacity={.4}
        >
            <View style={styles.modalContent_top}>
                <MaterialCommunityIcons name="chevron-down" size={26} color="#666" style={{alignSelf:"center"}} />
                <TouchableOpacity style={styles.modalList} onPress={()=> (
                    navigation.navigate('정보수정', {
                        username : data?.me?.username,
                        avatar: data?.me?.avatar,
                        email: data?.me?.email,
                        contact: data?.me?.contact
                    }),
                    setVisible(false))}>
                    <MaterialCommunityIcons name="account-edit" size={24} color="#666" /><Text style={styles.modalText}>정보수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','로그아웃 하시겠습니까?',
                      [
                        {
                          text: '취소',
                          style: 'cancel',
                        },
                        {text: '확인',
                        onPress: () => logOut(),
                      },
                      ],
                      {cancelable: true},
                      )}>
                    <AntDesign name="logout" size={24} color="#666"/><Text style={styles.modalText}>로그아웃</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                    <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
                </TouchableOpacity>
               
            </View>

            <View style={styles.modalContent_bottom}>
                <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','탈퇴 시 모든 정보가 삭제됩니다',
                      [
                        {
                          text: '취소',
                          style: 'cancel',
                        },
                        {text: '확인',
                        onPress: () => handleDeleteUser(),
                      },
                      ],
                      {cancelable: true},
                      )}>
                    <AntDesign name="deleteuser" size={24} color="red" /><Text style={styles.modalText_red}>탈퇴하기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        {mutationLoading && <ScreenLoader />}
    </View>
    );
  };

  
const styles = StyleSheet.create({
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