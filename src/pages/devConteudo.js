import React,{useState,useEffect} from 'react';
import {Text,View,Image,SafeAreaView,ScrollView,StyleSheet} from 'react-native';
import firebase from "../config/firebase"

export default function devConteudo({ route }){
    const { date } = route.params;
    const { title } = route.params;
    const { sub } = route.params;
    const { mensagem } = route.params;
    const { by } = route.params;
    const { img } = route.params;
    const [imgURL, setImgURL] = useState();
    const [body, setBody] = useState([]);
    let listaBody = [];

  
    useEffect(() => {
      if (img){ 
        firebase.storage().ref(`devocionais/${img}`).getDownloadURL()
        .then(url => setImgURL(url));
      }


      mensagem.forEach((msg,id) => {
        listaBody.push(msg)
          if(sub[id] != "" && sub[id] != undefined){
            listaBody.push(sub[id]);
          }
      });
      setBody( listaBody.map((txt,index) => {
        let isVers =  txt.includes("%v");
        if (isVers){
          txt = txt.replace("%v","");
        }
         return(
        !isVers ? 
         <Text style={styles.texto} key={index}>{`${txt}`}</Text> :
         <Text style={styles.vers} key={index}>{`${txt}`}</Text>
         )
      }))

    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        { img ?
        <Image
          source={{ uri: imgURL }}
          style={{ width: "97%" , height: 250, margin: 6, borderRadius: 10  }}
        /> : null
      }
        <View> 

         <Text style={styles.title}>
            {title}
         </Text>

         {body}

         <Text style={styles.byLine}>
          {by}
         </Text>
         <Text style={styles.DateTime}>{new Date(date.seconds * 1000).toDateString()}</Text>
         </View>
        </ScrollView>
      </SafeAreaView>
        
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       marginTop: 2,
    },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: 'steelblue',
      marginHorizontal: 10,
    },
     texto: {
       fontSize: 18,
       textAlign: "justify",
       color: 'white',
       marginLeft: 15,
       marginRight: 15,
       alignSelf: "center",
       marginTop: 15
     },
     vers: {
      fontSize: 18,
      textAlign: "justify",
      color: 'yellow',
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
      marginTop: 30,
      alignSelf: "center",
      fontWeight:"bold",
      marginBottom: 30
    },
      DateTime: {
      fontSize: 12,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 25,
      alignSelf: "center",
      fontWeight:"bold",
      marginBottom: 100
    }
 });