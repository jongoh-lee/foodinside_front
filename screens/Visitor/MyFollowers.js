import * as React from "react";
import { View, StyleSheet, Text, RefreshControl } from "react-native";
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
    const [refreshing, setRefreshing] = React.useState(false);
    const {data, error, loading, refetch} = useQuery(MY_FOLLOWER,{
        fetchPolicy:"network-only"
    });

    const refresh = async () => {
        try {
          setRefreshing(true);
          await refetch()
        } catch(e){
          console.log(e, "팔로워 새로고침 에러");
        } finally {
          setRefreshing(false);
        }
    }

    const renderItem = ({ item }) => (
        <UserSummary {...item}/>
    );
    
    return (
        <View style={styles.container}>
            {loading? <ScreenLoader /> : data?.me.followers.length > 0 ? (
                <FlatList 
                data={data?.me?.followers}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding:15}}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>}
            />
            ) : (
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}><Caption>목록이 없습니다</Caption></View>
            )}
        </View>
    )
}