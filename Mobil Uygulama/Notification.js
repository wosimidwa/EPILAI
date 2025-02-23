import SendSMS from 'react-native-sms';

// SMS gönderme fonksiyonu
const sendSMS = (recipients, message) => {
  console.log("sms başladı")
  SendSMS.send({
    body: message, // Gönderilecek mesajın içeriği
    recipients: recipients, // Gönderilecek telefon numaraları
    successTypes: ['sent', 'queued'], // Başarı durumları
    allowAndroidSendWithoutReadPermission: true, 
  })
    .then(() => {
      console.log('SMS gönderildi');
    })
    .catch((err) => {
      console.error('SMS gönderme hatası:', err);
    });
};

export default sendSMS;
