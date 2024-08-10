import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors } from "./src/utils/colors";
import { fonts } from "./src/utils/typography";
import Focus from "./src/features/Focus";
import { Timer } from "./src/features/Timer";
import { FocusHistory } from "./src/features/FocusHistory";
import AppLoading from "./src/components/AppLoading";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleTimerEnd = (subject) => {
    setHistory([...history, subject]);
  };

  const FocusScreen = () => (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <Focus addSubject={setCurrentSubject} />
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={handleTimerEnd}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );

  const HistoryScreen = () => (
    <SafeAreaView style={styles.container}>
      <FocusHistory history={history} />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Focus") {
                iconName = focused ? "bullseye" : "circle-o";
              } else if (route.name === "History") {
                iconName = focused ? "history" : "clock-o";
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.lightGray,
            tabBarStyle: { backgroundColor: colors.background },
            headerShown: false,
            tabBarLabelStyle: { fontFamily: fonts.regular },
          })}
        >
          <Tab.Screen name="Focus" component={FocusScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
