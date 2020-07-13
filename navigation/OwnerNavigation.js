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

//register Nav
import CompletePage from '../screens/Owner/CompletePage';
import CreatePage from '../screens/Owner/CreatePage';
import EditPage from '../screens/Owner/EditPage';
import FailPage from '../screens/Owner/FailPage';


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
    const [restaurantState, setRestaurantState] = React.useState(null);
    return (
    <MyShopStack.Navigator 
      initialRouteName={
        restaurantState === null ? "신청 전" : (
          restaurantState === 0 ? "심사 중" : (
            restaurantState === 1 ? "불합격" : (
              restaurantState === 2 ? "합격" : "내 음식점"
            )
          )
        ) 
      } 
      screenOptions={{ headerTitleStyle:{fontSize:20, fontWeight:'bold'},headerShown:true}}
      >
      <MyShopStack.Screen name="내 음식점" component={MyRestaurant} options={{
        headerRight:() => <Feather name="more-vertical" size={24}/>,
      }}/>
      <MyShopStack.Screen name="신청 전" options={{
        headerTitle:() => <Logo nav={'공유 음식점'}/>,
      }} component={CreatePage} />
      <MyShopStack.Screen name="심사 중"  options={{
        headerTitle:() => <Logo nav={'공유 음식점'}/>,
      }} component={EditPage}/>
      <MyShopStack.Screen name="합격" options={{
        headerTitle:() => <Logo nav={'공유 음식점'}/>,
      }} component={CompletePage}/>
      <MyShopStack.Screen name="불합격" options={{
        headerTitle:() => <Logo nav={'공유 음식점'}/>,
      }} component={FailPage}/>
      <MyShopStack.Screen name="공간 신청" component={SubmitRestaurant}/>
      <MyShopStack.Screen name="공간 등록" component={CompleteRestaurant}/>
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
    <OwnerStack.Navigator>
      <OwnerStack.Screen name='Tabs' component={TabsScreen}/>
      <OwnerStack.Screen name='채팅 내용' component={Chat} options={
      ({route}) => ({ 
        headerShown:true,
        title: route.params.chat.user})
      }/>
      <OwnerStack.Screen name='SelectPhoto' component={SelectPhoto} options={{
        headerShown:true,
        headerTitle:"최근 항목",
        headerTitleAlign:"center",
        headerLeft:()=> <BackArrow />}}/>
    </OwnerStack.Navigator>
  )
}

