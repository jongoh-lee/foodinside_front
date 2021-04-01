import * as React from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, Platform, ActivityIndicator, ImageBackground} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import constants from '../../constants';
import MapCard from '../../components/Visitor/MapCard';
import { useQuery } from '@apollo/react-hooks';
import { SHOP_ON_SALE } from './VisitorQueries';
import ScreenLoader from '../../components/Custom/ScreenLoader';
import { useLogOut } from '../../AuthContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Caption from '../../components/Custom/Caption';

const CARD_HEIGHT = 250;
const CARD_WIDTH = constants.width * 0.8;
const SPACING_FOR_CARD_INSET = constants.width * 0.1 - 10;

export default ({navigation}) => {
  let now = new Date()
  let mm = now.getMonth() + 1;
  let dd = now.getDate();
  const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')}`
  const { data, loading, error, refetch } = useQuery(SHOP_ON_SALE,{
    variables:{
      dateInput: today
    },
    fetchPolicy:"network-only",
    notifyOnNetworkStatusChange: true
  });
  navigation.setOptions({
    headerRight:()=> (
      <TouchableOpacity onPress={() => refetch()}>
        <MaterialCommunityIcons
          name="refresh"
          size={24}
          color={'black'}
          style={{paddingHorizontal:10}}
        />
      </TouchableOpacity>
    )
  })
  // data > data.onSaleShop
  const initialMapState = {
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
      if (index >= data?.shopOnSale.length) {
        index = data?.shopOnSale.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { owner } = data?.shopOnSale[index];
          let latitude = owner.latitude - 0.0015
          let longitude = owner.longitude
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

  const interpolations = data?.shopOnSale.map((marker, index) => {
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
      {loading ? <ScreenLoader/> : null}
      <MapView
        ref={_map}
        initialRegion={state.region}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        moveOnMarkerPress={false}
      >
        {data ? data?.shopOnSale.map((shop, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={{longitude:shop.owner.longitude, latitude: shop.owner.latitude}} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/Icons/mapMarker2.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        }) : null}
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
        {data?.shopOnSale?.length > 0 ? data?.shopOnSale?.map((booking, index) =>(
          <View style={styles.card} key={index}>
            <MapCard {...booking}/>
          </View>)
        ) : (
          //예약 목록이 없을 때
          <View style={styles.emptyCard}>
            <Image source={require("../../assets/cloche.png")} style={styles.cloche}/>
            <Caption>음식 준비 중...</Caption>
            <View style={{position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0, 0, 0, .3)"}} />
          </View>

        )}
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
    height: Platform.isPad ? 450 : CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  emptyCard:{
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: Platform.isPad ? 450 : CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    justifyContent:"center",
    alignItems:"center"
  },
  cloche:{
    width:'60%',
    height:'60%',
    resizeMode:"contain",
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