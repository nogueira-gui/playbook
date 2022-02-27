import React,{ useState, useEffect } from 'react';
import {View,Text,Alert,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import service from '../../services/notes';
import Spacer from '../../components/spacer';
import { useNotes } from '../../context/noteContext';
import light from '../../style/light';

export default function NotasEditor({navigation, route}){
    const { height, width } = Dimensions.get('window');
    const saveText = `Save\nNote`;
    const bible = route.params?.bible;
    const ref = route.params?.ref;
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
    const { notes, setNotes, selectAll } = useNotes();

    const createNote = () => {
        service.create({ref:ref, title: noteTitle, description: noteText, date: new Date().getTime()}).then((id) => {
          Alert.alert("Nota criada");
          navigation.navigate('Home',{id});
          selectAll();
        }).catch((e)=>{
          Alert.alert("Erro ao gravar nota.");
          console.error(e);
        });
      }
        return (
            <View style={styles.container}>
                <Text>{`Reference: ${ref}`}</Text>
                <Text>Titulo: </Text>
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
                <Text>Descrição: </Text>
                <Input
                    placeholder='Digite aqui sua anotação'
                    autoCapitalize="none"
                    multiline
                    inputContainerStyle={{borderBottomWidth:0,borderColor:"transparent"}}
                    inputStyle= {{fontSize:20,flex:2}}
                    autoCorrect={true}
                    clearButtonMode="always"
                    value={noteText}
                    onChangeText={(txt) => setNoteText(txt)}
                />
                <TouchableOpacity style={{
                    // position:'absolute',
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
const styles = light;