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
    backgroundColor:'white'
  },
  chatLeft: {
    flexDirection: "row",
  },
  shopImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contents:{
    width:constants.width * 0.65,
    justifyContent:"space-between",
  },
  profileName: {
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

export default ({ shop }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("채팅 내용", {shop})}>
        <View style={styles.chatContainer}>
          <View style={styles.chatLeft}>
            <Image style={styles.shopImage} source={{ uri: shop.shopImage }} />
            <View style={styles.contents}>
              <Text style={styles.profileName} numberOfLines={1}>{shop.profileName}</Text>
              <Text style={styles.text} numberOfLines={1}>{shop.text}</Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{shop.timestamp}</Text>
        </View>
    </TouchableOpacity>
  );
};