import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PostComponent from "../../components/Visitor/PostComponent";

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
      {/* <ScrollView
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false} >
        {posts.map((post) => (<PostComponent key={post.id} {...post} />))}
      </ScrollView> */}
    </View>
  );
};