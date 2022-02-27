import React from 'react';
import {View,Button,Text,Alert,FlatList,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "../../components/card";
import { TouchableOpacity } from 'react-native-gesture-handler';
import adjust from '../../utils/fontAdjust';
import timeConverter from '../../utils/datetimeConverter';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import service from '../../services/notes';
import { useNotes } from '../../context/noteContext';
import light from '../../style/light';

export default function NotasPage({navigation, route}){
  const titlePage = route.params?.notes;
  const emptyNotesMessage = route.params?.emptyNotesMessage;
  const {notes, setNotes} = useNotes();
  const [notesData, setNotesData] = React.useState([]);

  React.useEffect(()=>{
    selectAll();
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
    <SafeAreaView style={styles.container}>
      <Text style={[styles.titleTextNote, {marginBottom:10}]}>{titlePage}</Text>
      {notesData.length > 0 ?
      <FlatList
        data={notesData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={{fontFamily:'MavenPro-Regular', fontSize:adjust(15)}}>{timeConverter(parseInt(item.date))}</Text>
              <Card>
              <View style={{flexDirection:"row"}}>
                <View style={{flex:7}}>
                  <TouchableOpacity onPress={()=> {Alert.alert("Abrir detalhes da nota")}}>
                    <Text style={styles.titleCardNote}>{item.title}</Text>
                    <Text style={styles.descriptionCardNote}>{item.description}</Text>
                    <Text style={styles.versRef}>{item.ref}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,alignSelf:"center"}}>
                  <FontAwesome5 onPress={()=>{
                      Alert.alert(title="Remove note",message="Deseja excluir a nota?",
                      [
                        {
                          text: 'cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'confirm',
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
        <Text style={{textAlign:"center", fontSize:adjust(14), fontFamily:"MavenPro-Regular"}}>{emptyNotesMessage}</Text>
      </View>
    }
      <AdMobBanner style={{alignSelf:'center'}}
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds={false}// true or false
        onDidFailToReceiveAdWithError={(err) => console.error(err)}
        />
    </SafeAreaView>
    )
}
const styles = light;