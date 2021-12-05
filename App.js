import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import LogoScreen from "./components/screens/LogoScreen";
import { DefaultTheme, Provider } from "react-native-paper";
import * as Font from "expo-font";
import StackNavigation from "./components/navigation/StackNavigation";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#181D31",
    accent: "#678983",
  },
};

const customFonts = {
  inter: require("./assets/fonts/Inter-Regular.ttf"),
  interBold: require("./assets/fonts/Inter-Bold.ttf"),
  interLight: require("./assets/fonts/Inter-Light.ttf"),
  interMedium: require("./assets/fonts/Inter-Medium.ttf"),
  jetBrainsMono: require("./assets/fonts/Raleway-Regular.ttf"),
  jetBrainsMonoBold: require("./assets/fonts/JetBrainsMono-Bold.ttf"),
  notoSans: require("./assets/fonts/NotoSansMono/NotoSansMono-Regular.ttf"),
  notoSansBold: require("./assets/fonts/NotoSansMono/NotoSansMono-Bold.ttf"),
  karla: require("./assets/fonts/Karla-Regular.ttf"),
  azeret: require("./assets/fonts/Azeret_Mono/AzeretMono-Bold.ttf"),
};

export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  React.useEffect(() => {
    (() => {
      Font.loadAsync(customFonts).then(() => {
        console.log("Font loaded successfully");
        setFontLoaded(true);
      });
    })();
  }, []);
  if (!fontLoaded) return null;
  return (
    <Provider theme={theme}>
      {/* <View style={styles.container}> */}
      <StackNavigation />
      <StatusBar hidden />
      {/* </View> */}
    </Provider>
  );
}

// export default function App() {
//   return (
//     <PaperProvider>
//       <LogoScreen />
//     </PaperProvider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
