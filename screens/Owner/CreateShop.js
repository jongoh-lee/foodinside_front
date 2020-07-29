import * as React from "react";
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from "react-native";
import { TextInput, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import BasicButton from "../../components/Custom/BasicButton";
import { useQuery } from "@apollo/react-hooks";
import { MY_SHOP } from "./OwnerQueries";
import Loader from "../../components/Custom/Loader";


const WIDTH = constants.width;
const HEIGHT = constants.height;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    buttonShadow:{
        width: WIDTH * .8, 
        height: HEIGHT * .14,
        borderRadius: HEIGHT * .07,
        justifyContent:"center",
        marginVertical:20,
        shadowColor: "#000",
        shadowOffset: {
    	    width: 0,
    	    height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 2,
        backgroundColor:'white',
    },
    buttonRow:{
        flexDirection:"row", 
        justifyContent:"center", 
        alignItems:"center",
        paddingHorizontal: HEIGHT * 0.01,
    },
    buttonCircle:{
        width: HEIGHT * 0.12,
        height: HEIGHT * 0.12,
        borderRadius: HEIGHT * 0.06,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:'#E0E0E0'
    },
    buttonText:{
        flex:1, 
        alignItems:"center"
    },
    text:{
        fontSize:18,
        color:'#E0E0E0'
    },
    submit:{
        paddingHorizontal:10
    },
    submitText:{
        color:'#05e6f4',
        fontSize:16,
    }
});


export default ({ navigation }) => {
    const { data, error, loading, refetch } = useQuery(MY_SHOP);
    refetch()
    console.log(data)
    if(loading) return <Loader />
    if(error) return console.log(error);
    return (
        <View style={styles.container}>
            {data && data.myShop &&
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent:"center", alignItems:"center", padding:20}}>
                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("사진 올리기", {shopImages:data.myShop.shopImages})}>
                        <View style={styles.buttonRow}>
                            <View style={[styles.buttonCircle, true? {borderColor: 'rgba(5, 230, 244, .6)'} : null]}>
                                <MaterialCommunityIcons name="camera-wireless-outline" size={30} color={true? "rgba(5, 230, 244, .6)" : "#E0E0E0"} />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={[styles.text, true? {color: 'rgba(5, 230, 244, .6)'} : null]}>사진 올리기</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("설비 등록", {myShop: data.myShop})}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialIcons name="kitchen" size={30} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>설비 등록</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("규모 안내")}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialIcons name="group" size={30} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>규모 안내</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("공간 소개")}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialIcons name="description" size={30} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>공간 소개</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("위치 등록")}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialIcons name="location-on" size={30} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>위치 등록</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("입점 규칙")}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialCommunityIcons name="check-circle-outline" size={30} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>입점 규칙</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonShadow}>
                    <TouchableOpacity onPress={() => navigation.navigate("환불 정책")}>
                        <View style={styles.buttonRow}>
                            <View style={styles.buttonCircle}>
                                <MaterialCommunityIcons name="credit-card-refund-outline" size={34} color="#E0E0E0" />
                            </View>
                            <View style={styles.buttonText}>
                                <Text style={styles.text}>환불 정책</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <BasicButton text="제출하기"/>
            </ScrollView>}
        </View>
)};