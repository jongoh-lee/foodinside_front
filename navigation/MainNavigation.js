import React from 'react';
import { Image, StyleSheet, View, Alert, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogOut } from '../AuthContext'

// screens
import Franchise from '../navigation/FranchiseNavigation';
import Visitor from '../navigation/VisitorNavigation';
import Owner from '../navigation/OwnerNavigation';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: false,
          gestureEnabled:false
        }}
        >
        <Stack.Screen name="Visitor">{props => <Visitor {...props} />}</Stack.Screen>
        <Stack.Screen name="Owner">{props => <Owner {...props} />}</Stack.Screen>
        <Stack.Screen name="Store">{props => <Franchise {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = props => {
  const logOut = useLogOut();
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerContainer}>
        <View style={styles.case1}>
          <Image
            source={require('../assets/Logo.png')}
            resizeMode="center"
            style={{width:130, height:40, resizeMode:"contain",marginLeft:-4, marginBottom:10}}
          />
          <Text white title>
            푸드 인사이드
          </Text>
          <Text white size={15} style={{marginBottom:20}} >
            www.foodinside.net
          </Text>
        </View>
        <View style={styles.case2}>
          <DrawerItem
            label="공유 음식점 점주"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Owner')}
            icon={() => <MaterialIcons name="store" color="white" size={20} />}
          />
          <DrawerItem
            label="입점 업체"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Store')}
            icon={() => <MaterialCommunityIcons name="food-variant" color="white" size={20} />}
          />
          <DrawerItem
            label="방문객"
            labelStyle={{ color: 'white', marginLeft: -14 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Visitor')}
            icon={() => <FontAwesome5 name='concierge-bell' color="white" size={18} />}
          />
        </View>
      </View>

      <View>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'black' }}
          icon={() => <AntDesign name="logout" color="black" size={16} />}
          onPress={() => Alert.alert('확인','로그아웃 하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {text: '확인',
            onPress: () => logOut(),
          },
          ],
          {cancelable: true},
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default ({style}) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <NavigationContainer>
    <LinearGradient style={{ flex: 1 }} colors={['#fd9eba', '#fff1e6']}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
        drawerPosition='right'
        >
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex:1,
    flexDirection:'column'
  },
  case1:{
    flex:1,
    justifyContent:"flex-end"
  },
  case2:{
    flex:2,
    marginLeft:-16,
  },
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
    overflow:'hidden'
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});