import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NewConversationScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          "http://192.168.0.101:8000/conversations/available/" +
            (await AsyncStorage.getItem("currentID"))
        )
        .then((res) => {
          setFriends(res.data);

          console.log("first");
        });
    };
    getData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}></View>
      {friends.length !== 0 &&
        friends.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={async () => {
                const id = await AsyncStorage.getItem("currentID");
                console.log(id);
                console.log(v._id);
                await axios.post("http://192.168.0.101:8000/conversations/", {
                  senderId: id,
                  receiverId: v._id,
                });
                navigation.navigate("ChatScreen", {
                  conversation: { name: v.name },
                  convo: v,
                });
              }}
            >
              <Text style={styles.buttonText}>{v.name}</Text>
            </TouchableOpacity>
          );
        })}
      {friends.length === 0 && <Text>No friend available</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: "90%", // set the minimum width to 90% of the parent container
    maxWidth: 400, // limit the maximum width to 400 pixels
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewConversationScreen;
