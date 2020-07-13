import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { myShopData } from "../../components/Owner/data";

//screen
import Description from "../../components/Owner/Description";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  headerContainer: {
    flexDirection:"row",
    alignItems:"baseline"
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
  },
  headerSort:{
    color:'#666',
    fontSize:10,
    marginLeft:12,
  },
});



export default ({ navigation }) => {
  const {sort} = myShopData;
  React.useEffect(()=>{
      navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>내 가게</Text>
        <Text style={styles.headerSort}>{sort}음식점</Text>
      </View>)
      })
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Description {...myShopData} />

      </ScrollView>
    </View>
  );
};