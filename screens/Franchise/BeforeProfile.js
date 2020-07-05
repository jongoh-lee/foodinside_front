import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useQuery } from "react-apollo";
import Loader from "../../components/Custom/Loader";
import { CHECK_PROFILE } from "./ProfileQueries";

export default ({ navigation }) => {
  const { data, loading, error, refetch } = useQuery(CHECK_PROFILE);
  refetch()
  console.log("쿼리데이타:",data)
 
  if(loading) return <Loader />;
  if(error) return console.log(error);

  return (
    <View style={styles.container}>
    {data.checkProfile === 0 &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>프로필</Text> 생성 후 영업 가능합니다</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="silverware-clean" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 신청")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 신청</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
      )}

    {data.checkProfile === 1 &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>프로필</Text> 심사 중 입니다</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="silverware-clean" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("심사 중")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 보기</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
      )}

    {data.checkProfile === 2 && (
      <>
        <Text style={styles.title}>축하합니다! <Text style={{color:"black"}}>프로필</Text>을 완성해주세요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="silverware-clean" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate("프로필 완성")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>프로필 완성</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}
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
    fontSize:20,
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
