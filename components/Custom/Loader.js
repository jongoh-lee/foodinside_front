import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../../theme";

const styles = StyleSheet.create({
  constainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default () => (
  <View style={styles.constainer}>
    <ActivityIndicator color={theme.blackColor} />
  </View>
);