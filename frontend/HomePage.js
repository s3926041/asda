import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button} from "react-native";

export default function HomePage ({navigation}){
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>This is your fuckingg HomePageeee</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
    },
});


