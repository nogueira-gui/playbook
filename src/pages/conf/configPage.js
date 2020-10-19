import React, {useState,UseEffect, useEffect} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';


export default function ConfigPage(){
  
  // const [gota,setGota] = useState();
  // const gotaRef = firebase.firestore().collection('gota');
  // gotaRef.get()
  // .then((msg) => {
  //   setGota(msg)})
  
    
    return (
    <View style={styles.container}>
        <Text>{`Perfil`}</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
       flex: 2,
       justifyContent: "space-around",
       marginTop: 2,//Constants.statusBarHeight,
      //  backgroundColor: "#265099",
    // tintColor: "#FFF"
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 360,
      marginLeft: 15,
      backgroundColor: "grey",
      alignSelf: "flex-start"
   },
    container2: {
      // flex: 1,
      // alignContent: "space-around",
      flexDirection: "row",
      // width: useWindowDimensions.width*0.5,
      justifyContent: "center",
      // marginTop: 2,//Constants.statusBarHeight,
     //  backgroundColor: "#265099",
   // tintColor: "#FFF"
   },
   container3: {
    // flex: 1,
    // alignContent: "space-around",
    flexDirection: "row",
    // width: useWindowDimensions.width*0.5,
    justifyContent: "flex-start",
    alignItems: "center"
    // marginTop: 2,//Constants.statusBarHeight,
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
    box: {
      backgroundColor: "skyblue",
      // paddingVertical: 5,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      // marginVertical:5,
      marginHorizontal:10,
      borderRadius: 10,
      height: 150,
      width: 150
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
      color: 'black',
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