import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { fonts, fontSizes } from "../utils/typography";

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timingContainer}>
      {[10, 15, 20].map((time) => (
        <TouchableOpacity
          key={time}
          style={styles.timingButton}
          onPress={() => onChangeTime(time)}
        >
          <Text style={styles.buttonText}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  timingContainer: {
    flex: 1,
    flexDirection: "row",
  },
  timingButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: fontSizes.medium,
  },
});
