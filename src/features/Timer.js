import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useKeepAwake } from "expo-keep-awake";

import { Timing } from "./Timing";
import { colors } from "../utils/colors";
import { fonts, fontSizes } from "../utils/typography";
import { Countdown } from "../components/CountDown";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={styles.taskContainer}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color={colors.secondary}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsStarted(!isStarted)}
        >
          <FontAwesome
            name={isStarted ? "pause" : "play"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearSubject}>
          <FontAwesome name="stop" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    paddingTop: 20,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: fontSizes.large,
    textAlign: "center",
  },
  task: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    textAlign: "center",
  },
  progressBarContainer: {
    paddingTop: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    paddingTop: 20,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});
