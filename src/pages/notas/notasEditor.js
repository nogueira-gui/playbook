import React,{ useState, useEffect } from 'react';
import {View,Text,Alert,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import service from '../../services/notes';
import Spacer from '../../components/spacer';
import { useNotes } from '../../context/noteContext';
import { useTheme } from '../../context/theme';
import { useBible } from '../../context/bible';
import dark from '../../style/dark';

export default function NotasEditor({navigation, route}){
    const { height, width } = Dimensions.get('window');
    const saveText = `Save\nNote`;
    const { modeStyle } = useTheme();
    const { ref, verseRef } = useBible();
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
    const { selectAll } = useNotes();

    const createNote = () => {
        service.create({ref:ref, verses: verseRef, title: noteTitle, description: noteText, date: new Date().getTime()}).then((id) => {
          Alert.alert("Nota criada");
          navigation.navigate('Home',{id});
          selectAll();
        }).catch((e)=>{
          Alert.alert("Erro ao gravar nota.");
          console.error(e);
        });
      }
        return (
            <View style={[{flex:1},
            modeStyle == "dark" ? {backgroundColor: "#121212"} : {backgroundColor: "#fbfbff"}]}>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}}>{`Reference:\n ${verseRef}`}</Text>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}}>Titulo: </Text>
                <Input
                    placeholder='Digite o título da nota'
                    autoCapitalize="none"
                    inputContainerStyle={{
                        borderWidth:1,
                        borderColor:"grey",
                        borderRadius: 10
                    }}
                    inputStyle= {{fontSize:20,flex:1}}
                    autoCorrect={true}
                    clearButtonMode="always"
                    value={noteTitle}
                    onChangeText={(txt) => setNoteTitle(txt)}
                />
                <Spacer/>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}}>Descrição: </Text>
                <Input
                    placeholder='Digite aqui sua anotação'
                    autoCapitalize="none"
                    multiline
                    inputContainerStyle={{
                        borderWidth:1,
                        borderColor:"grey",
                        borderRadius: 10}}
                    inputStyle= {{fontSize:20,flex:2}}
                    autoCorrect={true}
                    clearButtonMode="always"
                    value={noteText}
                    onChangeText={(txt) => setNoteText(txt)}
                />
                <TouchableOpacity style={{
                    translateY:height-height*1,
                    translateX:width*0.7,
                    backgroundColor:"#a6a6a6",
                    width:100,
                    height:50,
                    borderRadius:30,
                    alignItems:'center',
                }} 
                onPress={()=>{
                    createNote();
                }}>
                    <Text style={{fontSize:17, fontWeight:'bold', color:'white'}}>{saveText}</Text>
                </TouchableOpacity>
            </View>
        )
}
const styles = dark;