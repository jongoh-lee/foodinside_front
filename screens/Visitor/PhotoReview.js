import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import BackArrow from "../../components/Custom/BackArrow";
import Post from "../../components/Visitor/Post";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ navigation, route }) => {
    navigation.setOptions({
        headerLeft:() => <BackArrow />,
    })
    return (
        <View style={styles.container}>
            <ScrollView index={route.params.index} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:10}}>
                {route.params.posts.map(post => <Post key={post.id} {...post}/>)}
            </ScrollView>
        </View>
    )
}