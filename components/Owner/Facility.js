import * as React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons"
import constants from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:5
    },
    button:{
        width:constants.width / 5,
        minHeight:constants.height / 14,
        alignItems:"center",
        justifyContent:"flex-end",
    },
    text:{
        fontSize:12,
        color:"#666",
        marginTop:2
    },
    facility:{
        height:constants.height / 6,
        justifyContent:"center",
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7",
    }
})

export default () => {
    const [ tab, setTab ] = React.useState('화기');
    return (
    <>
    <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('화기')}>
            <MaterialCommunityIcons name="fire" size={30} color="red"/>
            <Text style={styles.text}>화기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('카페')}>
            <Ionicons name="ios-cafe" size={30} color="#c1a183"/>
            <Text style={styles.text}>카페</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('냉동/냉장')}>
            <MaterialCommunityIcons name="snowflake" size={30} color="#00c4f6"/>
            <Text style={styles.text}>냉동/냉장</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('전자기기')}>
        <Entypo name="flash" size={24} color="#f7ca09" />
            <Text style={styles.text}>전자기기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('보관용기')}>
        <Entypo name="download" size={24} color="#a7a6b0" />
            <Text style={styles.text}>보관용기</Text>
        </TouchableWithoutFeedback>
    </View>

    <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('식기')}>
            <MaterialCommunityIcons name="silverware-variant" size={30} color="#cacece" />
            <Text style={styles.text}>식기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('잔')}>
            <MaterialCommunityIcons name="glass-cocktail" size={30} color="#b0f8ef" />
            <Text style={styles.text}>잔</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('서빙용품')}>
        <FontAwesome5 name="hand-holding" size={24} color="black" style={{marginBottom:8}}/>
            <Text style={styles.text}>서빙용품</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('청소도구')}>
        <Entypo name="trash" size={22} color="#0735c6" style={{marginBottom:3}}/>
            <Text style={styles.text}>청소도구</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('기타')}>
        <Feather name="more-horizontal" size={24} color="#000000"/>
            <Text style={styles.text}>기타</Text>
        </TouchableWithoutFeedback>
    </View>
    
    <View style={styles.facility}>
        <Text>여기에 {tab} Data가 표시 됩니다</Text>
    </View>
    </>
    )
};