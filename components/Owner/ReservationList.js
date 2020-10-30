import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import { RESERVATION_LIST } from "../../screens/Owner/OwnerQueries";
import ScreenLoader from "../Custom/ScreenLoader";

const WIDTH = constants.width - 20;
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginVertical:10,
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
    headerRight:{
        alignItems:"flex-end",
        marginRight:5
    },
    state:{
        fontSize:16,
    }
})

export default ({ year, month }) => {
    const { data, loading, error } = useQuery(RESERVATION_LIST,{
        variables:{
            date: year + '-' + ('0' + (month + 1)).slice(-2)
        },
        fetchPolicy:"network-only"
    });
    
    const renderItem = ({ item }) => {
        return(
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Image style={styles.mainImage} source={{uri: item.profile.mainImage}} />
                <View>
                    <View style={styles.titleAlign}>
                        <Text style={styles.headerTitle} numberOfLines={1}>{item.profile.profileName}</Text>
                        <Text style={styles.headerSubtitle}>{item.profile.sector}</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>{item.firstDate.slice(-5).replace('-', '/')} ~ {item.lastDate.slice(-5).replace('-', '/')}</Text>
                </View>
            </View>
            <View style={styles.headerRight}>
                <Text style={styles.state}>{item.isCancelled? "예약 취소" : item.isPaid ? "입금 완료" : "예약 완료"}</Text>
                <Text style={styles.headerSubtitle}>{item.totalPrice}</Text>
            </View>
        </View>
    )};

    const emptyComponent = () => (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Caption>내역이 없습니다</Caption>
        </View>
    )
    return (
        <>
        {loading? <ScreenLoader/> : 
        <FlatList 
        data={data?.reservationList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:10, flexGrow:1}}
        ListEmptyComponent={emptyComponent}
    />}
        </>
    )
}
