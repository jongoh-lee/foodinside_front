import * as React from "react";
import { View, Text, StyleSheet} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import constants from "../../constants";

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
  },
  map:{
    height: constants.height
  }
})

export default () => (
  <View style={styles.container}>
    <MapView 
    style={styles.map} 
    initialRegion={{
      latitude:37.537712,
      longitude:126.989935,
      latitudeDelta: 0.01,
      longitudeDelta: 0.005,}}
    >
    
    {/* how to map all places {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
    ))} */}
      <Marker
        coordinate={{
          latitude:37.537140,
          longitude:126.989935,
        }}
        image={require('../../assets/Icons/mapMarker2.png')}
        title="업체명asdfasd df asdf as "
        description="9/21 ~ 10/12"
      >
        <Callout tooltip>
          <View></View>
        </Callout>
      </Marker>

    </MapView>
  </View>
);