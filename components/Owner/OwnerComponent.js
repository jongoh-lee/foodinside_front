import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, View, Text, Platform, Image } from "react-native";
import MapView, {Marker} from "react-native-maps";
import constants from "../../constants";
import Calendar from "../Calendar";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Facility from "./Facility";
import Swiper from 'react-native-swiper';
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
    imageBox:{
        width: constants.width,
        height: constants.height * 0.45,
    },
    image:{
        width: '100%',
        height: '100%',
        resizeMode:"cover"
    },
    tabBar:{
        flexDirection:"row",
        justifyContent:"space-around",
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7",
    },
    tabBox:{
        width: constants.width / 6,
        alignItems:"center",
    },
    activeTab:{
        fontSize:14,
        fontWeight:"bold",
        marginVertical:12,
    },
    inactiveTab:{
        fontSize:14,
        fontWeight:"bold",
        color:"#666",
        marginVertical:12,
    },
    box:{
        paddingVertical:25,
        paddingHorizontal:20,
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
        fontSize:14,
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
        fontSize:14,
        color:"#e0383e",
    },
    calendar:{
        borderRadius:15,
        margin:5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 3,
        overflow: Platform.OS === 'android'? "hidden" : "hidden"
    }
})

export default ({ shopImages, facility, tables, chairs, scale, shopName, district, description, precaution, address, checkIn, checkOut, minReserve, }) => {
    const [tabName, setTabName] = React.useState("EXTERIOR");
    const [index, setIndex] = React.useState(0);
    const exterior= React.useState(shopImages.filter(el => el["type"] === 'EXTERIOR').length)
    const hall= React.useState(shopImages.filter(el => el["type"] === 'HALL').length)
    const kitchen= React.useState(shopImages.filter(el => el["type"] === 'KITCHEN').length)
    const tableware= React.useState(shopImages.filter(el => el["type"] === 'TABLEWARE').length)
    const cleaner= React.useState(shopImages.filter(el => el["type"] === 'CLEANER').length)
    const indexChanger = ( tab ) => {
        setTabName(tab)
        if(tab === 'EXTERIOR') return setIndex(0)
        if(tab === 'HALL') return setIndex(exterior[0] + 1);
        if(tab === 'KITCHEN') return setIndex(exterior[0] + hall[0] + 1);
        if(tab === 'TABLEWARE') return setIndex(exterior[0] + hall[0] + kitchen[0] + 1);
        if(tab === 'CLEANER') return setIndex(exterior[0] + hall[0] + kitchen[0] + tableware[0] + 1);
        if(tab === 'ECT') return setIndex(exterior[0] + hall[0] + kitchen[0] + tableware[0] + cleaner[0] + 1);
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={1}>
            <View style={styles.imageBox}>
                <Swiper key={index} index={index} paginationStyle={{bottom:10}} dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3}} />} activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}>
                    {shopImages.map(photo => <Image key={photo.id} style={styles.image} source={{uri:photo.url}}/>)}
                </Swiper>
            </View>

            <View style={styles.tabBar}>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('EXTERIOR')}>
                  <Text style={tabName === 'EXTERIOR'? styles.activeTab : styles.inactiveTab}>외부</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('HALL')}>
                  <Text style={tabName ==='HALL'? styles.activeTab : styles.inactiveTab}>홀</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('KITCHEN')}>
                  <Text style={tabName ==='KITCHEN'? styles.activeTab : styles.inactiveTab}>주방</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('TABLEWARE')}>
                  <Text style={tabName ==='TABLEWARE'? styles.activeTab : styles.inactiveTab}>식기</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('CLEANER')}>
                  <Text style={tabName ==='CLEANER'? styles.activeTab : styles.inactiveTab}>청소도구</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> indexChanger('ECT')}>
                  <Text style={tabName ==='ECT'? styles.activeTab : styles.inactiveTab}>기타</Text>
              </TouchableWithoutFeedback>
            </View>
        
            <Facility {...facility}/>

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
                <Caption>음식점 이름</Caption>
                <Text style={{fontSize:18, paddingBottom:20}}>{shopName} in {district}</Text>
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
                        <Caption>{checkIn}시</Caption>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>체크아웃</Text>
                        <Caption>{checkOut}시</Caption>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>최소 예약</Text>
                        <Caption>{minReserve}일</Caption>
                    </View>

                    <View style={styles.ruleInner}>
                        <Text style={styles.greyText}>최대 예약</Text>
                        <Caption>7일</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>환불 정책</Text>

                <View style={styles.rowBox}>
                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>8일</Text>
                        <Caption>100%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>7일</Text>
                        <Caption>90%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>6일</Text>
                        <Caption>80%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>5일</Text>
                        <Caption>70%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>4일</Text>
                        <Caption>60%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>3일</Text>
                        <Caption>50%</Caption>
                    </View>

                    <View style={styles.refundInner}>
                        <Text style={styles.greyText}>2일</Text>
                        <Caption>40%</Caption>
                    </View>
                </View>

                <View>
                    <View style={styles.rowBox_under}>
                        <Text style={styles.warnning}>1일: 0%</Text>
                        <Text style={styles.warnning}>당일: 0%</Text>
                        <Text style={styles.warnning}>영업 중: 0%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>입점 하기</Text>
                <View style={styles.calendar}>
                    <Calendar />

                    <View style={{position:"absolute", bottom:10, left:10, padding:10}}>
                        <Text style={{color:"black", fontWeight:"bold", fontSize:16}}>합계: 210,000</Text>
                    </View>

                    <View style={{position:"absolute", bottom:10, right:10, padding:10, borderRadius:10, backgroundColor:"#05e6f4"}}>
                        <Text style={{color:"#ffffff"}}>예약하기</Text>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Text style={styles.title}>후기(121개)</Text>
            </View>
        </ScrollView>
    )
}