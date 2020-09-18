import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
//import FollowComponent from "../../components/Visitor/FollowComponent";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { MY_FOLLOWING } from "./VisitorQueries";
import UserSummary from "../../components/Visitor/UserSummary";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff",
    }
});

export default () => {
    const {data, error, loading} = useQuery(MY_FOLLOWING,{
        fetchPolicy:"network-only"
    });
    
    const renderItem = ({ item }) => (
        <UserSummary {...item}/>
    );
    
    return (
        <View style={styles.container}>
            {loading? <ScreenLoader /> : data?.me.following.length > 0 ? (
                <FlatList 
                data={data?.me?.following}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding:15}}
            />
            ) : (
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Caption>목록이 없습니다</Caption>
                </View>
            )}
        </View>
    )
}