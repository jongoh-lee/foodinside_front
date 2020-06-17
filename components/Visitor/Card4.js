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
    shopInfo:{
        width: WIDTH * .6,
        padding:8
    },
    headerTitle:{
        fontWeight:'bold',
        fontSize:20,
        color:"white",
        marginBottom:10
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
    cardCol:{
        flex:1
    },
    cardInfo:{
        flex:1,
        justifyContent:"flex-end"
    },
    cardInfoText:{
        color:"rgba(0, 0, 0, .9)",
        marginBottom:8,
    },
    cardInfoNum:{
        color:"#f8f3f3",
        fontSize:16
    },

    //단골 버튼
    dangolTextButton:{
        width:constants.width / 8,
        height:constants.width / 16,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3,
        backgroundColor:"rgba(0, 0, 0, .9)",
        marginBottom:8,
    },
    dangolTextButton_checked:{
        width:constants.width / 8,
        height:constants.width / 16,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:3,
        backgroundColor:"rgba(0, 0, 0, .1)",
        marginBottom:8,
    },
    btnText:{
        color:"#f8f3f3",
    },
    btnText_cheched:{
        color:"rgba(0, 0, 0, .9)",
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ shopProfile }) => {
    const { mainImage, mainMenu, subMenu, name, sort } = shopProfile;
    const [btn, setBtn] = React.useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.mainCard}>
                <ImageBackground source={{uri:mainImage}} style={styles.mainImage}>
                    <View style={styles.layer}>

                        <ScrollView >
                            <View style={styles.menuBar}>
                                <View style={styles.menuContainer}>
                                    <Text style={styles.menuName} numberOfLines={1}>{mainMenu.name}</Text>
                                    <Image style={styles.menuImage} source={{uri:mainMenu.image}}/>
                                    <View style={styles.priceBox}>
                                        <Text style={styles.fullPrice}>{mainMenu.fullPrice}</Text>
                                        <Text style={styles.salePrice}>{mainMenu.salePrice}</Text>
                                    </View>
                                </View>
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
                            </View>
                        </ScrollView>

                
                        <View style={styles.shopInfo}>
                            <Text style={styles.headerTitle}>{name}4 <Text style={styles.headerSubtitle}>{sort}</Text></Text>
                                <View style={styles.cardGrid}>
                                    <View style={styles.cardCol}>
                                        <View style={styles.cardInfo}>
                                            <TouchableWithoutFeedback 
                                            style={btn? styles.dangolTextButton_checked : styles.dangolTextButton } 
                                            onPress={() => setBtn(!btn)}>
                                                {btn? <Text style={styles.btnText_cheched}>단골 중</Text> : 
                                                <Text style={styles.btnText}>단골</Text>}
                                            </TouchableWithoutFeedback>

                                            <Text style={styles.cardInfoNum}>512</Text>
                                        </View>

                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardInfoText}>Post</Text>
                                            <Text style={styles.cardInfoNum}>5,535</Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardCol}>
                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardInfoText}>My Post</Text>
                                            <Text style={styles.cardInfoNum}>13</Text>
                                        </View>

                                        <View style={styles.cardInfo}>
                                            <Text style={styles.cardInfoText}>Point</Text>
                                            <Text style={styles.cardInfoNum}>1,400</Text>
                                        </View>
                                    </View>
                                </View>
                        </View>
                        
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}