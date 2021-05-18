import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MY_CALENDAR, EDIT_CALENDAR, OWNER_STATE } from "./OwnerQueries";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import SetCalendar from "../../components/Owner/SetCalendar";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";


export default ({navigation}) => {
  const { data, error, loading, refetch } = useQuery(MY_CALENDAR,{
    fetchPolicy:"network-only",
    notifyOnNetworkStatusChange: true
  });
  const { data: ownerStateProp, loading:ownerStateLoading, error:ownerStateError, refetch:ownerStateRefetch } = useQuery(OWNER_STATE,{
    fetchPolicy:"network-only"
  });
  
  navigation.setOptions({
    headerRight:()=> (
      <TouchableOpacity onPress={() => {refetch(),ownerStateRefetch()}}>
        <MaterialCommunityIcons 
          name="refresh"
          size={24}
          color={'black'}
          style={{paddingHorizontal:10}}
        />
      </TouchableOpacity>
    )
  })
  return(
    <View style={styles.container}>
      {loading ? <ScreenLoader /> : null}

      <SetCalendar ownerState={data?.myCalendar?.ownerState} franchiseState={data?.myCalendar?.franchiseState} calendar={data?.myCalendar?.calendar} refetch={refetch}/>
      {
        //음식점이 없다면 신청 화면으로 이동
        ownerStateProp?.myShop === null && (
          <View style={{position:"absolute", top:0, bottom:0,left:0, right:0, backgroundColor:"rgba(255, 255, 255, 0.5)", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity style={{backgroundColor:"rgba(0, 0, 0, 0.7)", flexDirection:"row", alignItems:"center", width: 250, height: 80, borderRadius: 125}} onPress={()=> navigation.navigate("음식점")}>
              <View style={{width: 60, height: 60, borderRadius: 30, alignItems:"center", justifyContent:"center", backgroundColor:"#f0f0f0", marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>🏠</Text>
              </View>
              <Text style={{fontSize:14, color:"#f0f0f0", fontWeight:"bold"}}>{`내 음식점 등록하기`}</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
)};


const styles = StyleSheet.create({
  container:{
    flex:1
  },
})
