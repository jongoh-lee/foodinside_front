import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView} from "react-native";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, } from "react-native-paper";
import { COMPLETE_SHOP_REFUND } from "./OwnerQueries";
import { useMutation } from "@apollo/react-hooks";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    box:{
        paddingVertical:25,
    },
    rowBox:{
        flexDirection:"row",
        justifyContent:"space-around",
        paddingHorizontal:5,
        paddingBottom:50
    },
    title:{
        fontSize:22,
        fontWeight:"bold",
        paddingBottom:20,
        alignSelf:"center"
    },
    rowBox_under:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    refundInner:{
        justifyContent:"space-around",
        alignItems:"center",
    },
    redText:{
        fontSize:15,
        color:"#e0383e",
        paddingBottom:10
    },
    text:{
        fontSize:15,
    },
    warnning:{
        fontSize:18,
        color:"#e0383e",
    },
})

export default ({ route, navigation }) => {
    const [refundAgree, setRefundAgree] = React.useState(route.params.refundAgree? route.params.refundAgree : false );
    const [loading, setLoading] = React.useState(false);
    const [completeShopRefundMutation] = useMutation(COMPLETE_SHOP_REFUND);
    const handleRefund = async () => {
        try {
            setLoading(true);
            const {
                data : { completeShopRefund }
            } = await completeShopRefundMutation({
                variables:{
                    refundAgree: refundAgree
                }
            });
            if(completeShopRefund){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 환불 동의 에러:",e)
        } finally {
          setLoading(false);
        }
    }
    return(
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{justifyContent:"center", padding:15}}>
            <Text style={styles.title}>예약 취소 시 환불 금액</Text>

            <View style={styles.box}>
                <View style={styles.rowBox}>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>8일 전</Text>
                        <Text style={styles.text}>100%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>7일 전</Text>
                        <Text style={styles.text}>90%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>6일 전</Text>
                        <Text style={styles.text}>80%</Text>
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>5일 전</Text>
                        <Text style={styles.text}>70%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>4일 전</Text>
                        <Text style={styles.text}>60%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>3일 전</Text>
                        <Text style={styles.text}>50%</Text>
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>2일 전</Text>
                        <Text style={styles.text}>40%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>1일 전</Text>
                        <Text style={styles.text}>0%</Text>
                    </View>
                    <View style={styles.refundInner}>
                        <Text style={styles.redText}>당일</Text>
                        <Text style={styles.text}>0%</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.rowBox_under}>
                        <Text style={styles.warnning}>영업 중: 0%</Text>
                    </View>
                </View>

                <View style={{flexDirection:"row", alignItems:"center",  justifyContent:"space-around", paddingTop:20}}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <RadioButton
                            value={true}
                            status={ refundAgree === true ? 'checked' : 'unchecked' }
                            color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'}
                            onPress={() => setRefundAgree(true)}
                            disabled={loading}
                        />
                        <Text style={{fontWeight:"bold"}}>동의</Text>
                    </View>

                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <RadioButton
                            value={false}
                            status={ refundAgree === false ? 'checked' : 'unchecked' }
                            color={'#05e6f4'} uncheckedColor={'rgba(5, 230, 244, .3)'}
                            onPress={() => setRefundAgree(false)}
                            disabled={loading}
                        />
                        <Text style={{fontWeight:"bold"}}>동의 안함</Text>
                    </View>
                </View>
            </View>
            <BasicButton text={'제출 하기'} onPress={() => handleRefund()} loading={loading} disabled={refundAgree? loading : true}/>
        </ScrollView>
    </SafeAreaView>    
)};