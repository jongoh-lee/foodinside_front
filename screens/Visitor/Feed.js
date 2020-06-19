import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Post from "../../components/Visitor/Post";
import { posts } from "../../components/Visitor/data";
import { shopProfile } from "../../components/Franchise/data";
import Card from "../../components/Visitor/Card";
import Card2 from "../../components/Visitor/Card2";
import Card3 from "../../components/Visitor/Card3";
import Card4 from "../../components/Visitor/Card4";
import Card5 from "../../components/Visitor/Card5";

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
        {posts.map((post) => (<Post key={post.id} { ...{post}} />))}
        <Card {...{shopProfile}}/>
        <Card5 {...{shopProfile}}/>
        <Card4 {...{shopProfile}}/>
        <Card2 {...{shopProfile}}/>
        <Card3 {...{shopProfile}}/>
      </ScrollView>
    </View>
  );
};