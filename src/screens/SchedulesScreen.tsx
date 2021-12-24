import React, {useEffect, FunctionComponent, useRef, useState} from 'react';
import { StyleSheet, SafeAreaView, Dimensions, StatusBar, Text, View, Alert, Linking, Platform } from 'react-native';

import { RootStackParamList } from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB, Button, Icon } from 'react-native-elements';
import useColorScheme from '../hooks/useColorScheme';
import {Schedules, SchedulesCount} from '../constants/Schedules';
import Markers from '../constants/Markers';

import Fonts from '../constants/Fonts';
import MapView from "react-native-map-clustering";

import { Modalize } from 'react-native-modalize';
import Colors from '../constants/Colors';

import TopViewBox from '../components/TopViewBox';
import AccordionItem from '../components/AccordionItem';
import { TouchableOpacity } from 'react-native-gesture-handler';



type Props = NativeStackScreenProps<RootStackParamList, 'Schedules'>;
const SchedulesScreen: FunctionComponent<Props> = ({navigation, route}) => {

  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [barStyle, setBarStyle] = useState<any>('dark-content');

  const [fabVisible, setFabVisible] = useState<boolean>(false);


  const initialRegion = {
    latitude: 6.561060587360963,
    longitude: 3.1494934208550776,
    latitudeDelta: 0.25,
    longitudeDelta: 0.15
  };

  function renderRandomMarkers(n: number) {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
    return new Array(n).fill(0).map((x, i) => (
      <Marker
        key={i}
        coordinate={{
          latitude: latitude + (Math.random() - 0.2) * latitudeDelta,
          longitude: longitude + (Math.random() - 0.2) * longitudeDelta
        }}
        title={`Place ${i.toString()}`}
      />
    ));
  }

  useEffect(() => {

    navigation.addListener('focus', () => {

      if (colorScheme === 'dark') {
        setBarStyle('light-content');
      }

    });

  }, [navigation]);

  const ZoomToMarkers = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor='transparent'
        translucent={true}
      />
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={initialRegion}
      >
        {renderRandomMarkers(6)}
      </MapView>
      <TopViewBox
        label="Schedules"
        leftIcon="apps"
        rightIcons={['calendar', 'pulse']}
        containerStyle={{position: "absolute", width: '100%', alignSelf: 'center', flex: 1, bottom: Dimensions.get("window").height - 20}}
      />
      <Modalize 
        ref={modalizeRef}
        alwaysOpen={Fonts.h(220)}
        handlePosition="inside"
        modalStyle={{
          backgroundColor: Colors.modalbg,
          borderTopLeftRadius: Fonts.w(15),
          borderTopRightRadius: Fonts.w(15),
        }}
        onPositionChange={(position) => {
          position === 'top' ? setFabVisible(false) : setFabVisible(true);
        }}
        modalHeight={Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height + Fonts.h(100)}
        withHandle={fabVisible}
      >
        {fabVisible ? (
          <View style={{paddingTop: Fonts.h(50), backgroundColor: Colors.white, borderTopLeftRadius: Fonts.w(15), borderTopRightRadius: Fonts.w(15)}}>

            <View style={{paddingHorizontal: Fonts.w(20), paddingBottom: Fonts.h(10), backgroundColor: Colors.white}}>
              <Text style={{fontFamily: Fonts.AVERTA_BOLD, color: Colors.text, fontSize: Fonts.h(22)}}>{`${SchedulesCount()} Scheduled Visits`}</Text>
            </View>
            <AccordionItem
              location={Schedules[0].sch[0].location}
              address={Schedules[0].sch[0].address}
              status={Schedules[0].sch[0].status}
              time={Schedules[0].sch[0].time}
            />
            <TouchableOpacity style={styles.fabButtonContainer}>
              <Icon
                raised
                reverse
                name='add'
                type='ionicon'
                color={Colors.red}
                containerStyle={styles.fabButton}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TopViewBox
              label="Scheduled Visits"
              leftIcon="arrow-back"
              rightIcons={['calendar', 'add']}
              containerStyle={{
                borderWidth: Fonts.w(1),
                borderColor: Colors.border
              }}
              rootStyle={{
                backgroundColor: Colors.white,
                paddingBottom: Fonts.h(20)
              }}
              onPressLeftIcon={() => {
                modalizeRef.current?.close('alwaysOpen');
              }}
            />

            {Schedules.map((schedule, index) => (
              <View key={index.toString()}>
                <Text style={{marginHorizontal: Fonts.w(15), fontSize: Fonts.h(18), fontFamily: Fonts.AVERTA_BOLD, marginTop: Fonts.h(10)}}>{schedule.date}</Text>
                {schedule.sch.map((sch, i) => (
                  <AccordionItem
                    key={i.toString()}
                    location={sch.location}
                    address={sch.address}
                    status={sch.status}
                    time={sch.time}
                    extras={sch.extras}
                    pressedRow={async (t: string) => {
                      switch(t) {
                        case 'list':
                          alert("No actions intend");
                          break;
                        case 'call':
                          await Linking.openURL(`tel:${sch.mobile}`);
                          break;
                        case 'walk':
                          Alert.alert(
                            'Confirm',
                            'Are you sure you want to start visit now?',
                            [
                              {
                                text: "No",
                                onPress: () => console.log("No")
                              },
                              {
                                text: "Yes",
                                onPress: () => console.log("Yes"),
                                style: "cancel"
                              }
                            ],
                            { cancelable: false }
                          )
                          break;
                        default: 
                          break;
                      }
                    }}
                  />
                ))}
              </View>
            ))}

          </View>
        )}
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fabButtonContainer: {
    position: "relative",
    alignSelf: "flex-end",
    bottom: Fonts.h(180),
    height: Fonts.h(220)
  },
  fabButton: {
    width: Fonts.w(50),
    height: Fonts.w(50),
    backgroundColor: Colors.red,
    elevation: Fonts.h(10),
    shadowColor: Colors.shadow
  }
});

export default SchedulesScreen;