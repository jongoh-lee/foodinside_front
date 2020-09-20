import * as React from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, Platform,} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { markers, profile } from '../../components/Franchise/data';
import constants from '../../constants';
import MapCard from '../../components/Visitor/MapCard';

const CARD_HEIGHT = 250;
const CARD_WIDTH = constants.width * 0.8;
const SPACING_FOR_CARD_INSET = constants.width * 0.1 - 10;

export default () => {

  const initialMapState = {
    markers,
    region: {
        latitude:37.537140,
        longitude:126.988484,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
    },
  };
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  React.useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          let latitude = coordinate.latitude - 0.0015
          let longitude = coordinate.longitude
          _map.current.animateToRegion(
            {
              latitude:latitude,
              longitude: longitude,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x , y: 0, animated: true});
  }
  
  React.useEffect(()=>{
    if(Platform.OS === 'ios'){
      _scrollView.current.scrollTo({animated:false, x: - SPACING_FOR_CARD_INSET})
    }
  },[])
  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        moveOnMarkerPress={false}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={{longitude:marker.coordinate.longitude, latitude: marker.coordinate.latitude}} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/Icons/mapMarker2.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        decelerationRate = "normal"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        <View style={styles.card} key={0}>
          <MapCard {...profile}/>
        </View>

        <View style={styles.card} key={1}>
          <MapCard {...profile}/>
        </View>

        <View style={styles.card} key={2}>
          <MapCard {...profile}/>
        </View>

        <View style={styles.card} key={3}>
          <MapCard {...profile}/>
        </View>

        <View style={styles.card} key={4}>
          <MapCard {...profile}/>
        </View>
        
        {/* data query 이후 mapping할 리스트 입니다. 

        {state.markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={{uri: marker.image}}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.profileName}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#05e6f4',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#05e6f4'
                  }]}>업체 정보</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        */}

      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: constants.width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:40,
    height:40,
  },
  marker: {
    width: 25,
    height: 25,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});