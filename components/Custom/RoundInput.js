import { TextInput } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants";


const RoundInput = ({
  placeholder,
  value,
  backgroundColor = "white",
  keyboardType = "default",
  autoCapitalize = "none",
  borderColorFocus = "black",
  borderColorBlur = "#666",
  onChange,
  returnKeyType = "send",
  autoFocus = false,
  borderRadius= 10,
  editable=true,
  padding=5,
  width='100%',
  multiline=false,
  maxHeight=150,
}) => {
    return (
        <View style={{width:width}}>
            <TextInput style={[{
              padding: padding,
              backgroundColor: backgroundColor,
              borderWidth:1,
              fontSize:14,
              textAlign:"center",
              borderRadius:borderRadius,
            }, value === null || '' ? {borderColor: borderColorBlur} : {borderColor: borderColorFocus}]}
            onChangeText={onChange}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            value={value}
            numberOfLines={1}
            autoFocus={autoFocus}
            editable={editable}
            blurOnSubmit={true}
            multiline={multiline}
            maxHeight={maxHeight}
            />
        </View>
    )
};

RoundInput.propTypes = {
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
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send", "none"]),
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  editable: PropTypes.bool,
  padding: PropTypes.number,
  borderColor: PropTypes.oneOf(["#05e6f4", "#666", "white"]),
  width: PropTypes.string,
  multiline: PropTypes.bool,
  maxHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColorFocus: PropTypes.string,
  borderColorBlur: PropTypes.string,
};

export default RoundInput;