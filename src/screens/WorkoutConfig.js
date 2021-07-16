import React, { useContext, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";

import WorkoutsContext from "../context/workouts/workoutsContext";

const WorkoutConfig = ({navigation}) => {
  const workoutContext = useContext(WorkoutsContext);

  const { workouts, getWorkouts, loading, setCurrentWorkout, currentWorkout } =
    workoutContext;

  const [sets, setSets] = useState(1);

  const selectWorkout = (selectedWorkout) => {
    selectedWorkout[sets] = sets;
    setCurrentWorkout(selectedWorkout);
    navigation.pop("workoutConfig")
    navigation.navigate("currentWorkout");
  };

  const increaseSets = () => {
    setSets(() => sets + 1);
  };

  const decreaseSets = () => {
    if(sets <= 1) {
      setSets(()=> 1)
      return
    }
    setSets(() => sets -1)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{currentWorkout.id}</Text>
        </View>
        <View>
          <Text>How many sets?</Text>
          <View>
            <Text>{sets}</Text>
            <Button title='+' onPress={increaseSets} />
            <Button title='-' onPress={decreaseSets}/>
          </View>
        </View>

        {currentWorkout.workout.map((workout) => {
          let itemKey = "config" + currentWorkout.id + Object.keys(workout)[0];
          return (
            <View style={styles.card} key={itemKey}>
              <Text  style={styles.cardText}>
                {workout[Object.keys(workout)[0]]} {Object.keys(workout)[0]}
              </Text>
              <Text style={styles.cardText}>x {sets} =</Text>
              <Text style={styles.cardText}>{sets * workout[Object.keys(workout)[0]] } reps</Text>
            </View>
          );
        })}
        <View>
          <Button
            title='Select Workout'
            onPress={selectWorkout.bind(this, currentWorkout)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    width: "90%",
    backgroundColor: "#f5f5f5",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    backgroundColor: "grey",
  },
  card: {
    // flex:1,
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "pink",
  },
  cardText: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default WorkoutConfig;
