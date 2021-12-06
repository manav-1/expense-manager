import React from 'react';
import { View, Text } from 'react-native';
import firebase from '../FirebaseConfig';

const Profile = () => {
  React.useEffect(() => {
    console.log(firebase.auth().currentUser);
  }, []);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
