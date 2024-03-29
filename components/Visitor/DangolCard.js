import * as React from "react";
import { StyleSheet, View, Image, Text, Platform } from "react-native";
import constants from "../../constants";
import { ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DangolBar from "../Custom/DangolBar";

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
        alignItems: "baseline",
    },
    mainImage: {
        width: Platform.isPad ? WIDTH * 0.1 : WIDTH * 0.2,
        height: Platform.isPad ? WIDTH * 0.05 : WIDTH * 0.11,
        marginRight: 8,
        borderRadius:10,
        backgroundColor:'#e0e0e0', 
    },
    headerTitle:{
        maxWidth: WIDTH * 0.55,
        fontWeight:"500",
        fontSize:16,
    },
    headerSubtitle:{
        color:'#666',
        fontSize:12,
    },
    dateChips:{
        margin:2,
        padding:2,
        borderRadius:8, 
        marginHorizontal:2, 
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 3,
        backgroundColor:"#ffffff"
    },
    menuScroll:{
        flexDirection:"row",
    },
    menuContainer:{
        width: (WIDTH - 20) /3,
        marginRight:5,
        alignItems:"center"
    },
    menuImage:{
        width: (WIDTH - 20) /3,
        height: (WIDTH - 20) / 3,
        resizeMode:"cover",
        borderRadius: 15,
        backgroundColor:'#e0e0e0', 
    },
    menuName:{
        fontSize:14,
        marginVertical:3,
    },
    priceBox:{
        flexDirection:"row",
        width: (WIDTH - 20) /3,
        fontSize:14,
        padding:5,
        justifyContent:"space-between"
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
        padding:5
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
        marginRight:8,
        opacity: .9,
    },
    dangolLogo_checked:{
        width:10,
        resizeMode:"contain",
        marginRight:8,
        opacity: .4,
    },
    logoText:{
        color:"rgba(0, 0, 0, .9)",
        fontSize:14
    },
    logoText_checked:{
        color:"rgba(0, 0, 0, .4)",
        fontSize:14
    },
})

// 내 정보 중 단골 업체 정보와 해당 업체의 단골/ 포스팅 수 + 내 포스팅 수 + 좋아요 수 + 적립 포인트
export default ({ id, mainImage, profileName, sector,  menuName, menuImage, fullPrice, salePrice, submenus, postsCount, myPosts, dangolCount, isDangol, isSelf, bookings, myWallet, wallets}) => {
    const [logoBtn, setLogoBtn] = React.useState(false);
    const navigation = useNavigation();
    let now = new Date()
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('')}`
    const todayString = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')}`
    const [dateList, setDateList] = React.useState([]);

    React.useEffect(() => {
        let _dateList = bookings?.reduce((arr, booking) => {
            if(!booking.isCancelled){
                booking.prices.map(price => price.dateString.replace(/[^0-9]/g,'') - today >= 0 ?  arr.push(price.dateString) : null);
            }
            return arr
        }, []);
        setDateList(_dateList)
    },[bookings])

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => navigation.navigate("프로필 보기", {
                    seeFullProfile:{
                        id,
                        profileName,
                        sector,
                        isSelf
                    }
                })}>
                    {/* 헤더 */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image style={styles.mainImage} source={{ uri: mainImage }}/>
                                <View style={{maxWidth: WIDTH * 0.6}}>
                                    <View style={styles.titleAlign}>
                                        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{profileName}</Text>
                                        <Text style={styles.headerSubtitle}>{sector}</Text>
                                    </View>
                                </View>
                        </View>
                        {dateList.indexOf(todayString) > -1 ? <Caption style={{color:'red'}}>영업중</Caption> : <Caption style={{color:'#666'}}>준비중</Caption>}
                    </View>
                </TouchableOpacity>

                
                    {dateList.length > 0 ? 
                    <View style={{flexDirection:"row", padding: 5, alignItems:"center" }}>
                        <Text style={styles.headerSubtitle}>영업일: </Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection:"row"}}>
                            {dateList.sort().map(date => (
                                <View key={date} style={styles.dateChips}>
                                    <Text style={{fontSize:11, color: "#666"}}>{date.slice(-5).replace('-','/')}</Text>
                                </View>
                                ))}
                        </ScrollView>
                    </View> : null}
                    
            
            {/* 메뉴 스크롤*/}
            <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>
            
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
            
            {/* 단골바 */}
            <DangolBar id={id} isDangol={isDangol} dangolCount={dangolCount} isSelf={isSelf} postsCount={postsCount} myPosts={myPosts} myWallet={myWallet} wallets={wallets}/>

            </View>
        </View>
    )
}