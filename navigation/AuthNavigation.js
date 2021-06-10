import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthHome from '../screens/Auth/AuthHome';
import Confirm from '../screens/Auth/Confirm';
import FindAccount from '../screens/Auth/FindAccount';
import Signup1 from '../screens/Auth/Signup1';
import Signup2 from '../screens/Auth/Signup2';
import Signup3 from '../screens/Auth/Signup3';
import Signup4 from '../screens/Auth/Signup4';
import BackArrow from '../components/Custom/BackArrow';

const Auth = createStackNavigator();

export default () => {
    return (
        <Auth.Navigator initialRouteName="AuthHome" screenOptions={{headerShown:true, headerTitleAlign:"center", headerTitleStyle:{fontSize:18, fontWeight:'bold'} }} headerMode={"screen"}>
            <Auth.Screen name="AuthHome" component={AuthHome} options={{
                headerShown: false,
            }}/>
            <Auth.Screen name="Confirm" component={Confirm} options={{
                headerShown: false,
            }}/>
            <Auth.Screen name="FindAccount" component={FindAccount} options={{
                headerShown: false,
            }}/>
            <Auth.Screen name="Signup1" component={Signup1} options={{
                headerTitle:"회원 가입하기(1/4단계)",
                headerLeft:()=> <BackArrow />,
            }}/>
            <Auth.Screen name="Signup2" component={Signup2} options={{
                headerTitle:"회원 가입하기(2/4단계)",
                headerLeft:()=> <BackArrow />,
            }}/>
            <Auth.Screen name="Signup3" component={Signup3} options={{
                headerTitle:"회원 가입하기(3/4단계)",
                headerLeft:()=> <BackArrow />,
            }}/>
            <Auth.Screen name="Signup4" component={Signup4} options={{
                headerTitle:"회원 가입하기(4/4단계)",
                headerLeft:()=> <BackArrow />,
            }}/>
        </Auth.Navigator>
    )
};