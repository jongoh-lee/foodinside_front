import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useQuery } from "react-apollo";
import Loader from "../../components/Custom/Loader";

export default ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Text style={styles.title}>축하합니다. <Text style={{color:"black"}}>공유 음식점</Text>이 될 수 있어요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("내 음식점")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 보기</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("프로필 신청")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 신청</Text>
          </TouchableWithoutFeedback>
        </View>
    </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center"
  },
  title:{
    fontSize:18,
    color:'#666',
    paddingBottom:50
  },
  buttonBox:{
    flexDirection:"row",
    width:'100%',
    justifyContent:"space-around",
    alignItems:"center"
  },
  button:{
    width:constants.width * .2,
    height: constants.width * .2,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: constants.width * .1,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    backgroundColor:'white'
  },
  buttonText:{
      alignSelf:"center",
      paddingTop:10,
      color:'rgba(0,0,0, .6)'
  }
})
