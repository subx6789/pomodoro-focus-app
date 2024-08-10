import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../utils/colors";
import { fonts, fontSizes } from "../utils/typography";

export default function Focus({ addSubject }) {
  const [subject, setSubject] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="I will focus on ..."
        placeholderTextColor={colors.lightGray}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addSubject(subject);
          setSubject("");
        }}
      >
        <FontAwesome name="plus" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 50,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: fontSizes.medium,
    fontFamily: fonts.regular,
    color: colors.text,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
