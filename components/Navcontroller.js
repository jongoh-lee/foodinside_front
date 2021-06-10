import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from'../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';

export default () => {
    const isLoggedIn = useIsLoggedIn();
    return (
      <NavigationContainer>
        {isLoggedIn ? <MainNavigation/> : <AuthNavigation /> }
      </NavigationContainer>
    )
  };