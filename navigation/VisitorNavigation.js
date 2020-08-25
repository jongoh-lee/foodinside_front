import 'react-native-gesture-handler';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {useTheme} from 'react-native-paper';

//screens
import Dangol from '../screens/Visitor/Dangol';
import Feed from '../screens/Visitor/Feed';
import Map from '../screens/Visitor/Map';
import User from '../screens/Visitor/User';
import EditUser from '../screens/Visitor/EditUser';
import Around from '../screens/Visitor/Around';
import Search from '../screens/Visitor/Search';

//nested screen
import FullProfile from '../screens/Visitor/FullProfile';
import PhotoReview from '../screens/Visitor/PhotoReview';

// 사진 선택
import SelectPhoto from '../screens/SelectPhoto';
import SelectUpload from '../screens/SelectUpload';

//franchise screen

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import LocationButton from '../components/Visitor/LocationButton';
import SearchButton from '../components/Visitor/SearchButton';
import BackArrow from '../components/Custom/BackArrow';
import UploadPost from '../screens/Visitor/UploadPost';

    
const FeedStack = createStackNavigator();

function FeedStackScreen({navigation}) {
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
    <FeedStack.Navigator >
        <FeedStack.Screen name="Home" component={Feed} options={{
            headerShown:true,
            headerTitle:()=> <Logo nav={'피드'}/>,
            headerTitleAlign:'center',
            headerLeft:()=>(
              <LocationButton/>
            ),
            headerRight:() => (
              <SearchButton/>
            )
        }} />
        <FeedStack.Screen name="Location" component={Location} />
        <FeedStack.Screen name="Search" component={Search} />
    </FeedStack.Navigator>
    );
}

const MapStack = createStackNavigator();

function MapStackScreen() {
    return (
    <MapStack.Navigator screenOptions={{ headerShown:true, cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <MapStack.Screen name="랜덤 음식점" component={Map}/>
      <MapStack.Screen name="프로필 보기" component={FullProfile} />
      <MapStack.Screen name="포토리뷰" component={PhotoReview} options={{headerTitleAlign:"center"}} />
    </MapStack.Navigator>
  );
}


const FavoriteTabStack = createMaterialTopTabNavigator();

function favoriteTabScreen(){
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
      <FavoriteTabStack.Screen name='단골' component={Dangol} />
      <FavoriteTabStack.Screen name='주변 음식점' component={Around}/>
    </FavoriteTabStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();

function FavoriteStackScreen() {
    return (
    <FavoriteStack.Navigator screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <FavoriteStack.Screen name="단골" component={Dangol} />
      <FavoriteStack.Screen name="프로필 보기" component={FullProfile} options={{headerShown:true}} />
    </FavoriteStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
    return (
    <UserStack.Navigator screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <UserStack.Screen name="내 정보" component={User}/>  
      <UserStack.Screen name="포토리뷰" component={PhotoReview} options={{headerTitleAlign:"center"}} />
    </UserStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator();

function TabScreen() {
    return (
        <Tabs.Navigator 
        initialRouteName="지도" 
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar:true,
        }}
        >
          {/* <Tabs.Screen name='피드' component={FeedStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name='concierge-bell' color={focused? 'black' : color} size={23} />
          )}}/> */}
          <Tabs.Screen name='랜덤 음식점' component={MapStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name='question' color={focused?  'black' : color} size={20} solid/>
          )}}/>
          <Tabs.Screen name='단골' component={FavoriteStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <NavIcon name='heart' color={focused? 'black' : color} size={23} />
          )}}/>
          <Tabs.Screen name='내 정보' component={UserStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name='user' color={focused?  'black' : color} size={20} solid/>
          )}}/>
          <Tabs.Screen name='메뉴' component={View}  options={{tabBarIcon:()=>(<NavIcon name={'menu'} size={25}/>)}} listeners={({navigation})=>({tabPress:e => {
            e.preventDefault()
            navigation.openDrawer()
          }})} />
        </Tabs.Navigator>
    )
}

const VisitorStack = createStackNavigator();

export default () => {
  return (
    <VisitorStack.Navigator screenOptions={{
      headerShown:true,
      headerTitleAlign:"center",
      headerLeft:() => <BackArrow />,
    }} >
      <VisitorStack.Screen name='Tabs' component={TabScreen} options={{
        headerShown:false,
      }}/>
      <VisitorStack.Screen name='SelectPhoto' component={SelectPhoto} options={{
        headerShown:false,
      }}/>
      <VisitorStack.Screen name='SelectUpload' component={SelectUpload} options={{
        headerTitle:"최근 항목",
      }}/>
      <VisitorStack.Screen name='포스트' component={UploadPost}/>
      <VisitorStack.Screen name='정보수정' component={EditUser} options={{
      headerTitle:"정보수정",
      headerTitleStyle:{
        fontSize:20,
        fontWeight:'bold'
      },
      }}/>
    </VisitorStack.Navigator>
  )
}
