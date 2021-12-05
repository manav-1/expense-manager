import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Snackbar } from "react-native-paper";
import firebase from "../FirebaseConfig";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const source = {
  uri: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=657&q=80",
};

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState("");

  const [email, setEmail] = React.useState("abc@gmail.com");
  const [password, setPassword] = React.useState("abc.com");

  React.useEffect(() => {
    (() => {
      navigation.addListener("beforeRemove", (e) => e.preventDefault());
    })();
    const checkLoggedIn = async () => {
      if (await AsyncStorage.getItem("expense_user")) navigation.push("Home");
    };
    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    const validationSchema = Yup.object({
      email: Yup.string().email().required("Please Enter your email"),
      password: Yup.string()
        .min(6, "Please Enter more than  6 letters")
        .max(25)
        .required("Please Enter your password"),
    });
    validationSchema
      .validate({ email, password })
      .then(async (obj) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(obj.email, obj.password)
          .then(async ({ user }) => {
            setSnackbarVisible(true);
            setSnackbarText("Login successful");
            await AsyncStorage.setItem("expense_user", user.uid);
            navigation.navigate("Home");
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
            backgroundColor: "#000D",
            alignItems: "center",
            justifyContent: "flex-start",
          },
        ]}
      >
        <BgImage source={require("../../assets/abstract-mobile-payment.png")} />
        <MainContainer>
          <Title>Login Here</Title>
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
          <Button onPress={handleLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
          <LoginContainer>
            <Login>
              <Ionicons name="logo-google" size={45} color="#182e28" />
              <IconText>Google</IconText>
            </Login>
            <Login>
              <Ionicons name="logo-facebook" size={45} color="#182e28" />
              <IconText>Facebook</IconText>
            </Login>
          </LoginContainer>
          <RowContainer>
            <SignText>Dont have an Account </SignText>
            <TouchableOpacity onPress={() => navigation.push("Signup")}>
              <SignText style={{ color: "#fff", fontWeight: "700" }}>
                 Sign Up
              </SignText>
            </TouchableOpacity>
          </RowContainer>
        </MainContainer>
      </View>
      <Snackbar
        visible={snackbarVisible}
        duration={3000}
        style={{ backgroundColor: "#182e28CC" }}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarText}
      </Snackbar>
    </ImageBackground>
  );
};

const MainContainer = styled.View`
  background: #fff6;
  width: ${Dimensions.get("window").width * 0.9}px;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  top: 50px;
  text-align: center;
`;
const Title = styled.Text`
  text-align: center;
  font-weight: 600;
  font-family: inter;
  color: #fff;
  margin-bottom: 20px;
  font-size: 25px;
`;

const Input = styled.TextInput`
  width: 90%;
  margin: 5px auto;
  border-bottom-width: 2px;
  border-bottom-color: #fff;
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  margin: 15px auto 5px;
  padding: 6px 20px;
  background: #fff;
  font-size: 30px;
`;

const Login = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background: #fff0;
  font-size: 30px;
`;

const ButtonText = styled.Text`
  font-weight: 600;
  font-family: inter;
  font-size: 18px;
`;

const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 10px;
`;

const BgImage = styled.Image`
  height: 250px;
  position: absolute;
  bottom: 30px;
  width: ${Dimensions.get("window").width}px;
  transform: rotate(-5deg) scale(1.3);
  opacity: 0.75;
`;
const SignText = styled.Text`
  font-weight: 600;
  font-family: inter;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  font-family: monospace;
`;
const RowContainer = styled.View`
  flex-direction: row;
  margin: 5px;
`;
const IconText = styled.Text`
  color: #fff;
  font-family: interMedium;
  font-size: 11px;
  width: 80px;
  text-align: center;
`;

export default LoginScreen;
