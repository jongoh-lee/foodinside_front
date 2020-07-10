import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import { profile } from "../../components/Franchise/data";
import constants from "../../constants";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useQuery } from "react-apollo";
import Loader from "../../components/Custom/Loader";
import { ME } from "./VisitorQueries";
import { useLogOut } from "../../AuthContext";

  export default ({ route, navigation }) => {
    const [visible, setVisible ] = React.useState(false);
    const { data, loading, error, refetch } = useQuery(ME);
    const logOut = useLogOut();
    navigation.setOptions({
        headerRight:() => (
            <TouchableWithoutFeedback style={{marginHorizontal:10}} onPress={() => setVisible(!visible)} >
            <Feather
            name="more-vertical"
            size={24}
            color={'black'}
            />
          </TouchableWithoutFeedback>
        )
    });
    if(loading) return <Loader/>;
    if(error) return console.log(error);

    return (
    <>
    {data && data.me &&
    <ScrollView showsVerticalScrollIndicator={false} >
    <View style={styles.container}>
        

        {/* 아바타 + 자기소개 + 함께아는 팔로워 */}
        <View style={styles.box}>
            <View style={{flex:2, alignItems:"flex-end", paddingRight:30}}>
                <Avatar.Image
                source={data.me.avatar? {uri:data.me.avatar} : require('../../assets/Icons/avatarBasic.png')}
                size={60}
                backgroundColor={'#ffffff'}
                />
            </View>
            <View style={{flex:3}}>
                <View style={{flex:1, justifyContent:"center"}}>
                    <Title>{data.me.username}</Title>
                    <Caption>팔로잉 : {data.me.followingCount}</Caption>
                </View>
            </View>
        </View>

        {/* 대쉬보드 */}
        <View style={styles.dashBoard}>
            <View style={styles.inner}>
                <Text style={styles.number}>0</Text>
                <Text style={styles.title}>단골</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>{data.me.postsCount}</Text>
                <Text style={styles.title}>포스트</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>{'0'}c</Text>
                <Text style={styles.title}>암호화폐</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>{data.me.followersCount}</Text>
                <Text style={styles.title}>팔로워</Text>
            </View>
        </View>
    </View>

    {/* 리뷰 리스트 */}
    <View style={{flexDirection:"row", flexWrap:"wrap"}}>
        {profile.photoReviews.map((photo) => <Image key={photo.id} style={{width: constants.width / 3 - 2, height: constants.width / 3 - 2, margin:1}} source={{uri:photo.image}} />)}
    </View>

    </ScrollView>}

    <Modal
    isVisible={visible}
    onBackdropPress={() => setVisible(false)}
    onSwipeComplete={() => setVisible(false)}
    onBackButtonPress={() => setVisible(false)}
    swipeDirection={'down'}
    style={styles.modal}
    backdropColor={'#ffffff'}
    backdropOpacity={.4}
    >
        <View style={styles.modalContent}>
            <MaterialCommunityIcons name="chevron-down" size={26} color="#666" style={{alignSelf:"center"}} />
            <TouchableOpacity style={styles.modalList} onPress={()=> (
                navigation.navigate('정보수정', {
                    username : data.me.username,
                    avatar: data.me.avatar,
                    email: data.me.email,
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
            <TouchableWithoutFeedback style={styles.modalList}>
                <AntDesign name="deleteuser" size={24} color="#666" /><Text style={styles.modalText}>탈퇴하기</Text>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.modalList} onPress={() => setVisible(false)}>
                <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
            </TouchableOpacity>
        </View>

    </Modal>
    </>
    );
  };

  
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgb(250, 250, 247)",
        padding:15
    },
    modal:{
        justifyContent:"flex-end",
        margin:0,
        paddingHorizontal:5
    },
    modalContent:{
        backgroundColor: 'white',
        paddingHorizontal: 22,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom:100
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
    box: {
        flexDirection:'row',
    },
    dashBoard:{
        flexDirection:'row',
        marginTop:20
    },
    inner:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontSize:14,
        color:'rgba(0, 0, 0, .6)',
    },
    number:{
        fontSize:16,
        paddingBottom:4,
        fontWeight:'bold'
    },
    introduce:{
        fontSize:12,
        marginBottom:5
    }
  });