import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Calendar from '../screens/Calendar';
import Analytics from '../screens/Analytics';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#8f5a70',
        tabBarActiveTintColor: '#FBF3E4',
        tabBarInactiveBackgroundColor: '#DFD8CA',
        tabBarInactiveTintColor: '#105652'
      }}
    >
      <Tab.Screen
        tabBarColor="#f00"
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="home-outline" />
            ) : (
              <Ionicons size={size} color={color} name="home" />
            )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="calendar-outline" />
            ) : (
              <Ionicons size={size} color={color} name="calendar" />
            )
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="analytics-outline" />
            ) : (
              <Ionicons size={size} color={color} name="analytics" />
            )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="person-outline" />
            ) : (
              <Ionicons size={size} color={color} name="person" />
            )
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigation;
