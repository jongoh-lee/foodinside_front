import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { shopProfile } from "../../components/Franchise/data"
import constants from "../../constants";
import ReserveList from "../../components/Owner/ReserveList";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    monthBar:{
        flexDirection:"row",
        marginVertical:10,
        justifyContent:"space-between",
        alignItems:"center"
    },
    month:{
        fontSize:16,
        fontWeight:"bold"
    },
    monthBtn_left:{
        width:100,
        alignItems:"flex-start"
    },
    monthBtn_right:{
        width:100,
        alignItems:"flex-end"
    },

})

export default () => {
  const { mainImage, shopName, sort } = shopProfile;
  // 가게 예약 정보에서 가져오기
  //const { date, totalPrice, reserveState } = shopReserve;
  return(
    <View style={styles.container}>

    <View style={styles.monthBar}>
        <TouchableWithoutFeedback style={styles.monthBtn_left}>
          <EvilIcons name="chevron-left" size={40} />
        </TouchableWithoutFeedback>
        <Text style={styles.month}>6월</Text>
        <TouchableWithoutFeedback style={styles.monthBtn_right}>
          <EvilIcons name="chevron-right" size={40}/>
        </TouchableWithoutFeedback>
    </View>

    <ScrollView style={{padding:5}}>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
        <ReserveList mainImage={mainImage} shopName={shopName} sort={sort}/>
    </ScrollView>

    </View>
  )
}