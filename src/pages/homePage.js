import React, {useState,UseEffect, useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import firebase from "../config/firebase"




export default function Home(){
  
  const [dados,setDados] = useState();
  const usuarioRef = firebase.database().ref("gota/")
  console.log(usuarioRef.child('01').child('1').child(1))

    return (
    <View style={styles.container}>
        <Text style={styles.texto}> {dados}</Text>
    </View>    
    )
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       marginTop: 2,//Constants.statusBarHeight,
      //  backgroundColor: "#265099",
    // tintColor: "#FFF"
    },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: '#AAA',
      marginHorizontal: 10,
    },
     texto: {
       fontSize: 18,
       textAlign: "justify",
       color: 'black',
       marginLeft: 15,
       marginRight: 15,
       alignSelf: "center",
       marginTop: 15
     },
     title: {
      fontSize: 25,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold"
      
    },
    subtitle: {
      fontSize: 24,
      textAlign: "justify",
      color: '#FFF',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginTop: 15
    },
    byLine: {
      fontSize: 14,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginBottom: 100
    }
 });