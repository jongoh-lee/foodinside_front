import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Caption from "../Custom/Caption";

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
    marginRight: "0.5%",
    backgroundColor:"#e0e0e0"
  },
  imageHall: {
    borderRadius:10,
    height: 100,
    width:'100%',
    marginBottom: 2,
    backgroundColor:"#e0e0e0"
  },
  imageKitchen: {
    borderRadius:10,
    height: 100,
    width:'100%',
    backgroundColor:"#e0e0e0"
  },
  inner:{
    paddingTop:4,
    paddingLeft:4,
  },
  address:{
    overflow:"hidden",
    fontSize:16,
    fontWeight:"500",
  },
  hashTags: {
    flexWrap:"wrap",
    flexDirection: "row",
    marginTop: 4,
    marginBottom:2
  },
  hashTag:{
    fontSize:12,
    color:'#c7c7c7'
  },
  shopBasic: {
    padding:4,
    paddingTop:0,
  },
  caption:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  captionText: {
    marginRight:4,
    marginTop:2
  },
  shopScale: {
    marginLeft: 8,
  },
  shopPrice:{
    fontWeight:'bold',
    fontSize:14,
  }
});

export default ({ id: ownerId, classification, address, addressDetail, isSelf, scale, shopName, district, hashTags, minReserve, shopImages, calendar }) => {
  const [opacity, setOpacity] = React.useState(1);
  const navigation = useNavigation();
  const exterior = shopImages.filter(el => el["type"] === 'EXTERIOR');
  const hall = shopImages.filter(el => el["type"] === 'HALL');
  const kitchen = shopImages.filter(el => el["type"] === 'KITCHEN');
  const priceList = calendar.filter(el => el.isBooked === true && typeof(parseInt(el.priceState)) === "number");
  const priceSum = priceList.map(el => parseInt(el.priceState)).reduce((a, b) => a + b, 0);
  const priceAve = (priceSum/ priceList.length)
  const pricePrint = (Math.floor(priceAve/100)*100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <View key={ownerId} style={styles.container}>
      <View style={styles.boxShop}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("음식점 보기", { 
          id: ownerId,
          shopName,
          classification,
          address, 
          addressDetail, 
          isSelf, 
          scale, 
          district, 
          hashTags, 
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
          
            {hashTags.length > 0 ? (
              <View style={styles.hashTags}>
                {hashTags?.map((tag, index) => <Caption key={index} style={styles.hashTag}>#{tag}  </Caption>)}
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.shopBasic}>
          <Caption style={styles.captionText}>
            {classification} 음식점
          </Caption>
          <View style={styles.caption}>
            <Text style={styles.shopPrice}>
              최소 예약: {minReserve}일<Text style={{fontWeight:"300", color:"#666"}}> ・ </Text>
            </Text>
            <Text style={styles.shopPrice}>
              1회전 규모: {scale}명<Text style={{fontWeight:"300", color:"#666"}}> ・ </Text>
            </Text>
            <Text style={styles.shopPrice}>
              일 평균 {Number.isNaN(priceAve) ? "100,000" : pricePrint}원
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};