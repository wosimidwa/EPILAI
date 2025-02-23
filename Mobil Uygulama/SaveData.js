import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveData = () => {

  
  const saveListData = async (data) => {
    try {
      await AsyncStorage.setItem('listData', JSON.stringify(data));
      console.log('List data saved successfully');
    } catch (error) {
      console.error('Error saving list data', error);
    }
  };

  
  const saveEdfData = async (data) => {
    try {
      await AsyncStorage.setItem('edfData', data);
      console.log('EDF data saved successfully');
    } catch (error) {
      console.error('Error saving EDF data', error);
    }
  };

  return (
    <></>
  );
}

export default SaveData;
