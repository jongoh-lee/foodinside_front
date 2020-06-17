import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import constants from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        padding:5
    },
    card:{
        flexDirection:"row",
    },
    member:{
        width: constants.width / 3,
        alignItems:"center"
    },
    image:{
        width: constants.width / 3,
        height: constants.width / 2.5,
        resizeMode:"cover",
        borderRadius:10
    },
    position:{
        flexDirection:"row",
        marginVertical:5,
    },
    text:{
        fontSize:16
    },
    textBox:{
        marginHorizontal:20,
        height: constants.width / 3.5
    },
    careerText:{
        fontSize:15,
        color:"#666",
    }
})

export default ({ team }) => {
    return (
        <View style={styles.container}>
            {team.map((member) => 
            <View key={member.id} style={styles.card}>
                <View style={styles.member}>
                    <Image style={styles.image} source={{uri:member.image}} />

                    <View style={styles.position}>
                        <Text style={styles.text} numberOfLines={1}>{member.name}({member.position})</Text>
                    </View>
                </View>
                
                <View style={{flex:1}}>
                    <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                    <View style={styles.textBox}>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                            <Text style={styles.careerText}>{member.career}</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>)}
    </View>
)}