import React from "react";
import { Image, StyleSheet, Text, View, RefreshControl } from "react-native";
import Avatar from "../../components/Visitor/Avatar";
import { ScrollView } from "react-native-gesture-handler";
import { shopProfile } from "../../components/Franchise/data";
import constants from "../../constants";

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgb(250, 250, 247)",
        padding:15
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

  export default () => {
    return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl />}>

    <View style={styles.container}>
        
        {/* 아바타 + 자기소개 + 함께아는 팔로워 */}
        <View style={styles.box}>
            <View style={{flex:2, alignItems:"flex-end", paddingRight:30}}>
                <Avatar add={true} />
            </View>
            <View style={{flex:3}}>
                <View style={{flex:1, justifyContent:"center"}}>
                    <Text numberOfLines={3} style={styles.introduce}>소개 내용이 없습니다</Text>
                    <Text style={{fontSize:10, color:'#666'}}>팔로잉 : 10</Text>
                </View>
            </View>
        </View>

        {/* 대쉬보드 */}
        <View style={styles.dashBoard}>
            <View style={styles.inner}>
                <Text style={styles.number}>19</Text>
                <Text style={styles.title}>단골</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>30</Text>
                <Text style={styles.title}>포스트</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>{'196,800'}C</Text>
                <Text style={styles.title}>암호화폐</Text>
            </View>
            <View style={styles.inner}>
                <Text style={styles.number}>127</Text>
                <Text style={styles.title}>팔로워</Text>
            </View>
        </View>
    </View>

    {/* 리뷰 리스트 */}
    <View style={{flexDirection:"row", flexWrap:"wrap"}}>
        {shopProfile.photoReviews.map((photo) => <Image key={photo.id} style={{width: constants.width / 3 - 2, height: constants.width / 3 - 2, margin:1}} source={{uri:photo.image}} />)}
    </View>

    </ScrollView>
    );
  };