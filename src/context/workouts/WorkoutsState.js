import React, { useReducer } from "react";
import WorkoutsReducer from "./workoutsReducer";
import WorksoutsContext from "./workoutsContext";
import DATA from "./workoutsData";

import {
  GET_WORKOUTS,
  START_WORKOUT,
  SET_LOADING,
  SET_WORKOUT_DONE,
  GET_COMPLETED_WORKOUTS_FROM_STORAGE,
  DISCARD_WORKOUT,
  SAVE_OLD_WORKOUT,
  LOAD_CURRENT_WORKOUT_FROM_STORAGE,
  LEAVE_WORKOUT_DONE_SCREEN
  
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutsState = (props) => {
  const initialState = {
    workouts: [],
    currentWorkout: {},
    workoutInProcess: false,
    workoutDone: false,
    completedWorkout: {},
    allCompletedWorkouts: [],
    loading: false,
    appLoaded: false,
  };

  const [state, dispatch] = useReducer(WorkoutsReducer, initialState);

  const deleteCurrentWorkoutFromStorage = async () => {
       try {
        await AsyncStorage.removeItem('WFH-current-workout')
      } catch(e) {
        // remove error
      }
  }

  const setCurrentWorkout = (workout) => {
    setLoading();
    dispatch({ type: START_WORKOUT, payload: workout });
  };

  const getWorkouts = () => {
    setLoading();
    dispatch({ type: GET_WORKOUTS, payload: DATA });
  };

  const setWorkoutDoneReducer = (workout) => {
    setLoading();
    dispatch({ type: SET_WORKOUT_DONE, payload: workout });
    let newCompletedWorkoutData = [workout, ...state.allCompletedWorkouts];
    deleteCurrentWorkoutFromStorage();
    saveWorkouts(newCompletedWorkoutData);
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const saveWorkouts = async (oldWorkouts) => {
    try {
      const jsonValue = JSON.stringify(oldWorkouts);
      await AsyncStorage.setItem("@DanFit_workouts", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getAsyncStoredWorkouts = async () => {
    setLoading();

    try {
      const newStorage = await AsyncStorage.getItem("@DanFit_workouts")

      if (newStorage != null) {
        dispatch({
          type: GET_COMPLETED_WORKOUTS_FROM_STORAGE,
          payload: JSON.parse(newStorage),
        });
      }

    } catch (e) {
      // error reading value
      console.log(e);
    }

    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
 
      if (jsonValue != null) {
        dispatch({
          type: GET_COMPLETED_WORKOUTS_FROM_STORAGE,
          payload: JSON.parse(jsonValue),
        });
        await AsyncStorage.setItem("@DanFit_workouts", jsonValue);
        AsyncStorage.removeItem("@storage_Key")
      }

    } catch (e) {
      // error reading value
      console.log(e);
    }

  

  };

  const discardWorkoutReducer = () => {
    deleteCurrentWorkoutFromStorage();
    dispatch({ type: DISCARD_WORKOUT });
  };

  const deleteStorage = () => {
    AsyncStorage.removeItem("@DanFit_workouts");
  }

  const saveOldWorkoutsReducer = () => {
    let temp = state.currentWorkout
    let newCompletedWorkoutData = [temp, ...state.allCompletedWorkouts];
    saveWorkouts(newCompletedWorkoutData);
    dispatch({type: SAVE_OLD_WORKOUT, payload: temp})
    deleteCurrentWorkoutFromStorage();
  }

  const getAsyncStoredWorkoutsAfterSave = async () => {
    setLoading();

    try {
      const jsonValue = await AsyncStorage.getItem("@DanFit_workouts");

      if (jsonValue != null) {
        dispatch({
          type: GET_COMPLETED_WORKOUTS_FROM_STORAGE,
          payload: JSON.parse(jsonValue),
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getCurrentWorkoutFromStorage = async () => {
    setLoading();

    try {
      const jsonValue = await AsyncStorage.getItem("WFH-current-workout");

      if (jsonValue != null) {
        let object = JSON.parse(jsonValue)
        object.date = new Date(object.date)
        dispatch({
          type: LOAD_CURRENT_WORKOUT_FROM_STORAGE,
          payload: object,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  const saveCurrentWorkoutToStorage = async (currentWorkout) => {
    try {
      const jsonValue = JSON.stringify(currentWorkout);
      await AsyncStorage.setItem("WFH-current-workout", jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  const leaveWorkoutDoneScreen = () => {
    deleteCurrentWorkoutFromStorage();
    dispatch({type: LEAVE_WORKOUT_DONE_SCREEN});
  }

  return (
    <WorksoutsContext.Provider
      value={{
        workouts: state.workouts,
        currentWorkout: state.currentWorkout,
        workoutInProcess: state.workoutInProcess,
        workoutDone: state.workoutDone,
        completedWorkout: state.completedWorkout,
        allCompletedWorkouts: state.allCompletedWorkouts,
        getWorkouts,
        setCurrentWorkout,
        setLoading,
        setWorkoutDoneReducer,
        getAsyncStoredWorkouts,
        saveWorkouts,
        discardWorkoutReducer,
        saveOldWorkoutsReducer,
        getAsyncStoredWorkoutsAfterSave,
        getCurrentWorkoutFromStorage,
        saveCurrentWorkoutToStorage,
        leaveWorkoutDoneScreen,
        deleteStorage
      }}
    >
      {props.children}
    </WorksoutsContext.Provider>
  );
};

export default WorkoutsState;
