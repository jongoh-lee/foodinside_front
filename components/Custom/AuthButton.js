import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants";

const styles=StyleSheet.create({
  container:{
    backgroundColor:"#05e6f4",
    padding:15,
    marginVertical:5,
    borderRadius:6,
    width:constants.width *  0.9
  },
  container_disabled:{
    backgroundColor:"rgba(5, 230, 244, .4)",
    padding:15,
    marginVertical:5,
    borderRadius:6,
    width:constants.width *  0.9
  },
  text:{
    color:"white",
    textAlign:"center",
    fontWeight:"600"
  }
});

const AuthButton = ({ text, onPress, disabled = false, loading = false }) => (
  <TouchableOpacity style={ disabled? styles.container_disabled : styles.container} onPress={() => onPress()} disabled={disabled}>
     {loading ? <ActivityIndicator color={"white"} /> : <Text style={styles.text}>{text}</Text>}
  </TouchableOpacity>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default AuthButton;