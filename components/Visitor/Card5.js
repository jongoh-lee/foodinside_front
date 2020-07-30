import * as React from "react";
import { StyleSheet, View, Image, Text, ImageBackground,  } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
    },
    mainCard:{
        width:WIDTH,
        height: constants.height / 4,
        borderRadius:15,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        overflow:"hidden",
    },
    mainImage:{
        width: WIDTH ,
        height: constants.height / 4,
        resizeMode:"cover",
    },
    layer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0, 0, 0, .2)',
        flexDirection:"row",
    },
    menuBar:{
        flexGrow:1,
        alignItems:"center",
    },
    menuContainer:{
        width: WIDTH / 3,
        alignItems:"center"
    },
    menuImage:{
        width: WIDTH / 3,
        height: WIDTH / 3,
        resizeMode:"cover",
        borderRadius: 15,
    },
    menuName:{
        fontSize:16,
        marginVertical:3,
        color:"white",
    },
    priceBox:{
        flexDirection:"row",
        width: "100%",
        padding:3,
        justifyContent:"space-between"
    },
    fullPrice:{
        textDecorationLine:"line-through",
        fontSize:16,
        color:"white",
    },
    salePrice:{
        fontSize:16,
        color:"white",
    },

    //가게 이름
    shopInfo:{
        width: WIDTH * .62,
        padding:5,
    },
    headerTitle:{
        fontWeight:'bold',
        fontSize:20,
        color:"white",
        marginBottom:20
    },
    headerSubtitle:{
        color:"white",
        fontSize:12,
    },

    //가게 단골 정보
    cardGrid:{
        flexDirection:"row",
        flex:1,
    },
    cardInfo:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-start",
    },
    cardInfoText:{
        color:"rgba(0, 0, 0, .9)",
    },
    cardInfoNum:{
        marginBottom:3,
        color:"rgba(255, 255, 255, .9)",
        fontSize:16
    },

    //단골 버튼
    logoRow:{
        flexDirection:"row",
        alignItems:"center",
    },
    dangolLogo:{
        width:constants.width / 50,
        height:constants.width / 25,
        resizeMode:"contain",
        marginRight:8,
        opacity: .9,
    },
    dangolLogo_checked:{
        width:constants.width / 50,
        height:constants.width / 25,
        resizeMode:"contain",
        marginRight:8,
        opacity: .4,
    },
    logoText:{
        color:"rgba(0, 0, 0, .9)",
    },
    logoText_checked:{
        color:"rgba(0, 0, 0, .4)",
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ signBoard, Submenu, shopName, sort, mainMenu }) => {
    const { menuName, menuImage, fullPrice, salePrice } = mainMenu;
    const [logoBtn, setLogoBtn] = React.useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.mainCard}>
                <ImageBackground source={{uri:signBoard}} style={styles.mainImage}>
                    <View style={styles.layer}>
                
                        <ScrollView >
                            <View style={styles.menuBar}>
                                <View style={styles.menuContainer}>
                                    <Text style={styles.menuName} numberOfLines={1}>{menuName}</Text>
                                    <Image style={styles.menuImage} source={{uri:menuImage}}/>
                                    <View style={styles.priceBox}>
                                        <Text style={styles.fullPrice}>{fullPrice}</Text>
                                        <Text style={styles.salePrice}>{salePrice}</Text>
                                    </View>
                                </View>
                                {Submenu && Submenu.map((menu) => (
                                    <View key={menu.id} style={styles.menuContainer}>
                                      <Text style={styles.menuName} numberOfLines={1}>{menu.menuName}</Text>
                                      <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>
                                      <View style={styles.priceBox}>
                                          <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                                          <Text style={styles.salePrice}>{menu.salePrice}</Text>
                                      </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={styles.shopInfo}>
                            <Text style={styles.headerTitle}>{shopName}5 <Text style={styles.headerSubtitle}>{sort}</Text></Text>
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
                                        <Text style={styles.cardInfoNum}>512</Text>
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
                </ImageBackground>
            </View>
        </View>
    )
}