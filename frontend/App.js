import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./Chat";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Chat/>
        </NavigationContainer>
    );
}
