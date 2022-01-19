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

export default function NotasPage({navigation, route}){
  const titlePage = route.params?.notes;
  const [notes, setNotes] = React.useState([]);
  const [testJson, setTestJson] = React.useState('');
  let dataList =[{
    id: 0,
    ref: "gn 1:1-3",
    title: "Creation",
    description: "Lorem ipsum....",
    noteDate: new Date().getTime()
  },
  {
    id: 1,
    ref: "ex 3:3",
    title: "Test",
    description: "Lorem ipsum 2341.............................................................Teste",
    noteDate: parseInt(new Date().getTime())
  },
  ];

  
  React.useEffect(()=>{
    selectAll();
  },[]);
  
  const createItem = (item) => {
    service.create({ref:item.ref, title: item.title, description: item.description, date: item.date}).then((id) => {
      selectAll();
      console.log("Nota gravada id: ", id);
    }).catch((e)=>{
      Alert.alert("Erro ao gravar nota.");
      console.error(e);
    });
  }

  const removeItem = (id) => {
    service.remove(id);
    selectAll();
  }

  const selectAll = () => {
    service.all()
    .then(r => setNotes(r))
    .catch(e => {
      Alert.alert("Falhou em buscar as notas"); 
      console.error(e);
    });
  }

    return (
    <SafeAreaView>
      <Text style={styles.title}>{titlePage}</Text>
      {notes.length > 0 ?
      <FlatList
        style={{marginTop:10}}
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <>
              <Text>{timeConverter(parseInt(item.date))}</Text>
              <Card>
              <View style={{flexDirection:"row"}}>
                <View style={{flex:7}}>
                  <TouchableOpacity onPress={()=> {Alert.alert("Abrir detalhes da nota")}}>
                    <Text style={styles.titleCard}>{`${item.ref} - ${item.title}`}</Text>
                    <Text style={styles.descriptionCard}>{item.description}</Text>
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
      <Text style={{textAlign:"center", fontSize:adjust(12)}}>Por enquanto você não tem notas salvas</Text>
    }
      <AdMobBanner style={{alignSelf:'center'}}
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds={false}// true or false
        onDidFailToReceiveAdWithError={(err) => console.error(err)}
        />
        <Button title={"console ALL"} onPress={()=>{ service.all().then(r => console.log(r))}}></Button>
        <Button title={"Criar item"} onPress={()=>{ createItem({ref:"test1", title:"Titulo", description: "lore ipsum...", date: new Date().getTime()}) }}></Button>
        <Text>{testJson}</Text>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  title:{
    fontSize:adjust(30),
    alignSelf: "center",
    marginBottom:"10%",
    marginTop:"10%",
  },
  titleCard:{
    fontSize:adjust(12),
    fontStyle: 'italic',
  },
  descriptionCard:{
    fontSize: adjust(10),
    textAlign:"auto"
  }
 });