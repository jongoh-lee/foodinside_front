import { useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import constants from "../../constants";
import { OPEN_INFO } from "../../screens/Franchise/ProfileQueries";
import Caption from "../Custom/Caption";
import ScreenLoader from "../Custom/ScreenLoader";

const styles = StyleSheet.create({
  container:{
    minHeight: constants.height / 3,
    maxHeight: constants.height / 2
  },
  map:{
    
  }
})

export default ({ id }) => {
  let now = new Date()
  let mm = now.getMonth() + 1;
  let dd = now.getDate();
  const today = `${[now.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')}`
  const { data, error, loading } = useQuery(OPEN_INFO,{
    variables:{
      today,
      id
    }
  });

  const [ openInfo, setOpenInfo ] = React.useState(null);

  React.useEffect(() => {
    const result = data?.openInfo.reduce((array, data) => {
      let longitude = data.owner.longitude;
      let latitude = data.owner.latitude;
      let allDates = [];
      data.prices.map(date => allDates.push(date.dateString));

      let overlab = array.map(( el ) =>  el.longitude === longitude && el.latitude === latitude ? array.indexOf(el) : null );
      if(typeof(overlab[0]) === "number"){
        let index = overlab[0]
        array[index].allDates.push(...allDates)
      }else{
        array.push({
          latitude,
          longitude,
          allDates
        })
      }

      return array
    }, []);

    setOpenInfo(result);
  },[data]);

  return (
    <View style={styles.container}>
      {loading ? <ScreenLoader /> : null }
      <MapView 
      style={{flex:1}} 
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude:37.537140,
        longitude:126.986935,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,}}>

          {openInfo?.map(( booking, index ) => {
            let result = booking.allDates.sort().map(el => String(el.slice(-5).replace('-','/'))).join(', ')
          return (
            <Marker
            coordinate={{latitude: booking.latitude, longitude: booking.longitude}}
            title={"영업정보"}
            description={`${result}`}
            key={index}
            >
                <View>
                  <Image source={require('../../assets/Icons/mapMarker2.png')} style={{  width: 25, height: 25,}} resizeMode="cover" />
                </View>
               
            </Marker>
          )}
        )}
      </MapView>
    </View>
)};