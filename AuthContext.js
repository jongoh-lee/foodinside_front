import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { CachePersistor } from "apollo-cache-persist";
import { InMemoryCache } from 'apollo-cache-inmemory';
import apolloClientOptions from './apollo';
import { ApolloClient } from 'apollo-client';

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const logUserIn = async token => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      AsyncStorage.clear();
      setIsLoggedIn(false);
      
      const cache = new InMemoryCache();
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      client.clearStore()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};