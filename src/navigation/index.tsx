/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { RenderProps } from '../../types';
import { routeNavigations } from '../constants/routes';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

export function renderScreen({name, component, options = {}, initialParams = {}}: RenderProps) {
  return (
    <Stack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
      initialParams={initialParams}
    />
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        orientation: 'portrait',
        //headerLeft: () => <HeadBackButton />,
        headerStyle: {
          backgroundColor: Colors[colorScheme].tint
        },
      }}
      initialRouteName={"Schedules"}
    >
      {routeNavigations.map((route) => {
        return renderScreen(route);
      })}
    </Stack.Navigator>
  );
}
