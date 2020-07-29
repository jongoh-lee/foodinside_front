import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import numInput from "../../hooks/numInput"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    inner:{
        paddingHorizontal:15,
        paddingTop:15
    },
    box:{
        paddingBottom:30,
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
    },
    caption:{
        paddingBottom:5
    },
    text:{
        fontSize:15,
        textAlign:"center",
        marginTop: 4
    },
    warning:{
        fontSize:12,
        color:'#e0383e',
        marginVertical:10,
    },
})

export default () => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, paddingBottom:5}}
                enabled >
                <DismissKeyboard>
                    <View style={styles.inner}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.box}>
                                <Text style={styles.title}>음식점 이름을 정해주세요</Text>
                                <Caption style={styles.caption}>인테리어와 업종을 합쳐 이름을 정해 주세요</Caption>
                                <ShadowInput placeholder={'ex) 모던하고 깔끔한 분위기의 카페'}  textAlign={"left"} />
                            </View>

                            <View style={styles.box}>
                                <Text style={styles.title}>주변 골목/상권/전철역을 알려주세요</Text>
                                <Caption style={styles.caption}>키워드를 1개만 입력해 주세요</Caption>
                                <ShadowInput placeholder={`ex) '경리단길', '이태원역', 'OO대학교 상권'`}  textAlign={"left"}/>
                            </View>

                            <View style={styles.box}>
                                <Text style={[styles.title, {paddingBottom:5}]}>공간을 소개해 주세요  <Caption>300자 이내</Caption></Text>
                                <ShadowInput placeholder={`ex)\n \n경리단길에 위치한 일반 음식점 입니다. \n\n기존 한식을 운영하던 가게라 필요한 도구는...`}  textAlign={"left"} multiline={true} returnKeyType={'none'} maxLength={300}/>
                            </View>

                            <View style={styles.box}>
                                <Text style={[styles.title, {paddingBottom:5}]}>예약 주의사항을 알려주세요</Text>
                                <ShadowInput placeholder={`ex) '주차 공간이 없습니다', '입점 시간을 준수해 주세요'`}  textAlign={"left"} multiline={true} returnKeyType={'none'}/>
                            </View>

                            <View style={[styles.box, {paddingBottom:10}]}>
                                <Text style={[styles.title, {paddingBottom:5}]}>해시 태그 #</Text>
                                <ShadowInput placeholder={`ex) #네츄럴 #한식 #모던 #이태원`}  textAlign={"left"} multiline={true} returnKeyType={'none'} />
                            </View>

                            <BasicButton text={'제출 하기'} />
                        </ScrollView>
                    </View>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};