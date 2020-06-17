import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";;

const styles = StyleSheet.create({
  //단골 바
  rowBox:{
    flex:1,
    flexDirection:"row",
    paddingTop:8,
},
dangolBar_s:{
    flex:10,
    justifyContent:"flex-start",
    paddingLeft:5,
},
dangolBar_l:{
  flex:15,
  justifyContent:"flex-start",
  paddingLeft:5,
},
barText:{
    fontSize:12,
    color:'rgba(0, 0, 0, .4)',
    lineHeight:14
},
barNum:{
    marginTop:2,
    fontWeight:"600",
    fontSize:14,
    justifyContent:"center",
},

//단골 버튼
logoRow:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft:"auto",
    marginRight:5
  },
  dangolLogo:{
    width:constants.width / 40,
    resizeMode:"contain",
    opacity: .9,
  },
  dangolLogo_checked:{
    width:constants.width / 40,
    resizeMode:"contain",
    opacity: .4,
  },
  logoText:{
    fontSize:15,
    color:"rgba(0, 0, 0, .9)",
    paddingLeft:10,
  },
  logoText_checked:{
    fontSize:15,
    color:"rgba(0, 0, 0, .4)",
    paddingLeft:10,
  },

  
});

export default ({ dangol, posts, comment }) => {
  const [logoBtn, setLogoBtn] = React.useState(false);
  return(
    <View style={styles.rowBox}>
    <View style={styles.dangolBar_s}>
        <Text style={styles.barText}>단골</Text>
        <Text style={styles.barNum}>3,948</Text>
    </View>

    <View style={styles.dangolBar_s}>
        <Text style={styles.barText}>포스트</Text>
        <Text style={styles.barNum}>417</Text>
    </View>

    <View style={styles.dangolBar_l}>
        <Text style={styles.barText}>발행량</Text>
        <Text style={styles.barNum}>10,000,000C</Text>
    </View>

    <View style={styles.dangolBar_l}>
        <Text style={styles.barText}>수거량</Text>
        <Text style={styles.barNum}>1,134,300C</Text>
    </View>

    <View style={{flex:15, alignSelf:"center"}}>
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