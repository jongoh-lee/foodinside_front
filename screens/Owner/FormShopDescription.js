import * as React from "react";
import {StyleSheet, Text, View, KeyboardAvoidingView, Platform, SafeAreaView,} from "react-native"
import DismissKeyboard from "../../components/Custom/DismissKeyboard";
import ShadowInput from "../../components/Custom/ShadowInput";
import BasicButton from "../../components/Custom/BasicButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_DESCRIPTION } from "./OwnerQueries";
import useInput from "../../hooks/useInput";
import Modal from "react-native-modal";
import Caption from "../../components/Custom/Caption";
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
    shadowBotton:{
        borderRadius:10,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    hashTag:{
        borderRadius:10,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    //modal
    content: {
        width:constants.width /2,
        backgroundColor: '#ffffff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})

export default ({ route, navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const shopNameInput = useInput(route.params.shopName? route.params.shopName : '');
    const districtInput = useInput(route.params.district? route.params.district : '');
    const descriptionInput = useInput(route.params.description? route.params.description : '');
    const precautionInput = useInput(route.params.precaution? route.params.precaution : '');
    const [hashTags, setHashTags] = React.useState(route.params.hashTags? route.params.hashTags : []);
    const [hashTagInput, setHashTagInput] = React.useState("");
    
    //modal
    const [visible, setVisible] = React.useState(false);
    const pushHashTag = ( value ) => {
        setHashTags([value, ...hashTags]);
        setHashTagInput("")
    }
    const deleteHashTag = ( index ) => {
        let result = hashTags.filter( tag => hashTags.indexOf(tag) !== index);
        setHashTags(result);
    }

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
                    hashTags: hashTags
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
        <>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1, justifyContent:"center"}}
            keyboardVerticalOffset={50}
            enabled >
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
                            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                                <Text style={[styles.title, {paddingBottom:5}]}>해시 태그 #</Text>
                                <TouchableOpacity onPress={() => setVisible(true)} disabled={loading}>
                                    <Text style={{color:"#05e6f4"}}>추가 하기</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.shadowBotton}>
                                <View style={{backgroundColor:"#ffffff", padding:10, borderRadius:10}}>
                                    <Text style={{color:"#666"}}>ex) #네츄럴 #한식 #모던 #이태원</Text>
                                </View>
                            </View>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection:"row", paddingVertical: 10, paddingHorizontal:2, flexGrow:1}}>
                            {hashTags.length > 0 ? hashTags.map( (tag, index) => (
                                <TouchableOpacity key={index} style={[styles.shadowBotton, {marginRight: 10, borderRadius:15}]} onPress={() => deleteHashTag(index)} disabled={loading}>
                                    <View style={{backgroundColor:"#ffffff", padding:10, borderRadius: 15}}>
                                        <Text style={{color:"#666"}}>#{tag}</Text>
                                    </View>
                                </TouchableOpacity>
                            )) : <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                    <Caption style={{paddingVertical:12}}>해쉬태그가 없습니다.</Caption>
                                </View>}
                            </ScrollView>
                        </View>
                        <BasicButton text={'제출 하기'} onPress={() => handleDescription()} loading={loading} disabled={shopNameInput.value && districtInput.value && descriptionInput.value && precautionInput.value? loading : true} />
                    </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>    

        <Modal
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            onBackButtonPress={() => setVisible(false)}
            backdropColor={'#ffffff'}
            backdropOpacity={.5}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            style={{justifyContent:"center", alignItems:"center"}}
            coverScreen={false}
            >

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, justifyContent:"center"}}
                keyboardVerticalOffset={50}
                enabled
            >

                <View style={styles.content}>
                    <Text style={{fontSize:20, fontWeight:"bold"}}>#</Text>
                    <ShadowInput value={hashTagInput} onChange={setHashTagInput} placeholder={'해쉬 태그'} width={'80%'} padding={ Platform.OS === "ios" ? 10 : 5} fontSize={14} returnKeyType={"done"} keyboardType={"default"} blurOnSubmit={true} autoFocus={true}/>

                    <View style={{width: '80%'}}>
                        <BasicButton onPress={() => (setVisible(false), pushHashTag(hashTagInput))} padding={10} text={'확인'} marginVertical={5} width={'100%'} disabled={!hashTagInput} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>    
        </>
    )
};