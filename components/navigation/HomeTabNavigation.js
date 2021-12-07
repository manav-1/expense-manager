import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Expenses from '../screens/Expenses';
import Analytics from '../screens/Analytics';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const handleLogout = async (navigation) => {
  console.log(navigation);
  try {
    await AsyncStorage.removeItem('expense_user');
    navigation.push('Login');
  } catch (e) {
    console.log(e);
  }
};

const HomeTabNavigation = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: '#fff',
        tabBarActiveTintColor: '#000',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarInactiveTintColor: '#0008',
        tabBarStyle: {
          borderRadius: 50,
          position: 'absolute',
          overflow: 'hidden',
          left: 15,
          bottom: 15,
          right: 15,
          padding: 5,
          height: 60
        }
      }}
    >
      <Tab.Screen
        tabBarColor="#f00"
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ route }) => (
            <LinearGradient
              colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" size={30} color="#000" />
              </TouchableOpacity>
            </LinearGradient>
          ),
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="home-outline" />
            ) : (
              <Ionicons size={size} color={color} name="home" />
            )
        }}
      />
      <Tab.Screen
        name="Expenses"
        options={{
          header: ({ route }) => (
            <LinearGradient
              colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setVisible(!visible)}
              >
                {!visible ? (
                  <Ionicons name="add" size={24} />
                ) : (
                  <Ionicons name="close" size={24} />
                )}
              </TouchableOpacity>
            </LinearGradient>
          ),
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="card-outline" />
            ) : (
              <Ionicons size={size} color={color} name="card" />
            )
        }}
      >
        {(props) => (
          <Expenses {...props} visible={visible} setVisible={setVisible} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          header: ({ route }) => (
            <LinearGradient
              colors={['#153759AA', '#fff']}
              style={{ borderRadius: 10 }}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
            </LinearGradient>
          ),
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
          header: ({ route }) => (
            <LinearGradient
              colors={['#153759AA', '#fff']}
              style={{ borderRadius: 10 }}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
            </LinearGradient>
          ),
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

const styles = StyleSheet.create({
  tabBarTitle: {
    fontSize: 25,
    padding: 10,
    margin: 5,
    color: '#000',
    fontFamily: 'karla'
  },
  tabStyles: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoutButton: {
    marginRight: 10
  }
});

HomeTabNavigation.propTypes = {
  navigation: PropTypes.object
};
export default HomeTabNavigation;
