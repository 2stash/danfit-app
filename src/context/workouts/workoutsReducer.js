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

export default (state, action) => {
  switch (action.type) {
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
        loading: false,
      };
    case START_WORKOUT:
      return {
        ...state,
        currentWorkout: action.payload,
        workoutInProcess: true,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_WORKOUT_DONE:
      return {
        ...state,
        workoutDone: true,
        completedWorkout: action.payload,
        allCompletedWorkouts: [action.payload, ...state.allCompletedWorkouts],
      };
    case GET_COMPLETED_WORKOUTS_FROM_STORAGE:
      return {
        ...state,
        loading: false,
        appLoaded: true,
        allCompletedWorkouts: action.payload,
      };
    case DISCARD_WORKOUT:
      return {
        ...state,
        workoutDone: false,
        completedWorkout: {},
        workoutInProcess: false,
        currentWorkout: {},
      };
    case SAVE_OLD_WORKOUT:
      return {
        ...state,
        workoutDone: false,
        completedWorkout: {},
        workoutInProcess: false,
        currentWorkout: {},
        allCompletedWorkouts: [action.payload, ...state.allCompletedWorkouts],
      };
    case LOAD_CURRENT_WORKOUT_FROM_STORAGE:
      return {
        ...state,
        workoutDone: false,
        completedWorkout: {},
        workoutInProcess: true,
        currentWorkout: action.payload,
        loading:false
      };
    case LEAVE_WORKOUT_DONE_SCREEN:
      return {
        ...state,
        workoutDone: false,
        completedWorkout: {},
        workoutInProcess: false,
        currentWorkout: {}
      }
    default:
      return state;
  }
};
