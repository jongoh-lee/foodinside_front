import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons'; 
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import { MY_SHOP } from "./OwnerQueries";
import Logo from "../../components/Custom/Logo";
import Description from "../../components/Owner/Description";

export default ({ navigation, route }) => {
  const { data, loading, error } = useQuery(MY_SHOP,{
    fetchPolicy:"network-only"
  });
  if(loading) return <Loader />
  if(error) return console.log("Owner Error",error);
  if(data?.myShop?.ownerState === 3){
    navigation.setOptions({
      headerTitle:() => null,
      headerLeft:() => <Text style={styles.headerTitle}>내 음식점 <Text style={styles.headerClassification}>{data?.myShop?.classification}음식점</Text></Text>,
      headerRight:() => <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}}/>,
    });
  }
  return (
    <View style={styles.container}>
    {data?.myShop?.ownerState === 0 &&  (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>심사 중</Text> 입니다</Text>
        
        <View style={styles.buttonBox}>
          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청서 보기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>신청서 보기</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 1 && (
      <>
        <Text style={styles.title}>죄송합니다. {`\n`}아쉽게도 사장님의 음식점은 <Text style={{color:"black"}}>{`\n`}푸드인사이드</Text>에 등록할 수 없습니다.</Text>
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청 하기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>다른 음식점 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 2 && (
      <>
        <Text style={styles.title}><Text style={{color:"black"}}>축하합니다. </Text>음식점을 등록해 주세요</Text>
        
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("공간 완성")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 등록</Text>
          </TouchableWithoutFeedback>
        </View>
      </>
    )}

    {data?.myShop?.ownerState === 3 && (
        <Description {...data?.myShop} />
    )}

    {data?.myShop === null &&  (
    <>
        <Text style={styles.title}>내 음식점도 <Text style={{color:"black"}}>공유 음식점</Text>이 될 수 있나요?</Text>
        <View style={styles.buttonBox}>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("음식점 예시")}>
            <View style={styles.button}>
                <MaterialCommunityIcons name="store" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 예시</Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback style={{alignItems:"center"}} onPress={() => navigation.navigate("신청 하기")}>
            <View style={styles.button}>
                <AntDesign name="form" size={34} color="rgba(0,0,0, .3)" />
            </View>
            <Text style={styles.buttonText}>공유 음식점 신청</Text>
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
    headerTitle:{
      fontWeight:'bold',
      fontSize:20,
      alignSelf:"center",
      paddingLeft:10
    },
    headerClassification:{
      color:'#666',
      fontSize:10,
      marginLeft:12,
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
});
