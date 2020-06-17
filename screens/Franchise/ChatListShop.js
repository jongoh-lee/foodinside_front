import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import FranchiseChatList from "../../components/Franchise/FranchiseChatList";

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'white'
  }
})

export default () => (
  <View style={styles.container}>
    <ScrollView pinchGestureEnabled={false} showsVerticalScrollIndicator={false}>
      {chats[0].toUser.map((shop) => (<FranchiseChatList key={shop.id} {...{shop}}/>))}
    </ScrollView>
  </View>
);