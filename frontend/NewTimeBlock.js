import {useState} from "react"
import { View, Text, TextInput, Button} from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'

export default function NewTimeBlock({navigation}){

    const [startDate, setStartDate] = useState(new Date());


    const handlePickerConfirm = (event, selectedDate) => {
        const currentDate = selectedDate || date;
    };


    return (
        <View>

                <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={handlePickerConfirm}
                />
        </View>
    );
}