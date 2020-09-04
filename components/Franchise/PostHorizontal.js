import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    grid:{
        width: constants.width / 3 - 2 ,
        height: constants.width / 3 - 2,
        margin:1,
        justifyContent:"center",
        alignItems:"center",
    },
    upload:{
        borderBottomColor:"#50caef",
        borderBottomWidth:2
    },
})



export default ({ id, posts }) => {
    const navigation = useNavigation()
    return (
    <>
        {posts.map((post, index) => (
            <TouchableOpacity key={post.id} onPress={() => navigation.navigate("PostList", {
                post:{
                    profileId: id,
                    postId: post.id,
                    thumnail: posts,
                    index: index
                }
            })} >
                <Image style={styles.grid} source={{uri:post.files[0].url}}/>
            </TouchableOpacity>
        ))}
    </>
)}