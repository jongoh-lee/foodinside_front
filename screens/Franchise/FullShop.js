import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import constants from "../../constants";
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons'; 
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Custom/Loader";
import Logo from "../../components/Custom/Logo";
import OwnerComponent from "../../components/Owner/OwnerComponent";
import { SEE_FULL_SHOP } from "./ProfileQueries";
import BackArrow from "../../components/Custom/BackArrow";

export default ({ navigation, route }) => {
    const { data, loading, error } = useQuery(SEE_FULL_SHOP,{
      variables:{
          id: route.params.id
      },
      fetchPolicy:"network-only"
    });
    navigation.setOptions({
        headerTitle:() => <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode={"middle"}>{route.params.shopName} <Text style={styles.headerClassification}>{route.params.classification}음식점</Text></Text>,
        headerRight:() => <Feather name="more-vertical" size={24} style={{paddingHorizontal:5}}/>,
    });
    if(loading) return <Loader />
    if(error) return console.log("Owner Error",error);
    return (
        <View style={styles.container}>
            <OwnerComponent {...data?.seeFullShop} />
        </View>
)};


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
      alignItems:"center",
      justifyContent:"center",
    },
    headerTitle:{
      fontWeight:'bold',
      fontSize:20,
      alignSelf:"center",
      paddingLeft:10
    },
    headerClassification:{
      color:'#666',
      fontSize:10,
      marginLeft:12,
    },
});
