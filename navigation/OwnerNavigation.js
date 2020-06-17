import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Feather} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import Calendar from '../screens/Owner/Calendar';
import ChatList from '../screens/Owner/ChatList';
import ShopCheck from '../screens/Owner/ShopCheck';
import Chat from '../screens/Owner/Chat';
import MyShop from '../screens/Owner/MyShop';
import Earnings from '../screens/Owner/Earnings';


//button
import NavIcon from '../components/Custom/NavIcon';
import {MaterialIcons} from '@expo/vector-icons'
import Reservations from '../screens/Owner/Reservations';

const ChatStack = createStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
        <ChatStack.Screen name="채팅" component={ChatList} />
    </ChatStack.Navigator>
    );
}

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
    return (
    <CalendarStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <CalendarStack.Screen name="달력" component={Calendar} />
    </CalendarStack.Navigator>
  );
}


const EarningTabStack = createMaterialTopTabNavigator();

function EarningTabScreen(){
  return (
    <EarningTabStack.Navigator 
      tabBarOptions={{
      indicatorStyle:{ backgroundColor: 'transparent'}, 
      style:{ 
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on IOS
        borderWidth:1,
        borderColor:'transparent'
      }, 
      labelStyle:{fontSize:14, fontWeight:"bold"}}}>
      <EarningTabStack.Screen name='수익 현황' component={Earnings}/>
      <EarningTabStack.Screen name='예약 내역' component={Reservations}/>
    </EarningTabStack.Navigator>
  )
}

const EarningsStack = createStackNavigator();

function EarningsStackScreen() {
    return (
    <EarningsStack.Navigator screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <EarningsStack.Screen name="수익" component={EarningTabScreen} />
    </EarningsStack.Navigator>
  );
}

const MyShopStack = createStackNavigator();

function MyShopStackScreen() {
    const [lisensed, setLisensed] = React.useState(false);
    return (
    <MyShopStack.Navigator initialRouteName={lisensed? "공유음식점" : "공유 음식점 등록"}>
      <MyShopStack.Screen name="공유음식점" component={MyShop} options={{
      headerRight:() => <Feather name="more-vertical" size={24}/>,
      }}/>
      <MyShopStack.Screen name="공유 음식점 등록" component={ShopCheck} />
    </MyShopStack.Navigator>
  );
}


const Tabs = createBottomTabNavigator();
    
function TabsScreen() {
    return (
        <Tabs.Navigator  
        initialRouteName="채팅" 
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar:true,
          }}
        >
            <Tabs.Screen name='채팅' component={ChatStackScreen}  options={{tabBarIcon:({focused, color })=>(
              <NavIcon name={ 'chat' } color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen name='달력' component={CalendarStackScreen}  options={{tabBarIcon:({focused, color })=>(
              <NavIcon name={ 'calendar-edit' } color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen name='수익' component={EarningsStackScreen}  options={{tabBarIcon:({focused, color })=>(
              <NavIcon name={ 'chart-bar' } color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen name='음식점' component={MyShopStackScreen}  options={{tabBarIcon:({focused, color })=>(
              <MaterialIcons name={ 'store' } color={focused? 'black' : color} size={25}/>
            )}}/>
            <Tabs.Screen name='메뉴' component={View}  options={{tabBarIcon:()=>(<NavIcon name={'menu'} size={25}/>)}} listeners={({navigation})=>({tabPress:e => {
              e.preventDefault()
              navigation.openDrawer()
            }})}/>
        </Tabs.Navigator>
    )
}

const OwnerStack = createStackNavigator();

export default () => {
  return (
    <OwnerStack.Navigator screenOptions={{headerShown:false}}>
      <OwnerStack.Screen name='Tabs' component={TabsScreen}/>
      <OwnerStack.Screen name='채팅 내용' component={Chat} options={
      ({route}) => ({ 
        headerShown:true,
        title: route.params.chat.user})
      }/>
    </OwnerStack.Navigator>
  )
}

