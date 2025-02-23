import { StyleSheet,
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Image,
    TextInput,
    Button } from 'react-native'
import { useActionState, useState } from "react";
import React from 'react'
import { Ionicons } from '@expo/vector-icons';



const SmsPersons = () => {
    const [person, setperson] = useState("")
    const [number, setnumber] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
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
              Bu sayfa, nöbet geçireceğiniz tespit edildiğinden itibaren nöbet geçireceğiniz  
              bilgisini göndermek istediğiniz kişileri eklemeniz içindir. Eklediğiniz kişiler sms yolu ile bilgilendirilecektir.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Kişi Ekle</Text>
        <TextInput
            style={[styles.InputStyle,{marginTop:110}]}
            placeholder="Ekleyeceğiniz kişinin ismi"
            placeholderTextColor="gray"
            value={person}
            onChangeText={setperson}
        />
        <TextInput
            style={[styles.InputStyle,{marginTop:190},{paddingHorizontal:45}]}
            placeholder="Ekleyeceğiniz kişinin numarası"
            placeholderTextColor="gray"
            value={number}
            onChangeText={setnumber}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("asd")}
        >
        
        <Image  />
        <Image
          source={require("../assets/Ekle.jpg")}
          style={styles.image}
          resizeMode="contain" 
        />
        </TouchableOpacity>
    </View>
  )
}

export default SmsPersons

const styles = StyleSheet.create({
    image:{
        width:80,
        height:80},
    infoButton: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        left:340
      },
      
    back:{
        //#035e5e
        backgroundColor:"white",
        flex:1,
        // justifyContent:"center",
        alignItems:"center"
    },
    title:{
        position:"absolute",
        top:40,
        fontSize:30,
        color:"#4E78A0",
        
        
    },
    button:{
        backgroundColor:"#4E78A0",
        width:80,
        height:80,
        position:"absolute",
        top:300,
        borderWidth:3,
        borderColor:"#4E78A0",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    InputStyle:{
        position:"absolute",
        width: "80%",
        borderWidth:2,
        borderRadius:10,
        borderColor:"#4E78A0",
        borderStyle:"solid",
        color:"#4E78A0",
        alignItems:"center",
        alignContent:"center",
        paddingHorizontal: 60,
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
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
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
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