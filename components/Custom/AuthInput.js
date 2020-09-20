import { TextInput } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants";


const styles=StyleSheet.create({
  container:{
    marginBottom:5
  },
  inputBox:{
    width:constants.width * 0.9,
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderBottomWidth:1,
    borderColor: "#05e6f4",
    borderRadius:6
  }
})

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "send",
  autoFocus = false,
  width = 0.9,
  editable=true,
  padding=15,
  borderColor="#05e6f4",
}) => (
  <View style={styles.container}>
    <TextInput style={{
      width:constants.width * width,
      padding: padding,
      backgroundColor: "#F9F9F9",
      borderBottomWidth:1,
      borderColor: borderColor,
      borderRadius:6
    }}
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      autoFocus={autoFocus}
      editable={editable}
    />
  </View>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
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
  width: PropTypes.number,
  editable: PropTypes.bool,
  padding: PropTypes.number,
  borderColor: PropTypes.oneOf(["#05e6f4", "#666", "white"])
};

export default AuthInput;