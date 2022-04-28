import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBible } from '../context/bible';
import { useTheme } from '../context/theme';
import adjust from '../utils/fontAdjust';

export default function CardVersicle(props){
    const livro = props.livro;
    const cap = props.cap;
    const index = props.index;
    const item = props.item.text || props.item; 
    const { setList, setVerseList, updateCard, setUpdateCard, fontStyle, fontSize } = useBible();
    const { modeStyle } = useTheme();
    const [bgColor, setBgColor] = useState(null);
    const [pressed, setPressed] = useState(false);
    const [fontText, setFontText] = useState({
        titleBible: "Cormorant-SemiBold",
        versIndex: "Cormorant-SemiBold",
        vers:"Cormorant-Medium",
        name:"Cormorant"
    });

    useEffect(() => {
        if(!updateCard){
            setVerseList([]); //Limpa array quando trocar de livro ou capitulo
            setPressed(false);
            getData();
        }
        setUpdateCard(false);
    },[livro,cap,updateCard, fontStyle]);

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
                borderColor: modeStyle == "dark" ?"#FFF":"black",
                borderWidth:1,
                opacity: 0.6,
                } : 
                [styles.cardNoMarked] : 
                pressed ?
                {
                    backgroundColor: bgColor,
                    borderColor: modeStyle == "dark" ?"#FFF":"black",
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
            <View style={[{flexDirection:"row"} , modeStyle == "dark" ? {backgroundColor: "#121212"} : null]}>
                <View style={{alignItems:"flex-start"}}>
                    <Text style={[styles.versIndex,{
                        fontSize: adjust(22)*fontSize,
                        fontFamily: fontStyle.versIndex,
                    }, modeStyle == "dark" ? {color: '#FFF', }: {color: 'blue'}]}>
                        {index+1}
                    </Text>
                </View>
                <View style={{alignItems:"flex-end"}}>
                    <Text style={[styles.vers,{
                        fontSize: adjust(22)*fontSize,
                        fontFamily: fontStyle.vers,
                    }, modeStyle == "dark" ? {color: '#FFF', }: {color: 'black'}]}>
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
        marginTop: 15,
        marginRight:20,
        marginBottom: 5,
      },
    versIndex: {
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