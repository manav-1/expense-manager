import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import firebase from '../FirebaseConfig';
import UserImage from '../../assets/icons8-user-64.png';
import {
  GradientContainer,
  ExpenseInput
} from '../customComponents/styledComponents';
import { Snackbar } from 'react-native-paper';

const Profile = () => {
  const [user, setUser] = React.useState(null);
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');

  const [snackbarText, setSnackbarText] = React.useState('');
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  React.useEffect(() => {
    setUser(firebase.auth().currentUser);
    setUserName(firebase.auth().currentUser.displayName);
    setUserEmail(firebase.auth().currentUser.email);
    console.log();
  }, []);

  const updateProfile = async () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: userName,
        email: userEmail
      })
      .then(() => {
        setSnackbarVisible(true);
        setSnackbarText('Profile Updated');
      })
      .catch((error) => {
        setSnackbarVisible(true);
        setSnackbarText(error.message);
      });
  };
  return (
    <GradientContainer>
      <View style={{ position: 'absolute', right: 10, top: 10 }}>
        <Image source={UserImage} style={{ width: 100, height: 100 }} />
        <TouchableOpacity
          style={{ position: 'absolute', right: 10, bottom: 10 }}
        >
          <FontAwesome5 name="edit" size={18} color="#f1c0cb" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Name</Text>
        <ExpenseInput
          value={userName}
          onChangeText={(val) => setUserName(val)}
          style={styles.expenseInput}
        />
        <Text style={styles.text}>Email</Text>
        <ExpenseInput
          value={userEmail}
          onChangeText={(val) => setUserEmail(val)}
          style={styles.expenseInput}
        />

        <TouchableOpacity onPress={updateProfile} style={styles.saveButton}>
          <Text style={styles.saveText}>
            Save Profile&nbsp;&nbsp;
            <Ionicons name="save-outline" color="#000" size={16} />
          </Text>
        </TouchableOpacity>
        <View style={{ alignSelf: 'flex-end' }}>
          <Text
            style={[
              styles.text,
              { fontSize: 16, textAlign: 'right', marginTop: 2 }
            ]}
          >
            Account Created on
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 16, textAlign: 'right', marginTop: 2 }
            ]}
          >
            {user
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : null}
          </Text>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        style={{ backgroundColor: '#f1c0cb', marginBottom: 80 }}
        onDismiss={() => setSnackbarVisible(false)}
      >
        <Text style={{ color: '#000' }}>{snackbarText}</Text>
      </Snackbar>
    </GradientContainer>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'karla',
    color: '#f1c0cb',
    marginHorizontal: 10,
    marginTop: 10
  },
  expenseInput: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#ccf0fa',
    color: '#ccf0fa',
    borderRadius: 1,
    marginHorizontal: 10,
    marginBottom: 15
  },
  saveButton: {
    backgroundColor: '#f1c0c0',
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingVertical: 15,
    alignSelf: 'flex-end'
  },
  saveText: {
    color: '#000',
    fontFamily: 'karla',
    fontSize: 16
  }
});

export default Profile;
