import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";;

const styles = StyleSheet.create({
  //단골 바
  rowBox:{
    flexDirection:"row",
    flex:1,
    padding:5,
  },
  cardInfo:{
    flex:1,
    justifyContent:"center",
  },
  cardInfoText:{
    fontSize:12,
    color:"rgba(0, 0, 0, .9)",
    paddingLeft:5,
  },
  cardInfoNum:{
    color:"rgba(0, 0, 0, .4)",
    fontSize:13,
    paddingLeft:5,
    marginTop:5
  },
  
//단골 버튼
logoRow:{
  flexDirection:"row",
  alignItems:"center",
  marginLeft:"auto",
  marginRight:5,
},
dangolLogo:{
  width:10,
  resizeMode:"contain",
  marginRight:8,
  opacity: .9,
},
dangolLogo_checked:{
  width:10,
  resizeMode:"contain",
  marginRight:8,
  opacity: .4,
},
logoText:{
  color:"rgba(0, 0, 0, .9)",
  fontSize:14
},
logoText_checked:{
  color:"rgba(0, 0, 0, .4)",
  fontSize:14
},

  
});

export default ({ dangol, posts, comment }) => {
  const [logoBtn, setLogoBtn] = React.useState(false);
  return(
    <View style={styles.rowBox}>
    <View style={styles.cardInfo}>
        <Text style={styles.cardInfoText}>단골</Text>
        <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
    </View>

    <View style={styles.cardInfo}>
        <Text style={styles.cardInfoText}>포스트</Text>
        <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
    </View>

    <View style={styles.cardInfo}>
        <Text style={styles.cardInfoText}>발행량</Text>
        <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
    </View>

    <View style={styles.cardInfo}>
        <Text style={styles.cardInfoText}>회수량</Text>
        <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
    </View>

    <View style={styles.cardInfo}>
        <TouchableWithoutFeedback style={styles.logoRow} onPress={()=>setLogoBtn(!logoBtn)}>
          {logoBtn? <>
          <Image style={styles.dangolLogo_checked} source={require('../../assets/Icons/cloche.png')} />
          <Text style={styles.logoText_checked}>단골 중</Text>
          </> : <>
          <Image style={styles.dangolLogo} source={require('../../assets/Icons/cloche.png')} />
          <Text style={styles.logoText}>단골</Text>
          </>}
        </TouchableWithoutFeedback>
    </View>
</View>
   
    
  )
};