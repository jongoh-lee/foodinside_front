import { TouchableOpacity } from "react-native-gesture-handler";
import * as React from "react";
import {StyleSheet, Text, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";

const styles=StyleSheet.create({
  container:{
    backgroundColor:"#05e6f4",
    borderRadius:6,
    width:'100%',
  },
  container_disabled:{
    backgroundColor:"rgba(5, 230, 244, .4)",
    borderRadius:6,
    width:'100%'
  },
  text:{
    color:"white",
    textAlign:"center",
    fontWeight:"600"
  }
});

const BasicButton = ({ text, onPress, disabled = false, loading = false, marginVertical = 20 , padding = 15}) => (
  <View style={{marginVertical:marginVertical}}>
    <TouchableOpacity style={ disabled? [styles.container_disabled, {padding:padding}] : [styles.container,{padding:padding}]} onPress={onPress} disabled={disabled}>
     {loading ? <ActivityIndicator color={"white"} /> : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  </View>
);

BasicButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  marginVertical: PropTypes.number,
  padding: PropTypes.number
};

export default BasicButton;