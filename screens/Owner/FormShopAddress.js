import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import useInput from "../../hooks/useInput";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    inner:{
        paddingHorizontal:15,
    },
    box:{
        paddingBottom:30,
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
    },
    caption:{
        paddingBottom:5,
        paddingTop:15
    },
    text:{
        fontSize:15,
        textAlign:"center",
        marginTop: 4
    },
})

export default ({ route }) => {
    const addressInput = useInput(route.params.address);
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1, paddingBottom:5,}}
            keyboardVerticalOffset={50}
            enabled >
                <DismissKeyboard>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
                            <View style={[styles.box, {paddingTop:15}]}>
                                <Text style={styles.title}>음식점 위치를 입력해 주세요</Text>
                                <Caption style={styles.caption}>우편 번호</Caption>
                                <ShadowInput {...addressInput} placeholder={'ex) 모던하고 깔끔한 분위기의 카페'}  textAlign={"left"} />

                                <Caption style={styles.caption}>나머지 주소</Caption>
                                <ShadowInput {...addressInput} placeholder={'ex) 모던하고 깔끔한 분위기의 카페'}  textAlign={"left"} />
                            </View>
                            <BasicButton text={'제출 하기'} />
                        </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};