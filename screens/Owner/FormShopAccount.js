import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform, SafeAreaView} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import useInput from "../../hooks/useInput";
import constants from "../../constants";
import Caption from "../../components/Custom/Caption";
import DropDownPicker from 'react-native-dropdown-picker';
import ShadowInput from "../../components/Custom/ShadowInput";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_ACCOUNT } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import numInput from "../../hooks/numInput";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    inner:{
        paddingHorizontal:15,
    },
    box:{
        paddingBottom:15,
    },
    title:{
        fontWeight:'bold',
        fontSize:16,
    },
    caption:{
        paddingBottom:5,
        paddingTop:15,
        zIndex: -1
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
    //picker
    shadowBox:{
        width:"100%",
    },
})

export default ({ navigation, route }) => {
    const [bank, setBank] = React.useState(route.params.account? route.params.account.bank : "");
    const accountNumberInput = numInput(route.params.account? route.params.account.accountNumber : "");
    const accountHolderInput = useInput(route.params.account? route.params.account.accountHolder : "");
    const [loading, setLoading] = React.useState(false);
    const [completeShopAccountMutation] = useMutation(COMPLETE_SHOP_ACCOUNT);

    const handleAccount = async () => {
        try {
            setLoading(true);
            const {
                data : { completeShopAccount }
            } = await completeShopAccountMutation({
                variables:
                route.params.account ? {
                    updateAccount: {
                        bank: bank,
                        accountNumber: String(accountNumberInput.value),
                        accountHolder: accountHolderInput.value,
                    }
                } : {
                    createAccount: {
                        bank: bank,
                        accountNumber: String(accountNumberInput.value),
                        accountHolder: accountHolderInput.value,
                    },
                }
            });
            if(completeShopAccount){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 계좌 등록 에러:",e)
        } finally {
          setLoading(false);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1, paddingBottom:5,}}
            keyboardVerticalOffset={50}
            enabled >
                {loading? <ScreenLoader/> : null}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:15}}>
                    <View style={[styles.box, {paddingTop:15}, Platform.OS !== 'android' && {zIndex:100}]}>
                        <Text style={styles.title}>사업장 계좌를 입력해 주세요</Text>
                        <Caption style={styles.caption}>예금주</Caption>
                        
                        <ShadowInput {...accountHolderInput} placeholder={'사업장 명칭'} width={'100%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} returnKeyType={'done'} keyboardType={"default"}/>
                        <Caption style={styles.caption}>은행명</Caption>
                            <DropDownPicker
                                placeholder={'은행'}
                                defaultValue={bank}
                                disabled={loading}
                                items={[
                                    {label: '카카오뱅크', value: '카카오뱅크'},
                                    {label: '케이뱅크', value: '케이뱅크'},
                                    {label: '기업은행', value: '기업은행'},
                                    {label: '국민은행', value: '국민은행'},
                                    {label: '우리은행', value: '우리은행'},
                                    {label: '신한은행', value: '신한은행'},
                                    {label: '하나은행', value: '하나은행'},
                                    {label: '농협은행', value: '농협은행'},
                                    {label: '지역농축협', value: '지역농축협'},
                                    {label: 'SC은행', value: 'SC은행'},
                                    {label: '한국씨티은행', value: '한국씨티은행'},
                                    {label: '우체국', value: '우체국'},
                                    {label: '경남은행', value: '경남은행'},
                                    {label: '광주은행', value: '광주은행'},
                                    {label: '대구은행', value: '대구은행'},
                                    {label: '도이치', value: '도이치'},
                                    {label: '부산은행', value: '부산은행'},
                                    {label: '산림조합', value: '산림조합'},
                                    {label: '산업은행', value: '산업은행'},
                                    {label: '저축은행', value: '저축은행'},
                                    {label: '새마을금고', value: '새마을금고'},
                                    {label: '수협', value: '수협'},
                                    {label: '신협', value: '신협'},
                                    {label: '전북은행', value: '전북은행'},
                                    {label: '제주은행', value: '제주은행'},
                                    {label: 'BOA', value: 'BOA'},
                                    {label: 'HSBC', value: 'HSBC'},
                                    {label: 'JP모간', value: 'JP모간'},
                                    {label: '중국공산은행', value: '중국공산은행'},
                                    {label: '비엔피파리바은행', value: '비엔피파리바은행'},
                                    {label: '중국건설은행', value: '중국건설은행'},
                                    {label: '국세', value: '국세'},
                                    {label: '지방세입', value: '지방세입'},
                                ]}
                                onChangeItem={item => setBank(item.value)}
                                containerStyle={[styles.shadowBox, {height: Platform.OS === 'ios' ? 35 : 40}]}
                                style={{
                                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                                  borderWidth:0,
                                  shadowOffset: {
                                    width: 0,
                                    height: 1,
                                  },
                                  shadowOpacity: 0.20,
                                  shadowRadius: 1.41,
                                  elevation: 2,
                              }}
                              dropDownStyle={{backgroundColor:"#ffffff"}}
                              itemStyle={{
                                  justifyContent: 'flex-start',
                              }}
                              dropDownMaxHeight={180}
                            />
                    </View>
                    
                    <Caption style={styles.caption}>계좌번호</Caption>
                    <View style={{width:"100%", zIndex: -2}}>
                        <ShadowInput {...accountNumberInput} placeholder={'계좌 번호'} width={'100%'} editable={!loading} padding={8} textAlign={'left'} editable={!loading} keyboardType={"number-pad"}/>
                    </View>
                          
                    <BasicButton text={'확인'} onPress={handleAccount} disabled={bank && accountHolderInput.value && accountNumberInput.value ? loading : true}/>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>    
    )
};