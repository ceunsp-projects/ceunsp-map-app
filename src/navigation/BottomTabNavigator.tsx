import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react'
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
      initialRouteName="Map"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Map"
        component={TabOneScreen}
        options={() => ({
          title: 'Mapa',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-o" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Picture"
        component={TabTwoScreen}
        options={{
          title: 'Camera',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
});

export default BottomTabNavigator;
