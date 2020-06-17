import * as React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import MapView, {Marker} from "react-native-maps";
import constants from "../../constants";
import Calendar from "../Calendar";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
    constainer:{
        paddingHorizontal:20
    },
    box:{
        paddingVertical:25,
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7",
    },
    rowBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:5,
    },
    scaleInner:{
        flexDirection:"row",
        alignItems:"center",
    },
    scaleText:{
        paddingLeft:12
    },
    title:{
        fontSize:22,
        fontWeight:"bold",
        paddingBottom:20
    },
    subtitle:{
        fontSize:18,
    },
    text:{
        fontSize:15,
    },
    warnText:{
        fontSize:15,
        color:"#e0383e"
    },
    mapBox:{
        height:constants.height / 3,
        overflow:"hidden",
        borderRadius:15,
        marginBottom:10
    },
    map:{
        ...StyleSheet.absoluteFillObject,
        height:'125%'
    },
    ruleInner:{
        justifyContent:"space-around",
        alignItems:"center",
    },
    greyText:{
        fontSize:15,
        color:"#666",
        paddingBottom:10
    },
    rowBox_under:{
        flexDirection:"row",
        justifyContent:"space-around",
        paddingTop:20,
    },
    refundInner:{
        justifyContent:"space-around",
        alignItems:"center",
    },
    warnning:{
        fontSize:16,
        color:"#e0383e",
    },
    calendar:{
        borderRadius:15,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        elevation: 5,
        overflow: Platform.OS === 'android'? "hidden" : null
    }
})

export default ({ tables, chairs, scale, description, precaution, address, checkIn, checkOut, minCheckIn, maxCheckIn, refund }) => {
    return (
        <View style={styles.constainer}>
            <View style={styles.box}>
                <Text style={styles.title}>규모</Text>

                <View style={styles.rowBox}>
                    <View style={styles.scaleInner}>
                        <FontAwesome5 name="chair" size={26} color="silver"/>
                        <View style={styles.scaleText}>
                            <Text style={styles.text}>의자</Text>
                            <Text style={styles.text}>{chairs}개</Text>
                        </View>
                    </View>

                    <View style={styles.scaleInner}>
                        <MaterialCommunityIcons name="format-text" size={34} color="silver"/>
                        <View style={styles.scaleText}>
                            <Text style={styles.text}>테이블</Text>
                            <Text style={styles.text}>{tables}개</Text>
                        </View>
                    </View>

                    <View style={styles.scaleInner}>
                        <FontAwesome5 name="users" size={26} color="silver"/>
                        <View style={styles.scaleText}>
                            <Text style={styles.text}>1회전</Text>
                            <Text style={styles.text}>{scale}석</Text>
                        </View>
                    </View>
                </View>

            </View>

            <View style={styles.box}>
                <Text style={styles.title}>음식점 소개</Text>
                <Text style={styles.text}>{description}</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>주의사항</Text>
                <Text style={styles.warnText}>{precaution}</Text>
            </View>
        
            <View style={styles.box}>
                <Text style={styles.title}>위치</Text>
                <View style={styles.mapBox}>
                    <MapView 
                    style={styles.map}
                    initialRegion={{
                      latitude:37.537140,
                      longitude:126.986935,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.01,}}
                    scrollEnabled={false}>
                    <Marker
                    coordinate={{latitude: 37.537140, longitude: 126.986935}}
                    title="this is a marker"
                    description="this is a marker example"/>
                    </MapView>
                </View>
                <Text style={styles.subtitle}>{address}</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>입점 규칙</Text>
                
                <View style={styles.rowBox}>
                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>체크인</Text>
                        <Text style={styles.subtitle}>{checkIn}</Text>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>체크아웃</Text>
                        <Text style={styles.subtitle}>{checkOut}</Text>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>최소 예약</Text>
                        <Text style={styles.subtitle}>{minCheckIn}일</Text>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>최대 예약</Text>
                        <Text style={styles.subtitle}>{maxCheckIn}일</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>환불 정책</Text>

                <View style={styles.rowBox}>
                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>8일</Text>
                        <Text style={styles.text}>{refund[0]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>7일</Text>
                        <Text style={styles.text}>{refund[1]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>6일</Text>
                        <Text style={styles.text}>{refund[2]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>5일</Text>
                        <Text style={styles.text}>{refund[3]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>4일</Text>
                        <Text style={styles.text}>{refund[4]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>3일</Text>
                        <Text style={styles.text}>{refund[5]}%</Text>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>2일</Text>
                        <Text style={styles.text}>{refund[6]}%</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.rowBox_under}>
                        <Text style={styles.warnning}>1일: {refund[7]}%</Text>
                        <Text style={styles.warnning}>당일: {refund[8]}%</Text>
                        <Text style={styles.warnning}>영업 중: {refund[9]}%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>입점 하기</Text>
                <View style={styles.calendar}>
                    <Calendar calendarWidth={constants.width - 40}/>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>후기(121개)</Text>
            </View>
        </View>
    )
}