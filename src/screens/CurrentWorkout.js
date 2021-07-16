import React, { useContext, useState } from "react";
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

import { dayOfTheWeek } from "../utils/dayOfTheWeek";
import constants from "../utils/constants";

const Set = (props) => {
  return (
    <View style={[props.zeroReps == true ? styles.hidden :styles.setContainer]}>
      <TouchableOpacity
        style={styles.set}
        onPress={props.setSetDone.bind(this, props.name)}
      >
        <View style={[props.setDone ? styles.textViewDone : styles.textView]}>
          <Text style={{ fontSize: 24, padding: 10 }}>{props.name}</Text>
        </View>
        <View style={{ backgroundColor: "lightblue", width: "20%" }}>
          <Text style={{ fontSize: 24, padding: 10, textAlign: "center" }}>
            {props.data[props.name]}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CurrentWorkout = () => {
  const workoutContext = useContext(WorkoutsContext);

  const {
    workouts,
    getWorkouts,
    loading,
    setCurrentWorkout,
    currentWorkout,
    workoutInProcess,
    setWorkoutDoneReducer,
    saveCurrentWorkoutToStorage,
  } = workoutContext;

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
    if (workout == "burpees" || currentWorkout.workout[3].burpees == 0 ) {
      setBurpeesDone(true);
    }
    if (workout == "pullups" || currentWorkout.workout[4].pullups == 0  ) {
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
    if(currentWorkout.workout[0].pushups != 0) setPushupsDone(false); // sets button color back to unpushed
    if(currentWorkout.workout[1].situps != 0 )setSitupsDone(false);
    if(currentWorkout.workout[2].squats != 0) setSquatsDone(false);
    if(currentWorkout.workout[3].burpees != 0) setBurpeesDone(false);
    if(currentWorkout.workout[4].pullups != 0) setPullupsDone(false);
  };

  let dayOfWeekName = dayOfTheWeek(currentWorkout.date);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{dayOfWeekName}</Text>
      <Text style={{ fontSize: 24 }}>CurrentWorkout</Text>
      <View>
        <Text style={{ fontSize: 24 }}>
          Set {currentSet} / {currentWorkout.sets}
        </Text>
      </View>

      <ScrollView>
        {/* Pushup set */}
        {currentWorkout.workout[0].pushups != 0 ? 
        (       <Set
          data={currentWorkout.workout[0]}
          key={Object.keys(currentWorkout.workout[0])}
          name={Object.keys(currentWorkout.workout[0])[0]}
          currentSet={currentSet}
          setDone={pushupsDone}
          setSetDone={setRepsDone}
        />) :    <Set
          data={currentWorkout.workout[0]}
          key={Object.keys(currentWorkout.workout[0])}
          name={Object.keys(currentWorkout.workout[0])[0]}
          currentSet={currentSet}
          setDone={pushupsDone}
          setSetDone={setRepsDone}
          zeroReps={true}
        />
      }
 

        {/* Situps set */}
        {currentWorkout.workout[1].situps != 0 ? 
        (        <Set
          data={currentWorkout.workout[1]}
          key={Object.keys(currentWorkout.workout[1])}
          name={Object.keys(currentWorkout.workout[1])}
          currentSet={currentSet}
          setDone={situpsDone}
          setSetDone={setRepsDone}
        />) :
        (        <Set
          data={currentWorkout.workout[1]}
          key={Object.keys(currentWorkout.workout[1])}
          name={Object.keys(currentWorkout.workout[1])}
          currentSet={currentSet}
          setDone={situpsDone}
          setSetDone={setRepsDone}
          zeroReps={true}
        />)  
      }


        {/* squats set */}

        {currentWorkout.workout[2].squats != 0 ?
        (        <Set
          data={currentWorkout.workout[2]}
          key={Object.keys(currentWorkout.workout[2])}
          name={Object.keys(currentWorkout.workout[2])}
          currentSet={currentSet}
          setDone={squatsDone}
          setSetDone={setRepsDone}
        />) :
        (<Set
          data={currentWorkout.workout[2]}
          key={Object.keys(currentWorkout.workout[2])}
          name={Object.keys(currentWorkout.workout[2])}
          currentSet={currentSet}
          setDone={squatsDone}
          setSetDone={setRepsDone}
          zeroReps={true}
        />)

        }


        {/* burpees set */}
        {currentWorkout.workout[3].burpees != 0 ?
          ( <Set
            data={currentWorkout.workout[3]}
            key={Object.keys(currentWorkout.workout[3])}
            name={Object.keys(currentWorkout.workout[3])}
            currentSet={currentSet}
            setDone={burpeesDone}
            setSetDone={setRepsDone}
          />) :
          ( <Set
            data={currentWorkout.workout[3]}
            key={Object.keys(currentWorkout.workout[3])}
            name={Object.keys(currentWorkout.workout[3])}
            currentSet={currentSet}
            setDone={burpeesDone}
            setSetDone={setRepsDone}
            zeroReps={true}
          />)

        }
       

        {/* pullups set */}
        {currentWorkout.workout[4].pullups != 0 ?
        (        <Set
          data={currentWorkout.workout[4]}
          key={Object.keys(currentWorkout.workout[4])}
          name={Object.keys(currentWorkout.workout[4])}
          currentSet={currentSet}
          setDone={pullupsDone}
          setSetDone={setRepsDone}
        />) :
        (<Set
          data={currentWorkout.workout[4]}
          key={Object.keys(currentWorkout.workout[4])}
          name={Object.keys(currentWorkout.workout[4])}
          currentSet={currentSet}
          setDone={pullupsDone}
          setSetDone={setRepsDone}
          zeroReps={true}
        />)  
      }


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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "blue",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: constants.backgroundColor,
    height: "100%",
  },
  set: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: constants.grey,
    flex: 1
  },
  setContainer: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
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
    width: "100%",
    backgroundColor: constants.grey,
    height: 60,
    marginTop: 20,
    justifyContent: "center",
  },
  completeSetDone: {
    width: "100%",
    backgroundColor: constants.green,
    height: 60,
    marginTop: 20,
    justifyContent: "center",
  },
  hidden:{
    display:'none'
  }
});

export default CurrentWorkout;
