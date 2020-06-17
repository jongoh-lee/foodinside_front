import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor:'white',
  },
  chatLeft: {
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 15,
  },
  contents:{
    width:constants.width * 0.65,
    justifyContent:"space-between",
  },
  username: {
    fontWeight: "600",
    fontSize: 18,
  },
  text:{
    color:"#666",
    fontSize:12,
  },
  timestamp:{
    fontSize:12,
    color:'#666',
    marginTop:4
  }
});

export default ({ chat }) => {
  const navigation = useNavigation();
  return (
  <TouchableOpacity onPress={()=> navigation.navigate("채팅 내용", {chat})}>
    <View style={styles.chatContainer}>
      <View style={styles.chatLeft}>
        <Image style={styles.avatar} source={{ uri: chat.avatar }} />
        <View style={styles.contents}>
          <Text style={styles.username} numberOfLines={1}>{chat.user}</Text>
          <Text style={styles.text} numberOfLines={1}>{chat.texts.text[2]}</Text>
        </View>
      </View>
      <Text style={styles.timestamp}>{chat.timestamp}</Text>
    </View>
  </TouchableOpacity>
  );
};