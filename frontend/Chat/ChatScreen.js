import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function ChatScreen({ route }) {
  const {conversation,socket,userId} =route.params
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const handleSend = () => {
    const send = async () => {
      const message = {
        conversationId: conversation._id,
        sender: userId,
        text: text,
      };
      const receiverId = conversation.members.find(
        (member) => member !== userId
      );
      // socket.current.emit("sendMessage", {
      //   senderId: userId,
      //   receiverId,
      //   text: text,
      // });
      await axios
        .post("http://192.168.0.101:8000/messages/", message)
        .then(async (res) => {
          setMessages([...messages, message]);
          setText("");
        });
    };
    send();
  };



  useEffect(() => {
    const data = async () => {
      await axios
        .get(
          "http://192.168.0.101:8000/messages/" + route.params.conversation._id
        )
        .then((res) => {
          setMessages(res.data);
        });
    };
    data();
  }, []);

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.messageList}>
        {messages &&
          messages.map((message, index) => (
            <View key={index} style={styles.message}>
              <Text>{message.text}</Text>
            </View>
          ))}
      </ScrollView>
      <KeyboardAvoidingView style={styles.inputContainer} behavior={"padding"}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    marginBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  message: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
