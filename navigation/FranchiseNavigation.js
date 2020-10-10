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
import BookingHistory from '../screens/Franchise/BookingHistory';
import CreateProfile from '../screens/Franchise/CreateProfile';

// nested screens
import FullProfile from "../screens/Visitor/FullProfile";
import SeeCreateProfile from "../screens/Franchise/SeeCreateProfile";
import CompleteProfile from "../screens/Franchise/CompleteProfile";
import EditProfile from "../screens/Franchise/EditProfile";
import MyProfile from '../screens/Franchise/MyProfile';

//owner Screen
import FullShop from "../screens/Franchise/FullShop";

import ChatListFranchise from "../screens/Franchise/ChatListFranchise";
import ChatListShop from "../screens/Franchise/ChatListShop";
import Chat from "../screens/Franchise/Chat";
import SelectPhoto from "../screens/SelectPhoto";
import SelectMemberPhoto from "../screens/SelectMemberPhoto";
import SelectUpload from "../screens/SelectUpload";
import UploadPost from '../screens/Visitor/UploadPost';
import SelectMainPhoto from "../screens/SelectMainPhoto";

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import BackArrow from '../components/Custom/BackArrow';
import BackWarningArrow from '../components/Custom/BackWarningArrow';
import BookingShop from '../screens/Franchise/BookingShop';
import PostList from '../screens/Visitor/PostList';
import FullUser from '../screens/Visitor/FullUser';
import UserFollowers from '../screens/Visitor/UserFollowers';
import CancelBooking from '../screens/Franchise/CancelBooking';


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
    <SearchStack.Navigator headerMode={"screen"} screenOptions={{headerShown:true, cardStyle:{backgroundColor:'#ffffff'}}}>
        <SearchStack.Screen name="Home" component={SearchShop} options={{
            headerTitle:() => <Logo />,
            headerTitleAlign:'left'
        }}/>
        <SearchStack.Screen name="음식점 보기" component={FullShop} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}}/>
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
    <ChatStack.Navigator headerMode={"screen"} screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <ChatStack.Screen name="채팅" component={ChatTabScreen} />
    </ChatStack.Navigator>
  );
}


const FavoriteTabStack = createMaterialTopTabNavigator();

function FavoriteTabScreen(){
  return (
    <FavoriteTabStack.Navigator 
      tabBarOptions={{
      indicatorStyle:{ backgroundColor: 'transparent'}, 
      style:{ 
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on IOS
        borderWidth:1,
        borderColor:'transparent'
      }, 
      labelStyle:{fontSize:14, fontWeight:"bold"}}}>
      <FavoriteTabStack.Screen name='즐겨찾기' component={Favorite}/>
      <FavoriteTabStack.Screen name='예약내역' component={BookingHistory}/>
    </FavoriteTabStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();

function FavoriteStackScreen() {
    return (
    <FavoriteStack.Navigator headerMode={"screen"} screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <FavoriteStack.Screen name="즐겨찾기" component={FavoriteTabScreen} />
      <FavoriteStack.Screen name="음식점 보기" component={FullShop} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}}/>
    </FavoriteStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
    <ProfileStack.Navigator 
    headerMode={"screen"} initialRouteName={"프로필 안내"} screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <ProfileStack.Screen name="프로필 안내" component={MyProfile} options={{
        headerTitle:()=><Logo />,
        headerTitleAlign:"left",
      }} />
      <ProfileStack.Screen name="심사 중" component={SeeCreateProfile} options={{
        headerTitle:"심사 중",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />,
      }} />
      <ProfileStack.Screen name="프로필 보기" component={FullProfile} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <ProfileStack.Screen name="PostList" component={PostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <ProfileStack.Screen name="SeeUser" component={FullUser} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <ProfileStack.Screen name="UserFollowers" component={UserFollowers} options={{headerTitleAlign:"center", headerTitle:"팔로워", headerLeft:() => <BackArrow />}} />
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
    <FranchiseStack.Navigator screenOptions={{headerShown:true, headerTitleAlign:"center",}} headerMode={"screen"}>
      <FranchiseStack.Screen name='Tabs' component={TabsScreen} options={{
        headerShown:false,
      }}/>
      <FranchiseStack.Screen name='SelectPhoto' component={SelectPhoto} options={{
        headerShown:false,
      }}/>
      <FranchiseStack.Screen name='SelectMemberPhoto' component={SelectMemberPhoto} options={{
        headerShown:false,
      }}/>
      <FranchiseStack.Screen name='SelectMainPhoto' component={SelectMainPhoto} options={{
        headerShown:false,
      }}/>
      {/*
      채팅 화면
      <FranchiseStack.Screen name='채팅 내용' component={Chat} options={
        ({route}) => ({
        title:route.params.shop.profileName
      })}/>
      */}
      <FranchiseStack.Screen name='SelectUpload' component={SelectUpload} options={{
        headerTitle:"최근 항목",
        headerLeft:()=> <BackArrow />,
      }}/>
      <FranchiseStack.Screen name='포스트' component={UploadPost} options={{
        headerTitle:"최근 항목",
        headerLeft:()=> <BackArrow />,
      }}/>
      <FranchiseStack.Screen name="프로필 신청" component={CreateProfile} options={{
        headerTitle:"프로필 신청",
        headerLeft:()=> <BackWarningArrow />,
      }} />
      <FranchiseStack.Screen name="프로필 수정(pre)" component={EditProfile} options={{
        headerTitle:"프로필 수정",
        headerLeft:()=> <BackWarningArrow />,
      }} />
      <FranchiseStack.Screen name="프로필 완성" component={CompleteProfile} options={{
        headerTitle:"프로필 완성",
        headerLeft:()=> <BackArrow />,
      }} />
      <FranchiseStack.Screen name="결제하기" component={BookingShop} options={{
        headerTitle:"결제하기",
        headerLeft:()=> <BackArrow />,
      }} />
      <FranchiseStack.Screen name="예약취소" component={CancelBooking} options={{
        headerTitle:"예약취소",
        headerLeft:()=> <BackArrow />,
      }} />
    </FranchiseStack.Navigator>
  )
}
