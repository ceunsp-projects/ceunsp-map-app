import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react';

import Galery from '~/screens/Galery';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/Map';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabBarIcon from './TabBarIcon';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = memo(() => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Map'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint
      }}
    >
      <BottomTab.Screen
        name='Map'
        component={TabOneScreen}
        options={() => ({
          title: 'Mapa',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='map-pin' color={color} />
        })}
      />
      {/* <BottomTab.Screen
        name='Picture'
        component={TabTwoScreen}
        initialParams={{ newPlace: null }}
        options={{
          title: 'Camera',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='camera-retro' color={color} />
        }}
      /> */}
      <BottomTab.Screen
        name="Galery"
        component={Galery}
        initialParams={{ place: null }}
        options={{
          title: 'Galeria',
          tabBarIcon: ({ color }) => <TabBarIcon name="photo" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
});

export default BottomTabNavigator;
