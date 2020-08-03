import 'react-native-gesture-handler';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Feather, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

// screens
import SearchShop from '../screens/Franchise/SearchShop';
import Favorite from '../screens/Franchise/Favorite';
import EnrollProfile from '../screens/Franchise/EnrollProfile';
import ShopDetail from "../screens/Franchise/ShopDetail";


import ProfileSample from "../screens/Franchise/ProfileSample";
import MyProfile from "../screens/Franchise/MyProfile";
import CompleteProfile from "../screens/Franchise/CompleteProfile";
import EditEnrollProfile from "../screens/Franchise/EditEnrollProfile";
import BeforeProfile from '../screens/Franchise/BeforeProfile';

import ChatListFranchise from "../screens/Franchise/ChatListFranchise";
import ChatListShop from "../screens/Franchise/ChatListShop";
import Chat from "../screens/Franchise/Chat";
import SelectPhoto from "../screens/SelectPhoto";

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import FranchiseButton from '../components/Franchise/FranchiseButton';
import ShopHeader from "../components/Franchise/ShopHeader";
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
            headerRight: () => <FranchiseButton />,
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
  const [lisensed, setLisensed] = React.useState("프로필 안내");
    return (
    <ProfileStack.Navigator 
    initialRouteName={lisensed} screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <ProfileStack.Screen name="내 프로필" component={MyProfile} options={{
        headerTitle:"내 프로필",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
      <ProfileStack.Screen name="심사 중" component={MyProfile} options={{
        headerTitle:"심사 중",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
      <ProfileStack.Screen name="프로필 안내" component={BeforeProfile} options={{
        headerTitle:()=><Logo nav={'공유 음식점'}/>,
        headerRight: () => <FranchiseButton/>,
      }} />
      <ProfileStack.Screen name="프로필 예시" component={ProfileSample} options={{
        headerTitle:()=><Logo nav={'공유 음식점'}/>,
        headerRight:() => <Feather name="more-vertical" size={24} />,
        headerLeft:()=> <BackArrow />,
        headerTitleAlign:"center"
      }} />
      <ProfileStack.Screen name="프로필 완성" component={CompleteProfile} options={{
        headerTitle:"프로필 완성",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
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
      <FranchiseStack.Screen name="프로필 신청" component={EnrollProfile} options={{
        headerShown:true,
        headerTitle:"프로필 신청",
        headerTitleAlign:"center",
        headerLeft:()=> <BackWarningArrow />,
      }} />
      <FranchiseStack.Screen name="프로필 수정(pre)" component={EditEnrollProfile} options={{
        headerShown:true,
        headerTitle:"프로필 수정",
        headerTitleAlign:"center",
        headerLeft:()=> <BackWarningArrow />,
      }} />
    </FranchiseStack.Navigator>
  )
}
