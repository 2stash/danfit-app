import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: constants.primary,
          width: "100%",
          borderRadius: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            {dayOfWeekName} WFH WOD
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            Completed!!!
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
            Congratulations
          </Text>
        </View>
      </View>

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
            {completedWorkout.sets * completedWorkout.workout[0].pushups}
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
            {completedWorkout.sets * completedWorkout.workout[1].situps}
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
            {completedWorkout.sets * completedWorkout.workout[2].squats}
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
            {completedWorkout.sets * completedWorkout.workout[3].burpees}
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
            {completedWorkout.sets * completedWorkout.workout[4].pullups}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={backToCreateWorkout}
        style={styles.completeSetDone}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 24 }}>
          Create Another Workout
        </Text>
      </TouchableOpacity>
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
  completeSetDone: {
    width: "100%",
    backgroundColor: constants.green,
    height: 40,
    marginTop: 10,
    justifyContent: "center",
  },
});

export default WorkoutDone;
