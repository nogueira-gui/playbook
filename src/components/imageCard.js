import React,{useState,useEffect} from 'react';
import {Image,StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default  function ImageCard(props){
    const  id  = props.id;
    const [imgURL, setImgURL] = useState();

    useEffect(() => {
        firebase.storage().ref(`capa/${id.toString()}.jpg`).getDownloadURL()
        .then(url => setImgURL(url));
    })
    return(
        <Image
          source={{ uri: imgURL }}
          style={{ width: "97%" , height: 250, marginHorizontal: 5, borderRadius: 10  }}
        /> 
        )
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center"
    }
 });