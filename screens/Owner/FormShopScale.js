import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import numInput from "../../hooks/numInput"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
        padding:15
    },
    rowBox:{
        flexDirection:"row",
        paddingVertical:20,
        justifyContent:"space-around",
    },
    scaleTitle:{
        fontSize:14,
        fontWeight:'bold',
        marginBottom:10
    },
    scaleBox:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-between",
        height: constants. height * 0.2
    },
})

export default () => {
    const chairInput = numInput('');
    const tableInput = numInput('');
    const scaleInput = numInput('');
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1}}
                enabled >
                <DismissKeyboard>
                    <View style={{height:'100%', justifyContent:"center"}}>
                        <View style={styles.rowBox}>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>의자 수</Text>
                                <FontAwesome5 name="chair" size={26} color="silver"/>
                                <ShadowInput {...chairInput} width={'50%'} placeholder={'개수'}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>테이블 수</Text>
                                <MaterialCommunityIcons name="format-text" size={34} color="silver"/>
                                <ShadowInput {...tableInput} width={'50%'} placeholder={'개수'}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>1회전 인원</Text>
                                <FontAwesome5 name="users" size={26} color="silver"/>
                                <ShadowInput {...scaleInput} width={'50%'} placeholder={'명'}/>
                            </View>
                        </View>
                        <BasicButton text={'제출 하기'} />
                    </View>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};