import * as React from "react";
import { StyleSheet, View, Image, Text,  } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    container:{
        borderRadius:15,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
    },
    box:{
        backgroundColor:"white",
        borderRadius:15,
        padding:5,
        overflow:"hidden"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleAlign: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    mainImage: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.11,
        marginRight: 8,
    },
    headerTitle:{
        maxWidth: WIDTH * 0.55,
        fontWeight:"500",
        fontSize:18,
    },
    headerSubtitle:{
        color:'#666',
        fontSize:12,
    },
    menuScroll:{
        flexDirection:"row",
    },
    menuContainer:{
        width: WIDTH /3,
        marginRight:5,
        alignItems:"center"
    },
    menuImage:{
        width: WIDTH /3,
        height: WIDTH / 3,
        resizeMode:"cover",
        borderRadius: 15,
    },
    menuName:{
        fontSize:16,
        marginVertical:3,
    },
    priceBox:{
        flexDirection:"row",
        width: WIDTH /3,
        padding:5,
        justifyContent:"space-between"
    },
    fullPrice:{
        textDecorationLine:"line-through",
        justifyContent:"flex-start",
        fontSize:16,
    },
    salePrice:{
        fontSize:16,
    },
    
    //가게 단골 정보
    cardGrid:{
        flexDirection:"row",
        flex:1,
    },
    cardInfo:{
        flex:1,
        justifyContent:"center",
        
    },
    cardInfoText:{
        color:"rgba(0, 0, 0, .9)",
        marginTop:4,
    },
    cardInfoNum:{
        color:"rgba(0, 0, 0, .9)",
        fontSize:16
    },

    //단골 버튼
    logoRow:{
        flexDirection:"row",
        alignItems:"center",
    },
    dangolLogo:{
        width:constants.width / 44,
        height:constants.width / 22,
        resizeMode:"contain",
        marginRight:8,
        opacity: .9,
    },
    dangolLogo_checked:{
        width:constants.width / 44,
        height:constants.width / 22,
        resizeMode:"contain",
        marginRight:8,
        opacity: .4,
    },
    logoText:{
        color:"rgba(0, 0, 0, .9)",
        fontSize:16
    },
    logoText_checked:{
        color:"rgba(0, 0, 0, .4)",
        fontSize:16
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ shopProfile }) => {
    const { mainImage, mainMenu, subMenu, name, sort } = shopProfile;
    const [logoBtn, setLogoBtn] = React.useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.box}>

            {/* 헤더 */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image style={styles.mainImage} source={{ uri: mainImage }} />
                        <View>
                            <View style={styles.titleAlign}>
                                <Text style={styles.headerTitle} numberOfLines={1}>{name}2</Text>
                                <Text style={styles.headerSubtitle}>  {sort}</Text>
                            </View>
                            <Text style={styles.headerSubtitle}>7/15 - 7/21</Text>
                        </View>
                </View>

                <Text>영업중</Text>
            </View>
            
            {/* 메뉴 스크롤*/}
            <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>
            
            {/* 메인 메뉴 */}
            <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}>{mainMenu.name}</Text>
                <Image style={styles.menuImage} source={{uri:mainMenu.image}}/>
                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>{mainMenu.fullPrice}</Text>
                    <Text style={styles.salePrice}>{mainMenu.salePrice}</Text>
                </View>
            </View>
            
            {/* 추가 메뉴 */}
            {subMenu && subMenu.map((menu) => (
                <View key={menu.id} style={styles.menuContainer}>
                    <Text style={styles.menuName} numberOfLines={1}>{menu.name}</Text>
                    <Image style={styles.menuImage} source={{uri:menu.image}}/>
                    <View style={styles.priceBox}>
                        <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                        <Text style={styles.salePrice}>{menu.salePrice}</Text>
                    </View>
                </View>
            ))}
            </ScrollView>
            
                <View style={styles.cardGrid}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoNum}>5,535</Text>
                        <Text style={styles.cardInfoText}>포스트</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoNum}>13</Text>
                        <Text style={styles.cardInfoText}>내 리뷰</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoNum}>1,400</Text>
                        <Text style={styles.cardInfoText}>포인트</Text>
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardInfoNum}>4,890</Text>
                        <Text style={styles.cardInfoText}>단골 수</Text>
                    </View>

                    <View style={styles.cardInfo}>
                        <TouchableWithoutFeedback style={styles.logoRow} onPress={()=>setLogoBtn(!logoBtn)}>
                          {logoBtn? <>
                          <Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
                          <Text style={styles.logoText_checked}>단골 중</Text>
                          </> : <>
                          <Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} />
                          <Text style={styles.logoText}>단골</Text>
                          </>}
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            </View>
        </View>
    )
}