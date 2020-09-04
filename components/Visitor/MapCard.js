import * as React from "react";
import { StyleSheet, View, Image, Text, ImageBackground, } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DangolBar from "../Custom/DangolBar";

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
        padding:10
    },
    headerTitle:{
        maxWidth: WIDTH * 0.6,
        fontWeight:"500",
        fontSize:16,
        color:'rgba(0, 0, 0, .7)',
    },
    sector:{
        color:'#666',
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
    },
    priceBox:{
        flexDirection:"row",
        width: WIDTH /4,
        fontSize:14,
        padding:5,
        justifyContent:"space-between",
        paddingBottom:0,
    },
    fullPrice:{
        textDecorationLine:"line-through",
        justifyContent:"flex-start",
        fontSize:14,
    },
    salePrice:{
        fontSize:14,
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
        color:"rgba(0, 0, 0, .9)",
        paddingLeft:5,
    },
    cardInfoNum:{
        color:"rgba(0, 0, 0, .4)",
        fontSize:13,
        paddingLeft:5,
        marginTop:5
    },

    //단골 버튼
    logoRow:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:"auto",
        marginRight:5,
    },
    dangolLogo:{
        width:10,
        resizeMode:"contain",
        marginRight:5,
        opacity: .9,
    },
    dangolLogo_checked:{
        width:10,
        resizeMode:"contain",
        marginRight:5,
        opacity: .4,
    },
    logoText:{
        color:"rgba(0, 0, 0, .9)",
        fontSize:13
    },
    logoText_checked:{
        color:"rgba(0, 0, 0, .4)",
        fontSize:13
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 암호화폐
export default ({ id, profileName, sector, mainImage, menuName, menuImage, fullPrice, salePrice, isDangol, dangolCount, isSelf, postsCount, submenus }) => {
    const navigation = useNavigation();
    return (
        <ImageBackground 
            source={{uri: mainImage}}
            style={styles.cardImage}
            resizeMode="cover"
        >
        <View style={styles.box}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("프로필 보기", {seeFullProfile : {
                        id,
                        profileName,
                        sector,
                        isSelf
                    }})}>
                    <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{profileName}<Text style={styles.sector}>  {sector}</Text></Text>
                </TouchableOpacity>
                <Caption style={{fontSize:12}}>7/15 - 7/21</Caption>
            </View>
        
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
                <DangolBar id={id} isDangol={isDangol} dangolCount={dangolCount} isSelf={isSelf} postsCount={postsCount} />
            </View>
        </View>
    </ImageBackground>
    )
}