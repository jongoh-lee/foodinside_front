import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Updates from 'expo-updates';
import { Asset } from 'expo-asset'
import { Ionicons, AntDesign, MaterialCommunityIcons, EvilIcons, MaterialIcons, Feather, Entypo, FontAwesome5,  } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';

import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import apolloClientOptions from './apollo'
import Navcontroller from './components/Navcontroller';
import { AuthProvider } from './AuthContext';
import { IntroductionProvider } from './IntroductionContext';


export default function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [client, setClient] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  // const [isFirst, setIsFirst] = React.useState(null);

  const update = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();
      }
    } catch (e) {
      console.log("restart error",e);
    }
    preload()
  }
  
  const preload = async () => {
    try {
      //await Font.loadAsync({
      //  "Ionicons": Ionicons.ttf,
      //  "AntDesign": AntDesign.ttf, 
      //  "MaterialCommunityIcons": MaterialCommunityIcons.ttf, 
      //  "EvilIcons": EvilIcons.ttf, 
      //  "Material Icons": MaterialIcons.ttf, 
      //  "Feather": Feather.ttf, 
      //  "Entypo": Entypo.ttf, 
      //  "FontAwesome5": FontAwesome5.ttf,
      //});
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
      // 첫방문 팝업 안내
      // const isFirst = await AsyncStorage.getItem("isFirst");
      // if ( !isFirst || isFirst === "false") {
      //   setIsFirst(false);
      // } else {
      //   setIsFirst(true)
      // }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(()=>{
      update()
  }, []);

  return loaded && client && isLoggedIn !== null ?  (
    <ApolloProvider client={client}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          {/* <IntroductionProvider isFirst={isFirst}> */}
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent={true}/>
            <Navcontroller/>
          {/* </IntroductionProvider> */}
        </AuthProvider>
    </ApolloProvider>
   ) : (
    <AppLoading />
  );
}
