import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'
import * as Font from 'expo-font';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';

import {ApolloProvider} from '@apollo/react-hooks';
import apolloClientOptions from './apollo'
import Navcontroller from './components/Navcontroller';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [client, setClient] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  const preload = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
       });
      await Asset.loadAsync([require('./assets/Logo.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    } 
  }
  React.useEffect(()=>{
    preload()
  }, []);

  return loaded && client && isLoggedIn !== null ?  (
    <ApolloProvider client={client}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent={true}/>
          <Navcontroller/>
        </AuthProvider>
    </ApolloProvider>
   ) : (
    <AppLoading />
  );
}