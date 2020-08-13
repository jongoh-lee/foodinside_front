import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome, Entypo, AntDesign, Feather } from '@expo/vector-icons'; 

// components
import PhotoReview from "./PhotoReview";
import OpenInfo from "../Franchise/OpenInfo";
import Members from "../Franchise/Members";
import DangolButton from "../Custom/DangolButton";


const WIDTH = constants.width - 20;

export default ({ id, mainImage, menuName, menuImage, fullPrice, salePrice, submenus, foodGuide, origin, token, isDangol, dangolCount, posts, comments, photoReviews, openInfo, founderImage, career, user, members}) => {
  const [showGuide, setShowGuide] = React.useState(false);
  const [tabName, setTabName] = React.useState('포토리뷰');
  const [dangols, setDangols ] = React.useState(dangolCount);
  const navigation = useNavigation();

  return (
    <ScrollView 
      style={styles.container} 
      stickyHeaderIndices={[2]} 
      showsVerticalScrollIndicator={false}
      >
      <Image style={styles.mainImage} source={{uri:mainImage}}/>
      
      {/* 메뉴 수평 스크롤 */}
    <View style={styles.subContainer}>
        <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.menuContainer}>
            <Text style={styles.menuName} numberOfLines={1}>{menuName}</Text>
            <Image style={styles.menuImage} source={{uri:menuImage}}/>

            <View style={styles.priceBox}>
                <Text style={styles.fullPrice}>{fullPrice}</Text>
                <Text style={styles.salePrice}>{salePrice}</Text>
            </View>
          </View>

          {submenus && submenus.map((menu) => (
          <View key={menu.id} style={styles.menuContainer}>
            <Text style={styles.menuName} numberOfLines={1}>{menu.menuName}</Text>
            <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>

            <View style={styles.priceBox}>
                <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                <Text style={styles.salePrice}>{menu.salePrice}</Text>
            </View>
          </View>
          ))}
        </ScrollView>
        
        {/* 가격 정보, 리뷰 할인, 푸드 가이드 */}
        <View style={{borderBottomWidth:1, borderBottomColor:"#e7e7e7"}}>
            <TouchableOpacity onPress={()=>setShowGuide(!showGuide)}>
              <View style={styles.notice}>
                <View>
                  <Text style={styles.text}>👩‍🍳 '단골' 고객 1개 메뉴 할인가 적용</Text>
                  <Text style={styles.text}>💰  포토리뷰가 받는 좋아요 1개당 {token}P 발행</Text>
                </View>


                <View style={styles.touchBox}>
                  {showGuide? <Entypo name="chevron-thin-up" size={20} color="black" /> : <Entypo name="chevron-thin-down" size={20} color="black" />}
                </View>
              </View>
            </TouchableOpacity>
        
            {showGuide? (
            <View style={{padding:10}}>
              <Text style={{marginVertical:8, fontSize:16, fontWeight:'bold'}}>푸드 가이드</Text>
              <Text style={{padding:5, paddingBottom:15}}>{foodGuide}</Text>
              <Text style={{marginVertical:8, fontSize:16, fontWeight:'bold'}}>원산지</Text>
              <Text style={{padding:5, paddingBottom:15}}>{origin}</Text>
            </View>
            ) : null}
        </View>
        
        {/* 단골, 포스트 수, 영업 횟수, 가맹점 수 */}

        <View style={styles.rowBox}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>단골</Text>
                <Text style={styles.cardInfoNum} numberOfLines={1}>{dangols}</Text>
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>포스트</Text>
                <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>내 리뷰</Text>
                <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoText}>암호화폐</Text>
                <Text style={styles.cardInfoNum} numberOfLines={1}>0</Text>
            </View>

            <View style={styles.cardInfo}>
                <DangolButton id={id} isDangol={isDangol} dangols={dangols} setDangols={setDangols} />
            </View>
        </View>
      </View>
        
      <>
        <View style={styles.tabBar}>
          <TouchableWithoutFeedback onPress={()=> setTabName('포토리뷰')}>
              <Text style={tabName=='포토리뷰'? styles.activeTab : styles.inactiveTab}>포토리뷰</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=> setTabName('영업정보')}>
              <Text style={tabName=='영업정보'? styles.activeTab : styles.inactiveTab}>영업정보</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=> setTabName('팀원소개')}>
              <Text style={tabName=='팀원소개'? styles.activeTab : styles.inactiveTab}>팀원소개</Text>
          </TouchableWithoutFeedback>
        </View>
      </>

      {tabName=='포토리뷰'? <PhotoReview photoReviews={photoReviews} /> : null}
      {tabName=='영업정보'? <OpenInfo openInfo={openInfo} /> : null}
      {tabName=='팀원소개'? <Members members={members} founderImage={founderImage} career={career} username={user.firstName} /> : null}
      
    </ScrollView>
)};

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
  },
 
  mainImage:{
    width: constants.width,
    height: constants.height / 4,
    resizeMode:"cover",
  },
  subContainer:{
    padding:5,
    borderBottomWidth:1,
    borderBottomColor:"#e7e7e7",
  },
  menuScroll:{
    flexDirection:"row",
  },
  menuContainer:{
    width: WIDTH /3,
    marginRight:5,
    alignItems:"center"
  },
  menuImage:{
    width: WIDTH /3,
    height: WIDTH / 3,
    resizeMode:"cover",
    borderRadius: 15,
  },
  menuName:{
    fontSize:14,
    marginVertical:3,
  },
  priceBox:{
    flexDirection:"row",
    width: WIDTH /3,
    padding:5,
    justifyContent:"space-between"
  },
  fullPrice:{
    width:'50%',
    textDecorationLine:"line-through",
    justifyContent:"flex-start",
    fontSize:14,
    color:'#666'
  },
  salePrice:{
    fontSize:14,
  },
  notice:{
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:15,
  },
  text:{
    marginLeft:5,
    fontSize:14,
  },
  touchBox:{
    marginLeft:'auto',
    marginRight:5,
    paddingVertical:10,
  },

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
  tabBar:{
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"white"
  },
  activeTab:{
    fontSize:16,
    fontWeight:"bold",
    marginVertical:12,
  },
  inactiveTab:{
    fontSize:16,
    fontWeight:"bold",
    color:"#666",
    marginVertical:12,
  },
});