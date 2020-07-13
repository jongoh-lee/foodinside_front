import { TextInput } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants";


const SquareInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "send",
  autoFocus = false,
  size = 0.9,
  editable=true,
  padding=5,
  width='100%',
  multiline=false,
  maxHeight=150
}) => {
    return (
        <View style={{width:width}}>
            <TextInput style={[{
              padding: padding,
              backgroundColor: "white",
              borderWidth:1,
              fontSize:14,
              paddingLeft:10
            }, value === ''? {borderColor: 'rgba(5, 230, 244, .3)'} : {borderColor: 'rgb(5, 230, 244)'}]}
            onChangeText={onChange}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            value={value}
            autoFocus={autoFocus}
            editable={editable}
            blurOnSubmit={true}
            multiline={multiline}
            maxHeight={maxHeight}
            />
        </View>
    )
};

SquareInput.propTypes = {
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
  maxHeight: PropTypes.number
};

export default SquareInput;