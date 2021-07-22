import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import WorkoutsContext from "../context/workouts/workoutsContext";
import {totalsCalculator} from "../utils/totalsCalculator"

const Profile = () => {
  const workoutContext = useContext(WorkoutsContext);

  const { allCompletedWorkouts, appLoaded } = workoutContext;

  if (appLoaded == false) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const Total = () => {
    if (allCompletedWorkouts == undefined) {
      return (
        <View>
          <Text>Loading</Text>
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

    let currentWeekCompletedWorkouts = totalsCalculator(allCompletedWorkouts);

    return (
      <View style={{ marginTop: 25 }}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          LifeTime Pushups
        </Text>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 15 }}>
          {totalPushups}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 24 }}>
          LifeTime Situps
        </Text>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 15 }}>
          {totalSitups}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 24 }}>
          LifeTime Squats
        </Text>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 15 }}>
          {totalSquats}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 24 }}>
          LifeTime Burpees
        </Text>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 15 }}>
          {totalBurpees}
        </Text>

        <Text style={{ textAlign: "center", fontSize: 24 }}>
          LifeTime Pullups
        </Text>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 15 }}>
          {totalPullups}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {allCompletedWorkouts != undefined ? (
        <Total />
      ) : (
        <View>
          <Text>Loading data</Text>
        </View>
      )}
    </View>
  );
};

export default Profile;
