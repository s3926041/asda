import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Chat from "./Chat/Chat";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const method = async () => {
      const ar = ["643a6c00e717a5ceb8ee4335","642defd68135b08d03c99789","644e48c0fa008b2d44458dd0","645a15cd0eea7af2d3b5064f"]
      const id = ar[Math.floor(Math.random()*ar.length)];
      await AsyncStorage.setItem("currentID", id);
      const a = await AsyncStorage.getItem("currentID");
      console.log(id)
    };
    method();
  }, []);
  return (
    <NavigationContainer>
      <Chat />
    </NavigationContainer>
  );
}
