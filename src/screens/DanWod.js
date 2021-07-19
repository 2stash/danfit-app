import React, { useContext, useEffect, useState, useRef } from "react";

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";


import WorkoutsContext from "../context/workouts/workoutsContext";

import CurrentWorkout from "./CurrentWorkout";
import WorkoutDone from "./WorkoutDone";
import UnfinishedWorkout from "./UnfinishedWorkout";

import { dayOfTheWeek } from "../utils/dayOfTheWeek";
import constants from "../utils/constants";

const DanWod = ({ navigation }) => {
  
  const workoutContext = useContext(WorkoutsContext);

  const {
    workouts,
    getWorkouts,
    loading,
    setCurrentWorkout,
    currentWorkout,
    workoutInProcess,
    workoutDone,
    saveCurrentWorkoutToStorage,
  } = workoutContext;

  const [sets, setSets] = useState(1);
  const [pushups, setPushups] = useState(1);
  const [situps, setSitups] = useState(1);
  const [squats, setSquats] = useState(1);
  const [burpees, setBurpees] = useState(1);
  const [pullups, setPullups] = useState(1);

  let today = new Date();
  let yearCheck = today.getFullYear();
  let monthCheck = today.getMonth();
  let dayCheck = today.getDate();
  let dayOfWeekName = dayOfTheWeek(today);



  const increaseSets = () => {
    setSets(() => sets + 1);
  };

  const decreaseSets = () => {
    if (sets <= 0) {
      setSets(() => 1);
      return;
    }
    setSets(() => sets - 1);
  };

  const increaseReps = (workout) => {
    switch (workout) {
      case "pushups":
        setPushups(() => pushups + 1);
        break;
      case "situps":
        setSitups(() => situps + 1);
        break;
      case "squats":
        setSquats(() => squats + 1);
        break;
      case "burpees":
        setBurpees(() => burpees + 1);
        break;
      case "pullups":
        setPullups(() => pullups + 1);
        break;
    }
  };

  const decreaseReps = (workout) => {
    if (workout == "pushups") {
      if (pushups <= 0) {
        setPushups(0);
        return;
      }
      setPushups(() => pushups - 1);
    }
    if (workout == "situps") {
      if (situps <= 0) {
        setSitups(0);
        return;
      }
      setSitups(() => situps - 1);
    }
    if (workout == "squats") {
      if (squats <= 0) {
        setSquats(0);
        return;
      }
      setSquats(() => squats - 1);
    }
    if (workout == "burpees") {
      if (burpees <= 0) {
        setBurpees(0);
        return;
      }
      setBurpees(() => burpees - 1);
    }
    if (workout == "pullups") {
      if (pullups <= 0) {
        setPullups(0);
        return;
      }
      setPullups(() => pullups - 1);
    }
  };

  const startWorkout = () => {
    // yesterday date to test
    // let fakeDate = new Date('2021/7/6')
    let exerciseArray = [
      { pushups: pushups },
      { situps: situps },
      { squats: squats },
      { burpees: burpees },
      { pullups: pullups },
    ];
    let workoutObject = {
      date: today,
      sets: sets,
      workout: exerciseArray,
      currentSet: 1,
    };
    setCurrentWorkout(workoutObject);
    saveCurrentWorkoutToStorage(workoutObject);
  };

  // Loads WorkDone screen if user has completed the workout
  if (workoutDone == true) {
    return <WorkoutDone />;
  }

  // Check if there is the workout saved in async storage is not Today, which allows user to save or discard the old workout
  if (workoutInProcess == true && currentWorkout.date != undefined) {
    if (
      yearCheck != currentWorkout.date.getFullYear() ||
      monthCheck != currentWorkout.date.getMonth() ||
      dayCheck != currentWorkout.date.getDate()
    ) {
      return <UnfinishedWorkout />;
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      {workoutInProcess ? (
        <CurrentWorkout />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}> Create {dayOfWeekName}'s' Workout</Text>

          {/* Start of exercise builder */}
          <ScrollView style={{ width: "90%" }}>
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Select how many Sets</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"sets"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>SETS TODAY {sets}</Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity style={styles.plus} onPress={increaseSets}>
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.minus} onPress={decreaseSets}>
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* PUSHUPS START---------------------- */}
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Pushups</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"pushups"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      reps per set: {pushups}
                    </Text>
                  </View>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      TOTAL REPS: {sets * pushups}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={increaseReps.bind(this, "pushups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.minus}
                    onPress={decreaseReps.bind(this, "pushups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* SITUPS START---------------------- */}
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Situps</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"situps"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      reps per set: {situps}
                    </Text>
                  </View>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      TOTAL REPS: {sets * situps}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={increaseReps.bind(this, "situps")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.minus}
                    onPress={decreaseReps.bind(this, "situps")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* SQUATS START---------------------- */}
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Squats</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"squats"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      reps per set: {squats}
                    </Text>
                  </View>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      TOTAL REPS: {sets * squats}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={increaseReps.bind(this, "squats")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.minus}
                    onPress={decreaseReps.bind(this, "squats")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Burpees START---------------------- */}
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Burpees</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"burpees"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      reps per set: {burpees}
                    </Text>
                  </View>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      TOTAL REPS: {sets * burpees}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={increaseReps.bind(this, "burpees")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.minus}
                    onPress={decreaseReps.bind(this, "burpees")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Pullups START---------------------- */}
            <View
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
            >
              <View style={styles.mainTitle}>
                <Text style={styles.text}>Pullups</Text>
              </View>
              <View style={{ flexDirection: "row" }} key={"pullups"}>
                <View style={styles.subCard}>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      reps per set: {pullups}
                    </Text>
                  </View>
                  <View style={styles.fifty}>
                    <Text style={styles.textPrimary}>
                      TOTAL REPS: {sets * pullups}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    style={styles.plus}
                    onPress={increaseReps.bind(this, "pullups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>+</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.minus}
                    onPress={decreaseReps.bind(this, "pullups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* End of Exercises */}

            <View style={{ marginTop: 10, marginBottom:25 }}>
              <Button title='Start Workout' onPress={startWorkout} />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    backgroundColor: constants.backgroundColor,
  },
  container: {
    flex: 1,
    // borderRadius: 10,b
    shadowColor: "blue",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    // margin: 10,
    width: "100%",
    backgroundColor: constants.backgroundColor,
  },
  mainTitle: {
    marginTop: 10,
    height: 30,
    backgroundColor: constants.darkblue,
    textAlign: "center",
    color: "white",
    justifyContent: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  textPrimary: {
    textAlign: "center",
    fontSize: 18,
    color: constants.primary,
  },
  fifty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  subCard: {
    width: "80%",
    backgroundColor: constants.grey,
  },
  cardButtons: {
    flex: 1,
  },
  buttonView: { height: 40 },
  plus: {
    backgroundColor: "green",
  },
  minus: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 25,
  },
});



export default DanWod;
