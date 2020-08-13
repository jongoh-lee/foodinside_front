import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import constants from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:10,
  },
  placeHolder:{
    color:"#c7c7c7",
    marginLeft:10
  },
  icon: {
    marginRight: 8,
  },
  chips: {
    flexDirection: "row",
  },
  chip: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginRight: 8,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    marginTop:3,
    marginHorizontal:5,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    marginTop: 16,
    color:'#999',
    fontWeight:"bold"
  },
});

const Chip = ({ label }) => (
  <View style={styles.chip}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default () => {
  return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.search}>
          <Text style={styles.placeHolder}>검색</Text>
          <Feather name="search" size={24} style={styles.icon} />
        </TouchableOpacity>

        {/* <View style={styles.chips}>
          <Chip label="Dates" />
          <Chip label="Guests" />
          <Chip label="Filters" />
        </View> */}

        <Text style={styles.title}>경리단길 주변 공유 음식점</Text>
      </View>
  );
};