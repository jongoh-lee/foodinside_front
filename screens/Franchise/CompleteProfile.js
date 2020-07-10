import * as React from "react";
import {StyleSheet, View, Text, Image, ImageBackground} from "react-native";
import { profile } from "../../components/Franchise/data";
import MenuInfo from "../../components/Franchise/MenuInfo";
import ShopHeader from "../../components/Franchise/ShopHeader";
import SquareInput from "../../components/Custom/SquareInput";
import useInput from "../../hooks/strickInput";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../../constants";
import BasicInput from "../../components/Custom/BasicInput";
import BasicButton from "../../components/Custom/BasicButton";

const WIDTH = constants.width - 30;
const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    padding:15,
    flex:1,
  },
  shopInfo:{
    borderWidth:1,
    borderColor:"rgba(5, 230, 244, .3)",
    marginBottom:20
  },
  inputBox:{
    width:'100%'
  },
  save:{
    paddingHorizontal:5
  },
  saveText:{
    color:'#05e6f4',
    fontSize:16,
  },

  //메뉴 스크롤
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
});

export default ({ navigation }) => {
  const infoInput = useInput("");
  const onSelect = (image) => {
    setAvatar(image.photo.uri)
  };
  navigation.setOptions({
    headerRight:() => (
      <TouchableWithoutFeedback onPress={() => console.log('hi')}>
        <View style={styles.save}>
          <Text style={styles.saveText}>저장</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  })
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{padding:10}}>업체 정보 </Text>

          <View style={styles.shopInfo}>
            <View style={{flexDirection:"row"}}>
              <SquareInput {...infoInput} placeholder={'업체명'} width={'70%'}/>
              <SquareInput {...infoInput} placeholder={'분류'} width={'30%'}/>
            </View>
            <SquareInput placeholder={'희망 영업 지역'} width={'100%'}/>
        
            <View style={{width:'100%', alignItems:"center", justifyContent:"center", borderColor:"rgba(5, 230, 244, .3)", borderWidth:1}}>
              <TouchableOpacity onPress={() => (
                navigation.navigate('SelectPhoto', {
                  onSelect : onSelect
                })
                )}>
                <View style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'red',
                    marginVertical:40
                  }}>
                  <ImageBackground
                    style={{height: 100, width: 100}}
                    imageStyle={{borderRadius: 15}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          </View>


        
        <Text style={{padding:10}}>메뉴 정보</Text>

          
            <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} horizontal>
              <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}>{profile.mainMenu.menuName}</Text>
                <Image style={styles.menuImage} source={{uri:profile.mainMenu.menuImage}}/>

                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>{profile.mainMenu.fullPrice}</Text>
                    <Text style={styles.salePrice}>{profile.mainMenu.salePrice}</Text>
                </View>
              </View>

              {profile.subMenu && profile.subMenu.map((menu) => (
              <View key={menu.id} style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}>추가 메뉴1</Text>
                <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>

                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>5,000</Text>
                    <Text style={styles.salePrice}>6,000</Text>
                </View>
              </View>
              ))}



              <TouchableOpacity onPress={() => (
                navigation.navigate('SelectPhoto', {
                  onSelect : onSelect
                })
                )}>
                <View style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'red',
                    marginVertical:40
                  }}>
                  <ImageBackground
                    style={{height: 100, width: 100}}
                    imageStyle={{borderRadius: 15}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </ScrollView>

          <View style={styles.shopInfo}>
            <SquareInput placeholder={'푸드 가이드'} width={'100%'} multiline={true} returnKeyType={'none'}/>
            <SquareInput placeholder={'원산지'} width={'100%'} multiline={true} returnKeyType={'none'}/>
            
          </View>

        <Text style={{padding:10}}>팀원 정보</Text>

          <View style={styles.shopInfo}>
            <View style={{flexDirection:"row"}}>
              <SquareInput {...infoInput} placeholder={'업체명'} width={'50%'}/>
              <SquareInput {...infoInput} placeholder={'분류'} width={'50%'}/>
            </View>
                      
            <View style={{width:'100%', alignItems:"center", justifyContent:"center", borderColor:"rgba(5, 230, 244, .3)", borderWidth:1}}>
              <TouchableOpacity onPress={() => (
                navigation.navigate('SelectPhoto', {
                  onSelect : onSelect
                })
                )}>
                <View style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'red',
                    marginVertical:40
                  }}>
                  <ImageBackground
                    style={{height: 100, width: 100}}
                    imageStyle={{borderRadius: 15}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          </View>

      
        <BasicButton text={'제출하기'} />
      </View>
    </ScrollView>
)};