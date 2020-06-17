import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import { myShopData } from "../../components/Owner/data";
import Swiper from 'react-native-swiper';

//screen
import Facility from "../../components/Owner/Facility";
import Description from "../../components/Owner/Description";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  headerContainer: {
    flexDirection:"row",
    alignItems:"baseline"
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
  },
  headerSort:{
    color:'#666',
    fontSize:10,
    marginLeft:12,
  },
  imageBox:{
    width: constants.width,
    height: constants.height * 0.45,
  },
  image:{
    width: '100%',
    height: '100%',
    resizeMode:"cover"
  },
  tabBar:{
    flexDirection:"row",
    justifyContent:"space-around",
    borderBottomWidth:1,
    borderBottomColor:"#e7e7e7",
  },
  tabBox:{
    width: constants.width / 6,
    alignItems:"center",
  },
  activeTab:{
    fontSize:14,
    fontWeight:"bold",
    marginVertical:12,
  },
  inactiveTab:{
    fontSize:14,
    fontWeight:"bold",
    color:"#666",
    marginVertical:12,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
  },
});



export default ({ navigation }) => {
  const {title, district, picture, sort, chairs, tables, scale, description, precaution, address, checkIn, checkOut, minCheckIn, maxCheckIn, refund } = myShopData;
  const [tabName, setTabName] = React.useState('외부');
  React.useEffect(()=>{
    if(sort) {
      navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>내 가게</Text>
        <Text style={styles.headerSort}>{sort}음식점</Text>
      </View>)
      })
    }
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageBox}>
          <Swiper paginationStyle={{bottom:10}}>
            {picture.map(i => <Image key={i} style={styles.image} source={i}/>)}
          </Swiper>
        </View>

        <View style={styles.tabBar}>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('외부')}>
              <Text style={tabName=='외부'? styles.activeTab : styles.inactiveTab}>외부</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('홀')}>
              <Text style={tabName=='홀'? styles.activeTab : styles.inactiveTab}>홀</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('주방')}>
              <Text style={tabName=='주방'? styles.activeTab : styles.inactiveTab}>주방</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('식기')}>
              <Text style={tabName=='식기'? styles.activeTab : styles.inactiveTab}>식기</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('청소도구')}>
              <Text style={tabName=='청소도구'? styles.activeTab : styles.inactiveTab}>청소도구</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.tabBox} onPress={()=> setTabName('기타')}>
              <Text style={tabName=='기타'? styles.activeTab : styles.inactiveTab}>기타</Text>
          </TouchableWithoutFeedback>
        </View>
        
        <Facility />

        <Description {...{description, precaution, address, tables, chairs, scale, checkIn, checkOut, minCheckIn, maxCheckIn, refund}} />

      </ScrollView>
    </View>
  );
};