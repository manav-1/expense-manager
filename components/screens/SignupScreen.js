import * as React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import firebase from '../FirebaseConfig';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Img from '../../assets/abstract-6.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Styled Components
import {
  MainContainer,
  Title,
  Input,
  Button,
  ButtonText,
  Login,
  LoginContainer,
  BgImage,
  SignText,
  RowContainer,
  IconText
} from '../customComponents/styledComponents';

const source = {
  uri: 'https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=657&q=80'
};

const SignupScreen = ({ navigation }) => {
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const [email, setEmail] = React.useState('manav81101@gmail.com');
  const [password, setPassword] = React.useState('abcdef1@');

  React.useEffect(() => {
    (() => {
      navigation.addListener('beforeRemove', (e) => e.preventDefault());
    })();
  }, []);
  const handleSignup = async () => {
    console.log(email, password);
    const validationSchema = Yup.object({
      email: Yup.string().email().required('Please Enter your email'),
      password: Yup.string()
        .min(6, 'Please Enter more than  6 letters')
        .max(25)
        .required('Please Enter your password')
    });
    validationSchema
      .validate({ email, password })
      .then(async (obj) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(obj.email, obj.password)
          .then(async ({ user }) => {
            setSnackbarVisible(true);
            setSnackbarText(
              'Sign up successful, Please check email for verification'
            );
            firebase.auth().currentUser.sendEmailVerification();
            await AsyncStorage.setItem('expense_user', user.uid);
            navigation.navigate('Login');
          })
          .catch((err) => {
            setSnackbarVisible(true);
            setSnackbarText(err.message);
          });
      })
      .catch((err) => {
        setSnackbarVisible(true);
        setSnackbarText(err.message);
      });
    // firebase.auth().createUserWithEmailAndPassword();
  };
  return (
    <ImageBackground
      style={StyleSheet.absoluteFill}
      source={source}
      resizeMode="cover"
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#000D',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }
        ]}
      >
        <BgImage
          style={{ transform: [{ rotate: '5deg' }, { scale: 1.2 }] }}
          source={Img}
        />
        <MainContainer>
          <Title>SignUp Here</Title>
          <Input
            placeholder="Enter your username/ email"
            placeholderTextColor="#fffA"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Input
            placeholder="Enter your password"
            placeholderTextColor="#fffA"
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <Button onPress={handleSignup}>
            <ButtonText>Sign Up</ButtonText>
          </Button>
          <LoginContainer>
            <Login>
              <Ionicons name="logo-google" size={40} color="#e3b1c6" />
              <IconText>Google</IconText>
            </Login>
            <Login>
              <Ionicons name="logo-facebook" size={40} color="#e3b1c6" />
              <IconText>Facebook</IconText>
            </Login>
          </LoginContainer>
          <RowContainer>
            <SignText>Already have an account </SignText>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <SignText style={{ color: '#fff', fontWeight: '700' }}>
                Login
              </SignText>
            </TouchableOpacity>
          </RowContainer>
        </MainContainer>
      </View>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        style={{ backgroundColor: '#78314fCC' }}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarText}
      </Snackbar>
    </ImageBackground>
  );
};

SignupScreen.propTypes = {
  navigation: PropTypes.object
};
export default SignupScreen;
