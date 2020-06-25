import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Post from "../../components/Visitor/Post";
import { posts } from "../../components/Visitor/data";
import { shopProfile } from "../../components/Franchise/data";
import Card from "../../components/Visitor/Card";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal:5
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <ScrollView
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false} >
        {posts.map((post) => (<Post key={post.id} {...post} />))}
        <Card {...shopProfile}/>
      </ScrollView>
    </View>
  );
};