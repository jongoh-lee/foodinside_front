import * as React from "react";
import { View, Text, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import constants from "../../constants";

const styles = StyleSheet.create({
  container:{
    height: constants.height * .4
  },
  map:{
    ...StyleSheet.absoluteFillObject
  }
})

export default () => (
  <View style={styles.container}>
    <MapView 
    style={styles.map} 
    initialRegion={{
      latitude:37.537140,
      longitude:126.986935,
      latitudeDelta: 0.01,
      longitudeDelta: 0.005,}}/>
  </View>
);