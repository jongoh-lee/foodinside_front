import * as React from "react";
import { StyleSheet, View, Image, Text,  } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
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
        justifyContent:"flex-start",
        paddingLeft:5,
    },
    barText:{
        fontSize:12,
        color:'rgba(0, 0, 0, .4)',
        lineHeight:14
    },
    barNum:{
        marginTop:2,
        fontWeight:"600",
        fontSize:14,
        justifyContent:"center",
    },

    //단골 버튼
    logoRow:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:"auto",
        marginRight:5
      },
      dangolLogo:{
        width:constants.width / 40,
        resizeMode:"contain",
        opacity: .9,
      },
      dangolLogo_checked:{
        width:constants.width / 40,
        resizeMode:"contain",
        opacity: .4,
      },
      logoText:{
        fontSize:15,
        color:"rgba(0, 0, 0, .9)",
        paddingLeft:10,
      },
      logoText_checked:{
        fontSize:15,
        color:"rgba(0, 0, 0, .4)",
        paddingLeft:10,
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
                <View style={styles.headerRight}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{name}3</Text>
                    <Text style={styles.headerSubtitle}>  {sort} · 7/14 - 7/21</Text>
                </View>
                {/*메인 이미지*/}    
                <Image style={styles.mainImage} source={{uri:mainImage}}/>

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
                        <Text style={styles.barNum}>17</Text>
                    </View>

                    <View style={styles.dangolBar}>
                        <Text style={styles.barText}>포인트</Text>
                        <Text style={styles.barNum}>134,300</Text>
                    </View>

                    <View style={{flex:1, alignSelf:"center"}}>
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
      
                {/* 메뉴 스크롤 */}
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
            
            </View>
        </View>
    )
}