import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
  container:{
    marginVertical:10
  },
  boxShop: {
    backgroundColor: "white",
    padding: 5,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    marginBottom:5,
    fontWeight: 'bold',
  },
  imageGallery:{
    overflow:"hidden",
  },
  imageGalleryRow:{
    width:"100%",
    flexDirection:"row",
    flexWrap:"wrap"
  },
  imageGalleryColumn:{
    width:"40%",
  },
  imageMain: {
    borderRadius:10,
    height: 202,
    width:'59.5%',
    marginRight: "0.5%"
  },
  imageHall: {
    borderRadius:10,
    height: 100,
    width:'100%',
    marginBottom: 2,
  },
  imageKitchen: {
    borderRadius:10,
    height: 100,
    width:'100%',
  },
  inner:{
    padding:8
  },
  address:{
    overflow:"hidden",
    marginBottom:5,
    fontSize:16,
    fontWeight:"500"
  },
  hashTags: {
    flexWrap:"wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  hashTag:{
    fontSize:14,
    color:'#c7c7c7'
  },
  shopBasic: {
    padding:4
  },
  caption:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  captionText: {
    marginRight:4
  },
  shopScale: {
    marginLeft: 8,
  },
  shopPrice:{
    fontWeight:'bold',
    fontSize:14,
  }
});

export default ({ id, classification, address, addressDetail, isSelf, scale, shopName, district, hashTag, minReserve, shopImages, calendar }) => {
  const [opacity, setOpacity] = React.useState(1);
  const navigation = useNavigation();
  const exterior = shopImages.filter(el => el["type"] === 'EXTERIOR');
  const hall = shopImages.filter(el => el["type"] === 'HALL');
  const kitchen = shopImages.filter(el => el["type"] === 'KITCHEN');
  let hashTags = "#오픈키친 #20평 #몽환적 분위기 #Pub 가능"
  const priceList = calendar.filter(el => typeof(parseInt(el.priceState)) === "number");
  const priceSum = priceList.map(el => parseInt(el.priceState)).reduce((a, b) => a + b, 0);
  const priceAve = (priceSum/ priceList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return (
    <View key={id} style={styles.container}>
      <View style={styles.boxShop}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("음식점 보기", { 
          id,
          shopName,
          classification,
          address, 
          addressDetail, 
          isSelf, 
          scale, 
          district, 
          hashTag, 
          minReserve, 
          shopImages
          })}>  
          <Text style={styles.title}>{shopName} in {district}</Text>
          <View style={styles.imageGallery}>
            <View style={styles.imageGalleryRow}>
                <Image
                  style={[styles.imageMain, { opacity }]}
                  resizeMode="cover"
                  source={{uri: exterior[0].url}}
                />
              <View style={styles.imageGalleryColumn}>
                <Image
                  style={[styles.imageHall, { opacity }]}
                  resizeMode="cover"
                  source={{uri: hall[0].url}}
                />
                <Image
                  style={[styles.imageKitchen, { opacity }]}
                  resizeMode="cover"
                  source={{uri: kitchen[0].url}}
                />
              </View>
            </View>
          </View>

        <View style={styles.inner}>
        <Text style={styles.address}>{address} in {addressDetail}</Text>
        
          <View style={styles.hashTags}>
            <Text style={styles.hashTag}>{hashTags}</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.shopBasic}>
          <Caption style={styles.captionText}>
            {classification} 음식점
          </Caption>
          <View style={styles.caption}>
            <Text style={styles.shopPrice}>
              최소 예약: {minReserve}일<Text style={{fontWeight:"300", color:"#666"}}> | </Text>
            </Text>
            <Text style={styles.shopPrice}>
              1회전 규모: {scale}명<Text style={{fontWeight:"300", color:"#666"}}> | </Text>
            </Text>
            <Text style={styles.shopPrice}>
              평균 {priceAve === "NaN" ? "100,000" : priceAve}원/Day
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};