import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  FlatList, 
  TouchableOpacity,
  Image,
  Modal } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useActionState, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 



const MainPage = ({navigation, route}) => {
  var addDay1= 0
  var addDay2= 0
  var addDay3= 0
  var addDay4= 0
  var addDay5= 0
  var addDay6= 0
  var addDay7= 0

  const dayss=[addDay1,addDay2,addDay3,addDay4,addDay5,addDay6,addDay7]
  const daystyles=[styles.day1,styles.day2,styles.day3,styles.day4,styles.day5,styles.day6,styles.day7]
  const [modalVisible, setModalVisible] = useState(false);

  const table = (day) =>{
    console.log("çalıştı")
    setDays(prevDays => prevDays.map((value, index) => index === 0 ? value + 56 : value));
  }


  
  

  

  const [notifications, setNotifications] = useState([
    { id: '1', message: '27.12.2024' },
    { id: '2', message: '28.12.2024' },
    { id: '3', message: '29.12.2024' }
  ]);

  const increaseHeight = (dayIndex) => {
    setDays(prevDays =>
      prevDays.map((day, index) =>
        index === dayIndex ? { ...day, height: "60%" } : day
      )
    );
  };
  
  
  const [days, setDays] = useState([
    { height: "0%" }, // Pazartesi
    { height: "0%" },  // Salı
    { height: "0%" },  // Çarşamba
    { height: "0%" },  // Perşembe
    { height: "0%" },  // Cuma
    { height: "0%" },  // Cumartesi
    { height: "0%" },  // Pazar
  ]);
  

  const deleteNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      
      
      <Text style={styles.notifText}>Nöbet--{">"} {item.message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => deleteNotification(item.id)}
      >
        <View style={styles.button}>
        <Image source={require("../assets/carpi.png")} style={styles.logo2} />
        </View>
      </TouchableOpacity>
    </View>
  );
  
  // console.log(styles.back.backgroundColor)
  return (
    
    <View style={styles.back}>
        <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="information-circle-outline" size={30} color="black" />
        </TouchableOpacity>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sayfa Özellikleri</Text>
            <Text style={styles.modalText}>
            EPILAI Uygulamasına Hoş Geldiniz!

            Uygulamamız, epilepsiyle yaşayan bireylerin hayatını kolaylaştırmak amacıyla geliştirildi. Yapay zeka destekli analiz sistemimiz sayesinde, olası bir epileptik krizi 10-15 dakika öncesinden tahmin ederek sizi önceden bilgilendiriyoruz.
            Bu sayede güvenli bir yere geçebilir ve kendinizi yaklaşan epileptik nöbete hazırlayabilirsiniz. Yakınlarınızı haberdar etme konusunda endişelenmeyin, hasta yakını kayıt bölümünden ekleyeceğiniz kişilere SMS aracılığıyla gerekli bilgilendirme yapılacaktır.
            Geçirdiğiniz nöbetlere dair tarih ve zaman bilgisi uygulama üzerinde otomatik kaydedilmektedir. Kaydedilen krize ait butona tıklayarak sempromlara ve tetikleyicilere dair bilgi girişi yapma imkanınız bulunmaktadır. Bu bilgiler tedavi sürecinizin planlanmasında oldukça önemlidir.

            Epileptik Kriz Uyarısı ALdığınızda Ne Yapmalısınız?
            📌 Sakin kalın. Kriz riski olduğunu bilmek, sizin önlem almanızı sağlar.
            📌 Güvenli bir yere geçin. Sert zeminlerden, keskin objelerden ve tehlikeli alanlardan uzak durun.
            📌 Oturun veya uzanın. Kriz ihtimaline karşı başınızı ve vücudunuzu koruyacak bir pozisyon alın.
            📌 Gerekirse ilaç alın. Doktorunuzun önerdiği şekilde kullanmanız gereken bir acil durum ilacınız varsa, uygun şekilde alın.

            Kriz Anında Yakınlarınız Ne Yapmalı?
            📌 Paniğe kapılmayın. Kriz genellikle birkaç dakika içinde kendiliğinden geçer.
            📌 Bireyin güvenliğini sağlayın. Sert yüzeylerden ve tehlikeli objelerden uzak tutun.
            📌 Başını yana çevirin. Böylece boğulma riskinin önüne geçilir.
            📌 Ağzına bir şey koymayın. Nefes almasını engelleyebilir veya zarar verebilir.
            📌 Krizin süresini takip edin. 5 dakikadan uzun sürerse veya kriz sonrası birey bilinçsizse, acil yardım çağırın.

            Unutmayın: Bu uygulama, sizi daha güvende hissettirmek için var! Önleminizi alın, güvende kalın

            Öneri ve şikayetler için: aybukedagasan25@gmail.com 
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.notifications}>
        <Text style={styles.title}>Bildirimler</Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.tableback}>
        <View style={styles.table}>
          <View style={[styles.horizontalLine, {top:"20%"}]}></View>
          <View style={[styles.horizontalLine, {top:"40%"}]}></View>
          <View style={[styles.horizontalLine, {top:"60%"}]}></View>
          <View style={[styles.horizontalLine, {top:"80%"}]}></View>
          {/* <View style={[styles.verticalLine]}></View> */}
          <View style={[styles.days, { height: days[0].height }]}></View>
          <Text style={[styles.tableText,{left:10}]}>Pzt</Text>
          <View style={[styles.verticalLine, {left:50}]}></View>
          <View style={[styles.days, { height: days[1].height }, {left:70}]}></View>
          <Text style={[styles.tableText,{left:65}]}>Sal</Text>
          <View style={[styles.verticalLine, {left:100}]}></View>
          <View style={[styles.days, { height: days[2].height }, {left:100}]}></View>
          <Text style={[styles.tableText,{left:113}]}>Çrş</Text>
          <View style={[styles.verticalLine, {left:150}]}></View>
          <View style={[styles.days, { height: days[3].height }, {left:150}]}></View>
          <Text style={[styles.tableText,{left:163}]}>Prş</Text>
          <View style={[styles.verticalLine, {left:200}]}></View>
          <View style={[styles.days, { height: days[4].height}, {left:200}]}></View>
          <Text style={[styles.tableText,{left:209}]}>Cum</Text>
          <View style={[styles.verticalLine, {left:250}]}></View>
          <View style={[styles.days, { height: days[5].height }, {left:250}]}></View>
          <Text style={[styles.tableText,{left:260}]}>Cmt</Text>
          <View style={[styles.verticalLine, {left:300}]}></View>
          <View style={[styles.days, { height: days[6].height}, {left:300} ]}></View>
          <Text style={[styles.tableText,{left:313}]}>Pzr</Text>
          {/* <TouchableOpacity
          style={styles.button}
          onPress={() => increaseHeight(0)}
          >
          <View style={styles.button}>
          <Image source={require("../assets/carpi.png")} style={styles.logo2} />
          </View>
          </TouchableOpacity> */}
          <View style={[styles.verticalLine, {left:350,borderRightWidth:2,opacity:1}]}></View>

        </View>
      </View>
      
    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
  logo2:{
    width:20,
    height:20,
    backgroundColor:"#ebc2af",
    
    
  },
  button:{
    backgroundColor:"gray",
    width:0,
    marginLeft:10
  },

  back:{
    flex:1,
    backgroundColor:"#800000",
    justifyContent:"center",
    borderWidth:2,
    borderColor:"white",
    borderRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    opacity:0.9,
    
  },

  notifications:{
    backgroundColor:"white",
    width:350,
    height:250,
    position:"absolute",
    left:15,
    top:40,
    borderRadius:30,
    borderWidth:2,
    
    justifyContent:"center",
    // borderTopLeftRadius:0

  },

  title:{
    marginLeft:100,
    fontSize:30,
    color:"black",
  },

  notifText:{
    marginBlockStart:10,
    paddingLeft:5,
    color:"#a0203a",
    fontSize:17,
    marginLeft:10

  },

  tableback:{
    backgroundColor:"white",
    width:370,
    height:320,
    position:"absolute",
    top:310,
    left:6,
    borderWidth:2,
    borderRadius:10


    
  },

  table:{
    position:"absolute",
    borderWidth:0,
    width:350,
    height:290,
    left:6,
    top:25,
    borderTopWidth:0,
    justifyContent:"flex-end",
    borderRightWidth:0,
    

  },


  horizontalLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#000000",
    zIndex:1,//Katman
    opacity:0.3
    // top: "20%", // Ortalar

  },

  verticalLine: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "#000000",
    zIndex:1,//Katman
    opacity:0.3
    // top: "20%", // Ortalar

  },

  days:{
    position: "absolute",
    width: 50,
    // height: "20%",
    backgroundColor: "darkgray",
    // borderWidth:1,
    // borderLeftWidth:0,
    // borderRightWidth:2,
    // justifyContent:'flex-end',
    // alignContent:"center",
    // alignItems:"center",
  },

  tableText:{
    fontSize:15,
    color:"black",
    position:"absolute",
    top:-20
  },

  infoButton: {
    backgroundColor: '#800000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    left:340,
    top:5
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 12,
    textAlign: 'center',
    // marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4E78A0',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
})