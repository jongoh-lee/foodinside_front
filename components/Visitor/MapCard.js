import * as React from "react";
import { StyleSheet, View, Image, Text, ImageBackground, } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import DangolBar from "../Custom/DangolBar";
import Caption from "../Custom/Caption";

const WIDTH = constants.width - 20;
const CARD_WIDTH = constants.width * 0.7;
const styles = StyleSheet.create({
    cardImage: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    box:{
        flex:1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        padding:10,
    },
    headerTitle:{
        maxWidth: WIDTH * 0.6,
        fontWeight:"500",
        fontSize:16,
        color:"white"
    },
    sector:{
        color:'rgba(255, 255, 255, .7)',
        fontSize:12,
    },
    menuContainer:{
        width: WIDTH /4,
        marginRight:5,
        alignItems:"center",
        padding:0,
    },
    menuImage:{
        width: WIDTH /4,
        height: WIDTH /4,
        resizeMode:"cover",
        borderRadius: 15,
    },
    menuName:{
        fontSize:14,
        marginVertical:3,
        color:"white"
    },
    priceBox:{
        flexDirection:"row",
        width: WIDTH /4,
        fontSize:14,
        padding:5,
        justifyContent:"space-between",
        paddingBottom:0,
        color:"white"
    },
    fullPrice:{
        textDecorationLine:"line-through",
        justifyContent:"flex-start",
        fontSize:14,
        color:"white"
    },
    salePrice:{
        fontSize:14,
        color:"white"
    },
    
    //가게 단골 정보
    cardGrid:{
        flexDirection:"row",
        flex:1,
        padding:5,
    },
    cardInfo:{
        flex:1,
        justifyContent:"center",
    },
    cardInfoText:{
        fontSize:12,
        color:"rgba(255, 255, 255, .9)",
        paddingLeft:5,
    },
    cardInfoNum:{
        color:"rgba(255, 255, 255, .4)",
        fontSize:13,
        paddingLeft:5,
        marginTop:5
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ profile, firstDate, lastDate }) => {
    const { id, profileName, sector, mainImage, menuName, menuImage, fullPrice, salePrice, isDangol, dangolCount, isSelf, postsCount, submenus, myPosts, myWallet, wallets} = profile
    
    const navigation = useNavigation();
    return (
        <ImageBackground 
            source={{uri: mainImage}}
            style={styles.cardImage}
            resizeMode="cover"
        >
        <View style={{position:"absolute", left:0, top:0, width:'100%', height:"100%", backgroundColor:"rgba(0, 0, 0, .4)"}}/>
        <View style={styles.box}>
            {/* 헤더 */}
            <TouchableWithoutFeedback 
                    onPress={()=> navigation.navigate("프로필 보기", {seeFullProfile : {
                        id,
                        profileName,
                        sector,
                        isSelf:true
                    }})}>
                <View style={styles.header}>
                        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{profileName}<Text style={styles.sector}>  {sector}</Text></Text>
                </View>
            </TouchableWithoutFeedback>
        
            {/* 메뉴 스크롤*/}
            <View style={{flex:3}}>
                    <ScrollView contentContainerStyle={{paddingLeft:CARD_WIDTH}} horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                            {/* 메인 메뉴 */}
                            <View style={styles.menuContainer}>
                                <Text style={styles.menuName} numberOfLines={1}>{menuName}</Text>
                                    <Image style={styles.menuImage} source={{uri:menuImage}}/>
                                <View style={styles.priceBox}>
                                    <Text style={styles.fullPrice}>{fullPrice}</Text>
                                    <Text style={styles.salePrice}>{salePrice}</Text>
                                </View>
                            </View>
                            {/* 추가 메뉴 */}
                            {submenus && submenus.map((menu) => (
                                <View key={menu.id} style={styles.menuContainer}>
                                    <Text style={styles.menuName} numberOfLines={1}>{menu.menuName}</Text>
                                    <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>
                                    <View style={styles.priceBox}>
                                        <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                                        <Text style={styles.salePrice}>{menu.salePrice}</Text>
                                    </View>
                                </View>
                            ))}
                    </ScrollView>
            </View>
            
            <View style={{flex:1}}>
                <DangolBar id={id} isDangol={isDangol} dangolCount={dangolCount} isSelf={isSelf} postsCount={postsCount} myPosts={myPosts} mapCard={true} myWallet={myWallet} wallets={wallets}/>
            </View>
        </View>
    </ImageBackground>
    )
}