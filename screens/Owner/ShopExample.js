import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { myShopData } from "../../components/Owner/data";

//screen
import OwnerComponent from "../../components/Owner/OwnerComponent";
import BackArrow from "../../components/Custom/BackArrow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:20,
    alignSelf:"center"
  },
  headerSort:{
    color:'#666',
    fontSize:10,
    marginLeft:12,
  },
});



export default ({ navigation }) => {
  const {sort} = myShopData;
      navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerTitle}>내 가게 <Text style={styles.headerSort}>{sort}음식점</Text></Text>
      ),
      headerLeft:() => <BackArrow />
      })
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <OwnerComponent {...myShopData} />

      </ScrollView>
    </View>
  );
};