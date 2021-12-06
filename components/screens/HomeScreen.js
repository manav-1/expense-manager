import * as React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e) => e.preventDefault());
    })();
    const logout = async () => {
      await AsyncStorage.removeItem('expense_user');
    };
    logout();
  }, []);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
HomeScreen.propTypes = {
  navigation: PropTypes.object
};
export default HomeScreen;
