import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView} from "react-native"
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import numInput from "../../hooks/numInput"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_SCALE } from "./OwnerQueries";

export default ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);
    const chairInput = numInput(route.params.chairs? String(route.params.chairs) : '');
    const tableInput = numInput(route.params.tables? String(route.params.tables) : '');
    const scaleInput = numInput(route.params.scale? String(route.params.scale) : '');
    const [completeShopScaleMutation] = useMutation(COMPLETE_SHOP_SCALE);
    const handleScale = async () => {
        try {
            setLoading(true);
            const {
                data : { completeShopScale }
            } = await completeShopScaleMutation({
                variables:{
                    chairs:Number(chairInput.value),
                    tables:Number(tableInput.value),
                    scale:Number(scaleInput.value)
                }
            });
            if(completeShopScale){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 스케일 에러:",e)
        } finally {
          setLoading(false);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, justifyContent:"center"}}
                keyboardVerticalOffset={50}
                enabled >
                <DismissKeyboard>
                    <ScrollView>
                        <View style={styles.rowBox}>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>의자 수</Text>
                                <FontAwesome5 name="chair" size={26} color="silver"/>
                                <ShadowInput {...chairInput} editable={!loading} width={'50%'} placeholder={'개수'} keyboardType={"numeric"}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>테이블 수</Text>
                                <MaterialCommunityIcons name="format-text" size={34} color="silver"/>
                                <ShadowInput {...tableInput} editable={!loading} width={'50%'} placeholder={'개수'} keyboardType={"numeric"}/>
                            </View>
                            <View style={styles.scaleBox}>
                                <Text style={styles.scaleTitle}>1회전 인원</Text>
                                <FontAwesome5 name="users" size={26} color="silver"/>
                                <ShadowInput {...scaleInput} editable={!loading} width={'50%'} placeholder={'명'} keyboardType={"numeric"}/>
                            </View>
                        </View>
                        <BasicButton text={'제출 하기'} onPress={() => handleScale()} loading={loading} disabled={chairInput.value?.length > 0 && tableInput.value?.length > 0 && scaleInput.value?.length > 0 ? loading : true}/>
                    </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </SafeAreaView>    
    )
};

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
});
