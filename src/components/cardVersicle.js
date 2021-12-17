import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default  function CardVersicle(props){
    const livro = props.livro;
    const cap = props.cap;
    const index = props.index;
    const item = props.item;
    const [bgColor, setBgColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState("grey");
    
    useEffect(() => {
        getData();
        setBgColor(null);
    },[livro,cap]);

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem(`@Versicle${livro}${cap}${index}`, value)
        } catch (e) {
          // saving error
        }
    }
    
    const getData = async () => {
        try {
        AsyncStorage.getItem(`@Versicle${livro}${cap}${index}`).then((value) => {
            setBgColor(value);
        });
        } catch(e) {
        // error reading value
        }
    }
  
    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem(`@Versicle${livro}${cap}${index}`)
        } catch(e) {
          // remove error
        }
    }

    return(
        <TouchableOpacity key={index} style={
            {
               backgroundColor: bgColor,
               opacity: 0.6,
            }
         } 
            onPress={()=>{
                if(bgColor == null){
                    setBgColor(selectedColor);
                }else{setBgColor(null);}

                if(bgColor == null){
                    storeData(selectedColor);
                }else{
                    removeValue();
                }
            }}>
            <View style={{flexDirection:"row"}}>
                <View style={{alignItems:"flex-start"}}>
                    <Text selectionColor='lightgrey' style={styles.versIndex}>
                        {index+1}
                    </Text>
                </View>
                <View style={{alignItems:"flex-end"}}>
                    <Text selectionColor='lightgrey' style={styles.vers}>
                        {`  ${item}`}
                    </Text>
                </View>
            </View>
         </TouchableOpacity>
        )
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center"
    },
    vers: {
        fontSize: 20,
        color: 'black',
        marginTop: 15,
        marginRight:20,
        marginBottom: 5,
      },
    versIndex: {
        fontSize: 14,
        color: 'blue',
        marginTop: 15,
        marginBottom: 5,
      },
 });