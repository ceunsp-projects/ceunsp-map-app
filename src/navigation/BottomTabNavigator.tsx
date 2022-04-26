import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react'
import { Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/Map';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootTabParamList, RootTabScreenProps } from '../../types';
import TabBarIcon from './TabBarIcon';


const BottomTab = createBottomTabNavigator<RootTabParamList>();

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
        options={({ navigation }: RootTabScreenProps<'Map'>) => ({
          title: 'Mapa',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-o" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
});

export default BottomTabNavigator;