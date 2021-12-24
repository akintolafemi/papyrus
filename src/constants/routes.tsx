import { RenderProps } from "../../types";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import * as React from 'react';

import Fonts from "./Fonts";

//screens
import SchedulesScreen from "../screens/SchedulesScreen";


export const routeNavigations: Array<RenderProps> = [
  {
    name: 'Schedules',
    component: SchedulesScreen,
    options: {
      headerShown: false,
      title: ''
    },
    initialParams: undefined
  }
];