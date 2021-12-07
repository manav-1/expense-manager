import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../FirebaseConfig';
import { GradientContainer } from '../customComponents/styledComponents';

const Profile = () => {
  React.useEffect(() => {
    console.log(firebase.auth().currentUser);
  }, []);
  return (
    <GradientContainer>
      <View>
        <Text>Profile</Text>
      </View>
    </GradientContainer>
  );
};

export default Profile;
