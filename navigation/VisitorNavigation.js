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
import Map2 from '../screens/Visitor/Map2';
import User from '../screens/Visitor/User';
import EditUser from '../screens/Visitor/EditUser';
import Around from '../screens/Visitor/Around';
import Location from '../screens/Visitor/Location';
import Search from '../screens/Visitor/Search';
import SelectPhoto from '../screens/SelectPhoto';

//button
import NavIcon from '../components/Custom/NavIcon';
import Logo from '../components/Custom/Logo';
import LocationButton from '../components/Visitor/LocationButton';
import SearchButton from '../components/Visitor/SearchButton';
import BackArrow from '../components/Custom/BackArrow';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

    
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
      <MapStack.Screen name="랜덤 음식점" component={Map2} options={{headerShown:true}}/>
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
    </FavoriteStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
    return (
    <UserStack.Navigator screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <UserStack.Screen name="내 정보" component={User}/>  
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
    <VisitorStack.Navigator >
      <VisitorStack.Screen name='Tabs' component={TabScreen}/>
      <VisitorStack.Screen name='SelectPhoto' component={SelectPhoto} options={{
        headerShown:false,
        }}/>
      <VisitorStack.Screen name='정보수정' component={EditUser} options={{
      headerShown:true,
      headerTitle:"정보수정",
      headerTitleAlign:"center",
      headerTitleStyle:{
        fontSize:20,
        fontWeight:'bold'
      },
      headerLeft:()=> <BackArrow />}}/>
    </VisitorStack.Navigator>
  )
}
