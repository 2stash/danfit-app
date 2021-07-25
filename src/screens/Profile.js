import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

import WorkoutsContext from "../context/workouts/workoutsContext";
import constants from "../utils/constants";
import { totalsCalculator } from "../utils/totalsCalculator";

const Profile = () => {
  const [toggle, setToggle] = useState(true);

  const workoutContext = useContext(WorkoutsContext);

  const { allCompletedWorkouts, appLoaded } = workoutContext;

  const toggleHandler = () => {
    setToggle((state) => !state);
  };

  if (appLoaded == false) {
    return (
      <View>
        <Text style={{ textAlign: "center" }}>Loading</Text>
      </View>
    );
  }

  const Total = () => {
    if (allCompletedWorkouts == undefined || allCompletedWorkouts.length == 0) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>
            Complete your first workout!
          </Text>
        </View>
      );
    }

    let totalPushups = 0;
    let totalSitups = 0;
    let totalSquats = 0;
    let totalBurpees = 0;
    let totalPullups = 0;
    for (let i = 0; i < allCompletedWorkouts.length; i++) {
      let setNum = allCompletedWorkouts[i].sets;
      totalPushups += allCompletedWorkouts[i].workout[0].pushups * setNum || 0;
      if (allCompletedWorkouts[i].workout.length > 1) {
        totalSitups += allCompletedWorkouts[i].workout[1].situps * setNum || 0;
        totalSquats += allCompletedWorkouts[i].workout[2].squats * setNum || 0;
        totalBurpees +=
          allCompletedWorkouts[i].workout[3].burpees * setNum || 0;
        totalPullups +=
          allCompletedWorkouts[i].workout[4].pullups * setNum || 0;
      }
    }

    return (
      <ScrollView style={{ marginTop: 25 }}>
        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>LifeTime Pushups</Text>
          <Text style={styles.repsText}>{totalPushups}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>LifeTime Situps</Text>
          <Text style={styles.repsText}>{totalSitups}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>LifeTime Squats</Text>
          <Text style={styles.repsText}>{totalSquats}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>LifeTime Burpees</Text>
          <Text style={styles.repsText}>{totalBurpees}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>LifeTime Pullups</Text>
          <Text style={styles.repsText}>{totalPullups}</Text>
        </View>
      </ScrollView>
    );
  };

  const WeeklyTotal = () => {
    if (allCompletedWorkouts == undefined || allCompletedWorkouts.length == 0) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>
            Complete your first workout!
          </Text>
        </View>
      );
    }
    let thisWeeksWorkouts = [];
    try {
      thisWeeksWorkouts = totalsCalculator(allCompletedWorkouts);
    } catch (error) {}

    if (thisWeeksWorkouts.length == 0) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>No workouts this week</Text>
        </View>
      );
    }

    let totalPushups = 0;
    let totalSitups = 0;
    let totalSquats = 0;
    let totalBurpees = 0;
    let totalPullups = 0;
    for (let i = 0; i < thisWeeksWorkouts.length; i++) {
      let setNum = thisWeeksWorkouts[i].sets;
      totalPushups += thisWeeksWorkouts[i].workout[0].pushups * setNum || 0;
      if (thisWeeksWorkouts[i].workout.length > 1) {
        totalSitups += thisWeeksWorkouts[i].workout[1].situps * setNum || 0;
        totalSquats += thisWeeksWorkouts[i].workout[2].squats * setNum || 0;
        totalBurpees += thisWeeksWorkouts[i].workout[3].burpees * setNum || 0;
        totalPullups += thisWeeksWorkouts[i].workout[4].pullups * setNum || 0;
      }
    }

    return (
      <ScrollView style={{ marginTop: 25 }}>
        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>Pushups:</Text>
          <Text style={styles.repsText}>{totalPushups}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>Situps:</Text>
          <Text style={styles.repsText}>{totalSitups}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>Squats</Text>
          <Text style={styles.repsText}>{totalSquats}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>Burpees</Text>
          <Text style={styles.repsText}>{totalBurpees}</Text>
        </View>

        <View style={styles.totalView}>
          <Text style={styles.exerciseText}>Pullups</Text>
          <Text style={styles.repsText}>{totalPullups}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:constants.background}}>
      <View>
        <Text style={{ fontSize: 28, textAlign: "center", marginTop: 10 }}>
          Totals
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={toggleHandler}
          disabled={toggle}
          style={[
            styles.buttons,
            toggle == true
              ? { backgroundColor: constants.green }
              : { backgroundColor: constants.grey },
          ]}
        >
          <Text style={styles.buttonText}>Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleHandler}
          disabled={!toggle}
          style={[
            styles.buttons,
            toggle == true
              ? { backgroundColor: constants.grey }
              : { backgroundColor: constants.green },
          ]}
        >
          <Text style={styles.buttonText}>LifeTime</Text>
        </TouchableOpacity>
      </View>

      <View>
        {toggle == true ? (
          <WeeklyTotal style={{ flex: 1 }} />
        ) : (
          <Total style={{ flex: 1 }} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 125,
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default Profile;
