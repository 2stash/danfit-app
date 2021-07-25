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

  const { getAsyncStoredWorkouts, getCurrentWorkoutFromStorage, appLoaded } =
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
            height: 85, 
            backgroundColor: constants.background, borderTopWidth:0 ,
            // backgroundColor: 'transparent',
            // position: 'absolute',
            // left: 0,
            // right: 0,
            // bottom: 0,
            // elevation: 0,
          
          },
          tabBarLabel:() => {return null},
          showLabel:false
        }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "dwod") {
            iconName = focused ? "barbell-outline" : "barbell-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "alarm-outline" : "alarm-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-outline" : "person-outline";
          }
          return (
            <View
              style={{
                backgroundColor: "white",
                height: 50,
                width: 50,
                borderRadius:25,
                justifyContent: "center",
                alignItems: "center",
                borderColor:color,
                borderWidth:2
                // marginBottom: 15,
              }}
            >
              <Ionicons name={iconName} size={size} color={color} />
              </View>
          );
        },
        
      })}
    >
      <Tab.Screen
        name='dwod'
        component={DwodStack}
        
      />
      <Tab.Screen
        name='Notifications'
        component={ReminderStack}
        
      />
      <Tab.Screen name='Profile' component={Profile}      />
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
