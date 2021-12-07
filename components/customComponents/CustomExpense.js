import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import PropTypes from 'prop-types';

const CustomExpense = ({ expense, deleteItem }) => {
  const getWayIcon = (way) => {
    switch (way) {
      case 'Cash':
        return <FontAwesome5 name="money-bill-wave" size={10} color="#000" />;
      case 'Card':
        return <FontAwesome5 name="credit-card" size={10} color="#000" />;
      case 'Bank Transfer':
        return <FontAwesome5 name="building" size={10} color="#000" />;
      case 'UPI':
        return <FontAwesome5 name="funnel-dollar" size={10} color="#000" />;
      case 'Cheque':
        return <FontAwesome5 name="money-check-alt" size={10} color="#000" />;
      case 'Net Banking':
        return <FontAwesome5 name="network-wired" size={10} color="#000" />;

      default:
        return null;
    }
  };
  const getExpenseType = (type) =>
    type == 'Debit' ? (
      <FontAwesome5 name="arrow-down" size={10} color="#000" />
    ) : (
      <FontAwesome5 name="arrow-up" size={10} color="#000" />
    );

  return (
    <View style={styles.mainContainer}>
      <View style={{ width: 150 }}>
        <Text numberOfLines={2} style={styles.expenseName}>
          {expense.description}
        </Text>
        <Text style={styles.money}>₹ {expense.value} </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 200,
          justifyContent: 'flex-end'
        }}
      >
        <Chip
          mode="outlined"
          style={styles.chipStyle}
          icon={() => getExpenseType(expense.type)}
        >
          <Text style={styles.chipText}>{expense.type}</Text>
        </Chip>
        <Chip
          mode="outlined"
          style={styles.chipStyle}
          icon={() => getWayIcon(expense.way)}
        >
          <Text style={styles.chipText}>{expense.way}</Text>
        </Chip>
        <TouchableOpacity onPress={deleteItem}>
          <FontAwesome5 name="times-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  expenseName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'karla'
  },
  money: {
    fontSize: 16,
    fontFamily: 'karla'
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 20,
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center'
  },
  chipStyle: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  chipText: {
    fontSize: 10
  }
});

CustomExpense.propTypes = {
  expense: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default CustomExpense;
