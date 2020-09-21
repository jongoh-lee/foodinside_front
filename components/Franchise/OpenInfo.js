import * as React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import constants from "../../constants";

const styles = StyleSheet.create({
  container:{
    height: constants.height / 3,
  },
  map:{
    
  }
})

export default ( openInfo ) => (
  <View style={styles.container}>
    <MapView 
    style={{flex:1}}
    provider={PROVIDER_GOOGLE}
    initialRegion={{
      latitude:37.537140,
      longitude:126.986935,
      latitudeDelta: 0.01,
      longitudeDelta: 0.005,}}>
      
      <Marker 
       coordinate={{latitude: 37.535140, longitude: 126.989935}}
       >
        <View style={{ flex:1, alignItems:"center",}}>
          <View style={{ backgroundColor:"rgba(255, 255, 255, .7)", marginBottom:5}}>
            <Text style={{fontWeight:"bold", padding:5}}>8/24 - 8/30</Text>
          </View>
          <Image source={require('../../assets/Icons/mapMarker2.png')} style={{  width: 25, height: 25,}} resizeMode="cover" />
       </View>
      </Marker>

      <Marker 
       coordinate={{latitude: 37.539140, longitude: 126.987935}}
       >
        <View style={{ flex:1, alignItems:"center",}}>
          <View style={{ backgroundColor:"rgba(255, 255, 255, .7)", marginBottom:5}}>
            <Text style={{fontWeight:"bold", padding:5}}>8/24 - 8/30</Text>
          </View>
          <Image source={require('../../assets/Icons/mapMarker2.png')} style={{  width: 25, height: 25,}} resizeMode="cover" />
       </View>
      </Marker>

      <Marker 
       coordinate={{latitude: 37.537140, longitude: 126.981935}}
       >
        <View style={{ flex:1, alignItems:"center",}}>
          <View style={{ backgroundColor:"rgba(255, 255, 255, .7)", marginBottom:5}}>
            <Text style={{fontWeight:"bold", padding:5}}>8/24 - 8/30</Text>
          </View>
          <Image source={require('../../assets/Icons/mapMarker2.png')} style={{  width: 25, height: 25,}} resizeMode="cover" />
       </View>
      </Marker>

     

    

       </MapView>
      
  </View>
);