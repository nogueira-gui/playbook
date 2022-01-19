import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adjust from '../utils/fontAdjust';

export default  function CardVersicle(props){
    const livro = props.livro;
    const cap = props.cap;
    const index = props.index;
    const item = props.item.text || props.item; 
    const [bgColor, setBgColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState("grey");
    const [selected, setSelected] = useState(false);
    const [tempMark, setTempMark] = useState([]);
    const [tempBookCap, setTempBookCap] = useState(null);
    useEffect(() => {
        setBgColor(null);
        getData();
    },[livro,cap]);
    
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem(`@Versicle-${livro}-${cap}-${index}`, value)
        } catch (e) {
            // saving error
        }
    }
    
    const getData = async () => {
        try {
            AsyncStorage.getItem(`@Versicle-${livro}-${cap}-${index}`).then((value) => {
                setBgColor(value);
            });
        } catch(e) {
            // error reading value
        }
    }
    
    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem(`@Versicle-${livro}-${cap}-${index}`)
        } catch(e) {
          // error
        }
    }

    const storeMarkTemp = async () => {
        try {
            await AsyncStorage.setItem(`@MarkTemp-${livro}-${cap}`, index)
        } catch (e) {
            // saving error
        }
    }
    

    const getMarkTemp = async () => {
        try {
        AsyncStorage.getItem(`@MarkTemp-${livro}-${cap}`).then((value) => {
            console.log(value);
            setSelected(value);
        });
        } catch(e) {
        // error reading value
        }
    }


    const handleMark = () => {
        if(bgColor == null){
            setBgColor(selectedColor);
        }
        else{
            setBgColor(null);
        }
        if(bgColor == null){
            storeMarkTemp();
            storeData(selectedColor);
        }else{
            removeValue();
        }
    }

    return(
        <TouchableOpacity key={index} 
            style={
                bgColor ? {
                backgroundColor: "transparent",
                borderColor: bgColor,
                borderWidth:1,
                opacity: 0.6,
                } : 
                [styles.cardNoMarked]
            }
            onPress={()=>{
               handleMark();
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
        fontSize: adjust(20),
        color: 'black',
        marginTop: 15,
        marginRight:20,
        marginBottom: 5,
      },
    versIndex: {
        fontSize: adjust(14),
        color: 'blue',
        marginTop: 15,
        marginBottom: 5,
      },
    cardMarkTemp: {
        borderWidth:1,
        opacity: 0.6,
    },
    cardMark: {
        borderWidth:0,
        opacity: 0.6,
    },
    cardNoMarked: {
        backgroundColor: "transparent",
        borderColor:"transparent",
        borderWidth:1,
        opacity: 0.6,
    }
 });