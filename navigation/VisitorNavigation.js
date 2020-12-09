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
import Me from '../screens/Visitor/Me';
import EditUser from '../screens/Visitor/EditUser';
import Around from '../screens/Visitor/Around';
import Search from '../screens/Visitor/Search';

//nested screen
import FullProfile from '../screens/Visitor/FullProfile';
import FullUser from '../screens/Visitor/FullUser';
import UserPostList from '../screens/Visitor/UserPostList';
import FranchisePostList from '../screens/Franchise/FranchisePostList';

// 사진 선택
import SelectPhoto from '../screens/SelectPhoto';
import SelectUpload from '../screens/SelectUpload';

//franchise screen


//팔로워 팔로잉
import MyFollowers from '../screens/Visitor/MyFollowers';
import MyFollowings from '../screens/Visitor/MyFollowings';
import UserFollowers from '../screens/Visitor/UserFollowers';

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
            headerTitle:()=> <Logo />,
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
    <MapStack.Navigator headerMode={"screen"} screenOptions={{ headerShown:true, cardStyle:{backgroundColor:'#ffffff'}, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <MapStack.Screen name="영업 중" component={Map}/>
      <MapStack.Screen name="프로필 보기" component={FullProfile} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <MapStack.Screen name="SeeUser" component={FullUser} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <MapStack.Screen name="UserPostList" component={UserPostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <MapStack.Screen name="FranchisePostList" component={FranchisePostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <MapStack.Screen name="FollowList" component={FollowTabScreen} options={{headerTitleAlign:"center", headerTitle:"팔로우", headerLeft:() => <BackArrow />}} />
      <MapStack.Screen name="UserFollowers" component={UserFollowers} options={{headerTitleAlign:"center", headerTitle:"팔로워", headerLeft:() => <BackArrow />}} />
    </MapStack.Navigator>
  );
}


const FranchiseInfoTabStack = createMaterialTopTabNavigator();

function FranchiseInfoTabScreen(){
  return (
    <FranchiseInfoTabStack.Navigator
      tabBarOptions={{
      indicatorStyle:{ backgroundColor: 'transparent'}, 
      style:{ 
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on IOS
        borderWidth:1,
        borderColor:'transparent'
      }, 
      labelStyle:{fontSize:14, fontWeight:"bold"}}}>
      <FranchiseInfoTabStack.Screen name='모든 업체' component={SearchProfileList}/>
      <FranchiseInfoTabStack.Screen name='단골' component={Dangol} />
    </FranchiseInfoTabStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();

function FavoriteStackScreen() {
    return (
    <FavoriteStack.Navigator headerMode={"screen"} screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <FavoriteStack.Screen name="단골" component={Dangol} />
      <FavoriteStack.Screen name="프로필 보기" component={FullProfile} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <FavoriteStack.Screen name="UserPostList" component={UserPostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <FavoriteStack.Screen name="FranchisePostList" component={FranchisePostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <FavoriteStack.Screen name="SeeUser" component={FullUser} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <FavoriteStack.Screen name="FollowList" component={FollowTabScreen} options={{headerTitleAlign:"center", headerTitle:"팔로우", headerLeft:() => <BackArrow />}} />
      <FavoriteStack.Screen name="UserFollowers" component={UserFollowers} options={{headerTitleAlign:"center", headerTitle:"팔로워", headerLeft:() => <BackArrow />}} />
    </FavoriteStack.Navigator>
  );
}

const FollowTabStack = createMaterialTopTabNavigator();

function FollowTabScreen({ route }){
  return (
    <FollowTabStack.Navigator 
      initialRouteName={route.params.tabname}
      tabBarOptions={{
      indicatorStyle:{ backgroundColor: 'transparent'}, 
      style:{ 
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on IOS
        borderWidth:1,
        borderColor:'transparent',
      }, 
      labelStyle:{fontSize:14, fontWeight:"bold"}}}>
      <FollowTabStack.Screen name='팔로잉' component={MyFollowings}/>
      <FollowTabStack.Screen name='팔로워' component={MyFollowers}/>
    </FollowTabStack.Navigator>
  )
}

const UserStack = createStackNavigator();

function UserStackScreen() {
    return (
    <UserStack.Navigator headerMode={"screen"} screenOptions={{headerShown:true, headerTitleStyle:{fontSize:20, fontWeight:'bold'}}}>
      <UserStack.Screen name="내 정보" component={Me}/>  
      <UserStack.Screen name="SeeUser" component={FullUser} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
      <UserStack.Screen name="UserPostList" component={UserPostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <UserStack.Screen name="FranchisePostList" component={FranchisePostList} options={{headerTitleAlign:"center", headerTitle:"포토리뷰", headerLeft:() => <BackArrow />}} />
      <UserStack.Screen name="FollowList" component={FollowTabScreen} options={{headerTitleAlign:"center", headerTitle:"팔로우", headerLeft:() => <BackArrow />}} />
      <UserStack.Screen name="UserFollowers" component={UserFollowers} options={{headerTitleAlign:"center", headerTitle:"팔로워", headerLeft:() => <BackArrow />}} />
      <UserStack.Screen name="프로필 보기" component={FullProfile} options={{headerTitleAlign:"center", headerLeft:() => <BackArrow />}} />
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
          <Tabs.Screen name='영업 중' component={MapStackScreen} options={{tabBarIcon: ({ focused, color }) => (
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
    <VisitorStack.Navigator 
    headerMode={"screen"}
    screenOptions={{
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
        headerShown:false,
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
