import React from 'react';
import {Text,View,StyleSheet} from 'react-native';

export default function Gota(){
    return (
    <View style={styles.container}>
        <Text style={styles.texto}> "Nunca dê a um crítico mais tempo do que você daria a um amigo."</Text>
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