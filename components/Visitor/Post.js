import * as React from "react";
import { StyleSheet, Image } from "react-native";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import constants from "../../constants";

const styles = StyleSheet.create({
  image: {
    width: constants.width - 10,
    height: constants.height / 2.2,
    resizeMode: "cover",
    borderRadius:10
  },
});

export default ({ post }) => {
  return (
    <>
      <PostHeader avatar={post.avatar} user={post.user} shopName={post.shopName} timeStamp={post.timestamp}/>
      <Image style={styles.image} source={{ uri: post.picture.uri }}/>
      <PostFooter likes={post.likes} caption={post.caption} />
    </>
  );
};