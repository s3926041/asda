import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const ConversationScreen = ({ navigation,  }) => {
  const [conversations, setConversation] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);
  const [otherName, setOtherName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleChatPress = (conversation) => {
    // console.log(socket)
    navigation.navigate("ChatScreen", {
      conversation: conversation,
      // socket: socket,
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const url = "http://192.168.0.101:8000/conversations/";
    const getData = async () => {
      const s = await AsyncStorage.getItem("currentID");
      await axios
        .get(url + s)
        .then((response) => {
          setConversation(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, [navigation, isFocused]);

  useEffect(() => {
    setOtherName([]);
    setLastMessage([]);
    conversations.map((conversation) => fetch(conversation));
  }, [conversations]);

  const fetch = async (conversation) => {
    const id = await AsyncStorage.getItem("currentID");
    const otherId =
      conversation.members[0] == id
        ? conversation.members[1]
        : conversation.members[0];
    const data = await axios.get(
      "http://192.168.0.101:8000/conversations/student/" + otherId
    );
    const data2 = await axios.get(
      "http://192.168.0.101:8000/messages/" + conversation._id
    );
    const name = data.data[0]?.name;
    setLastMessage((prevState) => ({
      ...prevState,
      [conversation._id]: data2.data[data2.data.length - 1]?.text,
    }));
    setOtherName((prevState) => ({ ...prevState, [conversation._id]: name }));
  };

  return (
    <ScrollView style={styles.container}>
      {conversations.map((conversation, i) => (
        <TouchableOpacity
          key={conversation._id}
          style={[styles.conversation]}
          onPress={() => handleChatPress(conversation)}
        >
          <Text style={styles.conversationName}>
            {" "}
            {otherName[conversation._id] || "Loading..."}
          </Text>
          <Text style={styles.conversationLastMessage}>
            {lastMessage[conversation._id] || "Loading..."}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  conversation: {
    borderColor: "#000",
    padding: 10,
    backgroundColor: "#2196F3",
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedConversation: {
    backgroundColor: "#e0e0e0",
  },
  conversationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  conversationLastMessage: {
    fontSize: 14,
  },
});

export default ConversationScreen;
