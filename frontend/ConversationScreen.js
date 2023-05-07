import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { io } from "socket.io-client";

const ConversationScreen = ({ navigation }) => {
  const url = 'http://192.168.0.101:8000'
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket = useRef();
  // const { user } = useContext(AuthContext);
  // const scrollRef = useRef();
  const conversations = [
    {
      id: 1,
      name: "Hieu Le",
      lastMessage: "Hey, what's up?",
      messages: [
        {
          id: 1,
          text: "Hey, what's up?",
          sentBy: "me",
          timestamp: "2022-05-02T12:30:00Z",
        },
        {
          id: 2,
          text: "Not much, how about you?",
          sentBy: "Hieu Le",
          timestamp: "2022-05-02T12:31:00Z",
        },
        // more messages...
      ],
    },
    {
      id: 2,
      name: "Nam Pham",
      lastMessage: "Can we meet tomorrow?",
      messages: [
        {
          id: 1,
          text: "Can we meet tomorrow?",
          sentBy: "Nam Pham",
          timestamp: "2022-05-03T15:00:00Z",
        },
        {
          id: 2,
          text: "Sure, what time works for you?",
          sentBy: "me",
          timestamp: "2022-05-03T15:01:00Z",
        },
        // more messages...
      ],
    },
    {
      id: 3,
      name: "Cong Thinh",
      lastMessage: "See you tonight!",
      messages: [
        {
          id: 1,
          text: "See you tonight!",
          sentBy: "Cong Thinh",
          timestamp: "2022-05-04T18:00:00Z",
        },
        {
          id: 2,
          text: "Looking forward to it!",
          sentBy: "me",
          timestamp: "2022-05-04T18:01:00Z",
        },
        // more messages...
      ],
    },
  ];
  useEffect(() => {
    const getData = async () => {
      axios
        .get( url+ "/students")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, []);

  const handleChatPress = (conversation) => {
    navigation.navigate("ChatScreen", { conversation: conversation });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{JSON.stringify(messages)}</Text>
      {conversations.map((conversation) => (
        <TouchableOpacity
          key={conversation.id}
          style={[styles.conversation]}
          onPress={() => handleChatPress(conversation)}
        >
          <Text style={styles.conversationName}>{conversation.name}</Text>
          <Text style={styles.conversationLastMessage}>
            {conversation.lastMessage}
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
    backgroundColor: "#f5f5f5",
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
