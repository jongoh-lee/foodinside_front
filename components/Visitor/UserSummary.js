import * as React from 'react';
import { Image, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "../../screens/Visitor/VisitorQueries";
import { Feather } from '@expo/vector-icons';

export default ({ id, username, avatar, isSelf, isFollowing}) => {
    const navigation = useNavigation();
    const [toggleFollow, setToggleFollow] = React.useState(isFollowing);
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
        }
    }
    return (
    <View style={styles.headerBar}>
    <TouchableOpacity onPress={() => navigation.navigate("SeeUser", {
      user:{ username, isSelf }
    })}>
      <View style={styles.headerLeft}>
        <Image style={styles.avatar} source={avatar? { uri: avatar } : require('../../assets/Icons/avatarBasic.png')} />
        <View>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
    </TouchableOpacity>

    {toggleFollow? ( 
        <TouchableOpacity disabled={unfollowLoading} onPress={onPressUnfollow} style={{width:100, borderWidth:1, borderColor:"#05e6f4", alignItems:"center", padding:4, borderRadius:5}}>
            {unfollowLoading? <ActivityIndicator color={"#05e6f4"} /> : <Text style={{color:"#05e6f4"}}>팔로잉</Text>}
        </TouchableOpacity> 
        ) : (
        <TouchableOpacity disabled={followLoading} onPress={onPressFollow} loading={followLoading} style={{width:100, borderWidth:1, borderColor:"#ffffff", backgroundColor: "#05e6f4", alignItems:"center", padding:4, borderRadius:5}}>
            {followLoading? <ActivityIndicator color={"white"} /> : <Text style={{color:"#ffffff"}}>팔로우</Text>}
        </TouchableOpacity>)}
    
    </View>
    )
}

const styles = StyleSheet.create({
    headerBar: {
      flexDirection: "row",
      padding: 5,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom:10
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    username: {
      fontSize: 14,
      fontWeight:'bold',
    },
}); 