import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
    marginLeft: 5,
    marginTop: 5,
    marginBottom:5,
    fontWeight: 'bold',
    backgroundColor:"#E0E0E0",
    width: "70%",
    borderRadius:10,
    padding:12
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
    backgroundColor:"#E0E0E0"
  },
  imageHall: {
    borderRadius:10,
    height: 100,
    width:'100%',
    marginBottom: 2,
    backgroundColor:"#E0E0E0"
  },
  imageKitchen: {
    borderRadius:10,
    height: 100,
    width:'100%',
    backgroundColor:"#E0E0E0"
  },
  inner:{
    padding:8
  },
  address:{
    overflow:"hidden",
    marginBottom:5,
    fontSize:16,
    fontWeight:"500",
    backgroundColor:"#E0E0E0",
    width:"90%",
    borderRadius:10,
    padding:12
  },
  hashTags: {
    flexWrap:"wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  hashTag:{
    fontSize:14,
    backgroundColor:"#E0E0E0",
    width:"80%",
    borderRadius:10,
    padding:8
  },
  shopBasic: {
    padding:4
  },
  caption:{
    flexDirection:"row",
    flexWrap:"wrap",
    backgroundColor:"#E0E0E0",
    width:"80%",
    padding:10,
    borderRadius:10
  },
  captionText: {
    backgroundColor:"#E0E0E0",
    width:"20%",
    borderRadius:10,
    padding:8,
    marginBottom:3
  },
  shopScale: {
    marginLeft: 8,
  },
  shopPrice:{
    fontWeight:'bold',
    fontSize:14,
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxShop}>
          <View style={styles.title}/>
          <View style={styles.imageGallery}>
            <View style={styles.imageGalleryRow}>
                <View
                  style={styles.imageMain}
                />
              <View style={styles.imageGalleryColumn}>
                <View
                  style={styles.imageHall}
                />
                <View
                  style={styles.imageKitchen}
                />
              </View>
            </View>
          </View>

        <View style={styles.inner}>
        <View style={styles.address} />
        
          <View style={styles.hashTags}>
            <View style={styles.hashTag}/>
          </View>
        </View>
        
        <View style={styles.shopBasic}>
          <View style={styles.captionText} />
          <View style={styles.caption} />
        </View>
      </View>
    </View>
  );
};