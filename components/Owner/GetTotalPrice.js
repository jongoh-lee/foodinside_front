import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { StyleSheet, View, Text} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MY_EARNINGS } from "../../screens/Owner/OwnerQueries";

const styles = StyleSheet.create({
    loading:{
        justifyContent:"center",
        height:40,
    },
    earningNum:{
        fontSize:35,
        fontWeight:"bold",
    },
})

export default ({ year, month }) => {
    const { data, loading, error, networkStatus } = useQuery(MY_EARNINGS,{
        variables:{
            date: year + '-' + ('0' + (month + 1)).slice(-2)
        },
        fetchPolicy:"network-only"
    });
    return (
        <View style={styles.loading}> 
            {loading ? <ActivityIndicator color={"#05e6f4"} size={"small"}/> : <Text style={styles.earningNum}>{String(data?.myEarnings * 0.85).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>}
        </View>    
    )
}