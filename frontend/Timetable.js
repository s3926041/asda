import React from "react"
import { useState } from "react";
import { View, Text, ScrollView, Button} from "react-native"

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarTimetable from "react-native-calendar-timetable";
import moment from "moment";
import TimeBlock from "./TimeBlock";
import NewTimeBlock from "./NewTimeBlock"

export default function Timetable({navigation}){
    //The Calendar
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0,10));

    const dayPressHandle = (day) => {
        setSelectedDate(day.dateString);
    };
    
    //The Timetable
    // const now = moment();
    // const weekday = now.weekday()

    const allItems = [
        {
            title: 'Some event I joined',
            startDate: moment().add(5, 'hour').toDate(),
            endDate: moment().add(6, 'hour').toDate(),
            location: "Here",
            color: "blue"
        },
        {
            title: 'Some event I joined',
            startDate: moment().add(3, 'hour').toDate(),
            endDate: moment().add(4, 'hour').toDate(),
            location: "Not here",
            color: "green"
        },
        {
            title: 'Some event I will join 27/4',
            startDate: new Date('2023-04-28T00:30:00'),
            endDate: new Date('2023-04-28T01:30:00'),
            location: "Not here",
            color: "yellow"
        },
    ];  

    

    // Make new Timeblock

    const handleNewTimeBlock = () =>{
        navigation.navigate("New Time Block")
    }

    return (
        <View>
            <Button title = "New Time Block" onPress = {handleNewTimeBlock} />
            <Calendar
            onDayPress={dayPressHandle}
            markedDates={{
                [selectedDate]: { selected: true },
            }}
            />
            <ScrollView>
                <CalendarTimetable                     
                    items={allItems}
                    renderItem={props => <TimeBlock  {...props} />}
                    date = {new Date(selectedDate)}
                    renderHeader={true}
                />
            </ScrollView>
            
        </View>
    );
}