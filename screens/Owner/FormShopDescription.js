import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView } from "react-native-gesture-handler";
import { Caption } from "react-native-paper";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_DESCRIPTION } from "./OwnerQueries";
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

export default ({ route, navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const shopNameInput = useInput(route.params.shopName? route.params.shopName : '');
    const districtInput = useInput(route.params.district? route.params.district : '');
    const descriptionInput = useInput(route.params.description? route.params.description : '');
    const precautionInput = useInput(route.params.precaution? route.params.precaution : '');
    const hashTagInput = useInput(route.params.hashTag? route.params.hashTag : '');
    const [completeShopDescriptionMutation] = useMutation(COMPLETE_SHOP_DESCRIPTION);
    const handleDescription = async () => {
        try {
            setLoading(true);
            const {
                data : { completeShopDescription }
            } = await completeShopDescriptionMutation({
                variables:{
                    shopName: shopNameInput.value,
                    district: districtInput.value,
                    description: descriptionInput.value,
                    precaution: precautionInput.value,
                    hashTag: hashTagInput.value,
                }
            });
            if(completeShopDescription){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 설명 등록 에러:",e)
        } finally {
          setLoading(false);
        }
    }
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
                            <Text style={styles.title}>음식점 이름을 정해주세요*</Text>
                            <Caption style={styles.caption}>인테리어와 업종을 합쳐 이름을 정해 주세요</Caption>
                            <ShadowInput {...shopNameInput} placeholder={'ex) 모던하고 깔끔한 분위기의 카페'}  textAlign={"left"} editable={!loading} returnKeyType={"done"}/>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.title}>주변 골목/상권/지하철역을 알려주세요*</Text>
                            <Caption style={styles.caption}>키워드를 1개만 입력해 주세요</Caption>
                            <ShadowInput {...districtInput} placeholder={`ex) '경리단길', '이태원역', 'OO대학교 상권'`}  textAlign={"left"} editable={!loading} returnKeyType={"done"}/>
                        </View>
                        <View style={styles.box}>
                            <Text style={[styles.title, {paddingBottom:5}]}>공간을 소개해 주세요*  <Caption>300자 이내</Caption></Text>
                            <ShadowInput {...descriptionInput} placeholder={`ex)\n \n경리단길에 위치한 일반 음식점 입니다. \n\n기존 한식을 운영하던 가게라 필요한 도구는...`}  textAlign={"left"} multiline={true} returnKeyType={'none'} blurOnSubmit={false} maxLength={300} textAlignVertical={"top"} editable={!loading}/>
                        </View>
                        <View style={styles.box}>
                            <Text style={[styles.title, {paddingBottom:5}]}>예약 주의사항을 알려주세요*</Text>
                            <ShadowInput {...precautionInput} placeholder={`ex) '주차 공간이 없습니다', '입점 시간을 준수해 주세요'`}  textAlign={"left"} multiline={true} blurOnSubmit={false} returnKeyType={'none'} editable={!loading}/>
                        </View>
                        <View style={[styles.box, {paddingBottom:10}]}>
                            <Text style={[styles.title, {paddingBottom:5}]}>해시 태그 #</Text>
                            <ShadowInput {...hashTagInput} placeholder={`ex) #네츄럴 #한식 #모던 #이태원`}  textAlign={"left"} multiline={true} returnKeyType={'done'}  editable={!loading}/>
                        </View>
                        <BasicButton text={'제출 하기'} onPress={handleDescription} loading={loading} disabled={shopNameInput.value && districtInput.value && descriptionInput.value && precautionInput.value? loading : true} />
                    </ScrollView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </View>    
    )
};