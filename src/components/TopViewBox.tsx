import React, {FunctionComponent} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle, Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const TopViewBox: FunctionComponent<{
  rootStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  leftIcon?: string;
  renderRightIcons?: boolean;
  rightIcons?: any;
  onPressLeftIcon?: any;
}> = ({
  rootStyle = {},
  containerStyle = {},
  label = 'Schedules',
  leftIcon = 'apps',
  renderRightIcons = true,
  rightIcons = [],
  onPressLeftIcon = () => null
}) => {

  const iconStyles = {color: Colors.red, fontSize: Fonts.h(25)};

  return (
    <View style={[{paddingVertical: Platform.OS === 'ios' ? Fonts.h(20) : Fonts.h(45), paddingHorizontal: Fonts.w(15)}, rootStyle]}>
      <View style={[
        {
          flexDirection: 'row', 
          justifyContent: 'space-between',
          borderRadius: Fonts.h(10),
          padding: Fonts.w(15), 
          backgroundColor: Colors.white,
        }, containerStyle]}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name={leftIcon}
            type="ionicon"
            iconStyle={iconStyles}
            onPress={onPressLeftIcon}
          />
          <Text style={{fontSize: Fonts.h(20), fontFamily: Fonts.AVERTA_BOLD, marginLeft: Fonts.w(25)}}>{label}</Text>
        </View>
        {renderRightIcons ? (
          <View style={{flexDirection: 'row'}}>
            {rightIcons.map((icon: string, index: number) => (
              <Icon
                key={index.toString()}
                name={icon}
                type="ionicon"
                iconStyle={[iconStyles, {marginRight: index !== rightIcons.length - 1 ? Fonts.w(25) : 0}]}
              />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default TopViewBox;
