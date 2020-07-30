import { TextInput } from "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";


const ShadowInput = ({
  placeholder,
  value,
  backgroundColor = "white",
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "send",
  autoFocus = false,
  borderRadius= 10,
  editable=true,
  padding=10,
  width='100%',
  multiline=false,
  maxHeight=150,
  textAlign="center",
  maxLength=300
}) => {
    return (
        <View style={{width:width, padding:3}}>
            <TextInput style={{
              padding: padding,
              backgroundColor: backgroundColor,
              fontSize:14,
              textAlign:textAlign,
              borderRadius:borderRadius,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,
              elevation: 2,
            }}
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
            maxLength={maxLength}
            />
        </View>
    )
};

ShadowInput.propTypes = {
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
  width: PropTypes.string,
  multiline: PropTypes.bool,
  maxHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  textAlign: PropTypes.oneOf(["center", "rignt", "left", "auto", "justify"]),
  maxLength: PropTypes.number
};

export default ShadowInput;