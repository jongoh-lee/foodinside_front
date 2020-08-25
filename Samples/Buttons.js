import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import constants from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
  },
  col:{
    flex:1,
    justifyContent:"space-around",
    alignItems:"center",
  },

  dangolButton1:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(248, 109, 95, .9)"
  },
  dangolButton_checked1:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(0, 0, 0, .1)"
  },

  
  dangolButton2:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(0, 188, 237, .9)"
  },
  dangolButton_checked2:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(0, 0, 0, .1)"
  },


  dangolButton3:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(254, 111, 97, .9)"
  },
  dangolButton_checked3:{
    width:constants.width * .14,
    height:constants.width / 11,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:3,
    backgroundColor:"rgba(254, 111, 97, .1)"
  },


  dangolText1:{
    fontSize:15,
    color:"#f1f1f8",
  },
  dangolText_cheched1:{
    fontSize:15,
    color:"rgba(248, 109, 95, .9)",
  },


  dangolText2:{
    fontSize:15,
    color:"#f1f1f8",
  },
  dangolText_cheched2:{
    fontSize:15,
    color:"rgba(248, 109, 95, .9)",
  },


  dangolText3:{
    fontSize:15,
    color:"#f1f1f8",
  },
  dangolText_cheched3:{
    fontSize:15,
    color:"rgba(248, 109, 95, .9)",
  },


  logoRow:{
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:10,
  },
  dangolLogo:{
    width:constants.width / 45,
    resizeMode:"contain",
    opacity: .9,
  },
  dangolLogo_checked:{
    width:constants.width / 45,
    resizeMode:"contain",
    opacity: .4,
  },
  logoText:{
    fontSize:15,
    color:"rgba(248, 109, 95, .9)",
    paddingLeft:10,
  },
  logoText_checked:{
    fontSize:15,
    color:"rgba(0, 0, 0, .4)",
    paddingLeft:10,
  },
  
})

export default () => {
  const [btn, setBtn] = React.useState(false);
  const [logoBtn, setLogoBtn] = React.useState(false);
  return (
  <View style={styles.container}>
    <View style={styles.col}>
      <TouchableWithoutFeedback 
      style={btn? styles.dangolButton_checked1 : styles.dangolButton1 } 
      onPress={() => setBtn(!btn)}
      >
        {btn? <Text style={styles.dangolText_cheched1}>단골 중</Text> : 
        <Text style={styles.dangolText1}>단골</Text>}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
      style={btn? styles.dangolButton_checked2 : styles.dangolButton2 } 
      onPress={() => setBtn(!btn)}
      >
        {btn? <Text style={styles.dangolText_cheched2}>단골 중</Text> : 
        <Text style={styles.dangolText2}>단골</Text>}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback 
      style={btn? styles.dangolButton_checked3 : styles.dangolButton3 } 
      onPress={() => setBtn(!btn)}
      >
        {btn? <Text style={styles.dangolText_cheched3}>단골 중</Text> : 
        <Text style={styles.dangolText3}>단골</Text>}
      </TouchableWithoutFeedback>
    </View>


    <View style={styles.col}>
      <TouchableWithoutFeedback style={styles.logoRow} onPress={()=>setLogoBtn(!logoBtn)}>
        {logoBtn? <><Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
        <Text style={styles.logoText_checked}>단골 중</Text></> : <><Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} /><Text style={styles.logoText}>단골</Text></>}
      </TouchableWithoutFeedback>

    </View>
  </View>
)};