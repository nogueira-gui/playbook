import React from 'react';
import {View,StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";

const actions = [
  {
     text: "Criar Nota",
     icon: <FontAwesome5
              raised
              name='plus'
           />,
     name: "add_nota",
     position: 1
  },
  {
    text: "Filtrar",
    icon: <FontAwesome5
            raised  
            name='filter'
            />,
    name: "filter",
    position: 2
  },
  {
    text: "Fontes",
    icon: <FontAwesome5
            raised  
            name='font'
            />,
    name: "font",
    position: 3
  }
];
export default function NotasPage({navigation}){
    
    return (
    <View style={styles.container}>
        <FloatingAction
            actions={actions}
            onPressItem={name => {
               if(`${name}` == 'add_nota'){
                  navigation.push("Editor");
               }else if (`${name}` == 'filter'){
                 console.log('cliquei no filtro');
               }else if (`${name}` == 'font'){
                console.log('cliquei no fonte');
              }
            }}
         />
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
    box: {
      backgroundColor: "skyblue",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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