import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import CustomExpense from '../customComponents/CustomExpense';
import LineChartScreen from './LineScreen';
import {
  GradientContainer,
  PaddedContainer,
  Title
} from '../customComponents/styledComponents';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e) => e.preventDefault());
    })();
  }, []);
  const expense = {
    value: 945,
    description: 'Rent',
    type: 'Debit',
    way: 'Cash'
  };
  return (
    <GradientContainer>
      <PaddedContainer>
        <Text style={styles.light}>This month spend</Text>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.oval}></View>
          <Title style={styles.money}>$1,500.35</Title>
        </View>
        <View>
          <Text style={styles.heading}>
            <Ionicons name="wallet-outline" size={20} /> 7 Day Expense
          </Text>
          <LineChartScreen />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 5
          }}
        >
          <Text
            style={[
              styles.heading,
              {
                textAlign: 'left',
                fontWeight: '600',
                fontFamily: 'inter',
                fontSize: 16
              }
            ]}
          >
            Recent Expenses
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Text
              style={[
                styles.heading,
                {
                  textAlign: 'left',
                  fontWeight: '600',
                  fontFamily: 'inter',
                  fontSize: 16
                }
              ]}
            >
              See All
              <Ionicons name="ios-arrow-forward" size={16} />
            </Text>
          </TouchableOpacity>
        </View>
        <CustomExpense expense={expense} />
        <CustomExpense expense={expense} />
        <CustomExpense expense={expense} />
        <CustomExpense expense={expense} />
        <CustomExpense expense={expense} />
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
    fontSize: 55,
    fontFamily: 'readex',
    marginVertical: 5,
    letterSpacing: 0.1
  },
  oval: {
    width: 100,
    height: 100,
    borderWidth: 1.5,
    borderRadius: 120,
    transform: [{ scaleX: 3 }, { rotate: '30deg' }],
    position: 'absolute',
    left: 150,
    top: 5,
    borderColor: '#8f106033'
  },
  heading: {
    fontFamily: 'karla',
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
