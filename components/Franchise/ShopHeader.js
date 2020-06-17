import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection:"row",
    alignItems:"baseline"
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
  },
  headerSubtitle:{
    color:'#666',
    fontSize:12,
  }
});

export default ({ name, sort }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle} numberOfLines={1}>{name}
        <Text style={styles.headerSubtitle}>  {sort}</Text>
      </Text>
    </View>
  );