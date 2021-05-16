import * as React from "react";
import { View, StyleSheet, Text, RefreshControl, Image, TouchableOpacity, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FOLLOWER } from "./VisitorQueries";
import UserSummary from "../../components/Visitor/UserSummary";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import Caption from "../../components/Custom/Caption";
import constants from "../../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const WIDTH = constants.width - 65

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff",
    },
    dashBoard:{
        borderRadius:15,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 10,
        backgroundColor:'#ffffff',
        padding:15,
    },
    dashBoardMoney:{
        flexDirection:"row",
        marginBottom:20
    }, 
    dashBoardCoin:{
        width: '33%',
        alignItems:"center",
        justifyContent:"center"
    },
    numberText:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:4
    },
    dashBoardRowBox:{
        flexDirection:"row",
        marginTop:5,
        alignItems:"center"
    },
    dashBoardDepositAndWithdraw:{
        width: '50%',
        justifyContent:"center",
        alignItems:"center",
        padding:1,
        flexDirection:"row"
    },
    depositText:{
        fontSize:16,
        color: "#000000",
        marginRight:5
    },
    withdrawText:{
        fontSize:16,
        color: "#000000",
        marginRight:5
    },
    tokenBox:{
        padding: 10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomWidth:0.5,
        borderBottomColor:"#E0E0E0"
    },
    tokenImage:{
        width: WIDTH * 0.2, 
        height: WIDTH * 0.1, 
        borderRadius:10, 
        backgroundColor:"#E0E0E0", 
        marginRight:5
    },
    tokenName:{
        width:WIDTH * 0.6,
    },
    tokenAmount:{
        width:WIDTH * 0.2, 
        alignItems:"flex-end",
    },
    tokenText:{
        fontSize: 16,
        fontWeight:"bold"
    }
});

export default ({route}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    
    // const refresh = async () => {
    //     try {
    //       setRefreshing(true);
    //       await refetch()
    //     } catch(e){
    //       console.log(e, "팔로워 새로고침 에러");
    //     } finally {
    //       setRefreshing(false);
    //     }
    // }

    const renderHeader = ({  }) => (
        <View style={styles.dashBoard}>
            <View style={styles.dashBoardMoney}>
                <View style={styles.dashBoardCoin}>
                    <View style={{width:60, height:60, borderRadius:30, backgroundColor: "rgb(249, 249, 251)", justifyContent:"center", alignItems:"center"}}>
                        <Image style={{width:30, height:30, resizeMode:"contain", }} source={require('../../assets/Icons/clocheBlue.png')} />
                    </View>
                </View>

                <View style={styles.dashBoardCoin}>
                    <View style={{alignItems:"flex-end"}}>
                        <Caption>암호화폐(C)</Caption>
                        <Text style={styles.numberText}> {route.params.wallets.length > 0 ? route.params.wallets?.map(el => (el.incoming - el.outgoing)).reduce((a, b) => a + b , 0) : 0}</Text>
                    </View>
                </View>

                <View style={styles.dashBoardCoin}>
                    <View style={{alignItems:"flex-end"}}>
                        <Caption>보유자산(₩)</Caption>
                        <Text style={styles.numberText}>0</Text>
                    </View>
                </View>
            </View>

            <View style={styles.dashBoardRowBox}>
                <TouchableOpacity style={styles.dashBoardDepositAndWithdraw} onPress={()=> Alert.alert('알림','정식 버전을 기대해 주세요',[{text:'확인'}])}>
                    <Text style={styles.depositText}>충전하기</Text>
                    <Ionicons name="md-log-in" size={20} color="black" />
                </TouchableOpacity>
                
                {/* <View style={{borderWidth:0.5, borderColor:"#666"}}/> */}
                <View>
                    <Text style={{color:"#666", fontWeight:"300", fontSize:16}}>|</Text>
                </View>

                <TouchableOpacity style={styles.dashBoardDepositAndWithdraw} onPress={()=> Alert.alert('알림','정식 버전을 기대해 주세요',[{text:'확인'}])}>
                    <Text style={styles.withdrawText}>출금하기</Text>
                    <Ionicons name="md-log-out" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderItem = ({ item }) => {
        console.log(item);
        return (
        <View style={styles.tokenBox}>
            <View>
                <Image
                    style={styles.tokenImage}
                    source={{uri:item.profile.mainImage}}
                    />
            </View>

            <View style={styles.tokenName}>
                <Text style={styles.tokenText}>{item.profile.profileName}</Text>
            </View>

            <View style={styles.tokenAmount}>
                <Caption style={{fontSize:12, marginBottom:3}}>암호화폐(C)</Caption>
                <Text style={styles.tokenText}>{item.incoming ? item.incoming : 0}</Text>
            </View>
        </View>
    )};
    
    return (
        <View style={styles.container}>
                <FlatList 
                data={route.params.wallets.sort((a,b) => b.incoming - a.incoming)}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListHeaderComponentStyle={[{padding:10}, route.params.wallets.length > 0 ? {borderBottomWidth:0.5, borderColor:"#E0E0E0"} : null]}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex:1, padding:15}}
                
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}
                ListEmptyComponent={() => <View style={{flexGrow:1, justifyContent:"center", alignItems:"center"}}><Caption>목록이 없습니다</Caption></View>}
            />
        </View>
    )
}