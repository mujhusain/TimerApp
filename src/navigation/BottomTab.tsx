import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryScreen from '../screen/HistoryScreen';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50', // Active tab color
        tabBarInactiveTintColor: '#9E9E9E', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default BottomTab;