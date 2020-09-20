import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform, SafeAreaView} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import useInput from "../../hooks/useInput";
import constants from "../../constants";

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
    textInput:{
        fontSize:14,
        width:constants.width * 0.9,
        borderRadius:10,
        padding:10,
        borderWidth:1,
        borderColor:"#e7e7e7",
        justifyContent:'flex-start'
      },
})

export default ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
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
                                <Text style={styles.textInput}>{route.params.address}</Text>

                                <Caption style={styles.caption}>나머지 주소</Caption>
                                <Text style={styles.textInput}>{route.params.addressDetail}</Text>
                            </View>
                            <BasicButton text={'확인'} onPress={() => navigation.goBack()}/>
                        </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </SafeAreaView>    
    )
};