import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native'; // Import the theme hook
import HomeScreen from '../screen/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HistoryScreen from '../screen/HistoryScreen';
import AddTimerScreen from '../screen/AddTimerScreen';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'alarm-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline'; 
          } else if (route.name === 'Add Timer') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          borderTopWidth: 1,
          height: 60,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          color: colors.text,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add Timer" component={AddTimerScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default BottomTab;