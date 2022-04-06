import React,{ useState } from 'react';
import {View,Text,Alert,Dimensions} from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import service from '../../services/notes';
import adjust from '../../utils/fontAdjust';
import { useNotes } from '../../context/noteContext';
import { useTheme } from '../../context/theme';
import { useBible } from '../../context/bible';
import dark from '../../style/dark';

export default function NotasEditor({navigation, route}){
    const { height, width } = Dimensions.get('window');
    const saveText = route.params.saveButton;
    const reference = route.params.reference;
    const titleInput = route.params.title;
    const descriptionInput = route.params.description;
    const placeholderInputDescription = route.params.placeholderInputDescription;
    const placeholderInputTitle = route.params.placeholderInputTitle;
    const { modeStyle } = useTheme();
    const { ref, verseRef, bibleVersion } = useBible();
    const [noteTitle, setNoteTitle] = useState(ref);
    const [noteText, setNoteText] = useState("");
    const { selectAll } = useNotes();

    const createNote = () => {
        if(noteTitle != "" || noteText != ""){
            service.create({version: bibleVersion,ref:ref, verses: verseRef, title: noteTitle, description: noteText, date: new Date().getTime()}).then((id) => {
              Alert.alert("Nota criada");
              navigation.navigate('Home',{id});
              selectAll();
            }).catch((e)=>{
              Alert.alert("Erro ao gravar nota.");
              console.error(e);
            });
        }else{ 
            Alert.alert(
                title= "Preenchimento inválido!",
                message="Todos os campos devem ser preenchidos!"
            );
        }
      }
        return (
            <View style={[{flex:1},
            modeStyle == "dark" ? {backgroundColor: "#121212"} : {backgroundColor: "#fbfbff"}]}>
                <ScrollView>
                    <Text style={modeStyle == "dark" ? {marginTop:'2%',color:"#FFF",opacity:0.86,fontSize:adjust(15)} : {marginTop:'2%',color:"#000", opacity:0.86,fontSize:adjust(15)}}>{`${reference}:\n\n${verseRef}`}</Text>
                    <Text style={modeStyle == "dark" ? {marginTop:'2%',color:"#FFF",opacity:0.86,fontSize:adjust(18)} : {marginTop:'2%',color:"#000", opacity:0.86,fontSize:adjust(18)}}>{titleInput}: </Text>
                    <Input
                        placeholder={placeholderInputTitle}
                        autoCapitalize="none"
                        inputContainerStyle={{
                            borderWidth:1,
                            borderColor:"grey",
                            borderRadius: 10
                        }}
                        inputStyle= {[{fontSize:20,flex:1}, modeStyle=="dark"?{color:'#FFF', opacity:0.86}:{color:'#000', opacity:0.86}]}
                        autoCorrect={true}
                        clearButtonMode="always"
                        value={noteTitle}
                        onChangeText={(txt) => setNoteTitle(txt)}
                    />
                    <Text style={modeStyle == "dark" ? {marginTop:'3%',color:"#FFF",opacity:0.86,fontSize:adjust(18)} : {marginTop:'3%',color:"#000", opacity:0.86,fontSize:adjust(18)}}>{descriptionInput}: </Text>
                    <Input
                        placeholder={placeholderInputDescription}
                        autoCapitalize="none"
                        multiline
                        inputContainerStyle={{
                            borderWidth:1,
                            borderColor:"grey",
                            borderRadius: 10}}
                        inputStyle= {[{fontSize:20,flex:2}, modeStyle=="dark"?{color:'#FFF', opacity:0.86}:{color:'#000', opacity:0.86}]}
                        autoCorrect={true}
                        clearButtonMode="always"
                        value={noteText}
                        onChangeText={(txt) => setNoteText(txt)}
                    />
                    <TouchableOpacity style={{
                        translateY:height-height*1,
                        translateX:width*0.7,
                        backgroundColor:"#087f23",
                        width:100,
                        height:50,
                        borderRadius:30,
                        alignItems:'center',
                    }} 
                    onPress={()=>{
                        createNote();
                    }}>
                        <Text style={{paddingTop:'12.5%',fontSize:17, fontWeight:'bold', color:'white'}}>{saveText}</Text>
                    </TouchableOpacity>
                    <AdMobBanner style={{alignSelf:'center', marginTop:'8%'}}
                        bannerSize="mediumRectangle"
                        adUnitID="ca-app-pub-8609227792865969/2991661088"
                        servePersonalizedAds={false}// true or false
                        onDidFailToReceiveAdWithError={(err) => console.error(err)}
                  />
                </ScrollView>
            </View>
        )
}
const styles = dark;