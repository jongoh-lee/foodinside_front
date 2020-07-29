import * as React from "react";
import { StyleSheet, View, Text} from "react-native";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        padding:15,
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

export default () => (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{justifyContent:"center", flex:1}}>
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
            </View>
            <BasicButton text={'동의'}/>
        </ScrollView>
    </View>    
)