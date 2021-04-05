import * as React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, SafeAreaView, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import constants from "../../constants";
import { makeUserSecondHand } from "../../IntroductionContext";

export default ({}) => {
    const userToSecondHand = makeUserSecondHand();
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flex:1}}>
                 <Swiper style={styles.wrapper} loadMinimal={true} loadMinimalSize={10} loop={false} paginationStyle={{bottom:40}} index={0} >
                    <View style={styles.slide1}>
                        <Image style={styles.introImage} source={require('../../assets/IntroImages/Intro_1.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.introImage} source={require('../../assets/IntroImages/Intro_2.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.introImage} source={require('../../assets/IntroImages/Intro_3.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <Image style={styles.introImage} source={require('../../assets/IntroImages/Intro_4.png')}/>
                    </View>
                    <View style={styles.slide1}>
                        <TouchableOpacity style={{padding:10}} onPress={userToSecondHand}><Text style={styles.startText}>시작하기</Text></TouchableOpacity>
                    </View>
                </Swiper>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    startButton:{
        position:"absolute", 
        bottom:0, 
        left:0, 
        right:0, 
        justifyContent:"center", 
        alignItems:"center", 
        padding:20, 
        backgroundColor:"rgb(5, 230, 244)"
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff"
      },
      introImage:{
          width:constants.width,
          resizeMode:"contain"
      },
      startText:{
          fontSize:20,
          fontWeight:"bold",
          textDecorationLine:"underline"
      }
    
})