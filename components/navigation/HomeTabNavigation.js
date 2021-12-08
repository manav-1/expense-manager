import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Expenses from '../screens/Expenses';
import Analytics from '../screens/Analytics';
// import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../FirebaseConfig';

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
  const [expenses, setExpenses] = React.useState([]);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setUser(firebase.auth().currentUser);
    console.log(firebase.auth().currentUser.uid);
    firebase
      .database()
      .ref(`/expenses/${firebase.auth().currentUser.uid}`)
      .on('value', (data) => {
        if (data.val()) {
          let values = data.val();
          let expenses = [];
          for (let key in values) {
            values[key]['key'] = key;
            expenses.push(values[key]);
          }
          setExpenses(expenses);
        }
      });
  }, []);

  const addExpense = (item) => {
    firebase.database().ref(`/expenses/${user.uid}`).push(item);
  };
  const deleteExpense = (index) => {
    console.log(expenses[index]);
    firebase
      .database()
      .ref(`/expenses/${user.uid}/${expenses[index].key}`)
      .remove();
  };

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
        options={{
          header: ({ route }) => (
            <View
              // colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) =>
            !focused ? (
              <Ionicons size={size} color={color} name="home-outline" />
            ) : (
              <Ionicons size={size} color={color} name="home" />
            )
        }}
      >
        {(props) => <HomeScreen {...props} expenses={expenses} />}
      </Tab.Screen>
      <Tab.Screen
        name="Expenses"
        options={{
          header: ({ route }) => (
            <View
              // colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
              <TouchableOpacity
                style={[styles.logoutButton, { paddingLeft: 0 }]}
                onPress={() => setVisible(!visible)}
              >
                {!visible ? (
                  <Ionicons name="add" color="#fff" size={30} />
                ) : (
                  <Ionicons name="close" color="#fff" size={30} />
                )}
              </TouchableOpacity>
            </View>
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
          <Expenses
            {...props}
            visible={visible}
            setVisible={setVisible}
            expenses={expenses}
            addExpenses={addExpense}
            deleteExpenses={deleteExpense}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          header: ({ route }) => (
            <View
              // colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
            </View>
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
            <View
              //  colors={['#153759AA', '#fff']}
              style={styles.tabStyles}
            >
              <Text style={styles.tabBarTitle}>{route.name}</Text>
            </View>
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
    color: '#fff',
    fontFamily: 'karla'
  },
  tabStyles: {
    // borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181824'
  },
  logoutButton: {
    marginRight: 10,
    paddingLeft: 5,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#494c59',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

HomeTabNavigation.propTypes = {
  navigation: PropTypes.object
};
export default HomeTabNavigation;
