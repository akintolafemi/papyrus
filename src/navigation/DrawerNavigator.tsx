import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import { Icon as RNEIcon, Avatar } from 'react-native-elements';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useColorScheme from '../hooks/useColorScheme';

import { drawerRouteNavigations } from '../constants/drawerRoutes';

import { DrawerTabParamList, DrawerRenderProps } from '../../types';

import { SharedPref } from '../common/SharedPref';

const Drawer = createDrawerNavigator<DrawerTabParamList>();
//const Drawer = createDrawerNavigator();


export function renderScreen({
  name,
  component,
  options = {},
  initialParams = {}
}: DrawerRenderProps) {
  return (
    <Drawer.Screen
      name={name}
      key={name}
      component={component}
      options={options}
      initialParams={initialParams}
    />
  );
}

// drawerContent={(props) => <CustomDrawerContent {...props}/>}

const DrawerNavigation: FunctionComponent<DrawerRenderProps> = () => {

  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Dashboard"
      backBehavior="history"
      // drawerType="slide"
      screenOptions={{
        drawerStyle: {backgroundColor: Colors[colorScheme].background, paddingTop: Fonts.h(20), paddingHorizontal: Fonts.w(10), shadowColor: Colors[colorScheme].backgroundShadowColor},
        drawerItemStyle: {paddingVertical: Fonts.h(0), marginBottom: Fonts.h(0)},
        drawerLabelStyle: {marginLeft: Fonts.w(-15)},
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.white,
        // drawerInactiveBackgroundColor: Colors.primary,
        drawerInactiveTintColor: Colors[colorScheme].inactiveDrawerText,
      }}
    >
      {drawerRouteNavigations.map((route) => {
        return renderScreen(route);
      })}
    </Drawer.Navigator>
  );
};

export const navigationRef: any = React.createRef();

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

function CustomDrawerContent(props: any) {

  const colorScheme = useColorScheme();

  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  // const translateX = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [-100, 0],
  // });
  const [userDetails, setUserDetails] = useState({});
  const [displayName, setDisplayName] = useState("Oluwafemi");
  const [username, setUsername] = useState<any>(""); 

  // async function getData() {
  //   try {
  //     const retrievedData =  await AsyncStorage.getItem('userDetails');
  //     const savedData = JSON.parse(retrievedData);
  //     return savedData
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   return
  // }

  useEffect(() => {

    SharedPref.getUsername()?.then((t) => {
      setUsername(t);
    });

    // getData().then((data) => {
    //   setUserDetails(data)
    //   if (data !== null) {
    //     if (data.displayName != null)
    //       setDisplayName(data.displayName);
    //   }
    // });
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={[animatedStyles]}>
        <View style={{alignItems: 'center', borderBottomWidth: Fonts.w(1), borderBottomColor: Colors.dotcColor, paddingBottom: Fonts.h(20), marginBottom: Fonts.h(20)}}>
          <Avatar
            rounded
            size="xlarge"
            source={require('../assets/images/logo.png')}
          />
          <Text style={{color: Colors[colorScheme].inactiveDrawerText, marginTop: Fonts.h(10), fontFamily: Fonts.AVERTA_SEMIBOLD, fontSize: Fonts.h(15)}}>{username}</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={({focused}) => (
            <RNEIcon name="log-out" type='ionicon' iconStyle={[{fontSize: Fonts.h(20)}, {color: focused ? Colors[colorScheme].inactiveDrawerText : Colors[colorScheme].inactiveDrawerText}]} />
          )}
          style={{paddingVertical: Fonts.h(0), marginBottom: Fonts.h(0)}}
          labelStyle={{marginLeft: Fonts.w(-15)}}
          activeBackgroundColor={Colors.primary}
          activeTintColor={Colors.white}
          // inactiveBackgroundColor={Colors.primary}
          inactiveTintColor={Colors[colorScheme].inactiveDrawerText}
          onPress={() => {
            SharedPref.clearUserData();
            props.navigation.navigate('Login');
          }}
        />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

export default DrawerNavigation;
