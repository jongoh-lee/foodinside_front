import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import numInput from "../../hooks/numInput";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_RULE } from "./OwnerQueries";

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

export default ({ route, navigation }) => {
    const checkInInput = numInput(route.params.checkIn? String(route.params.checkIn) : '');
    const checkOutInput = numInput(route.params.checkOut? String(route.params.checkOut) : '');
    const minReserveInput = numInput(route.params.minReserve? String(route.params.minReserve) : '');
    const [loading, setLoading] = React.useState(false);
    const [completeShopRuleMutation] = useMutation(COMPLETE_SHOP_RULE);
    const handleRule = async () => {
        try {
            setLoading(true);
            const {
                data : { completeShopRule }
            } = await completeShopRuleMutation({
                variables:{
                    checkIn:Number(checkInInput.value),
                    checkOut:Number(checkOutInput.value),
                    minReserve:Number(minReserveInput.value)
                }
            });
            if(completeShopRule){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 규칙 설정 에러:",e)
          setInactive(false)
        } finally {
          setLoading(false);
        }
    }
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
                                    <ShadowInput {...checkInInput} padding={5} editable={!loading} width={'25%'} keyboardType={"numeric"} placeholder={'9'} returnKeyType={'done'}/>
                                    <Text style={{color: '#666'}}> 시</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>마지막날 퇴점 시간</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput {...checkOutInput} padding={5} editable={!loading} width={'25%'} keyboardType={"numeric"} placeholder={'23'} returnKeyType={'done'}/>
                                    <Text style={{color: '#666'}}> 시</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>최소 예약일</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput {...minReserveInput} padding={5} editable={!loading} width={'25%'} keyboardType={"numeric"} placeholder={'2'} returnKeyType={'done'}/>
                                    <Text style={{color: '#666'}}> 일</Text>
                                </View>
                            </View>

                            <View style={styles.rowBox}>
                                <Text style={styles.title}>최대 예약일</Text>
                                <View style={{flexDirection:"row", alignItems:"center"}}>
                                    <ShadowInput value={"7"} editable={false} padding={5} width={'25%'}  returnKeyType={'done'}/>
                                    <Text style={{color: '#666'}}> 일</Text>
                                </View>
                            </View>
                        </View>

                        <BasicButton text={'제출 하기'} onPress={handleRule} loading={loading} disabled={checkInInput.value && checkOutInput.value && minReserveInput.value? loading : true} />
                    </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};