import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FOLLOWER } from "./VisitorQueries";
import UserSummary from "../../components/Visitor/UserSummary";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default () => {
    const {data, error, loading} = useQuery(MY_FOLLOWER,{
        fetchPolicy:"network-only"
    });
    const renderItem = ({ item }) => (
        <UserSummary {...item}/>
    );
    
    console.log(data?.me)
    return (
        <View style={styles.container}>
            {loading? <ScreenLoader /> : data?.me.followers.length > 0 ? (
                <FlatList 
                data={data?.me?.followers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding:15}}
            />
            ) : (
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Caption>목록이 없습니다</Caption></View>
            )}
        </View>
    )
}