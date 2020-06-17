import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Calendar from "../../components/Calendar";

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  calendarContainer:{
    marginTop:20,
    marginBottom:50,
  },
  priceSet:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginHorizontal:10
  },
  priceText:{
    fontSize:16,
    fontWeight:'bold',
    color:'#666'
  }
})

export default () => (
  <View style={styles.container}>
    <View style={styles.calendarContainer}>
      <Calendar  dayComponent={({date, state=true, marking}) => console.log(marking, date) }/>
    </View>

    <View style={styles.priceSet}>
      <TouchableOpacity>
        <Text style={styles.priceText}>초기화</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.priceText}>직접 영업</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.priceText}>가격 설정</Text>
      </TouchableOpacity>
    </View>
  </View>
);