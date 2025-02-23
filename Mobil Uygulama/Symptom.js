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
import React from 'react';





const Symptom = ({navigation,route}) => {

  const { selectedDate, selectedTime } = route.params;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [trigVisible, setTrigVisible] = useState(false)
  const [actVisible, setActVisible] = useState(false)
  const [symaVisible, setSymaVisible] = useState(false)
  const [symbVisible, setSymbVisible] = useState(false)
  const [symcVisible, setSymcVisible] = useState(false)

  const [listtrigger, setListtrigger] = useState([
    { id: '1', text: 'Alkol tüketimi', checked: false },
    { id: '2', text: 'Uyuşturucu', checked: false },
    { id: '3', text: 'Ateş', checked: false },
    { id: '4', text: 'Parlak ışık', checked: false },
    { id: '5', text: 'Yüksek şeker', checked: false },
    { id: '6', text: 'Hipotermi', checked: false },
    { id: '7', text: 'Hastalık', checked: false },
    { id: '8', text: 'Düşük şeker', checked: false },
    { id: '9', text: 'Ek ilaç', checked: false },
    { id: '10', text: 'Eksik doz', checked: false },
    { id: '11', text: 'Uykusuzluk', checked: false },
    { id: '12', text: 'Stres', checked: false },
    { id: '13', text: 'Diğer', checked: false },
  ]);

  const [listactivity, setListactivity] = useState([
    { id: '1', text: 'fiziksel aktivite', checked: false },
    { id: '2', text: 'zihinsel aktivite', checked: false },
    { id: '3', text: 'yemek', checked: false },
    { id: '4', text: 'sosyal ortam', checked: false },
    { id: '5', text: 'uyku', checked: false },
    { id: '6', text: 'diğer', checked: false },
  ]);
  
  const [listsyma, setListsyma] = useState([
    { id: '1', text: 'baş dönmesi', checked: false },
    { id: '2', text: 'gorsel bozukluk', checked: false },
    { id: '3', text: 'mide bulantisi', checked: false },
    { id: '4', text: 'kalp çarpıntısı ', checked: false },
    { id: '5', text: 'terleme', checked: false },
  ]);
  
  const [listsymb, setListsymb] = useState([
    { id: '1', text: 'kas segirmeleri', checked: false },
    { id: '2', text: 'vücutta ani kasılmalar ', checked: false },
    { id: '3', text: 'kontrolsüz hareket', checked: false },
    { id: '4', text: 'titreme', checked: false },
    { id: '5', text: 'baş ağrısı ', checked: false },
  ]);

  const [listsymc, setListsymc] = useState([
    { id: '1', text: 'yoğun korku/kaygı ', checked: false },
    { id: '2', text: 'bilinç bulanikligi', checked: false },
      { id: '3', text:'algı değişimi', checked: false },
    { id: '4', text: 'konusmada güçlük', checked: false },
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  

  
  const Document = () => {
    const document = [];
  
    document.push(date.toLocaleDateString())

    // Tetikleyiciler
    const checkedTriggers = listtrigger.filter(item => item.checked);
    if (checkedTriggers.length > 0) {
      document.push("Tetikleyiciler:");
      checkedTriggers.forEach(item => document.push(`- ${item.text}`));
    }
  
    // Aktiviteler
    const checkedActivities = listactivity.filter(item => item.checked);
    if (checkedActivities.length > 0) {
      document.push("\nAktiviteler:");
      checkedActivities.forEach(item => document.push(`- ${item.text}`));
    }
  
    // Genel Semptomlar
    const checkedSyma = listsyma.filter(item => item.checked);
    if (checkedSyma.length > 0) {
      document.push("\nGenel Semptomlar:");
      checkedSyma.forEach(item => document.push(`- ${item.text}`));
    }
  
    // Motor Semptomlar
    const checkedSymb = listsymb.filter(item => item.checked);
    if (checkedSymb.length > 0) {
      document.push("\nMotor Semptomlar:");
      checkedSymb.forEach(item => document.push(`- ${item.text}`));
    }
  
    // Duygusal Semptomlar
    const checkedSymc = listsymc.filter(item => item.checked);
    if (checkedSymc.length > 0) {
      document.push("\nDuygusal Semptomlar:");
      checkedSymc.forEach(item => document.push(`- ${item.text}`));
    }
  
    
    return document.join("\n");
  };
  
  const print=()=>{
    const documentContent = Document();
    console.log(documentContent);
    navigation.goBack()
  }

  const showlist = (image, topImage, topButton, visible, setvisible, datalist, setDatalist, text, render) => {
    return(
    <View>
      <Image source={image} style={[styles.logo,{top:topImage}]} />
      <TouchableOpacity
        style={[styles.openButton,{top:topButton}]}
        onPress={() => setvisible(true)}
        
      >
        <Text style={styles.buttonText}>{text}</Text>
        
        <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setvisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seçenekler</Text>
              <FlatList
                data={datalist}
                renderItem={render}
                keyExtractor={(item) => item.id}
              />
              {/* Modalı Kapatan Düğme */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setvisible(false)}
              >
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
              
            </View>
            <Image source={image} style={styles.constlogo} />
          </View>
        </Modal> 

      </TouchableOpacity>
    </View>
    );
    
  }


  const rendertrigItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => signBLock(item.id,listtrigger, setListtrigger)}
    >
      <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
        {item.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => signBLock(item.id,listactivity, setListactivity)}
    >
      <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
        {item.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const rendersymaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => signBLock(item.id,listsyma, setListsyma)}
    >
      <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
        {item.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const rendersymbItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => signBLock(item.id,listsymb, setListsymb)}
    >
      <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
        {item.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const rendersymcItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => signBLock(item.id,listsymc, setListsymc)}
    >
      <View style={[styles.checkbox, item.checked && styles.checkedCheckbox]}>
        {item.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const signBLock = (id, list, setlist) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setlist(updatedList);



  };


  return (
    <View style={styles.container}>
      
      <View style={styles.midContainer}>
      
      <View>{showlist(require("../assets/trigger.png"), 35, 35, trigVisible, setTrigVisible, listtrigger, setListtrigger, "Tetikleyiciler", rendertrigItem)}</View>

      <View>{showlist(require("../assets/activity.png"), 120, 120, actVisible, setActVisible, listactivity, setListactivity, "Aktiviteler", renderactItem)}</View>

      <View>{showlist(require("../assets/semptom.jpg"), 205, 205, symaVisible, setSymaVisible, listsyma, setListsyma, "Genel semptomlar", rendersymaItem)}</View>

      <View>{showlist(require("../assets/general.jpg"), 290, 290, symbVisible, setSymbVisible, listsymb, setListsymb, "Motor semptomlar", rendersymbItem)}</View>

      <View>{showlist(require("../assets/duygusal.jpg"), 375, 375, symcVisible, setSymcVisible, listsymc, setListsymc, "Duygusal semptomlar", rendersymcItem)}</View>

      <View style={styles.dateButton}>
        

      </View>

      <View>
        <TouchableOpacity style={styles.save} onPress={()=> print()}>
          <Text style={styles.saveText}>KAYIT</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default Symptom

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  chose:{
    backgroundColor:"black",
    color:"black"
  },

  date:{
    textAlign:"center",
    fontSize:20,

  },

  saveText:{
    textAlign:"center",
    fontSize:30,
  },  
  dateText:{
    fontSize:20,
    textAlign:"center"
  },

  dateButton:{
    width:200,
    height:80,
    position:"absolute",
    top:410,
    left:85,
    borderRadius:0,
    borderWidth:0,
    justifyContent:"center"
  },

  checkmark:{
    textAlign:"center",
    position:"absolute"
  },
  itemText:{
    marginTop:20
  },

  item:{
    color:"white"
  },

  modalTitle:{
    fontSize:25,
    color:"#800000",
  },

  constlogo:{
    width:50,
    height:50, 
  },

  logo:{
    width:50,
    height:50,
    position:"absolute",
    left:6
  },


  closeButton: {
    backgroundColor: '#800000',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
  },

  modalContent: {
    width: '80%',
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText:{
    fontSize:20,
    color:"#666666",
    marginLeft:10
  },

  InputStyle:{
  borderWidth:2,
  borderRadius:10,
  borderColor:"#4E78A0",
  borderStyle:"solid",
  color:"#4E78A0",
  width:100,
  position:"absolute",
  top:450,
  left:100
  },

  openButton: {
    position:"absolute",
    backgroundColor: 'lightgray',
    // borderColor:"#800000",
    borderWidth:0,
    borderBottomWidth:2,
    width:250,
    height:50,
    borderRadius: 8,
    justifyContent:"center",
    left:60,
  },

  container:{
    flex:1,
    backgroundColor:"gray",
    justifyContent:"center",
    // alignItems:"center",
  },

  text: {
    textAlign: "center",
  },

  midContainer:{
    borderWidth:1,
    height:"80%",
    width:"98%",
    position:"absolute",
    top:80,
    left:4,
    backgroundColor:"white"
  },

    save:{
    backgroundColor:"#800000",
    width:300,
    height:80,
    position:"absolute",
    top:500,
    left:35,
    borderRadius:40,
    borderWidth:1,
    justifyContent:"center"
    },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:150,
    paddingTop:10,
    position:"absolute",
    top:20
  },
  checkedCheckbox: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
})