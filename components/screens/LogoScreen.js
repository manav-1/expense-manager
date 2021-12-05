import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme, Title, Headline } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.accent + "66",
    },
    text: {
      fontSize: 40,
      fontFamily: "notoSansBold",
      position: "absolute",
      bottom: 0,
      letterSpacing: -3,
      lineHeight: 45,
      color: colors.primary,
      textAlign: "center",
    },
  });
  React.useEffect(() => {
    const checkLoggedIn = async () => {
      if (await AsyncStorage.getItem("expense_user")) navigation.push("Home");
      else navigation.push("Login");
    };
    setTimeout(checkLoggedIn, 3000);
  }, []);
  return (
    <View style={[StyleSheet.absoluteFill, styles.textContainer]}>
      <Image
        source={require("../../assets/cherry-pick-bitcoins.png")}
        style={{
          width: 250,
          height: 250,
          position: "absolute",
          top: 100,
        }}
      />
      <Headline
        style={{
          position: "absolute",
          top: 400,
          fontFamily: "notoSans",
          padding: 10,
          color: colors.primary,
          backgroundColor: colors.accent,
        }}
      >
        Expense Manager
      </Headline>
      <Text style={styles.text}>Take hold{"\n"}of your finance$</Text>
    </View>
  );
};

export default HomeScreen;
