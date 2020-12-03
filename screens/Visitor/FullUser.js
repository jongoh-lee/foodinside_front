import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import { SEE_USER } from "./VisitorQueries";
import UserComponent from "../../components/Visitor/UserComponent";
import ScreenLoader from "../../components/Custom/ScreenLoader";

export default ({ navigation, route }) => {
    const [visible, setVisible ] = React.useState(false);
    const { data, loading, error, refetch } = useQuery(SEE_USER,{
        variables:{
            username: route.params.user.username
        },
        fetchPolicy:"network-only"
    });
    navigation.setOptions({
        headerTitle:() => <Text style={styles.headerTitle}>{route.params.user.username}</Text>,
        headerRight:() => (
            route.params.user.isSelf ? 
            (
                <Feather name="more-vertical" size={24} color={'#ffffff'} style={{paddingHorizontal:5}} />
                ) :  (
                <TouchableOpacity onPress={() => setVisible(!visible)} > 
                    <Feather name="more-vertical" size={24} color={'black'} style={{paddingHorizontal:5}} />
                </TouchableOpacity>
            )
        )
    });
    
    if(loading) return <Loader/>;

    return (
    <>
        <View style={{backgroundColor:"#ffffff", flex:1}}>

            <UserComponent {...data?.seeUser} refetch={refetch}/>

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
                    <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                        <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalContent_bottom}>
                    <TouchableOpacity style={styles.modalList}>
                        <MaterialCommunityIcons name="alarm-light-outline" size={25} color="red"/><Text style={styles.modalText_red}>신고 하기</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    </>
    );
  };

  
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
        padding:15,
    },
    //헤더
    headerTitle:{
        fontWeight:'bold',
        fontSize:20,
        alignSelf:"center",
        paddingLeft:10
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