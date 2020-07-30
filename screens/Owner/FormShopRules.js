import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import useInput from "../../hooks/useInput";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    box:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        paddingBottom:20
    },
    rowBox:{
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:15,
        width:'50%',
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:15
    },
    text:{
        fontSize:15,
        textAlign:"center",
        marginTop: 4
    },
})

export default ({ route }) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, paddingBottom:5, justifyContent:"center"}}
                keyboardVerticalOffset={50}
                enabled >
                <DismissKeyboard>
                    <ScrollView contentContainerStyle={{padding:15}}>
                        <View style={styles.box}>
                            <View style={styles.rowBox}>
                                <Text style={styles.title}>첫날 입점 시간</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput padding={5} width={'25%'} keyboardType={"numeric"}/>
                                    <Text style={{color: '#666'}}> 시</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>마지막날 퇴점 시간</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput padding={5} width={'25%'} keyboardType={"numeric"}/>
                                    <Text style={{color: '#666'}}> 시</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>최소 예약일</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput padding={5} width={'25%'} keyboardType={"numeric"} />
                                    <Text style={{color: '#666'}}> 일</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>최대 예약일</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput value={"7"} editable={false} padding={5} width={'25%'} />
                                    <Text style={{color: '#666'}}> 일</Text>
                                </View>
                            </View>
                        </View>

                        <BasicButton text={'제출 하기'} />
                    </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};