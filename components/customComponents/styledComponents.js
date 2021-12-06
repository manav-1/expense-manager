import styled from 'styled-components';
import { Dimensions } from 'react-native';
const MainContainer = styled.View`
  background: #fff6;
  width: ${Dimensions.get('window').width * 0.9}px;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  top: 50px;
  text-align: center;
`;
const Title = styled.Text`
  text-align: center;
  font-weight: 600;
  font-family: karla;
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
  font-family: karla;
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
  background: transparent;
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
  bottom: 20px;
  width: ${Dimensions.get('window').width}px;
  transform: rotate(5deg) scale(1.3);
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
export {
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
};
