import React, { useContext, useState } from "react";

import {
  Text,
  View,
  SafeAreaView,
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
import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";

const DanWod = () => {
  const workoutContext = useContext(WorkoutsContext);

  const {
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
          <MyAppText style={{textAlign:'center'}}> Create Workout</MyAppText>

          {/* Start of exercise builder */}
          <ScrollView contentContainerStyle={{alignItems:"center"}}>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Select how many Sets
                </Text>
              </View>
              <View key={"sets"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainLightBlue}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity style={[styles.minus,{borderColor:constants.mainLightBlue}]} onPress={decreaseSets}>
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainLightBlue}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{sets}</MyAppText>
                  </View>

                  <TouchableOpacity style={[styles.plus,{borderColor:constants.mainLightBlue}]} onPress={increaseSets}>
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainLightBlue}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>

            {/* PUSHUPS START---------------------- */}
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Pushups Per Set
                </Text>
              </View>
              <View key={"pushups"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainLightBlue}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                    style={[styles.minus,{borderColor:constants.mainLightBlue}]} 
                    onPress={decreaseReps.bind(this, "pushups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText, {color:constants.mainLightBlue}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{pushups}</MyAppText>
                  </View>

                  <TouchableOpacity
                    style={[styles.plus,{borderColor:constants.mainLightBlue}]}
                    onPress={increaseReps.bind(this, "pushups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainLightBlue}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>

            {/* SITUPS START---------------------- */}
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Situps Per Set
                </Text>
              </View>
              <View key={"situps"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainOrange}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                    style={[styles.minus,{borderColor:constants.mainOrange}]} 
                    onPress={decreaseReps.bind(this, "situps")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText, {color:constants.mainOrange}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{situps}</MyAppText>
                  </View>

                  <TouchableOpacity
                    style={[styles.plus,{borderColor:constants.mainOrange}]}
                    onPress={increaseReps.bind(this, "situps")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainOrange}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>



            {/* SQUATS START---------------------- */}
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Squats Per Set
                </Text>
              </View>
              <View key={"squats"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainDarkBlue}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                    style={[styles.minus,{borderColor:constants.mainDarkBlue}]} 
                    onPress={decreaseReps.bind(this, "squats")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText, {color:constants.mainDarkBlue}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{squats}</MyAppText>
                  </View>

                  <TouchableOpacity
                    style={[styles.plus,{borderColor:constants.mainDarkBlue}]}
                    onPress={increaseReps.bind(this, "squats")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainDarkBlue}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>

            {/* Burpees START---------------------- */}
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Burpees Per Set
                </Text>
              </View>
              <View key={"burpees"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainLightBlue}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                    style={[styles.minus,{borderColor:constants.mainLightBlue}]} 
                    onPress={decreaseReps.bind(this, "burpees")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText, {color:constants.mainLightBlue}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{burpees}</MyAppText>
                  </View>

                  <TouchableOpacity
                    style={[styles.plus,{borderColor:constants.mainLightBlue}]}
                    onPress={increaseReps.bind(this, "burpees")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainLightBlue}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>

            {/* Pullups START---------------------- */}
            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "left", fontSize: 22, color: "white", marginLeft:10 }}
                >
                  Pullups Per Set
                </Text>
              </View>
              <View key={"pullups"}>
                <GreyBorder
                  style={styles.totalView}
                  accentColor={constants.mainOrange}
                >
                  <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                    style={[styles.minus,{borderColor:constants.mainOrange}]} 
                    onPress={decreaseReps.bind(this, "pullups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText, {color:constants.mainOrange}]}>-</Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <MyAppText>{pullups}</MyAppText>
                  </View>

                  <TouchableOpacity
                    style={[styles.plus,{borderColor:constants.mainOrange}]}
                    onPress={increaseReps.bind(this, "pullups")}
                  >
                    <View style={styles.buttonView}>
                      <Text style={[styles.buttonText,{color:constants.mainOrange}]}>+</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </GreyBorder>
              </View>
            </View>

            {/* End of Exercises */}

            <TouchableOpacity
              onPress={startWorkout}
              style={styles.completeSetDone}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 32 }}
              >
                Start Workout
              </Text>
            </TouchableOpacity>
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
    // alignContent:"center",
    backgroundColor: constants.mainDarkBG,
  },
  container: {
    flex: 1,
    marginTop:10
    // shadowColor: "blue",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // elevation: 3,

    // justifyContent: "center",
    // alignItems: "center",
    // alignContent:"center"
    // width: "100%",
  },
  buttonView: { height: 40 },
  plus: {
    borderWidth: 3,
    borderRadius: 4,
    width: 80,
  },
  minus: {
    borderWidth: 3,
    borderRadius: 4,
    width: 80,
  },
  buttonText: {
    fontSize: 32,
    textAlign: "center",
  },
  completeSetDone: {
    width: 200,
    backgroundColor: constants.mainLightBlue,
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    borderRadius:10
  },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row"},
});

export default DanWod;
