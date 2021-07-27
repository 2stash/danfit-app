import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import WorkoutsContext from "../context/workouts/workoutsContext";

import SafeViewAndroid from "../components/SafeViewAndroid";
import { dayOfTheWeek } from "../utils/dayOfTheWeek";
import constants from "../utils/constants";
import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";

const Set = (props) => {
  let exerciseName = props.name;
  exerciseName = exerciseName[0].toUpperCase() + exerciseName.substring(1);

  return (
    <View style={{width:"100%",flex:1},[props.zeroReps == true && styles.hidden]}>
      <TouchableOpacity
        style={styles.set}
        onPress={props.setSetDone.bind(this, props.name)}
      >
        <GreyBorder style={[styles.totalView]} accentColor={props.accentColor} setDone={props.setDone}>
          <MyAppText style={styles.exerciseText}>{exerciseName}:</MyAppText>
          <MyAppText style={styles.repsText}>
            {props.data[props.name]}
          </MyAppText>
        </GreyBorder>
      </TouchableOpacity>
    </View>
  );
};

const CurrentWorkout = () => {
  const workoutContext = useContext(WorkoutsContext);

  const { currentWorkout, setWorkoutDoneReducer, saveCurrentWorkoutToStorage } =
    workoutContext;

  const [currentSet, setCurrentSet] = useState(currentWorkout.currentSet);
  const [pushupsDone, setPushupsDone] = useState(false);
  const [situpsDone, setSitupsDone] = useState(false);
  const [squatsDone, setSquatsDone] = useState(false);
  const [burpeesDone, setBurpeesDone] = useState(false);
  const [pullupsDone, setPullupsDone] = useState(false);

  const setRepsDone = (workout) => {
    if (workout == "pushups" || currentWorkout.workout[0].pushups == 0) {
      setPushupsDone(true);
    }
    if (workout == "situps" || currentWorkout.workout[1].situps == 0) {
      setSitupsDone(true);
    }
    if (workout == "squats" || currentWorkout.workout[2].squats == 0) {
      setSquatsDone(true);
    }
    if (workout == "burpees" || currentWorkout.workout[3].burpees == 0) {
      setBurpeesDone(true);
    }
    if (workout == "pullups" || currentWorkout.workout[4].pullups == 0) {
      setPullupsDone(true);
    }
  };

  const completeSetFunc = () => {
    if (
      pushupsDone == false ||
      situpsDone == false ||
      squatsDone == false ||
      burpeesDone == false ||
      pullupsDone == false
    ) {
      return;
    }
    if (currentSet == currentWorkout.sets) {
      setWorkoutDoneReducer(currentWorkout);
      return;
    }
    let updatedCurrentWorkout = currentWorkout;
    updatedCurrentWorkout.currentSet = currentSet + 1;
    saveCurrentWorkoutToStorage(updatedCurrentWorkout);

    setCurrentSet(() => currentSet + 1);
    if (currentWorkout.workout[0].pushups != 0) setPushupsDone(false); // sets button color back to unpushed
    if (currentWorkout.workout[1].situps != 0) setSitupsDone(false);
    if (currentWorkout.workout[2].squats != 0) setSquatsDone(false);
    if (currentWorkout.workout[3].burpees != 0) setBurpeesDone(false);
    if (currentWorkout.workout[4].pullups != 0) setPullupsDone(false);
  };

  let dayOfWeekName = dayOfTheWeek(currentWorkout.date);

  return (
    <SafeAreaView
      style={[
        styles.container,
        SafeViewAndroid.AndroidSafeArea,
        { flex: 1, backgroundColor: constants.mainDarkBG },
      ]}
    >
      <MyAppText style={{ fontSize: 24 }}>{dayOfWeekName} Workout</MyAppText>
      <View>
        <MyAppText style={{ fontSize: 24 }}>
          Set {currentSet} / {currentWorkout.sets}
        </MyAppText>
      </View>

      <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
        <View style={{width:"100%",justifyContent:'center'}}>
        {/* Pushup set */}
        {currentWorkout.workout[0].pushups != 0 ? (
          <Set
            accentColor={constants.mainLightBlue}
            data={currentWorkout.workout[0]}
            key={Object.keys(currentWorkout.workout[0])}
            name={Object.keys(currentWorkout.workout[0])[0]}
            currentSet={currentSet}
            setDone={pushupsDone}
            setSetDone={setRepsDone}
          />
        ) : (
          <Set
            accentColor={constants.mainLightBlue}
            data={currentWorkout.workout[0]}
            key={Object.keys(currentWorkout.workout[0])}
            name={Object.keys(currentWorkout.workout[0])[0]}
            currentSet={currentSet}
            setDone={pushupsDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />
        )}

        {/* Situps set */}
        {currentWorkout.workout[1].situps != 0 ? (
          <Set
            accentColor={constants.mainOrange}
            data={currentWorkout.workout[1]}
            key={Object.keys(currentWorkout.workout[1])}
            name={Object.keys(currentWorkout.workout[1])[0]}
            currentSet={currentSet}
            setDone={situpsDone}
            setSetDone={setRepsDone}
          />
        ) : (
          <Set
            accentColor={constants.mainOrange}
            data={currentWorkout.workout[1]}
            key={Object.keys(currentWorkout.workout[1])}
            name={Object.keys(currentWorkout.workout[1])[0]}
            currentSet={currentSet}
            setDone={situpsDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />
        )}

        {/* squats set */}

        {currentWorkout.workout[2].squats != 0 ? (
          <Set
            accentColor={constants.mainDarkBlue}
            data={currentWorkout.workout[2]}
            key={Object.keys(currentWorkout.workout[2])}
            name={Object.keys(currentWorkout.workout[2])[0]}
            currentSet={currentSet}
            setDone={squatsDone}
            setSetDone={setRepsDone}
          />
        ) : (
          <Set
            accentColor={constants.mainDarkBlue}
            data={currentWorkout.workout[2]}
            key={Object.keys(currentWorkout.workout[2])}
            name={Object.keys(currentWorkout.workout[2])[0]}
            currentSet={currentSet}
            setDone={squatsDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />
        )}

        {/* burpees set */}
        {currentWorkout.workout[3].burpees != 0 ? (
          <Set
            accentColor={constants.mainLightBlue}
            data={currentWorkout.workout[3]}
            key={Object.keys(currentWorkout.workout[3])}
            name={Object.keys(currentWorkout.workout[3])[0]}
            currentSet={currentSet}
            setDone={burpeesDone}
            setSetDone={setRepsDone}
          />
        ) : (
          <Set
            accentColor={constants.mainLightBlue}
            data={currentWorkout.workout[3]}
            key={Object.keys(currentWorkout.workout[3])}
            name={Object.keys(currentWorkout.workout[3])[0]}
            currentSet={currentSet}
            setDone={burpeesDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />
        )}

        {/* pullups set */}
        {currentWorkout.workout[4].pullups != 0 ? (
          <Set
            accentColor={constants.mainOrange}
            data={currentWorkout.workout[4]}
            key={Object.keys(currentWorkout.workout[4])}
            name={Object.keys(currentWorkout.workout[4])[0]}
            currentSet={currentSet}
            setDone={pullupsDone}
            setSetDone={setRepsDone}
          />
        ) : (
          <Set
            accentColor={constants.mainOrange}
            data={currentWorkout.workout[4]}
            key={Object.keys(currentWorkout.workout[4])}
            name={Object.keys(currentWorkout.workout[4])[0]}
            currentSet={currentSet}
            setDone={pullupsDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />
        )}
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
          style={[
            pushupsDone &&
            situpsDone &&
            squatsDone &&
            burpeesDone &&
            pullupsDone
              ? styles.completeSetDone
              : styles.completeSet,
          ]}
          onPress={completeSetFunc}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 32 }}>
            Complete Set
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
    alignItems: "center",
    // flex: 1,
    width: "100%",
  },
  set: {
    width: "100%",
    flex: 1,
  },
  textView: {
    width: "80%",
    backgroundColor: constants.grey,
  },
  textViewDone: {
    width: "80%",
    backgroundColor: constants.green,
  },
  completeSet: {
    width: 200,
    backgroundColor: constants.grey,
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    borderRadius:10
  },
  completeSetDone: {
    width: 200,
    backgroundColor: constants.mainLightBlue,
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    borderRadius:10
  },
  hidden: {
    display: "none",
  },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default CurrentWorkout;
