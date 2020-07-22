import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import numInput from "../../hooks/numInput"
import SquareInput from "../../components/Custom/SquareInput";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import AuthInput from "../../components/Custom/AuthInput";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
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
        alignItems:"center",
        justifyContent:"space-between",
    },
    scaleText:{
        paddingLeft:12
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
                                <AuthInput width={0.1}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>테이블 수</Text>
                                <MaterialCommunityIcons name="format-text" size={34} color="silver"/>
                                <AuthInput width={0.1}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>1회전 인원</Text>
                                <FontAwesome5 name="users" size={26} color="silver"/>
                                <AuthInput width={0.1}/>
                            </View>
                        </View>
                    </View>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};