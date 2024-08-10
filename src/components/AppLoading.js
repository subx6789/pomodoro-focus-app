import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../utils/colors";

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});

export default AppLoading;
