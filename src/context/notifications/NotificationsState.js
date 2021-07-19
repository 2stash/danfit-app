import React, { useReducer } from "react";
import NotificationsReducer from "./notificationsReducer";
import NotificationsContext from "./notificationsContext";

import {
  GET_NOTIFICATIONS,
  SAVE_NOTIFICATIONS,
  SET_LOADING,
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATIONS,
} from "../types";

import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationsState = (props) => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(NotificationsReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getAsyncStoredNotifications = async () => {
    setLoading();

    try {
      const jsonValue = await AsyncStorage.getItem("@DanFit_notifications");
      if (jsonValue != null) {
        dispatch({
          type: GET_NOTIFICATIONS,
          payload: JSON.parse(jsonValue),
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const saveNotificationsToStorage = async (notifications) => {
    try {
      const jsonValue = JSON.stringify(notifications);
      await AsyncStorage.setItem("@DanFit_notifications", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNotificationsFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("@DanFit_notifications");
      dispatch({ type: CLEAR_NOTIFICATIONS });
    } catch (e) {
      console.log(e);
    }
  };

  const setNotifications = (notifications) => {
    dispatch({ type: SET_NOTIFICATIONS, payload: notifications });
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications: state.notifications,
        loading: state.loading,
        getAsyncStoredNotifications,
        saveNotificationsToStorage,
        deleteNotificationsFromStorage,
        setNotifications
      }}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsState;