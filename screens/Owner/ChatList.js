import * as React from "react";
import { StyleSheet, View, Text} from "react-native";
import { chats } from "../../components/Visitor/data";
import { ScrollView } from "react-native-gesture-handler";
import OwnerChatList from "../../components/Owner/OwnerChatList";

const styles = StyleSheet.create({
  container:{
   flex:1,
  }
})

export default () => (
  <View style={styles.container}>
    <ScrollView pinchGestureEnabled={false} showsVerticalScrollIndicator={false}>
      {chats.map((chat) => (<OwnerChatList key={chat.id} {...{chat}} />))}
    </ScrollView>
  </View>
);