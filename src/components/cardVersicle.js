import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBible } from '../context/bible';
import adjust from '../utils/fontAdjust';

export default function CardVersicle(props){
    const livro = props.livro;
    const cap = props.cap;
    const index = props.index;
    const item = props.item.text || props.item; 
    const { setList, setVerseList, updateCard, setUpdateCard } = useBible();
    const [bgColor, setBgColor] = useState(null);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if(!updateCard){
            setVerseList([]); //Limpa array quando trocar de livro ou capitulo
            setPressed(false);
            getData();
        }
        setUpdateCard(false);
    },[livro,cap,updateCard]);

    const getData = async () => {
        try {
            await AsyncStorage.getItem(`@Versicle-${livro}-${cap}-${index}`).then((value) => {
                setBgColor(value);
            });
        } catch(e) {
            // error reading value
        }
    }

    const handlePressed = () => {
        setPressed((pressed)=>!pressed);
        if(!pressed){
            setList(index, true);
        }
        else{
            setList(index, false);
        }
    }

    return(
        <TouchableOpacity key={index} 
            style={
                bgColor == null ?
                pressed ? {
                backgroundColor: "transparent",
                borderColor: bgColor,
                borderWidth:1,
                opacity: 0.6,
                } : 
                [styles.cardNoMarked] : 
                pressed ?
                {
                    backgroundColor: bgColor,
                    borderColor: "black",
                    borderWidth:1,
                    opacity: 0.6,
                }  : 
                {
                    backgroundColor: bgColor,
                    borderColor: "transparent",
                    borderWidth:1,
                    opacity: 0.6,
                }
            }
            onPress={()=>{
                handlePressed();
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
        fontSize: adjust(22),
        color: 'black',
        fontFamily:'Cormorant-Medium',
        marginTop: 15,
        marginRight:20,
        marginBottom: 5,
      },
    versIndex: {
        fontSize: adjust(22),
        color: 'blue',
        fontFamily:'Cormorant-SemiBold',
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