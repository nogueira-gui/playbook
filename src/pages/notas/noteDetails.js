import React,{ useState, useEffect } from 'react';
import {View,Text,Alert,Dimensions} from 'react-native';
import Card from '../../components/card';
import service from '../../services/notes';
import { useTheme } from '../../context/theme';
import dark from '../../style/dark';
import adjust from '../../utils/fontAdjust';

export default function NoteDetails(props){
    const { height, width } = Dimensions.get('window');
    const noteId = props.noteIdPressed;
    const { modeStyle } = useTheme();
    const [noteData, setNoteData] = useState({});

    useEffect(()=>{
        selectById();
    },[])

    const selectById = () => {
        if(noteId){
            service.findById(noteId)
            .then((result) => {
              setNoteData(result[0]); 
            })
            .catch(error => {
              Alert.alert("Falhou em buscar as notas"); 
              console.error(error);
            });
        }
    }

    return (
        <View style={[{flex:1}, {
            margin: "4%",
            backgroundColor: '#dee2d6', //soft grey
            borderRadius: 20,
            paddingTop:"5%",
            paddingHorizontal:"5%",
            paddingBottom:"5%",
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3,
          },
        modeStyle == "dark" ? {backgroundColor: "#121212"} : {backgroundColor: "#fbfbff"}]}>
            <Card>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86, fontSize:adjust(24)} : {color:"#000", opacity:0.86, fontSize:adjust(24)}}>
                {noteData.title}</Text>
            </Card>
            <Card>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86, fontSize:adjust(14)} : {color:"#000", opacity:0.86, fontSize:adjust(14)}}>
                {noteData.verses}</Text>
            </Card>
            <Card>
                <Text style={modeStyle == "dark" ? {color:"#FFF",opacity:0.86, fontSize:adjust(14)} : {color:"#000", opacity:0.86, fontSize:adjust(14)}}>
                {noteData.description}</Text>
            </Card>
        </View>
    )
}
const styles = dark;