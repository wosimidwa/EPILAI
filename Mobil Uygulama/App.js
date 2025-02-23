import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Login from './pages/LoginPage';
// import SignUp from './pages/SignUp';
import AnaSayfa from './pages/AnaSayfa';
import MainPage from './pages/MainPage';
// import SettingsPage from './pages/SettingsPage';

import CalendarPage from './pages/Calendar';
import Symptom from './pages/Symptom';
// import Notification from './pages/Notification';
import SmsPersons from './pages/SmsPersons';
// import Alarm from './pages/Alarm';
import { useState } from 'react';
import Control from './pages/Controll';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [kullanıcılar, setKullanıcılar] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="ForgotPassword" component={Login} /> */}
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        <Stack.Screen name="MainPage" component={MainPageWithDrawer} />
        <Stack.Screen name="AnaSayfa" component={AnaSayfa} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="Symptom" component={Symptom} options={{ title: 'Semptom Kayıt' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const MainPageWithDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:true}} initialRouteName="AnaSayfa">
      <Drawer.Screen name="AnaSayfa" component={MainPage} />
      {/* <Drawer.Screen name="Ayarlar" component={SettingsPage} /> */}
      <Drawer.Screen name="Nobet Takvimi" component={CalendarPage} />
      {/* <Drawer.Screen name='Bildirim' component={Notification} /> */}
      <Drawer.Screen name='Kişi Ekle' component={SmsPersons} />
      <Drawer.Screen name='Control' component={Control} />
      {/* <Drawer.Screen name='Alarm' component={Alarm} /> */}
    </Drawer.Navigator>
  );
};

export default App;
