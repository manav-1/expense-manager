import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {
  GradientContainer,
  PaddedContainer,
  Title
} from '../customComponents/styledComponents';

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
    <GradientContainer>
      <PaddedContainer>
        <Title style={styles.header}>Home</Title>
        <Text style={styles.light}>This month spend</Text>
        <Title style={styles.money}>$1,500.35</Title>
      </PaddedContainer>
    </GradientContainer>
  );
};
HomeScreen.propTypes = {
  navigation: PropTypes.object
};
export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontSize: 30,
    fontFamily: 'readex',
    textAlign: 'left'
  },
  light: {
    textAlign: 'center',
    fontFamily: 'karla',
    fontSize: 16,
    color: '#0007'
  },
  money: {
    color: '#000',
    fontSize: 40,
    fontFamily: 'readex',
    marginVertical: 5,
    letterSpacing: 0.1
  }
});
