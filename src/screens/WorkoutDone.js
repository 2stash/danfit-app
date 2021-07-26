import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";
import SafeViewAndroid from "../components/SafeViewAndroid";

import WorkoutsContext from "../context/workouts/workoutsContext";
import constants from "../utils/constants";

import { dayOfTheWeek } from "../utils/dayOfTheWeek";

const WorkoutDone = () => {
  const workoutContext = useContext(WorkoutsContext);

  const {
    completedWorkout,
    leaveWorkoutDoneScreen,
  } = workoutContext;

  let dayOfWeekName = dayOfTheWeek(completedWorkout.date);

  const backToCreateWorkout = () => {
    leaveWorkoutDoneScreen();
  };

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea,styles.container]}>
      
    <ScrollView>
      <View
        style={{
          backgroundColor: constants.primary,
        }}
      >
        <View style={{
          width:"100%",
          margin:10,
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>Workout Completed!
            {/* {dayOfWeekName}'s Workout */}
          </Text>
        </View>
      </View>

    {/* pushups */}
      <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}>
          <MyAppText style={styles.exerciseText}>Pushups</MyAppText>
          <MyAppText style={styles.repsText}>
            {completedWorkout.sets * completedWorkout.workout[0].pushups}
          </MyAppText>
      </GreyBorder>

      {/* situps */}
      <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Situps</MyAppText>
          <MyAppText style={styles.repsText}>
            {completedWorkout.sets * completedWorkout.workout[1].situps}
          </MyAppText>
      </GreyBorder>

      {/* squats */}
      <GreyBorder style={styles.totalView} accentColor={constants.mainDarkBlue}>

          <MyAppText style={styles.exerciseText}>Squats</MyAppText>

          <MyAppText style={styles.repsText}>
            {completedWorkout.sets * completedWorkout.workout[2].squats}
          </MyAppText>
      </GreyBorder>

      {/* burpees */}
      <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}
      >
          <MyAppText style={styles.exerciseText}>Burpees</MyAppText>
          <MyAppText style={styles.repsText}>
            {completedWorkout.sets * completedWorkout.workout[3].burpees}
          </MyAppText>
      </GreyBorder>

      {/* pullups */}
      <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}
      >
           <MyAppText style={styles.exerciseText}>Pullups</MyAppText>

          <MyAppText style={styles.repsText}>
            {completedWorkout.sets * completedWorkout.workout[4].pullups}
          </MyAppText>
      </GreyBorder>

      <TouchableOpacity
        onPress={backToCreateWorkout}
        style={styles.completeSetDone}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 28 }}>
          Create Another Workout
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.mainDarkBG,
  },
  completeSetDone: {
    width: "100%",
    backgroundColor: constants.green,
    height: 60,
    marginTop: 20,
    justifyContent: "center",
  },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default WorkoutDone;
