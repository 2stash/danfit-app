import React, { useContext, useState, useRef, useEffect } from "react";
import Constants from "expo-constants";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Switch,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import NotificationsContext from "../context/notifications/notificationsContext";

import MyAppText from "../components/MyAppText";
import GreyBorder from "../components/GreyBorder";
import SafeViewAndroid from "../components/SafeViewAndroid";
import constants from "../utils/constants";
import { timeFormater } from "../utils/timeFormater";
import { sortNotificationsByDate } from "../utils/sortNotificationsByDate";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationsScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [deleteButton, setDeleteButton] = useState(false);

  const notificationContext = useContext(NotificationsContext);

  const HeaderButton = () => {
    if (deleteButton == true) {
      return (
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: constants.mainOrange }]}
          onPress={editNotificationsHandler}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: constants.mainOrange }]}
          onPress={editNotificationsHandler}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      );
    }
  };

  const {
    loading,
    notifications,
    saveNotificationsToStorage,
    deleteNotificationsFromStorage,
    setNotifications,
    setPastNotificationsToOff
  } = notificationContext;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    let now = Date.now();
    if (date < now) {
      date.setDate(date.getDate() + 1);
      const identifier = await schedulePushNotification(date);
      let tempArray = notifications;
      tempArray.push({
        hour: date.getHours(),
        minute: date.getMinutes(),
        on: true,
        identifier: identifier,
        date:date
      });
      sortNotificationsByDate(tempArray);
      setNotifications(tempArray);
      saveNotificationsToStorage(tempArray);
    } else {
      try {
        const identifier = await schedulePushNotification(date);

        let tempArray = notifications;
        tempArray.push({
          hour: date.getHours(),
          minute: date.getMinutes(),
          on: true,
          identifier: identifier,
          date: now
        });
        sortNotificationsByDate(tempArray);
        setNotifications(tempArray);
        saveNotificationsToStorage(tempArray);
      } catch (error) {
        console.log(error);
      }
    }

    hideDatePicker();
  };

  const cancelNotificationHandler = async (notification) => {
    await Notifications.cancelScheduledNotificationAsync(
      notification.identifier
    );
    let tempArray = notifications;
    tempArray.map((item) => {
      if (item.identifier == notification.identifier) {
        item.on = false;
      }
    });
    setNotifications(tempArray);
    saveNotificationsToStorage(tempArray);
  };

  const switchToggleHandler = async (notification) => {
    if (notification.on == true) {
      cancelNotificationHandler(notification);
    } else {
      setNotificationHandler(notification);
    }
  };

  const setNotificationHandler = async (notification) => {
    let today = new Date();
    if (
      today.getHours() > notification.hour ||
      (today.getHours() == notification.hour &&
        today.getMinutes() >= notification.minute)
    ) {
      today.setHours(notification.hour, notification.minute);
      today.setDate(today.getDate() + 1);
      const identifier = await schedulePushNotification(today);
      let tempArray = notifications;

      tempArray.map((item) => {
        if (item.identifier == notification.identifier) {
          item.identifier = identifier;
          item.on = true;
          item.date=today
        }
      });
      setNotifications(tempArray);
      saveNotificationsToStorage(tempArray);
    } else {
      today.setHours(notification.hour, notification.minute);

      try {
        const identifier = await schedulePushNotification(today);

        let tempArray = notifications;

        tempArray.map((item) => {
          if (item.identifier == notification.identifier) {
            item.identifier = identifier;
            item.on = true;
            date=today
          }
        });
        setNotifications(tempArray);
        saveNotificationsToStorage(tempArray);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearRemindersHandler = () => {
    deleteNotificationsFromStorage();
  };

  const editNotificationsHandler = () => {
    setDeleteButton((status) => !status);
  };

  const deleteSelectedNotificationFromStorage = (notification) => {
    let tempArray = notifications;
    let filteredTempArray = tempArray.filter(
      (item) => item.identifier != notification.identifier
    );

    saveNotificationsToStorage(filteredTempArray);
    setNotifications(filteredTempArray);

    if (notification.on == true) {
      unschedulerReminder(notification);
    }
  };

  const unschedulerReminder = async (notification) => {
    await Notifications.cancelScheduledNotificationAsync(
      notification.identifier
    );
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=> {
    // setPastNotificationsToOff()
  },[])

  // useEffect(()=> {
  //   navigation.setOptions({
  //   headerLeft: () => (
  //     <HeaderButton/>
  //   )
  //   })
  // },[deleteButton])

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Ionicons
  //         name={"add-outline"}
  //         color={constants.green}
  //         size={32}
  //         onPress={showDatePicker}
  //         style={{marginRight:20}}
  //       />
  //     ),
  // });
  // }, [navigation]);

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, { flex: 1, backgroundColor: constants.mainDarkBG} ]}>
      {loading ? (
        <View>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              fontSize: 22,
            }}
          >
            No notifications
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center',marginTop:10 }}>
          <MyAppText>Reminders</MyAppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderButton />

            <TouchableOpacity
              style={[
                { backgroundColor: constants.mainLightBlue },
                styles.buttons,
              ]}
              onPress={showDatePicker}
            >
              <Text style={styles.buttonText}>
               Add
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ backgroundColor: constants.mainDarkBG }}>
            {notifications.map((notification, idx) => (
              <View
                key={notification.identifier}
                style={{
                  height: 75,
                  width: "100%",
                  backgroundColor: constants.mainGrey,
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "80%" }}>
                  <MyAppText style={{ fontSize: 28, marginLeft: 20 }}>
                    {timeFormater(notification.hour, notification.minute)}
                  </MyAppText>
                </View>
                {deleteButton ? (
                  <Button
                    title='Delete'
                    onPress={deleteSelectedNotificationFromStorage.bind(
                      this,
                      notification
                    )}
                  />
                ) : (
                  <Switch
                    onValueChange={switchToggleHandler.bind(this, notification)}
                    value={notification.on}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='time'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          style={{ backgroundColor: constants.grey }}
        />
      </View>
    </SafeAreaView>
  );
};

async function schedulePushNotification(today) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "DanFit",
      body:
        "Time to for your " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        " workout!",
      // data: { data: "goes here" },
    },
    trigger: {
      hour: today.getHours(),
      minute: today.getMinutes(),
      repeats: true,
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  buttons: {
    width: 125,
    height: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
  exerciseText: { textAlign: "center", fontSize: 28 },
  repsText: { textAlign: "center", fontSize: 28, marginLeft: 20 },
  totalView: { flexDirection: "row", justifyContent: "center" },
});

export default NotificationsScreen;
