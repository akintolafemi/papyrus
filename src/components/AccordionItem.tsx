import React, {FunctionComponent, useState, useRef, useCallback} from 'react';
import { StyleSheet, View, Text,  StatusBar, TouchableOpacity, StyleProp, ViewStyle} from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';



const RenderRows: FunctionComponent<{
  icon?: string;
  value?: string;
  label?: string;
  pressedRow?: any;
}> = ({
  icon,
  value,
  label,
  pressedRow,
}) => {
  return (
    <TouchableOpacity onPress={() => pressedRow(icon)} style={{flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: Fonts.w(15), marginVertical: Fonts.h(10)}}>
      <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: Fonts.h(10), height: Fonts.h(45), width: Fonts.h(45)}}>
        <Icon
          name={icon}
          type="ionicon"
          iconStyle={{fontSize: Fonts.h(25)}}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={{color: Colors.text, fontSize: Fonts.h(18), fontFamily: Fonts.AVERTA_BOLD, marginBottom: Fonts.h(2)}}>{value}</Text>
        <Text style={{color: Colors.textlight, fontSize: Fonts.h(14), fontFamily: Fonts.AVERTA_LIGHT}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const AccordionItem: FunctionComponent<{
  location?: string;
  time?: string;
  address?: string;
  containerStyle?: StyleProp<ViewStyle>;
  status?: string;
  extras?: any;
  pressedRow?: any;
}> = ({
  location = 'Ebeano Store',
  time = '',
  address = 'Admiralty way, Lekki Phase 1, Lagos',
  containerStyle = {},
  status = 'In Progress',
  extras = [{
    icon: 'call',
    value: '08100131944',
    label: 'Tap to call'
  }],
  pressedRow = () => null
}) => {

  const [expanded, setExpanded] = useState<boolean>(false);

  const renderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return (
          <View style={{borderRadius: Fonts.h(20), backgroundColor: '#d3e3fb', height: Fonts.h(25), justifyContent: 'center', alignItems: 'center', width: Fonts.w(80)}}>
            <Text style={{color: '#468aee', fontFamily: Fonts.AVERTA_REGULAR, fontSize: Fonts.h(12)}}>{status}</Text>
          </View>
        )
      case 'completed':
        return (
          <View style={{borderRadius: Fonts.h(20), backgroundColor: '#d0ebd3', height: Fonts.h(25), justifyContent: 'center', alignItems: 'center', width: Fonts.w(80)}}>
            <Text style={{color: '#40ac4b', fontFamily: Fonts.AVERTA_REGULAR, fontSize: Fonts.h(12)}}>{status}</Text>
          </View>
        )
      case 'not started':
        return (
          <View style={{borderRadius: Fonts.h(20), backgroundColor: '#e9ecee', height: Fonts.h(25), justifyContent: 'center', alignItems: 'center', width: Fonts.w(80)}}>
            <Text style={{color: '#8694a1', fontFamily: Fonts.AVERTA_REGULAR, fontSize: Fonts.h(12)}}>{status}</Text>
          </View>
        )
      default:
        return null;
    }
  }

  return (
    <View style={[{marginVertical: Fonts.h(10)}, containerStyle]}>
      <ListItem.Accordion
        content={
          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center' }}>
                <View style={{backgroundColor: Colors.grey, alignItems: 'center', justifyContent: 'center', borderRadius: Fonts.h(10), height: Fonts.h(45), width: Fonts.h(45)}}>
                  <Icon
                    name="location"
                    type="ionicon"
                    iconStyle={{fontSize: Fonts.h(25)}}
                  />
                </View>
                <View style={styles.titleView}>
                  <Text style={{color: Colors.text, fontSize: Fonts.h(18), fontFamily: Fonts.AVERTA_BOLD, marginBottom: Fonts.h(3)}}>{location}</Text>
                  {time ? (<Text style={{color: Colors.textlight, fontSize: Fonts.h(14), fontFamily: Fonts.AVERTA_REGULAR, marginBottom: Fonts.h(3)}}>{time}</Text>) : null}
                  <Text style={{color: Colors.textlight, fontSize: Fonts.h(14), fontFamily: Fonts.AVERTA_REGULAR}}>{address}</Text>
                </View>
              </View>
              <View>
                <Icon
                  name="chevron-down"
                  type="ionicon"
                  iconStyle={{fontSize: Fonts.h(20)}}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                />
              </View>
            </View>
            <View style={{marginLeft: Fonts.w(55), marginTop: Fonts.h(5)}}>
              {renderStatus(status)}
            </View>
          </View>
        }
        isExpanded={expanded}
      >
        <View style={{backgroundColor: Colors.white, paddingBottom: Fonts.h(15)}}>
          {extras.map((extra: any, index: number) => (
            <RenderRows
              key={index.toString()}
              icon={extra.icon}
              label={extra.label}
              value={extra.value}
              pressedRow={(r: string) => pressedRow(r)}
            />
          ))}
        </View>
      </ListItem.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginHorizontal: Fonts.w(15)
  },
});

export default AccordionItem;
