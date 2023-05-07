import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalInfo (){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    
    const getStudents = async () => {
        const currentID = await AsyncStorage.getItem("currentID")
        try { 
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sid: currentID })
            };
            const response = await fetch('http://192.168.0.101:8000/personalInfo', requestOptions);
            const receivedData = await response.json();
            setData(receivedData)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text>Your name is: {data[0].name}</Text>
                    <Text>Your ID is : {data[0].sid}</Text>
                    <Text>Your gender is: {data[0].gender}</Text>
                    <Text>Your password is: {data[0].password}</Text>
                </View>
            )}
        </View>
    ); 
}


