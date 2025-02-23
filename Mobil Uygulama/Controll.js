import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native';
import playAlarm from './Alarm';
// import SaveData from './SaveData';

import React from 'react'
import sendSMS from './Notification';




const Control = () => {
    var number = "+905525642401";
    var message = "Hüseyin Eymen nöbet geçiriyor.";
    alarmSystem = () => {
        console.log("başladı");
        playAlarm()
        sendSMS(number, message)
        
    }

    return (
    <View>
        <Button title="Sinyal" onPress={() => alarmSystem()} />
    </View>
    )
}

export default Control

const styles = StyleSheet.create({})