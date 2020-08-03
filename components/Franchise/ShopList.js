import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container:{
    padding:10
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
    marginLeft: 8,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    fontSize:14
  },
  shopSort: {
    marginLeft: 4,
    color:'#c7c7c7'
  },
  shopScale: {
    marginLeft: 8,
  },
  shopReview:{
    marginLeft: 8,
    borderBottomColor:'black',
    borderBottomWidth: 1,
  },
  shopPrice:{
    marginLeft:'auto',
    fontWeight:'bold'
  }
});

export default ({ listing }) => {
  const [opacity, setOpacity] = React.useState(1);
  const { navigate, isFocused } = useNavigation();
  const hasFocus = isFocused();
  // sharedElement 적용 하면 활성화
  // useEffect(() => {
  //   if (hasFocus) {
  //     setOpacity(1);
  //   }
  // }, [hasFocus]);
  return (
    <View key={listing.id} style={styles.container}>
      <View style={styles.boxShop}>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpacity(1);
            navigate("ShopDetail", {listing})
          }}
        >  
          <Text style={styles.title} numberOfLines={1}>{listing.shopName}</Text>
          <View style={styles.imageGallery}>
            <View style={styles.imageGalleryRow}>
                <Image
                  style={[styles.imageMain, { opacity }]}
                  resizeMode="cover"
                  source={listing.picture[0]}
                />
              <View style={styles.imageGalleryColumn}>
                <Image
                  style={[styles.imageHall, { opacity }]}
                  resizeMode="cover"
                  source={listing.picture[1]}
                />
                <Image
                  style={[styles.imageKitchen, { opacity }]}
                  resizeMode="cover"
                  source={listing.picture[2]}
                />
              </View>
            </View>
          </View>

        <View style={styles.inner}>
          <Text style={styles.address}>{listing.address}</Text>
        
          <View style={styles.hashTags}>
            <Text style={styles.hashTag}>{listing.hashTags}</Text>
          </View>
        </View>
        </TouchableWithoutFeedback>

        <View style={styles.shopBasic}>
          <Text style={styles.shopSort}>
            {`${listing.sort} 음식점`}
          </Text>
          <Text style={styles.shopScale}>
            {`1회전: ${listing.scale}명`}
          </Text>
          <View style={styles.shopReview}>
            <Text>
              {`후기: ${listing.comments}개`}
            </Text>
          </View>
          <Text style={styles.shopPrice}>
            {`평균 ${listing.price}/Day`}
          </Text>
        </View>

      </View>
    </View>
  );
};