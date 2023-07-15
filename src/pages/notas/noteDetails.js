import React,{ useState, useEffect } from 'react';
import {View,Text,Alert} from 'react-native';
import Card from '../../components/card';
import service from '../../services/notes';
import { useTheme } from '../../context/theme';
import dark from '../../style/dark';
import adjust from '../../utils/fontAdjust';
import { useAdControl } from '../../context/admobControl';
import {BannerAdNotasDetalhes} from '../../components/bannerAd';

export default function NoteDetails(props){
    const noteId = props.noteIdPressed;
    const { modeStyle } = useTheme();
    const [noteData, setNoteData] = useState({});
    const { tempPremium, premium } = useAdControl(); 

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
            <Card {... modeStyle == "dark" ? {backgroundColor:'#717171'}: null }>
                <Text style={modeStyle == "dark" ? {color:'#FFF',opacity:0.86,textAlign:'center', fontSize:adjust(24)} : {textAlign:'center', fontSize:adjust(24)}}>
                {noteData.title}</Text>
            </Card>
            <Card {... modeStyle == "dark" ? {backgroundColor:'#717171'}: null }>
                <Text style={modeStyle == "dark" ? {color:'#FFF',opacity:0.86,textAlign:'auto', fontSize:adjust(15)}:{textAlign:'auto', fontSize:adjust(15)}}>
                {noteData.verses}</Text>
            </Card>
            <Card {... modeStyle == "dark" ? {backgroundColor:'#717171'}: null }>
                <Text style={modeStyle == "dark" ? {color:'#FFF',opacity:0.86,textAlign:'auto', fontSize:adjust(15)}:{textAlign:'auto', fontSize:adjust(15)}}>
                {noteData.description}</Text>
            </Card>
            {tempPremium > new Date().getTime() || premium ? null :
            <BannerAdNotasDetalhes style={{alignSelf:'center', marginTop:'30%'}} />
            }
        </View>
    )
}
const styles = dark;