import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


const CalendarPage = ({navigation}) => {
  const [events, setEvents] = useState([]);
  

  
  const addEvent = (date, time) => {
    const newEvent = { id: events.length + 1, date, time };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  
  const handleAddSampleEvents = () => {
    addEvent('2025-02-10', '10:00');
    addEvent('2025-02-10', '14:00');
    addEvent('2025-02-11', '09:30');
  };

  const handleEventPress = (event) => {
    navigation.navigate('Symptom', { selectedDate: event.date, selectedTime: event.time });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nöbet Takvimi</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddSampleEvents}>
        <Text style={styles.addButtonText}>Örnek Nöbetler Ekle</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventButton}
            onPress={() => handleEventPress(event)}
          >
            <Text style={styles.eventText}>
              {event.date} - {event.time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  eventButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventText: {
    color: '#fff',
    fontSize: 16,
  },
});


-App.js
  -MainPage.js
  -SmsPersons.js
  -Calendar.js
    -Symptom.js
      -SaveData.js
  -Control.js
    -Alarm.js
    -Notification.js
    
  

  