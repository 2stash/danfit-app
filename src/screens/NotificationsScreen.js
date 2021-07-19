import React, { useContext, useState, useRef, useEffect } from "react";
import Constants from "expo-constants";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Switch
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import NotificationsContext from "../context/notifications/notificationsContext";

import constants from "../utils/constants";

import { dayOfTheWeek } from "../utils/dayOfTheWeek";

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

  const [deleteButton, setDeleteButton] = useState(false)
  const [deletionInProcess, setDeletionInProcess] = useState(false)

  const notificationContext = useContext(NotificationsContext);

  const HeaderButton = () => {
    if(deleteButton == true){
       return (<TouchableOpacity style={{marginLeft:25}} onPress={editNotificationsHandler}><Text style={{fontSize:20,color:constants.darkblue}}>Done</Text></TouchableOpacity>)
    } else {
      return (<TouchableOpacity style={{marginLeft:25}} onPress={editNotificationsHandler}><Text style={{fontSize:20,color:constants.darkblue}}>Edit</Text></TouchableOpacity>)
    }

  }

  const {
    loading,
    notifications,
    saveNotificationsToStorage,
    getAsyncStoredNotifications,
    deleteNotificationsFromStorage,
    setNotifications
  } = notificationContext;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    console.log("A date has been picked: ", date);
    try {
      const identifier = await schedulePushNotification(date);

      let tempArray = notifications;
      tempArray.push({
        hour: date.getHours(),
        minute: date.getMinutes(),
        on: true,
        identifier: identifier,
      });
      setNotifications(tempArray)
      saveNotificationsToStorage(tempArray);
      console.log(tempArray);
      console.log(identifier)
    } catch (error) {
      console.log(error);
    }
    hideDatePicker();
  };

  const cancelNotificationHandler = async (notification) => {
    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    let tempArray = notifications;
    tempArray.map((item) => {
      if(item.identifier == notification.identifier){
        item.on = false
      }
    })
    setNotifications(tempArray)
    saveNotificationsToStorage(tempArray)
  };

  const switchToggleHandler = async (notification) => {
    if(notification.on == true){
      console.log(notification)
      console.log("cancelNotificationHandler")
      cancelNotificationHandler(notification)
    } else{
      console.log("setNotificationHandler")
      setNotificationHandler(notification)
    } 
  };

  const setNotificationHandler = async(notification) => {
    let today = new Date();

    console.log(notification.hour, " " , today.getHours())
    if(today.getHours() > notification.hour){
      return;
    } else if(today.getHours() == notification.hour && today.getMinutes() >= notification.minute){
      return
    }
    today.setHours(notification.hour, notification.minute)
    console.log('today ', today)
    try {
      const identifier = await schedulePushNotification(today);

      let tempArray = notifications;

      tempArray.map((item)=> {
        if(item.identifier == notification.identifier){
          item.identifier = identifier
          item.on = true
        }
      })
      setNotifications(tempArray)
      saveNotificationsToStorage(tempArray);
      console.log(tempArray);
      console.log(identifier)
    } catch (error) {
      console.log(error);
    }
  }

  const clearRemindersHandler = () => {
    deleteNotificationsFromStorage();
  };

  const editNotificationsHandler = () => {
    console.log("editNotificationsHandler")
    setDeleteButton((status)=> !status)

  }

  const deleteSelectedNotificationFromStorage = (notification) => {
    let tempArray = notifications;
    console.log(tempArray , " Temp array")
    let filteredTempArray = tempArray.filter((item)=> item.identifier != notification.identifier )
    console.log(filteredTempArray, " filtered temp array")
    setNotifications(filteredTempArray)
    saveNotificationsToStorage(filteredTempArray);
  }


  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=> {
    navigation.setOptions({
    headerLeft: () => (
      <HeaderButton/>
    )
    })
  },[deleteButton])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={"add-outline"}
          color={constants.green}
          size={32}
          onPress={showDatePicker}
          style={{marginRight:20}}
        />
      ),
  });
  }, [navigation]);

  return (
    <View>
      {loading ? (
        <View>
          <Text>loading notifications</Text>
        </View>
      ) : (
        notifications.map((notification, idx) => (
          <View key={notification.identifier} style={{height:75,width:"100%", backgroundColor:constants.grey,borderBottomWidth:1, flexDirection:'row', alignItems:'center'}}>
            <View style={{width:'80%'}}>
            <Text style={{fontSize:28, marginLeft:20}}>
              {notification.hour}:{notification.minute} 
            </Text>
            </View>
            {deleteButton ? (<Button title="Delete" onPress={deleteSelectedNotificationFromStorage.bind(this,notification)}/>) : (<Switch onValueChange={switchToggleHandler.bind(this, notification)} value={notification.on}/>)

            }
            
          </View>
        ))
      )}

      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='time'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <TouchableOpacity onPress={clearRemindersHandler}>
        <Text>Clear Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

async function schedulePushNotification(today) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "DanFit",
      body: "Time to workout!" + today,
      data: { data: "goes here" },
    },
    trigger: today,
  });
}

// function schedulePushNotification(today) {
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: "Here is the notification body",
//       data: { data: "goes here" },
//     },
//     trigger: today,
//   });
// }

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
    console.log(token);
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

export default NotificationsScreen;
