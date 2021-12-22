import React from 'react';
import {
   AdMobBanner,
   AdMobInterstitial,
   setTestDeviceIDAsync,
 } from 'expo-ads-admob'
import {Text,View,Modal,Alert,Button,SafeAreaView, ScrollView,StyleSheet, Pressable} from 'react-native';
import Spacer from "../components/spacer";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardVersicle from '../components/cardVersicle';
import AsyncStorage from '@react-native-async-storage/async-storage';
//livros padroes
const nvi = require ("../../biblia/nvi.json");
const aa = require ("../../biblia/aa.json");
const acf = require ("../../biblia/acf.json");
const kjv = [
   require ("../../biblia/kjv/Genesis.json"),
   require ("../../biblia/kjv/Exodus.json"),
   require ("../../biblia/kjv/Leviticus.json"),
   require ("../../biblia/kjv/Numbers.json"),
   require ("../../biblia/kjv/Deuteronomy.json"),
   require ("../../biblia/kjv/Joshua.json"),
   require ("../../biblia/kjv/Judges.json"),
   require ("../../biblia/kjv/Ruth.json"),
   require ("../../biblia/kjv/1Samuel.json"),
   require ("../../biblia/kjv/2Samuel.json"),
   require ("../../biblia/kjv/1Kings.json"),
   require ("../../biblia/kjv/2Kings.json"),
   require ("../../biblia/kjv/1Chronicles.json"),
   require ("../../biblia/kjv/2Chronicles.json"),
   require ("../../biblia/kjv/Ezra.json"),
   require ("../../biblia/kjv/Nehemiah.json"),
   require ("../../biblia/kjv/Esther.json"),
   require ("../../biblia/kjv/Job.json"),
   require ("../../biblia/kjv/Psalms.json"),
   require ("../../biblia/kjv/Proverbs.json"),
   require ("../../biblia/kjv/Ecclesiastes.json"),
   require ("../../biblia/kjv/SongofSolomon.json"),
   require ("../../biblia/kjv/Isaiah.json"),
   require ("../../biblia/kjv/Jeremiah.json"),
   require ("../../biblia/kjv/Lamentations.json"),
   require ("../../biblia/kjv/Ezekiel.json"),
   require ("../../biblia/kjv/Daniel.json"),
   require ("../../biblia/kjv/Hosea.json"),
   require ("../../biblia/kjv/Joel.json"),
   require ("../../biblia/kjv/Amos.json"),
   require ("../../biblia/kjv/Obadiah.json"),
   require ("../../biblia/kjv/Jonah.json"),
   require ("../../biblia/kjv/Micah.json"),
   require ("../../biblia/kjv/Nahum.json"),
   require ("../../biblia/kjv/Habakkuk.json"),
   require ("../../biblia/kjv/Zephaniah.json"),
   require ("../../biblia/kjv/Haggai.json"),
   require ("../../biblia/kjv/Zechariah.json"),
   require ("../../biblia/kjv/Malachi.json"),
   require ("../../biblia/kjv/Matthew.json"),
   require ("../../biblia/kjv/Mark.json"),
   require ("../../biblia/kjv/Luke.json"),
   require ("../../biblia/kjv/John.json"),
   require ("../../biblia/kjv/Acts.json"),
   require ("../../biblia/kjv/Romans.json"),
   require ("../../biblia/kjv/1Corinthians.json"),
   require ("../../biblia/kjv/2Corinthians.json"),
   require ("../../biblia/kjv/Galatians.json"),
   require ("../../biblia/kjv/Ephesians.json"),
   require ("../../biblia/kjv/Philippians.json"),
   require ("../../biblia/kjv/Colossians.json"),
   require ("../../biblia/kjv/1Thessalonians.json"),
   require ("../../biblia/kjv/2Thessalonians.json"),
   require ("../../biblia/kjv/1Timothy.json"),
   require ("../../biblia/kjv/2Timothy.json"),
   require ("../../biblia/kjv/Titus.json"),
   require ("../../biblia/kjv/Philemon.json"),
   require ("../../biblia/kjv/Hebrews.json"),
   require ("../../biblia/kjv/James.json"),
   require ("../../biblia/kjv/1Peter.json"),
   require ("../../biblia/kjv/2Peter.json"),
   require ("../../biblia/kjv/1John.json"),
   require ("../../biblia/kjv/2John.json"),
   require ("../../biblia/kjv/3John.json"),
   require ("../../biblia/kjv/Jude.json"),
   require ("../../biblia/kjv/Revelation.json")
];
export default function Biblia({navigation, route}){
   const [modalVisible, setModalVisible] = React.useState(false);
   const scrollViewRef = React.useRef(null);
   const [livro,setLivro] = React.useState(0);
   const [cap, setCap] = React.useState(0);
   const [biblia, setBiblia] = React.useState({bible:kjv,version:"kjv"});
   const [versicle, setVersicle] = React.useState(0);
   const [_renderLivroCap, setRenderLivro] = React.useState();
   const [buildVersText, setBuildVersText] = React.useState();
   const [yOffset, setYOffSet] = React.useState(0);
   const [isLoadedParams, setIsLoadedParams] = React.useState(false);
   const [dataSourceCords, setDataSourceCords] = React.useState([]);

   const _nextChapter = () => {
      setCap(cap+1)
      return  
   }   
   const _backChapter = () => {
      setCap(cap-1)
      return  
   }
   const _nextBook = () => {
      setLivro(livro+1)
      setCap(0)
      return
   }
   const _backBook = () => {
      setLivro(livro-1)
      setCap(biblia.bible[livro-1].chapters.length-1) //volta para ultimo capitulo
      return
   }
   React.useEffect(() => {
         if(!isLoadedParams){
            if(route.params?.data){
               setLivro(route.params?.data.livro);
               setCap(route.params?.data.cap);
               if(route.params?.data.yOffset && scrollViewRef.current !== null){
                  setYOffSet(route.params?.data.yOffset);
                  scrollViewRef.current.scrollTo({
                     y: route.params?.data.yOffset,
                     animated: true,
                  });
               }else{setYOffSet(0);}
            }else{
               setLivro(0);
               setCap(0);
               setYOffSet(0);
            }
            setIsLoadedParams(true);
         }else{
            setRenderLivro( biblia.bible[livro].name +" "+(cap+1));
            if(biblia.version == "kjv"){
               setBuildVersText( biblia.bible[livro].chapters[cap].verses.map((item,index) => (
                  <View key={index} 
                     onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[index] = layout.y;
                        setDataSourceCords(dataSourceCords);}}>
                        <CardVersicle  
                           {...{livro, cap, index, item}}
                        />
                  </View>
               )));
            }else{
               setBuildVersText(
                  biblia.bible[livro].chapters[cap].map((item,index) => (
                     <View key={index} onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[index] = layout.y;
                        setDataSourceCords(dataSourceCords);}}>
                        <CardVersicle 
                           {...{livro, cap, index, item}}/>
                     </View>
                  )));
               }
            saveRecentPageView();
         }
         console.log(dataSourceCords);
       }, [cap,livro,biblia,yOffset]);

      const saveRecentPageView = async () => {
         try {
            var jsonValue = "";
            if(livro==0 && cap == 0 && yOffset == 0){
               setYOffSet(1);
               jsonValue = JSON.stringify({data:{livro, cap, yOffset:1}}); //resolvendo bug do storage para yOffset0
            }else{
               jsonValue = JSON.stringify({data:{livro, cap, yOffset}});
            }
            await AsyncStorage.setItem("@RecentPageView",jsonValue);
         } catch (error) {
            console.log(error);
         }
      }
      const _listaLivros = () => (
         <>
           {biblia.bible.map((item,index) => (
            <Pressable key={index} onPress={() => {setLivro(index), setCap(0), setVersicle(0)}}>
               <Text style={ livro == index ? styles.itemSelecionado : styles.selector}>{item.name}</Text>
            </Pressable>
           ))}
         </>
      ); 
      const ListaCap = () => (
         <>
         {  biblia.bible[livro].chapters.map((value,id) => ( 
         <Pressable key={id} onPress={() => {setCap(id), setVersicle(0)}}>
            <Text style={ cap == id ? styles.selectedCap : styles.selectorCap}>
               {id+1}
            </Text>
         </Pressable>
         ))}
         </>
      ); 
      const ListaVers = () => (
         <>
         {  biblia.version == "kjv" ? biblia.bible[livro].chapters[cap].verses.map((value,id) => ( 
         <Pressable key={id} onPress={() => {setVersicle(id),scrollHandler(id);}}>
            <Text style={ versicle == id ? styles.selectedCap : styles.selectorCap}>
               {id+1}
            </Text>
         </Pressable>
         )): biblia.bible[livro].chapters[cap].map((value,id) => ( 
            <Pressable key={id} onPress={() => {setVersicle(id),scrollHandler(id);}}>
               <Text style={ versicle == id ? styles.selectedCap : styles.selectorCap}>
                  {id+1}
               </Text>
            </Pressable>
            ))}
         </>
      ); 

      const scrollHandler = (id) => {
         if (dataSourceCords.length > id) {
           setModalVisible(false);
           scrollViewRef.current.scrollTo({
             x: 0,
             y: dataSourceCords[id],
             animated: true,
           });
         } else {
           alert('Out of Max Index');
         }
       };

    return (
      <SafeAreaView style={styles.container}>
         <>
         <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
         }}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style={styles.ScrollSelector}>  
               <>     
                  <View>
                     <Text>Livro</Text>
                     <ScrollView>
                        {_listaLivros()}
                        <Spacer/>
                     </ScrollView>
                  </View>   
                  <View>
                     <Text>Cap</Text>
                     <ScrollView>
                        {ListaCap()}
                        <Spacer/>
                     </ScrollView> 
                  </View>    
                  <View>
                     <Text>Vers.</Text>
                     <ScrollView>
                        {ListaVers()}
                        <Spacer/>
                     </ScrollView> 
                  </View>  
               </>  
            </View>
               <Pressable
               style={[styles.buttonModal, styles.buttonClose]}
               onPress={() => setModalVisible(!modalVisible)}>
               <Text style={styles.textStyle}>Fechar</Text>
               </Pressable>
            </View>
         </View>
         <AdMobBanner style={{alignSelf:'center'}}
               bannerSize="banner"
               adUnitID="ca-app-pub-3940256099942544/6300978111"
               servePersonalizedAds={false}// true or false
               onDidFailToReceiveAdWithError={(err) => console.error(err)}
                  />
         </Modal>
         <ScrollView style={styles.scrollView} 
               showsVerticalScrollIndicator={false}
               onMomentumScrollEnd={event => setYOffSet(event.nativeEvent.contentOffset.y)}
               ref={scrollViewRef}
               // contentOffset={{y:yOffset}}
         >
            <Text style={styles.title}>{_renderLivroCap}</Text>
            {buildVersText}
            <AdMobBanner style={{alignSelf:'center'}}
               bannerSize="banner"
               adUnitID="ca-app-pub-3940256099942544/6300978111"
               servePersonalizedAds={false}// true or false
               onDidFailToReceiveAdWithError={(err) => console.error(err)}
                  />
         </ScrollView>
         <View style={styles.fixToText}>
            {livro == 0 & cap == 0 ? // Se for o primeiro livro disabilite o botao voltar
               <Button title="Anterior" disabled /> :
            livro > 0 & cap == 0 ?
               <Button title="Anterior" onPress={() => {_backBook()}} /> :
               <Button title="Anterior" enabled onPress={()=> {_backChapter()}}/> 
            }
            <Button title={biblia.bible[livro].name +" "+(cap+1)} onPress={() => {setModalVisible(true)}} />
            {
            livro == 65 & cap == 21 ? //Caso seja o ultimo livro e ultimo cap desabilita botão Proximo
               <Button title= "Proximo" disabled /> :
            biblia.bible[livro].chapters.length <= cap+1 ? //Caso seja o ultimo cap do livro leva para o proximo livro
               <Button title="Próximo" onPress={() => {_nextBook()}} /> :
               <Button title="Próximo" onPress={() => {_nextChapter()}}/> 
            }
         </View>
      </>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       backgroundColor: "white",
       marginTop: 2,
    },
    fixToText: {
      // marginBottom: 10,
      padding:5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 8,
      marginTop:20,
      marginBottom: 3
    },
     vers: {
       fontSize: 16,
       color: 'black',
       marginTop: 15,
       marginBottom: 5,
     },
     selector: {
      fontSize: 16,
     //  textAlign: "justify",
      color: 'black',
      alignSelf: "center",
      marginTop: 15,
    },
    selectorCap: { 
      fontSize: 24,
      //  textAlign: "justify",
       color: 'black',
       alignSelf: "center",
       marginTop: 15,
    },
     title: {
      fontSize: 25,
      textAlign: "justify",
      color: 'black',
      marginLeft: 15,
      marginRight: 15,
      marginTop:60,
      alignSelf: "center",
      fontWeight:"bold"
      
    },
    subtitle: {
      fontSize: 24,
      textAlign: "justify",
      color: '#FFF',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginTop: 15
    },
    versRef: {
      fontSize: 14,
      textAlign: "right",
      color: 'black',
      marginLeft: 15,
      marginRight: 15,
      fontWeight:"bold",
      marginBottom: 100
    },
    ScrollSelector: {
       alignContent: "space-between",
       flexDirection: "row",
       marginBottom:20
    },
    itemSelecionado:{
      color: 'blue',
      fontWeight:"bold",
      fontSize: 18,
      textAlign: "justify",
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      marginTop: 15
    },
    selectedCap:{
      color: 'blue',
      fontWeight:"bold",
      fontSize: 24,
      textAlign: "justify",
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      marginTop: 15
    },
  centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 22,
 },
 modalView: {
   margin: "8%",
   marginVertical: "30%",
   backgroundColor: 'white',
   borderRadius: 20,
   paddingTop:20,
   paddingHorizontal:"20%",
   paddingBottom:"20%",
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
 },
 buttonModal: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
 },
 buttonOpen: {
   backgroundColor: '#F194FF',
 },
 buttonClose: {
   backgroundColor: '#2196F3',
 },
 textStyle: {
   color: 'white',
   fontWeight: 'bold',
   textAlign: 'center',
 },
 modalText: {
   marginBottom: 15,
   textAlign: 'center',
 },
 });