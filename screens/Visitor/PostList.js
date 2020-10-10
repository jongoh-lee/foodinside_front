import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import PostComponent from "../../components/Visitor/PostComponent";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ navigation, route }) => {
    const renderItem = ({ item }) => {
    return (
        <PostComponent {...item}  profileId={route.params.post.profileId} userInfo={route.params.post.user}/>
        
    )};
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={route.params.post.posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{paddingVertical:10}}
                initialScrollIndex={route.params.post.index}
                initialNumToRender={3}
                getItemLayout={(data, index) => (
                    {length: 601, offset: 601 * index, index}
                  )}
            />
        </View>
    )
}