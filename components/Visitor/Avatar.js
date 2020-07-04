import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const MARGIN = 2;
const SIZE = 70;
const styles = StyleSheet.create({
    background:{
        width: SIZE,
        height: SIZE,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        backgroundColor:"rgba(0, 0, 0, .2)"
    },
    avatar: {
      width: SIZE - MARGIN * 2,
      height: SIZE - MARGIN * 2,
      borderRadius: (SIZE - MARGIN) / 2,
    },
    add: {
      position: "absolute",
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#05e6f4',
      justifyContent: "center",
      alignItems: "center",
    },
  });

  export default ({ image=require("../../assets/Icons/avatarBasic.png") }) => {
    const navigation = useNavigation();
    return (
        <View>
          <View style={styles.background} >
            <Image source={image} style={styles.avatar} />
          </View>
        </View>
    );
  };