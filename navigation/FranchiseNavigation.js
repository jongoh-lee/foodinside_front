import 'react-native-gesture-handler';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Feather, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

// tab screens
import SearchShop from '../screens/Franchise/SearchShop';
import Favorite from '../screens/Franchise/Favorite';
import CreateProfile from '../screens/Franchise/CreateProfile';
import ShopDetail from "../screens/Franchise/ShopDetail";

// nested screens
import FullProfile from "../screens/Visitor/FullProfile";
import SeeCreateProfile from "../screens/Franchise/SeeCreateProfile";
import CompleteProfile from "../screens/Franchise/CompleteProfile";
import EditProfile from "../screens/Franchise/EditProfile";
import MyProfile from '../screens/Franchise/MyProfile';

import ChatListFranchise from "../screens/Franchise/ChatListFranchise";
import ChatListShop from "../screens/Franchise/ChatListShop";
import Chat from "../screens/Franchise/Chat";
import SelectPhoto from "../screens/SelectPhoto";
import SelectMainPhoto from "../screens/SelectMainPhoto";

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import BackArrow from '../components/Custom/BackArrow';
import BackWarningArrow from '../components/Custom/BackWarningArrow';


const SearchStack = createStackNavigator();

function SearchStackScreen({navigation}) {
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', e => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     alert('Default behavior prevented');
  //     // Do something manually
  //     // ...
  //   });
  // }, [navigation]);
  return (
    <SearchStack.Navigator screenOptions={{headerShown:true, cardStyle:{backgroundColor:'#ffffff'}}}>
        <SearchStack.Screen name="Home" component={SearchShop} options={{
            headerTitle:() => <Logo nav={'공유 음식점'}/>,
            headerTitleAlign:'left'
        }}/>
    </SearchStack.Navigator>
    );
}

const ChatTabStack = createMaterialTopTabNavigator();

function ChatTabScreen(){
  return (
    <ChatTabStack.Navigator 
      tabBarOptions={{
      indicatorStyle:{ backgroundColor: 'transparent'}, 
      style:{ 
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on IOS
        borderWidth:1,
        borderColor:'transparent'
      }, 
      labelStyle:{fontSize:14, fontWeight:"bold"}}}>
      <ChatTabStack.Screen name='공유 음식점' component={ChatListShop}/>
      <ChatTabStack.Screen name='프랜차이즈' component={ChatListFranchise}/>
    </ChatTabStack.Navigator>
  )
}

const ChatStack = createStackNavigator();

function ChatStackScreen() {
    return (
    <ChatStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <ChatStack.Screen name="채팅" component={ChatTabScreen} />
    </ChatStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator();

function FavoriteStackScreen() {
    return (
    <FavoriteStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <FavoriteStack.Screen name="즐겨찾기" component={Favorite} />
    </FavoriteStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
    <ProfileStack.Navigator 
    initialRouteName={"프로필 안내"} screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <ProfileStack.Screen name="프로필 안내" component={MyProfile} options={{
        headerTitle:()=><Logo nav={'공유 음식점'}/>,
      }} />
      <ProfileStack.Screen name="심사 중" component={SeeCreateProfile} options={{
        headerTitle:"심사 중",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
      <ProfileStack.Screen name="프로필 보기" component={FullProfile}/>
    </ProfileStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator();
    
function TabsScreen() {
    return (
        <Tabs.Navigator 
        initialRouteName='공유 음식점' 
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar:true,
        }}
        >
            <Tabs.Screen name='공유 음식점' component={SearchStackScreen}  options={{tabBarIcon: ({ focused, color }) => (
              <MaterialIcons name={ 'store' } color={focused? 'black': color} size={25} />
            )}}/>
            {/* <Tabs.Screen name='채팅' component={ChatStackScreen} options={{tabBarIcon:({focused, color })=>(
              <MaterialCommunityIcons name={ 'chat' } color={focused? 'black' : color} size={25}/>
            )}}/> */}
            <Tabs.Screen name='즐겨찾기' component={FavoriteStackScreen} options={{tabBarIcon:({focused, color})=>(
              <MaterialCommunityIcons name={ 'star' } color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen name='프로필' component={ProfileStackScreen} options={{tabBarIcon:({focused, color})=>(
              <MaterialCommunityIcons name={ 'food-variant'} color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen 
            name='메뉴' 
            component={View} 
            options={{tabBarIcon:()=>(<NavIcon name={'menu'} size={25}/>)}}
            listeners={({navigation})=>({
              tabPress:e => {
              e.preventDefault();
              navigation.openDrawer();
            }})}/>
        </Tabs.Navigator>
    )
}

const FranchiseStack = createStackNavigator();

export default () => {
  return (
    <FranchiseStack.Navigator screenOptions={{headerShown:false}}>
      <FranchiseStack.Screen name='Tabs' component={TabsScreen}/>
      <FranchiseStack.Screen name='ShopDetail' component={ShopDetail} options={{cardStyle:{backgroundColor:'transparent'}}}/>
      <FranchiseStack.Screen name='채팅 내용' component={Chat} options={
        ({route}) => ({
        headerShown:true,
        title:route.params.shop.profileName
      })}/>
      <FranchiseStack.Screen name='SelectPhoto' component={SelectPhoto} />
      <FranchiseStack.Screen name='SelectMainPhoto' component={SelectMainPhoto} />
      <FranchiseStack.Screen name="프로필 신청" component={CreateProfile} options={{
        headerShown:true,
        headerTitle:"프로필 신청",
        headerTitleAlign:"center",
        headerLeft:()=> <BackWarningArrow />,
      }} />
      <FranchiseStack.Screen name="프로필 수정(pre)" component={EditProfile} options={{
        headerShown:true,
        headerTitle:"프로필 수정",
        headerTitleAlign:"center",
        headerLeft:()=> <BackWarningArrow />,
      }} />
      <FranchiseStack.Screen name="프로필 완성" component={CompleteProfile} options={{
        headerShown:true,
        headerTitle:"프로필 완성",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
    </FranchiseStack.Navigator>
  )
}
