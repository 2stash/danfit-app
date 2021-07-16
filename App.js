import React,{useEffect, useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from "@expo/vector-icons";

import WorkoutsContext from "./src/context/workouts/workoutsContext";



import WorkoutsState from "./src/context/workouts/WorkoutsState";

import DanWod from "./src/screens/DanWod";
import CurrentWorkout from "./src/screens/CurrentWorkout";
import Profile from "./src/screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DwodStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="dwod" component={DanWod} options={{title:"WFH WOD"}}/>
      {/* <Stack.Screen name="currentWorkout" component={CurrentWorkout} /> */}
    </Stack.Navigator>
  )
}



function MyTabs() {
  const workoutContext = useContext(WorkoutsContext);

  const {
    getAsyncStoredWorkouts,
    getCurrentWorkoutFromStorage,
    appLoaded
  } = workoutContext;

  useEffect(() => {
    getAsyncStoredWorkouts();
    getCurrentWorkoutFromStorage();
  }, [appLoaded]);



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "dwod") {
            iconName = focused ? "barbell-outline" : "barbell-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-outline" : "person-outline";
          } else if (route.name === "Custom Workout") {
            iconName = focused ? "build-outline" : "build-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='dwod' component={DwodStack} options={{title:"DanFit"}}/>
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {




  return (
    <WorkoutsState>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>

    </WorkoutsState>
  );
}
