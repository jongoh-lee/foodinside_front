import 'react-native-gesture-handler';
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import Dangol from '../screens/Visitor/Dangol';
import Feed from '../screens/Visitor/Feed';
import Map from '../screens/Visitor/Map';
import User from '../screens/Visitor/User';
import Around from '../screens/Visitor/Around';
import Location from '../screens/Visitor/Location';
import Search from '../screens/Visitor/Search';

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import LocationButton from '../components/Visitor/LocationButton';
import SearchButton from '../components/Visitor/SearchButton';

    
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
    <MapStack.Navigator screenOptions={{ cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <MapStack.Screen name="지도" component={Map} options={{headerShown:true}}/>
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
      <FavoriteStack.Screen name="즐겨찾기" component={favoriteTabScreen} />
    </FavoriteStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
    return (
    <UserStack.Navigator screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <UserStack.Screen name="아이디" component={User} options={{
        headerRight:() => <Feather name="more-vertical" size={24} />
      }}/>  
    </UserStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator();

function TabScreen() {
    return (
        <Tabs.Navigator 
        initialRouteName="피드" 
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar:true,
        }}
        >
          <Tabs.Screen name='피드' component={FeedStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name='concierge-bell' color={focused? 'black' : color} size={23} />
          )}}/>
          <Tabs.Screen name='지도' component={MapStackScreen} options={{tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name='question' color={focused?  'black' : color} size={20} solid/>
          )}}/>
          <Tabs.Screen name='즐겨찾기' component={FavoriteStackScreen} options={{tabBarIcon: ({ focused, color }) => (
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
    <VisitorStack.Navigator >
      <VisitorStack.Screen name='Tabs' component={TabScreen}/>
    </VisitorStack.Navigator>
  )
}
