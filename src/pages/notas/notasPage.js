import React from 'react';
import {View,Modal,Text,Alert,FlatList,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "../../components/card";
import { TouchableOpacity } from 'react-native-gesture-handler';
import adjust from '../../utils/fontAdjust';
import timeConverter from '../../utils/datetimeConverter';
import { FontAwesome5 } from '@expo/vector-icons';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';
import service from '../../services/notes';
import NoteDetails from './noteDetails';
import { useNotes } from '../../context/noteContext';
import { useTheme } from '../../context/theme';
import { useAdControl } from '../../context/admobControl';
import dark from '../../style/dark';

export default function NotasPage({navigation, route}){
  const titlePage = route.params?.notes;
  const {width} = Dimensions.get("window");
  const emptyNotesMessage = route.params?.emptyNotesMessage;
  const removeNoteMessage = route.params?.removeNoteMessage;
  const removeNoteTitle = route.params?.removeNoteTitle;
  const confirm = route.params?.confirm;
  const cancel = route.params?.cancel;
  const {notes, setNotes} = useNotes();
  const { modeStyle } = useTheme();
  const { tempPremium, premium } = useAdControl();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [notesData, setNotesData] = React.useState([]);
  const [noteIdPressed, setNoteIdPressed] = React.useState([]);

  React.useEffect(()=>{
    if(notesData != notes){
      selectAll();
    }
  },[notes]);

  const removeItem = (id) => {
    service.remove(id);
    selectAll();
  }

  const selectAll = () => {
    service.all()
    .then((result) => {
      setNotesData(result); 
      setNotes(result);
    })
    .catch(error => {
      Alert.alert("Falhou em buscar as notas"); 
      console.error(error);
    });
  }

    return (
    <SafeAreaView style={[styles.container,
    modeStyle == "dark" ? {backgroundColor:"#121212"} : {backgroundColor:"#fbfbff"}]}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
           setModalVisible(!modalVisible);
        }}>
          <NoteDetails {...{noteIdPressed}}/>  
      </Modal>
      <Text style={[styles.titleTextNote, {marginBottom:10},
      modeStyle == "dark" ? {color: "#FFF", opacity: 0.86 } : {color: "#000", opacity: 0.86} ]}>{titlePage}</Text>
      {notesData.length > 0 ?
      <FlatList
        data={notesData.sort((a , b) => {
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        })}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={[{fontFamily:'MavenPro-Regular', fontSize:adjust(15)},
              modeStyle == "dark" ? {color: "#FFF", opacity: 0.86 } : {color: "#000", opacity: 0.86}]}>
              {timeConverter(parseInt(item.date))}</Text>
              <Card>
              <View style={{flexDirection:"row"}}>
                <View style={{flex:7}}>
                  <TouchableOpacity onPress={()=> {
                    setModalVisible(true);
                    setNoteIdPressed(item.id);
                    }}>
                    <Text style={styles.titleCardNote}>{item.title}</Text>
                    <Text style={styles.descriptionCardNote}>{item.description.substring(0,40)}{(item.description.length > 40)&&'...'}</Text>
                    <Text style={styles.versRef}>{item.version}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,alignSelf:"center"}}>
                  <FontAwesome5 onPress={()=>{
                      Alert.alert(title=removeNoteTitle,message=removeNoteMessage,
                      [
                        {
                          text: cancel,
                          style: 'cancel',
                        },
                        {
                          text: confirm,
                          onPress: () => removeItem(item.id),
                          style: 'confirm',
                        },
                      ],
                      {
                        cancelable: true,
                      });
                    }}name="trash" size={adjust(20)} color="black"/>
                </View>
              </View>
              </Card>
            </>
          );
        }}
      /> :
      <View View style={{flex:1, marginTop: 20}}>
        <Text style={[{textAlign:"center", fontSize:adjust(14), fontFamily:"MavenPro-Regular"},modeStyle=="dark" ?{color:"white", opacity:0.86}:null]}>{emptyNotesMessage}</Text>
      </View>
    }
    { tempPremium > new Date().getTime() || premium ? null :
    null //remover essa linha pelo Ad depois
      // <AdMobBanner style={{alignSelf:'center'}}
      //   bannerSize="smartBannerPortrait"
      //   adUnitID="ca-app-pub-8609227792865969/2073331085"
      //   servePersonalizedAds={false}
      //   onDidFailToReceiveAdWithError={(err) => console.error(err)}
      //   />
    }
    </SafeAreaView>
    )
}
const styles = dark;