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

export default ({ avatar, user, profileName, timestamp, picture, likes, caption }) => {
  return (
    <>
      <PostHeader avatar={avatar} user={user} profileName={profileName} timeStamp={timestamp}/>
      <Image style={styles.image} source={{ uri: picture.uri }}/>
      <PostFooter likes={likes} caption={caption} />
    </>
  );
};