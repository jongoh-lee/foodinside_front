import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//screens
import Calendar from '../screens/Owner/Calendar';
import ChatList from '../screens/Owner/ChatList';
import Chat from '../screens/Owner/Chat';
import Earnings from '../screens/Owner/Earnings';

//Restaurant Info
import CompleteRestaurant from '../screens/Owner/CompleteRestaurant';
import SubmitRestaurant from '../screens/Owner/SubmitRestaurant';
import MyRestaurant from '../screens/Owner/MyRestaurant';

//button
import NavIcon from '../components/Custom/NavIcon';
import {MaterialIcons} from '@expo/vector-icons'
import Reservations from '../screens/Owner/Reservations';
import SelectPhoto from '../screens/SelectPhoto';
import BackArrow from '../components/Custom/BackArrow';
import Logo from '../components/Custom/Logo';
import BeforeOwner from '../screens/Owner/BeforeOwner';

//음식점 등록
import CreateShop from '../screens/Owner/CreateShop';
import FormShopImage from '../screens/Owner/FormShopImage';
import FormShopFacility from '../screens/Owner/FormShopFacility';
import FormShopScale from '../screens/Owner/FormShopScale';
import FormShopDescription from '../screens/Owner/FormShopDescription';
import FormShopLocation from '../screens/Owner/FormShopLocation';
import FormShopRefund from '../screens/Owner/FormShopRefund';
import FormShopRules from '../screens/Owner/FormShopRules';

const ChatStack = createStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
        <ChatStack.Screen name="채팅" component={ChatList} options={{headerShown:true}}/>
    </ChatStack.Navigator>
    );
}

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
    return (
    <CalendarStack.Navigator screenOptions={{cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <CalendarStack.Screen name="달력" component={Calendar} options={{headerShown:true}} />
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
    <EarningsStack.Navigator screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'}, headerShown:true}}>
      <EarningsStack.Screen name="수익" component={EarningTabScreen} />
    </EarningsStack.Navigator>
  );
}

const MyShopStack = createStackNavigator();

function MyShopStackScreen() {
    return (
    <MyShopStack.Navigator 
      initialRouteName={"신청 전"} 
      screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'},headerShown:true}}
      >
      <MyShopStack.Screen name="내 음식점" component={MyRestaurant} options={{
        headerRight:() => <Feather name="more-vertical" size={24}/>,
      }}/>
      <MyShopStack.Screen name="신청 전" options={{
        headerTitle:() => <Logo nav={'공유 음식점'}/>,
      }} component={BeforeOwner} />
      <MyShopStack.Screen name="신청 하기" component={SubmitRestaurant}/>
      <MyShopStack.Screen name="공간 작성" component={CreateShop} options={{
        headerTitle:"공간 등록",
        headerTitleAlign:"center",
        headerLeft:() => <BackArrow />,
      }}/>
    </MyShopStack.Navigator>
  );
}


const Tabs = createBottomTabNavigator();
    
function TabsScreen() {
    return (
        <Tabs.Navigator  
        initialRouteName="달력" 
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar:true,
          }}
        >
            {/* <Tabs.Screen name='채팅' component={ChatStackScreen}  options={{tabBarIcon:({focused, color })=>(
              <NavIcon name={ 'chat' } color={focused? 'black' : color} size={25}/>
            )}}/> */}
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
    <OwnerStack.Navigator screenOptions={{
      headerShown:true,
      headerTitleAlign:"center",
      headerLeft:() => <BackArrow />,
    }}>
      <OwnerStack.Screen name='Tabs' component={TabsScreen} options={{
        headerShown:false
      }}/>
      <OwnerStack.Screen name='채팅 내용' component={Chat} options={
      ({route}) => ({ 
        headerShown:true,
        title: route.params.chat.user})
      }/>
      <OwnerStack.Screen name='SelectPhoto' component={SelectPhoto} options={{
        headerShown:false
      }}/>
      <OwnerStack.Screen name='사진 올리기' component={FormShopImage} />
      <OwnerStack.Screen name='설비 등록 (1/3)' component={FormShopFacility} />
      <OwnerStack.Screen name='규모 안내' component={FormShopScale} />
      <OwnerStack.Screen name='공간 소개' component={FormShopDescription} />
      <OwnerStack.Screen name='위치 등록' component={FormShopLocation} />
      <OwnerStack.Screen name='입점 규칙' component={FormShopRules} />
      <OwnerStack.Screen name='환불 정책' component={FormShopRefund} />
    </OwnerStack.Navigator>
  )
}

