import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignUp from "./SignUp";
import Identification from "./Identification";
import HomePage from "./HomePage";
import Login from "./Login"

import Project from "./Project";
import Timetable from "./Timetable";
import Chat from "./Chat";
import PersonalInfo from "./PersonalInfo";
import NewTimeBlock from "./NewTimeBlock";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomePageTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Project" component={Project} />
        <Tab.Screen name="Timetable" component={TimetableStack} options={{headerShown: false}}/>
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Personal Information" component={PersonalInfo} />
      </Tab.Navigator>
    );
  }

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Identification" component={Identification} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomePageTabs" component={HomePageTabs} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TimetableStack(){
    return (
        <Stack.Navigator>
          <Stack.Screen name = "TimetableScreen" component={Timetable} options={{headerShown: false}}/>
          <Stack.Screen name = "New Time Block" component={NewTimeBlock}/>
        </Stack.Navigator>
    )
}



export default Navigation;