import { GET_NOTIFICATIONS, SAVE_NOTIFICATIONS, SET_LOADING, CLEAR_NOTIFICATIONS,SET_NOTIFICATIONS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case SAVE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        loading:false,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading:false,
      }
    default:
      return state;
  }
};
