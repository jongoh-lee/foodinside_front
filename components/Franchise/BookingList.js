import { useQuery } from "@apollo/react-hooks";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import constants from "../../constants";
import { BOOKING_LIST } from "../../screens/Franchise/ProfileQueries";
import BasicButton from "../Custom/BasicButton";
import Caption from "../Custom/Caption";
import ScreenLoader from "../Custom/ScreenLoader";

const styles = StyleSheet.create({
    box:{
        paddingVertical:20,
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7",
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        paddingBottom:10
    },
    reserveBox:{
        padding:5,
        marginLeft:10,
    },
    paymentBar:{
        flex:1,
        flexDirection:"row",
        paddingTop:10
    },
    paymentBox:{
        flex:1,
    },
    captionStyle:{
        paddingBottom: 5
    }
});

export default ({ year, month }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { data, loading, error, refetch } = useQuery(BOOKING_LIST,{
        variables:{
            date: year + '-' + ('0' + (month + 1)).slice(-2)
        },
        fetchPolicy:"network-only"
    });
    const navigation = useNavigation();

    const refresh = async () => {
        try {
          setRefreshing(true);
          await refetch()
        } catch(e){
          console.log(e, "입점업체 예약 내역 에러");
        } finally {
          setRefreshing(false);
        }
      }

    const renderItem = ({ item }) => {
        const { firstDate, lastDate, totalPrice, isCancelled, isPaid, owner, profile, prices } = item;
        const dateList = prices.map(el => el.dateString);
        const mainImage = owner.shopImages.filter(image => image.type === "EXTERIOR")[0]
        //얘약 상황: 영업 중, 영업 완료 추가
        return(
        <View style={styles.box}>
            <Text style={styles.title}>{owner.shopName} in {owner.district}</Text>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <Image 
                    style={{width: constants.width / 2, height:constants.width / 2.3, borderRadius:10}}
                    resizeMode={"cover"}
                    source={{uri: mainImage.url}}
                />
                <View style={{flex:1, height:constants.width / 2.3, justifyContent:"flex-end",}}>
                    <View style={styles.reserveBox}>
                        <Caption style={styles.captionStyle}>시작일</Caption>
                        <Text>{firstDate.replace(/-/gi, '/')}</Text>
                    </View>

                    <View style={styles.reserveBox}>
                        <Caption style={styles.captionStyle}>종료일</Caption>
                        <Text>{lastDate? lastDate.replace(/-/gi, '/') : firstDate?.replace(/-/gi, '/')}</Text>
                    </View>

                    <View style={[styles.reserveBox, {paddingBottom:0}]}>
                        <Caption style={styles.captionStyle}>예약일</Caption>
                        <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                        {dateList.map(dateString => <Text key={dateString}>{dateString.slice(-5).replace("-", "/") + ' '}</Text>)}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.paymentBar}>
                <View style={styles.paymentBox}>
                    <Caption style={styles.captionStyle}>결제금액</Caption>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>{totalPrice}</Text>
                </View>

                <View style={styles.paymentBox}>
                    <Caption style={styles.captionStyle}>예약상태</Caption>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>{isCancelled ? "예약취소" : isPaid? "입점승인" : "예약완료"}</Text>
                </View>

                <View style={[styles.paymentBox, isCancelled ? null : {justifyContent:"flex-end"}]}>
                    {isCancelled ? (
                        <>
                            <Caption style={styles.captionStyle}>환불예정</Caption>
                            <Text style={{fontSize:18, fontWeight:"bold"}}>0원</Text>
                        </>
                    ) : <BasicButton text={"예약 취소"} marginVertical={0} padding={5} onPress={() => navigation.navigate("예약취소", {
                        ...item,
                        mainImage
                    })}/>}
                </View>
            </View>
        </View>
        )
    };

    const emptyComponent = () => (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Caption>내역이 없습니다</Caption>
        </View>
    )
    return (
        <>
        {loading? <ScreenLoader/> : 
        <FlatList 
            data={data?.bookingList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding:10, flexGrow:1}}
            ListEmptyComponent={emptyComponent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        />}
        </>
    )
}
