import * as React from "react";
import { StyleSheet, View, Image, Text,  } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    container:{
        borderRadius:15,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    box:{
        backgroundColor:"white",
        borderRadius:15,
        overflow:"hidden",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "baseline",
        paddingVertical:5
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
    mainImage:{
        width: '100%',
        height: constants.height / 4,
        resizeMode:"cover",
        borderRadius:10
    },

    //메뉴 가로 스크롤
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
    },
    salePrice:{
        
    },

    //단골 바
    rowBox:{
        flex:1,
        flexDirection:"row",
        paddingTop:8
    },
    dangolBar:{
        flex:1,
        alignItems:"flex-start",
    },
    barText:{
        fontSize:12,
        paddingLeft:5,
        color:'rgba(0, 0, 0, .7)'
    },
    barNum:{
        fontSize:13,
        paddingLeft:5,
        color:'rgba(0, 0, 0, .4)',
        marginTop:5
    },

    //단골 버튼
    dangolTextButton:{
        width:constants.width * .14,
        height:constants.width / 11,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:3,
        backgroundColor:"rgba(248, 109, 95, .9)"
    },
    dangolTextButton_checked:{
        width:constants.width * .14,
        height:constants.width / 11,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:3,
        backgroundColor:"rgba(248, 109, 95, .1)"
    },
    btnText:{
        fontSize:15,
        color:"#f1f1f8",
    },
    btnText_cheched:{
        fontSize:15,
        color:"rgba(248, 109, 95, .9)",
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ mainImage, mainMenu, Submenu, shopName, sort }) => {
    const { menuName, image, fullPrice, salePrice } = mainMenu;
    const [btn, setBtn] = React.useState(false);
    return (
        <View >
            <View style={styles.box}>
                {/* 헤더 */}
                <View style={styles.headerRight}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{shopName}33</Text>
                    <Text style={styles.headerSubtitle}>  {sort} · 7/14 - 7/21</Text>
                </View>
                {/*메인 이미지*/}    
                <Image style={styles.mainImage} source={{uri:mainImage}}/>

                {/* 메뉴 스크롤 */}
                <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>

                    {/* 메인 메뉴 */}
                    <View style={styles.menuContainer}>
                        <Text style={styles.menuName} numberOfLines={1}>{menuName}</Text>
                        <Image style={styles.menuImage} source={{uri:image}}/>
                        <View style={styles.priceBox}>
                            <Text style={styles.fullPrice}>{fullPrice}</Text>
                            <Text style={styles.salePrice}>{salePrice}</Text>
                        </View>
                    </View>

                    {/* 추가 메뉴 */}
                    {Submenu && Submenu.map((menu) => (
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

                  {/* 단골 바*/}
                  <View style={styles.rowBox}>
                    <View style={styles.dangolBar}>
                        <Text style={styles.barText}>단골</Text>
                        <Text style={styles.barNum}>3,948</Text>
                    </View>

                    <View style={styles.dangolBar}>
                        <Text style={styles.barText}>포스트</Text>
                        <Text style={styles.barNum}>417</Text>
                    </View>

                    <View style={styles.dangolBar}>
                        <Text style={styles.barText}>내 리뷰</Text>
                        <Text style={styles.barNum}>12</Text>
                    </View>

                    <View style={styles.dangolBar}>
                        <Text style={styles.barText}>포인트</Text>
                        <Text style={styles.barNum}>134,300</Text>
                    </View>

                    <View style={{flex:1}}>
                        <TouchableWithoutFeedback 
                        style={btn? styles.dangolTextButton_checked : styles.dangolTextButton } 
                        onPress={() => setBtn(!btn)}
                        >
                            {btn? <Text style={styles.btnText_cheched}>단골 중</Text> : 
                            <Text style={styles.btnText}>단골</Text>}
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            
            </View>
        </View>
    )
}