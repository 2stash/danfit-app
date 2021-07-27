import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import WorkoutsContext from "../context/workouts/workoutsContext";

import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";
import SafeViewAndroid from "../components/SafeViewAndroid";

import constants from "../utils/constants";

const UnfinishedWorkout = () => {
  const workoutContext = useContext(WorkoutsContext);

  const {
    workouts,
    getWorkouts,
    loading,
    setCurrentWorkout,
    currentWorkout,
    workoutInProcess,
    setWorkoutDoneReducer,
    allCompletedWorkouts,
    getAsyncStoredWorkouts,
    saveWorkouts,
    discardWorkoutReducer,
    saveOldWorkoutsReducer,
  } = workoutContext;

  if (loading == true) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const discardWorkout = () => {
    discardWorkoutReducer();
  };

  const saveWorkout = () => {
    saveOldWorkoutsReducer(currentWorkout);
  };

  let oldWorkoutDate = new Date(currentWorkout.date);
  let oldWorkoutDay = oldWorkoutDate.getDate();
  let oldWorkoutMonth = oldWorkoutDate.getMonth();
  let oldWorkoutYear = oldWorkoutDate.getFullYear();
  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.container]}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: constants.mainDarkBlue,
            marginBottom: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
              You have an unfinished workout from:
            </Text>
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
              {oldWorkoutMonth} / {oldWorkoutDay} / {oldWorkoutYear}
            </Text>
          </View>
        </View>

        {/* pushups */}
        <GreyBorder
          style={styles.totalView}
          accentColor={constants.mainLightBlue}
        >
          <MyAppText style={styles.exerciseText}>Pushups</MyAppText>

          <MyAppText style={styles.repsText}>
            {currentWorkout.sets * currentWorkout.workout[0].pushups}
          </MyAppText>
        </GreyBorder>

        {/* situps */}
        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Situps</MyAppText>
          <MyAppText style={styles.repsText}>
            {currentWorkout.sets * currentWorkout.workout[1].situps}
          </MyAppText>
        </GreyBorder>

        {/* squats */}
        <GreyBorder
          style={styles.totalView}
          accentColor={constants.mainDarkBlue}
        >
          <MyAppText style={styles.exerciseText}>Squats</MyAppText>

          <MyAppText style={styles.repsText}>
            {currentWorkout.sets * currentWorkout.workout[2].squats}
          </MyAppText>
        </GreyBorder>

        {/* burpees */}
        <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}
      >

            <MyAppText style={styles.exerciseText}>Burpees</MyAppText>

            <MyAppText style={styles.repsText}>
              {currentWorkout.sets * currentWorkout.workout[3].burpees}
            </MyAppText>
          </GreyBorder>


        {/* pullups */}
        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}
      >
            <MyAppText style={styles.exerciseText}>Pullups</MyAppText>

            <MyAppText style={styles.repsText}>
              {currentWorkout.sets * currentWorkout.workout[4].pullups}
            </MyAppText>
          </GreyBorder>
 

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={discardWorkout}
            style={{
              width: "45%",
              backgroundColor: "red",
              marginTop: 10,
              height: 50,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 50,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "white",fontSize:18 }}>
                Discard Workout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveWorkout}
            style={{
              width: "45%",
              backgroundColor: constants.mainLightBlue,
              marginTop: 10,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 50,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "white",fontSize:22 }}>
                Save Workout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.mainDarkBG,
    width: "100%",
  },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default UnfinishedWorkout;
