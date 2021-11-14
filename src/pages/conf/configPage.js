import React from 'react';
import {Text,View,StyleSheet} from 'react-native';


export default function ConfigPage(){
  
    
    return (
    <View style={styles.container}>
        <Text>Configurações</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
       flex: 2,
       justifyContent: "space-around",
       marginTop: 2,
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