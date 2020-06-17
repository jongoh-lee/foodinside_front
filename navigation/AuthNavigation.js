import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthHome from '../screens/Auth/AuthHome';
import AuthHome2 from '../screens/Auth/AuthHome2';
import Confirm from '../screens/Auth/Confirm';
import FindAccount from '../screens/Auth/FindAccount';
import Signup1 from '../screens/Auth/Signup1';
import Signup2 from '../screens/Auth/Signup2';
import Signup3 from '../screens/Auth/Signup3';
import Signup4 from '../screens/Auth/Signup4';

const Auth = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Auth.Navigator initialRouteName="AuthHome" headerMode='none'>
                <Auth.Screen name="AuthHome" component={AuthHome} />
                <Auth.Screen name="AuthHome2" component={AuthHome2} />
                <Auth.Screen name="Confirm" component={Confirm} />
                <Auth.Screen name="FindAccount" component={FindAccount} />
                <Auth.Screen name="Signup1" component={Signup1} />
                <Auth.Screen name="Signup2" component={Signup2} />
                <Auth.Screen name="Signup3" component={Signup3} />
                <Auth.Screen name="Signup4" component={Signup4} />
            </Auth.Navigator>
        </NavigationContainer>
    )
};