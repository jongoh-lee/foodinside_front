import * as React from "react";
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert, ActivityIndicator, Platform } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Avatar, Title } from "react-native-paper";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { FOLLOW, LOAD_MORE_POST, UNFOLLOW } from "../../screens/Visitor/VisitorQueries";
import Caption from "../Custom/Caption";

export default ({ id, avatar, username, email, isSelf ,dangolCount, followersCount, followingCount, postsCount, posts, isFollowing, wallets, route }) => {
    const [toggleFollow, setToggleFollow] = React.useState(isFollowing);
    const [followerNumber, setFollowerNumber] = React.useState(followersCount);
    const [postList, setPostList] = React.useState([]);
    const flatList = React.useRef();
    const [endOfScroll, setEndOfScroll] = React.useState(false)
    const [loadMorePostQuery, { called, data }] = useLazyQuery(LOAD_MORE_POST,{
        fetchPolicy:"network-only",
    });
    const navigation = useNavigation()
    const [imageLoading, setImageLoading] = React.useState(false)
    
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

    //component
    const userInfo = () => {
        return (
            <View>
            {/* 아바타 + 자기소개 + 함께아는 팔로워 */}
                <View style={styles.box}>
                    <View style={{flex:2, alignItems:"flex-end", paddingRight:30}}>
                        <Avatar.Image
                        source={avatar? {uri:avatar} : require('../../assets/Icons/avatarBasic.png')}
                        size={60}
                        backgroundColor={'#e0e0e0'}
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
                        <Text style={styles.number}>{wallets.length > 0 ? wallets?.map(el => (el.incoming - el.outgoing)).reduce((a, b) => a + b , 0) : 0}</Text>
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
        );
    };

    const emptyList = () => {
        return(
            <View style={{flexGrow:1, backgroundColor:"#ffffff", justifyContent:"center", alignItems:"center"}}>
                <Caption>포토 리뷰를 작성해 주세요</Caption>
            </View>
        )
    }

    const renderReview = ({ item, index }) => {
        return(
            <TouchableOpacity key={item.id} onPress={() => navigation.push("UserPostList", {
                post:{
                    profileId: null,
                    postList:[...posts, ...postList],
                    index,
                    user:{
                        id,
                        username,
                        avatar
                    }
                }
            })} >
                <Image style={[styles.grid, {backgroundColor:"#E0E0E0"}]} source={{uri:item.files[0].url}}/>
            </TouchableOpacity>
        )
    };

    const loadMoreImages = () => {
        if(posts.length > 14){
            setImageLoading(true);
            const id = postList.length > 0 ? postList.slice(-1)[0].id : posts.slice(-1)[0].id
            loadMorePostQuery({
                variables:{
                    id: id,
                    username: username
                },
            });
        }
    }

    const renderFooter = () => {
        return(
            imageLoading ? (
            <View style={{height: constants.height * 0.1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator color={"#E0E0E0"}/>
            </View>) : endOfScroll ? (
            <View style={{height: constants.height * 0.1, alignItems:"center", justifyContent:"center"}}>
                <Caption>게시물이 없습니다</Caption>
            </View>
            ) : null
            
        )
    }

    React.useEffect(() => {
        if(data?.loadMorePost.length > 0){
            setPostList(postList.concat(data.loadMorePost));
        }else if(data?.loadMorePost.length === 0){
            setEndOfScroll(true)
        }
        setImageLoading(false)
    }, [data?.loadMorePost]);

    React.useEffect(() => {
        setPostList([]);
        setEndOfScroll(false)
        flatList.current.scrollToOffset({ animated: false, offset: 0 });
    },[posts]);

    //포스트 삭제
    React.useEffect(() => {
        if(route?.params?.id){
            setPostList(postList.filter(post => post.id !== route.params.id))
        }
    },[route]);
    
    return (
        <View style={styles.container}>
            <FlatList
                ref={flatList}
                data={[...posts, ...postList]}
                renderItem={renderReview}
                keyExtractor={item => item.id}
                ListHeaderComponent={userInfo}
                ListHeaderComponentStyle={{padding:15}}
                ListEmptyComponent={emptyList}
                contentContainerStyle={{flexGrow:1}}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                onEndReached={loadMoreImages}
                onEndReachedThreshold={Platform.OS === "ios" ? 0 : 0.}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
  };

  
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    grid:{
        width: constants.width / 3 - 2 ,
        height: constants.width / 3 - 2,
        margin:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#E0E0E0"
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