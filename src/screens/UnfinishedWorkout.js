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

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View
        style={{
          backgroundColor: constants.primary,
          width: "100%",
          borderRadius: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            You have an unsaved workout.
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            Let's save how much you did!
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            Here was your workout plan
          </Text>
        </View>
      </View>

      {/* <View
        style={{
          backgroundColor: "lightgreen",
          width: "100%",
          marginTop: 10,
          flexDirection: "row",
          height: 35,
        }}>
        <View style={{ width: "70%", borderWidth: 1, borderColor: "blue" }}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>Exercise</Text>
        </View>
        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 22 }}>Total</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}>
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Pushups</Text>
        </View>
        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[0].pushups}
          </Text>
        </View>
      </View>
 */}

<View
        style={{
          backgroundColor: constants.grey,
          width: "100%",
          marginTop: 10,
          flexDirection: "row",
          height: 35,
        }}
      >
        <View
          style={{
            width: "70%",
            borderWidth: 1,
            borderColor: constants.primary,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Exercise</Text>
        </View>
        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 22 }}>Total</Text>
        </View>
      </View>

      {/* pushups */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Pushups</Text>
        </View>

        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[0].pushups}
          </Text>
        </View>
      </View>

      {/* situps */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Situps</Text>
        </View>

        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[1].situps}
          </Text>
        </View>
      </View>

      {/* squats */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Squats</Text>
        </View>

        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[2].squats}
          </Text>
        </View>
      </View>

      {/* burpees */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Burpees</Text>
        </View>

        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[3].burpees}
          </Text>
        </View>
      </View>

      {/* pullups */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 50,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "70%",
            borderColor: "blue",
            justifyContent: "center",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>Pullups</Text>
        </View>

        <View
          style={{
            width: "30%",
            borderColor: "blue",
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {currentWorkout.sets * currentWorkout.workout[4].pullups}
          </Text>
        </View>
      </View>


      <View style={{flex:1, flexDirection: 'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={discardWorkout} style={{width:'45%', backgroundColor:'red', marginTop:10, height:50, borderRadius:10, overflow:'hidden' }}>
          <View style={{height:50, alignContent:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center', color:'white'}}>Discard Workout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveWorkout} style={{width:'45%', backgroundColor: constants.green, marginTop:10, borderRadius:10, overflow:'hidden'}}>
          <View style={{height:50, alignContent:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center', color:'white'}}>Save Workout</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
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
  },
});

export default UnfinishedWorkout;
