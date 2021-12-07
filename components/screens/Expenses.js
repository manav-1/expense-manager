import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {
  GradientContainer,
  PaddedContainer,
  ExpenseInput
} from '../customComponents/styledComponents';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';
import * as Yup from 'yup';
import CustomExpense from '../customComponents/CustomExpense';

const Expenses = ({ visible, setVisible }) => {
  const [expense, setExpense] = React.useState({
    value: '',
    description: '',
    type: '',
    way: ''
  });
  const [expenses, setExpenses] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const handleNewExpense = async () => {
    const validationSchema = Yup.object({
      value: Yup.number().required('Please enter a value'),
      type: Yup.string().required('Please select an expense type'),
      way: Yup.string().required('Please select an expense way'),
      description: Yup.string().required('Please enter a description')
    });
    validationSchema
      .validate(expense)
      .then(() => {
        setExpenses([...expenses, expense]);
        console.log([...expenses, expense]);
        setExpense({
          value: '',
          description: '',
          type: '',
          way: ''
        });
        setSnackbarVisible(true);
        setSnackbarText('Added Successfully');
        setVisible(false);
      })
      .catch((err) => {
        setSnackbarVisible(true);
        setSnackbarText(err.message);
      });
  };
  const deleteItem = (index) => {
    const newExpenses = expenses.filter((item, i) => i !== index);
    setExpenses(newExpenses);
  };

  return (
    <>
      <GradientContainer>
        <PaddedContainer>
          {visible ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginTop: 20
                }}
              >
                <View>
                  <Text>Expense Value</Text>
                  <ExpenseInput
                    keyboardType="numeric"
                    value={expense.value}
                    onChangeText={(value) => setExpense({ ...expense, value })}
                    style={styles.expenseInput}
                    placeholder="Enter Expense Value"
                  />
                </View>
                <View>
                  <Text>Expense Description</Text>

                  <ExpenseInput
                    value={expense.description}
                    onChangeText={(value) =>
                      setExpense({ ...expense, description: value })
                    }
                    style={styles.descriptionInput}
                    placeholder="Enter Description"
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Text>Expense Type</Text>
                  <SelectDropdown
                    renderDropdownIcon={() => (
                      <Ionicons name="chevron-down" size={20} />
                    )}
                    dropdownOverlayColor="#506D8433"
                    defaultButtonText={`Expense Type`}
                    data={['Credit', 'Debit']}
                    dropdownStyle={styles.dropdownStyle}
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    onSelect={(selectedItem) =>
                      setExpense({ ...expense, type: selectedItem })
                    }
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Text>Expense Way</Text>
                  <SelectDropdown
                    renderDropdownIcon={() => (
                      <Ionicons name="chevron-down" size={20} />
                    )}
                    dropdownOverlayColor="#506D8433"
                    defaultButtonText={`Expense Way`}
                    data={[
                      'Cash',
                      'Card',
                      'Bank Transfer',
                      'UPI',
                      'Cheque',
                      'Net Banking'
                    ]}
                    dropdownStyle={styles.dropdownStyle}
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    onSelect={(selectedItem) =>
                      setExpense({ ...expense, way: selectedItem })
                    }
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleNewExpense}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {!showMore
            ? expenses
                .slice(0, expenses.length > 6 ? 6 : expenses.length)
                .map((expense, index) => (
                  <CustomExpense
                    key={index}
                    expense={expense}
                    deleteItem={() => deleteItem(index)}
                  />
                ))
            : expenses.map((expense, index) => (
                <CustomExpense
                  key={index}
                  expense={expense}
                  deleteItem={() => deleteItem(index)}
                />
              ))}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginBottom: 15
            }}
            onPress={() => setShowMore(!showMore)}
          >
            {expenses.length > 6 ? (
              !showMore ? (
                <Text style={{ fontSize: 18 }}>
                  Show More <Ionicons name="chevron-down" size={20} />
                </Text>
              ) : (
                <Text style={{ fontSize: 18 }}>
                  ShowLess
                  <Ionicons name="chevron-up" size={20} />
                </Text>
              )
            ) : null}
          </TouchableOpacity>
        </PaddedContainer>
      </GradientContainer>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        style={{ backgroundColor: '#182e28CC', marginBottom: 80 }}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarText}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    height: 45,
    backgroundColor: '#506D84',
    borderRadius: 10,
    marginVertical: 5,
    width: 175
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'karla'
  },
  expenseInput: {
    margin: null,
    width: 180,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderRadius: 1
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'karla'
  },
  addButton: {
    backgroundColor: '#506D84',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12.5,
    margin: 10,
    marginTop: 0,
    marginBottom: 10,
    borderRadius: 10
  },
  dropdownStyle: {
    borderRadius: 5,
    backgroundColor: '#506D84AA',
    elevation: 0
    // padding: 2
  },
  descriptionInput: {
    width: 180,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderRadius: 1,
    marginHorizontal: 10
  }
});

Expenses.propTypes = {
  visible: PropTypes.bool,
  navigation: PropTypes.object,
  setVisible: PropTypes.func
};

export default Expenses;
