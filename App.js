import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import WorkoutsContext from "./src/context/workouts/workoutsContext";
import NotificationsContext from "./src/context/notifications/notificationsContext";

import WorkoutsState from "./src/context/workouts/WorkoutsState";

import NotificationsState from "./src/context/notifications/NotificationsState";

import constants from './src/utils/constants'

import DanWod from "./src/screens/DanWod";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import Profile from "./src/screens/Profile";
import { color } from "react-native-reanimated";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DwodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='dwod' component={DanWod} options={{ title: "" }} />
    </Stack.Navigator>
  );
};

const ReminderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{ title: "Reminders", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

function MyTabs() {
  const workoutContext = useContext(WorkoutsContext);

  const notificationContext = useContext(NotificationsContext);
  const {
    loading,
    notifications,
    saveNotificationsToStorage,
    getAsyncStoredNotifications,
  } = notificationContext;

  const { getAsyncStoredWorkouts, getCurrentWorkoutFromStorage, appLoaded, deleteStorage } =
    workoutContext;

  useEffect(() => {
    getAsyncStoredWorkouts();
    getCurrentWorkoutFromStorage();
    getAsyncStoredNotifications();
  }, [appLoaded]);

  return (
    <Tab.Navigator
      tabBarOptions= {{
          style: { 
            height: 65, 
            backgroundColor: constants.mainDarkBG, borderTopWidth:0 ,
            // backgroundColor: 'transparent',
            // position: 'absolute',
            // left: 0,
            // right: 0,
            // bottom: 0,
            // elevation: 0,
          
          },
          // tabBarLabel:() => {return null},
          showLabel:false
        }}        
    >
      <Tab.Screen
        name='dwod'
        component={DwodStack}
        options={{
          tabBarIcon:({focused}) => (
            <View
            style={{
              backgroundColor: focused ? constants.mainTextColor: constants.mainDarkBG,
              height: 60,
              width: 60,
              borderRadius:30,
              justifyContent: "center",
              alignItems: "center",
              borderColor:constants.mainLightBlue,
              borderWidth:2
            }}
          >
            <Ionicons name={focused ? "barbell-sharp":"barbell-outline"} size={focused ? 32 : 24} color={constants.mainLightBlue}
            
            />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={ReminderStack}
        options={{
          tabBarIcon:({focused}) => (
            <View
            style={{
              backgroundColor: focused ? constants.mainTextColor: constants.mainDarkBG,
              height: 60,
              width: 60,
              borderRadius:30,
              justifyContent: "center",
              alignItems: "center",
              borderColor:constants.mainOrange,
              borderWidth:2
            }}
          >
            <Ionicons name={focused ? "alarm":"alarm-outline"} size={focused ? 32 : 24} color={constants.mainOrange} />
            </View>
          )
        }}


      />
      <Tab.Screen name='Profile' component={Profile}
         options={{
          tabBarIcon:({focused}) => (
            <View
            style={{
              backgroundColor: focused ? constants.mainTextColor: constants.mainDarkBG,
              height: 60,
              width: 60,
              borderRadius:30,
              justifyContent: "center",
              alignItems: "center",
              borderColor:constants.mainDarkBlue,
              borderWidth:2
            }}
          >
            <Ionicons name={focused ? "person":"person-outline"} size={focused ? 32 : 24} color={constants.mainDarkBlue} />
            </View>
          )
        }}
        />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <WorkoutsState>
      <NotificationsState>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </NotificationsState>
    </WorkoutsState>
  );
}
