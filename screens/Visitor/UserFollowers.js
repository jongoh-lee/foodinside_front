import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import PostComponent from "../../components/Visitor/PostComponent";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "@apollo/react-hooks";
import { USER_FOLLOWER } from "./VisitorQueries";
import UserSummary from "../../components/Visitor/UserSummary";
import ScreenLoader from "../../components/Custom/ScreenLoader";
import { Caption } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ route }) => {
    const {data, error, loading} = useQuery(USER_FOLLOWER,{
        variables:{
            username: route.params.username
        },
        fetchPolicy:"network-only"
    });
    
    const renderItem = ({ item }) => (
        <UserSummary {...item}/>
    );
    
    return (
        <View style={styles.container}>
            {loading? <ScreenLoader/> : data?.seeUser?.followers.length > 0 ? (
                 <FlatList 
                 data={data?.seeUser?.followers}
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