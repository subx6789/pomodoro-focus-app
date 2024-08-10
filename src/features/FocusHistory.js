import React from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { fonts, fontSizes } from "../utils/typography";
const renderItem = ({ item }) => (
  <View style={styles.historyItem}>
    <FontAwesome name="check-circle" size={20} color={colors.secondary} />
    <Text style={styles.historyText}>{item}</Text>
  </View>
);

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <FontAwesome5 name="clock" size={50} color={colors.lightGray} />
          <Text style={styles.title}>You haven't focused on anything yet.</Text>
          <Text style={styles.subtitle}>Add a focus item to get started!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    color: colors.lightGray,
    fontSize: fontSizes.medium,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginTop: 10,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  historyText: {
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.regular,
    marginLeft: 10,
  },
});
