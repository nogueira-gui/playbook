import React, { useState } from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
const appVersion = require("../../../app.json");

const ConfigPage = ({navigation, route}) => {

  const settings = route.params?.settings;
  const bibleVersions = route.params?.bibleVersions;
  const appearance = route.params?.appearance;
  const language = route.params?.language;
  const clearData = route.params?.clearData;
  const clearDataMessageAlert = route.params?.clearDataMessageAlert;
  const clearMessageDone = route.params?.clearMessageDone;
  const donate = route.params?.donate;
  const about = route.params?.about;
  const confirm = route.params?.confirm;
  const cancel = route.params?.cancel;

  const clearAllData = async () => {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert(clearMessageDone));
    
  }

  const showAlert = () =>
  Alert.alert(
    clearData,
    clearDataMessageAlert,
    [
      {
        text: cancel,
        style: 'cancel',
      },
      {
        text: confirm,
        onPress: () => clearAllData(),
        style: 'confirm',
      },
    ],
    {
      cancelable: true,
    }
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>{settings}</Text>
      <TouchableOpacity style={styles.itemArea}>
        <Text style={{fontSize:24}}>{bibleVersions}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemArea}>
        <Text style={{fontSize:24}}>{appearance}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemArea}>
        <Text style={{fontSize:24}}>{language}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemArea} 
      onPress={()=>{showAlert()}}>
        <Text style={{fontSize:24}}>{clearData}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemArea}>
        <Text style={{fontSize:24}}>{donate}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemArea}>
        <Text style={{fontSize:24}}>{about}</Text>
        <AntDesign name="right" size={15} color="black" />
      </TouchableOpacity>
      <Text style={styles.appVersionStyle}>{`App Version ${appVersion.expo.version}`}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemArea: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: "5%",
  },
  title:{
    fontSize:30,
    alignSelf: "center",
    marginBottom:"10%",
    marginTop:"10%",
  },
  appVersionStyle:{
    alignSelf:"center",
  }
});

export default ConfigPage;