import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons'; 

// screens
import DangolBar from "./DangolBar";
import ShopHeader from "./ShopHeader";
import PhotoReview from "./PhotoReview";
import OpenInfo from "./OpenInfo";
import Team from "./Team";

const WIDTH = constants.width - 20;
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
    fontSize:16,
    marginVertical:3,
  },
  priceBox:{
    flexDirection:"row",
    width: WIDTH /3,
    padding:5,
    justifyContent:"space-between"
  },
  fullPrice:{
    textDecorationLine:"line-through",
    justifyContent:"flex-start",
    fontSize:16,
  },
  salePrice:{
    fontSize:16,
  },
  notice:{
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:10,
  },
  text:{
    marginLeft:5,
    fontSize:15,
  },
  touchBox:{
    marginLeft:'auto',
    marginRight:5,
    paddingVertical:10,
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
  }
});

export default ({ shopProfile }) => {
  const profile = shopProfile;
  const navigation = useNavigation();
  const {name, sort, photoReviews, openInfo, team} = profile;
  const [foodGuide, setFoodGuide] = React.useState(false);
  const [tabName, setTabName] = React.useState('포토리뷰');
  React.useEffect(()=>{
    if(name && sort) {
      navigation.setOptions({
        headerTitle: () => <ShopHeader name={name} sort={sort}/>
        })
      }
    }, [])
  return (
    <ScrollView 
      style={styles.container} 
      stickyHeaderIndices={[2]} 
      showsVerticalScrollIndicator={false}
      >
      <Image style={styles.mainImage} source={{uri:shopProfile.mainImage}}/>
      
      {/* 메뉴 수평 스크롤 */}
      <View style={styles.subContainer}>
        <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.menuContainer}>
            <Text style={styles.menuName} numberOfLines={1}>{profile.mainMenu.name}</Text>
            <Image style={styles.menuImage} source={{uri:profile.mainMenu.image}}/>

            <View style={styles.priceBox}>
                <Text style={styles.fullPrice}>{profile.mainMenu.fullPrice}</Text>
                <Text style={styles.salePrice}>{profile.mainMenu.salePrice}</Text>
            </View>
          </View>

          {profile.subMenu && profile.subMenu.map((menu) => (
          <View key={menu.id} style={styles.menuContainer}>
            <Text style={styles.menuName} numberOfLines={1}>{menu.name}</Text>
            <Image style={styles.menuImage} source={{uri:menu.image}}/>

            <View style={styles.priceBox}>
                <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                <Text style={styles.salePrice}>{menu.salePrice}</Text>
            </View>
          </View>
          ))}
        </ScrollView>
        
        {/* 가격 정보, 리뷰 할인, 푸드 가이드 */}
        <View style={{borderBottomWidth:1, borderBottomColor:"#e7e7e7"}}>
          <View style={styles.notice}>
            <View>
              <Text style={styles.text}>👩‍🍳 '단골' 고객 단일 메뉴 할인</Text>
              <Text style={styles.text}>💰  포토리뷰가 받는 좋아요 1개당 {profile.point}C 적립</Text>
            </View>
            

            <View style={styles.touchBox}>
              <TouchableOpacity onPress={()=>setFoodGuide(!foodGuide)}>
                {foodGuide? <Entypo name="chevron-thin-up" size={20} color="black" /> : <Entypo name="chevron-thin-down" size={20} color="black" />}
              </TouchableOpacity>
            </View>
          </View>
        
          {foodGuide? (
          <View style={{padding:10}}>
            <Text style={{marginVertical:8, alignSelf:"center", fontSize:18, fontWeight:'bold'}}>푸드 가이드</Text>
            <Text>{profile.foodGuide}</Text>
            <Text style={{marginVertical:8, alignSelf:"center", fontSize:18, fontWeight:'bold'}}>원산지</Text>
            <Text>{profile.origin}</Text>
          </View>
          ) : null}
        </View>
        {/* 단골, 포스트 수, 영업 횟수, 가맹점 수 */}
        <DangolBar dangol={profile.dangol} posts={profile.posts} comments={profile.comments}/>
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

      {tabName=='포토리뷰'? <PhotoReview {...{photoReviews}}/> : null}
      {tabName=='영업정보'? <OpenInfo {...{openInfo}}/> : null}
      {tabName=='팀원소개'? <Team {...{team}}/> : null}
      
    </ScrollView>
)};