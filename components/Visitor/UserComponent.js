import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as React from "react";
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import constants from "../../constants";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Loader from "../../components/Custom/Loader";
import PostHorizontal from "../Franchise/PostHorizontal";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "../../screens/Visitor/VisitorQueries";
import { useNavigation } from "@react-navigation/native";

export default ({ id, avatar, username, email, isSelf ,dangolCount, followersCount, followingCount, postsCount, posts, isFollowing }) => {
    const navigation = useNavigation()
    const [toggleFollow, setToggleFollow] = React.useState(isFollowing);
    const [followerNumber, setFollowerNumber] = React.useState(followersCount);
    const [followMutation, {loading: followLoading}] = useMutation(FOLLOW, {
        variables:{
            id: id
        },
        refetchQueries:[`me`]
    });
    const [unfollowMutation,{loading: unfollowLoading}] = useMutation(UNFOLLOW, {
        variables:{
            id: id
        },
        refetchQueries:[`me`]
    });
    
    const onPressFollow = async () => {
        try{
            const { data: { follow } } = await followMutation();
            if(!follow){
                console.log("팔로우 에러")
            }
        }catch(e){
            console.log(e);
        }finally{
            setToggleFollow(!toggleFollow)
            setFollowerNumber(followerNumber + 1);
        }
    }
    
    const onPressUnfollow = async () => {
        try{
            const { data: { unfollow } } = await unfollowMutation();
            if(!unfollow){
                console.log("언팔로우 에러")
            }
        }catch(e){
            console.log(e);
        }finally{
            setToggleFollow(!toggleFollow)
            setFollowerNumber(followerNumber - 1);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
            <View style={styles.container}>

                {/* 아바타 + 자기소개 + 함께아는 팔로워 */}
                <View style={styles.box}>
                    <View style={{flex:2, alignItems:"flex-end", paddingRight:30}}>
                        <Avatar.Image
                        source={avatar? {uri:avatar} : require('../../assets/Icons/avatarBasic.png')}
                        size={60}
                        backgroundColor={'#ffffff'}
                        />
                    </View>
                    <View style={{flex:3}}>
                        <View style={{flex:1, justifyContent:"center"}}>
                            <Text style={{fontSize:16, paddingBottom:5}}>{username}</Text>
                            {isSelf? ( 
                                <TouchableOpacity onPress={() => navigation.navigate("FollowList",{
                                    tabname:"팔로잉"
                                })}>
                                    <Caption>팔로잉 : {followingCount}</Caption>
                                </TouchableOpacity> 
                                ) : (
                                    toggleFollow? ( 
                                    <TouchableOpacity disabled={unfollowLoading} onPress={onPressUnfollow} style={{width:100, borderWidth:1, borderColor:"#05e6f4", alignItems:"center", padding:4, borderRadius:5}}>
                                        {unfollowLoading? <ActivityIndicator size={"small"} color={"#05e6f4"} /> : <Text style={{color:"#05e6f4"}}>팔로잉</Text>}
                                    </TouchableOpacity> 
                                    ) : (
                                    <TouchableOpacity disabled={followLoading} onPress={onPressFollow} style={{width:100, borderWidth:1, borderColor:"#ffffff", backgroundColor: "#05e6f4", alignItems:"center", padding:4, borderRadius:5}}>
                                        {followLoading? <ActivityIndicator size={"small"} color={"white"} /> : <Text style={{color:"#ffffff"}}>팔로우</Text>}
                                    </TouchableOpacity>
                                    )
                            )}
                        </View>
                    </View>
                </View>

                {/* 대쉬보드 */}
                <View style={styles.dashBoard}>
                    <View style={styles.inner}>
                        <Text style={styles.number}>{dangolCount}</Text>
                        <Text style={styles.title}>단골</Text>
                    </View>
                    <View style={styles.inner}>
                        <Text style={styles.number}>{postsCount}</Text>
                        <Text style={styles.title}>포스트</Text>
                    </View>
                    <View style={styles.inner}>
                        <Text style={styles.number}>{0}</Text>
                        <Text style={styles.title}>포인트</Text>
                    </View>
                    <TouchableOpacity style={styles.inner} onPress={() => isSelf? navigation.navigate("FollowList",{
                        tabname:"팔로워"
                    }) : navigation.navigate("UserFollowers",{
                        username
                    })}>
                        <Text style={styles.number}>{followerNumber}</Text>
                        <Text style={styles.title}>팔로워</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 리뷰 리스트 */}
                {posts.length > 0 ? (
                    <View style={{flex:1, backgroundColor:"#ffffff", flexDirection:"row", flexWrap:"wrap"}}>
                        <PostHorizontal id={null} posts={posts}/>
                    </View>
                ) : (
                    <View style={{flex:1, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
                        <Caption>포토 리뷰를 작성해 주세요</Caption>
                    </View>)}
        </ScrollView>
    );
  };

  
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
        padding:15,
    },
    grid:{
        width: constants.width / 3 - 2 ,
        height: constants.width / 3 - 2,
        margin:1,
        justifyContent:"center",
        alignItems:"center",
    },

      
    //user Info
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