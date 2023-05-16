import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationScreen from "./ConversationScreen";
import ChatScreen from "./ChatScreen";
import NewConversationScreen from "./NewConversationScreen";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();
export default Chat = () => {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.0.101:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    const getID = async () => {
      const id = await AsyncStorage.getItem("currentID");
      setUserId(id);
    };
    getID();
  }, []);
useEffect(()=>{
  socket.current.emit("addUser", userId);
},[userId])
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  console.log(userId);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="ConversationScreen"
        screenOptions={({ navigation, socket, userId }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ConversationScreen")}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="ios-arrow-back" size={32} color="blue" />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
          options={({ navigation }) => ({
            title: "Conversations",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("NewConversation")}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="ios-add" size={32} color="blue" />
              </TouchableOpacity>
            ),
          })}
          initialParams={{ socket }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.conversation._id,
          })}
          initialParams={{ socket }}
        />
        <Stack.Screen
          name="NewConversation"
          component={NewConversationScreen}
          options={{
            title: "New Conversation",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

