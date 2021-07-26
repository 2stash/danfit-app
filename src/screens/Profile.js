import React, { useContext, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";
import SafeViewAndroid from "../components/SafeViewAndroid";
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
        <MyAppText style={{ textAlign: "center" }}>Loading</MyAppText>
      </View>
    );
  }

  const Total = () => {
    if (allCompletedWorkouts == undefined || allCompletedWorkouts.length == 0 || allCompletedWorkouts == null) {
      return (
        <View>
          <MyAppText style={{ textAlign: "center" }}>
            Complete your first workout!
          </MyAppText>
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
      <SafeAreaView style={{ marginTop: 15 }}>
      <ScrollView >
        <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}>
          <MyAppText style={styles.exerciseText}>Pushups:</MyAppText>
          <MyAppText style={styles.repsText}>{totalPushups}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Situps:</MyAppText>
          <MyAppText style={styles.repsText}>{totalSitups}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainDarkBlue}>
          <MyAppText style={styles.exerciseText}>Squats:</MyAppText>
          <MyAppText style={styles.repsText}>{totalSquats}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}>
          <MyAppText style={styles.exerciseText}>Burpees:</MyAppText>
          <MyAppText style={styles.repsText}>{totalBurpees}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Pullups:</MyAppText>
          <MyAppText style={styles.repsText}>{totalPullups}</MyAppText>
        </GreyBorder>
      </ScrollView>
      </SafeAreaView>
    );
  };

  const WeeklyTotal = () => {
    if (allCompletedWorkouts == undefined || allCompletedWorkouts.length == 0) {
      return (
        <View>
          <MyAppText style={{ textAlign: "center" }}>
            No Workouts this week!
          </MyAppText>
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
          <MyAppText style={{ textAlign: "center" }}>No workouts this week</MyAppText>
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
      <ScrollView style={{ marginTop: 15 }}>
        <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}>
          <MyAppText style={styles.exerciseText}>Pushups:</MyAppText>
          <MyAppText style={styles.repsText}>{totalPushups}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Situps:</MyAppText>
          <MyAppText style={styles.repsText}>{totalSitups}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainDarkBlue}>
          <MyAppText style={styles.exerciseText}>Squats:</MyAppText>
          <MyAppText style={styles.repsText}>{totalSquats}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainLightBlue}>
          <MyAppText style={styles.exerciseText}>Burpees:</MyAppText>
          <MyAppText style={styles.repsText}>{totalBurpees}</MyAppText>
        </GreyBorder>

        <GreyBorder style={styles.totalView} accentColor={constants.mainOrange}>
          <MyAppText style={styles.exerciseText}>Pullups:</MyAppText>
          <MyAppText style={styles.repsText}>{totalPullups}</MyAppText>
        </GreyBorder>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex:1,backgroundColor:constants.mainDarkBG}]}>
      <View>
        <MyAppText style={{ textAlign: "center", marginTop: 10 }}>
          Totals
        </MyAppText>
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

      <View style={{flex:1}}>
        {toggle == true ? (
          <WeeklyTotal />
        ) : (
          <Total />
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
    borderRadius:10
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default Profile;
