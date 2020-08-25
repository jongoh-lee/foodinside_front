import * as React from "react";
import { StyleSheet, View, Image, Text, ImageBackground, } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
export default ({ id, mainImage, submenus, profileName, sector, mainMenu}) => {
    const { menuName, menuImage, fullPrice, salePrice } = mainMenu;
    const [logoBtn, setLogoBtn] = React.useState(false);
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
                        id: "ckdra85bd1gjw0a3557xq2hnc",
                        profileName: "큐슈 고쿠리",
                        sector: "일식",
                        isSelf:false
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
                <View style={styles.cardGrid}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoText}>단골 수</Text>
                        <Text style={styles.cardInfoNum}>4,890</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoText}>포스트</Text>
                        <Text style={styles.cardInfoNum}>5,535</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoText}>내 리뷰</Text>
                        <Text style={styles.cardInfoNum}>13</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoText}>암호화폐</Text>
                        <Text style={styles.cardInfoNum}>1,400</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <TouchableOpacity style={styles.logoRow} onPress={()=>setLogoBtn(!logoBtn)}>
                          {logoBtn? <>
                          <Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
                          <Text style={styles.logoText_checked}>단골 중</Text>
                          </> : <>
                          <Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} />
                          <Text style={styles.logoText}>단골</Text>
                          </>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </ImageBackground>
    )
}