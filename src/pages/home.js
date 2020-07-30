import React from 'react';
import {Text,View,Button,SafeAreaView,ScrollView,StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from "../context/authContext";
import Spacer from "../components/spacer";

const nvi = require ("../../biblia/nvi.json");
const aa = require ("../../biblia/aa.json");
const acf = require ("../../biblia/acf.json");

export default function Home(){
    const { signOut } = React.useContext(AuthContext);
   
    
      let l = 0
      let c = 0
      let vers = 0
      let texto = ""

      const _renderLivroCap = nvi[l].name +" "+(c+1)
      
      const _renderVers = nvi[l].chapters[c].map((item,index) => {
         return(
         <Text style={styles.vers} key={index}>{index+1} {item}</Text>
         )
      });

    return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{_renderLivroCap}</Text>
            {_renderVers}   
         </ScrollView>
      </SafeAreaView>
  );
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
      backgroundColor: 'white',
      marginHorizontal: 10,
    },
     vers: {
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
    versRef: {
      fontSize: 14,
      textAlign: "right",
      color: 'black',
      marginLeft: 15,
      marginRight: 15,
      // alignSelf: "",
      fontWeight:"bold",
      marginBottom: 100
    }
 });