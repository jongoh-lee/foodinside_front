import { TextInput } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants";

const WIDTH = constants.width;
const styles=StyleSheet.create({
  container:{
    marginBottom:5
  },
})

const BasicInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "send",
  autoFocus = false,
  size = 0.9,
  editable=true,
  multiline=true,
  padding=15
}) => (
  <View style={styles.container}>
    <TextInput style={{
      fontSize:14,
      width:WIDTH * size,
      backgroundColor:'white',
      borderRadius:20,
      padding:padding,
      justifyContent:'flex-start',
    }}
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      autoFocus={autoFocus}
      editable={editable}
      multiline={multiline}
    />
  </View>
);

BasicInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  padding: PropTypes.number
};

export default BasicInput;