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
      
    <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
      <View style={{width:"100%"}}>
      <View
        style={{
          backgroundColor: constants.mainDarkBlue,
          marginBottom:10,
          width:"100%",
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
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
        onPress={backToCreateWorkout}
        style={styles.completeSetDone}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 28 }}>
          Create Another Workout
        </Text>
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.mainDarkBG,
    width:"100%"
  },
  completeSetDone: {
    width: 200,
    backgroundColor: constants.mainLightBlue,
    height: 70,
    marginTop: 10,
    justifyContent: "center",
    borderRadius:10
  },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default WorkoutDone;
