import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontWeight: "500",
    fontSize: 16,
    marginLeft:4
  },
  shopName:{
    color:"#666",
    fontSize:14,
    marginLeft:4
  }
});

export default ({ avatar, user, shopName, timestamp }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <View>
          <Text style={styles.username}>{user}</Text>
          <Text style={styles.shopName}>{shopName}</Text>
        </View>
      </View>
      <Feather name="more-vertical" size={24} />
    </View>
  );
};