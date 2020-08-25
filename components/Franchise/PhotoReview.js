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

export default ( { isSelf, posts} ) => {
    const navigation = useNavigation()
    return (
    <View style={styles.container}>
        {isSelf? (
            <TouchableOpacity style={styles.grid}>
                <View style={styles.upload}>
                    <Text>음식점 홍보하기</Text>
                </View>
            </TouchableOpacity>
        ):(
            <TouchableOpacity style={styles.grid} onPress={() => navigation.navigate("SelectUpload", {id:id})}>
                <View style={styles.upload}>
                    <Text>리뷰 작성하기</Text>
                </View>
            </TouchableOpacity>
        )}
       
        {posts && posts.map( (post, index) => (
            <TouchableOpacity key={post.id} onPress={() => navigation.navigate("포토리뷰", {
                posts: posts,
                index: index
            })} >
                <Image style={styles.grid} source={{uri:post.files[0].url}}/>
            </TouchableOpacity>
        ))}
    </View>
)}