import { Audio } from 'expo-av';


const playAlarm = async () => {
  try {
    console.log("Alarm başlatılıyor...");
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/alarm.mp3') // Alarm ses dosyan
    );
    await sound.playAsync();
    console.log("✅ Alarm çalıyor...");
  } catch (error) {
    // console.error("Alarm başlatılamadı:", error);
  }
};

export default playAlarm;
