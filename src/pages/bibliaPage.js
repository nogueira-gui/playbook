import React from 'react';
import {
   AdMobBanner,
   AdMobInterstitial,
   setTestDeviceIDAsync,
 } from 'expo-ads-admob'
import {Text,View,Modal,FlatList,SafeAreaView, ScrollView,StyleSheet, Pressable} from 'react-native';
import Spacer from "../components/spacer";
import CardVersicle from '../components/cardVersicle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adjust from '../utils/fontAdjust';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
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
   const [modalVerseOption, setModalVerseOption] = React.useState(false);
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
   const [switchSelector, setSwitchSelector] = React.useState("book");
   const closeButton = route.params?.close;
   const bookT = route.params?.book;
   const chapterT = route.params?.chapter;
   const verseT = route.params?.verse;

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
            if(route.params?.recentPage?.data){
               getBible();
               setLivro(route.params?.recentPage.data.livro);
               setCap(route.params?.recentPage.data.cap);
               if(route.params?.recentPage.data.yOffset && scrollViewRef.current !== null){
                  setYOffSet(route.params?.recentPage.data.yOffset);
                  scrollViewRef.current.scrollTo({
                     y: route.params?.recentPage.data.yOffset,
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
       }, [cap,livro,biblia,yOffset]);

      const getBible = async () => {
         try{
            await AsyncStorage.getItem("@bibleVersion").then((value) => {
               if(value != biblia){
                  if(value == "kjv"){
                     setBiblia({bible:kjv,version:"kjv"});
                     return;
                  }
                  if(value == "nvi"){
                     setBiblia({bible:nvi,version:"nvi"});
                     return;
                  }
                  if(value == "acf"){
                     setBiblia({bible:acf,version:"acf"});
                     return;
                  }
                  if(value == "acf"){
                     setBiblia({bible:aa,version:"aa"});
                     return;
                  }
               }
            })
         }catch(e){console.error(e);}
      }

      const saveRecentPageView = async () => {
         //TODO - evitar que o asyncStorage seja enfileirado ao passar rapidamente varios capitulos
         // fazer que uma nova requisição invalide a anterior
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
            <Pressable key={index} 
               onPress={() => {
                  setLivro(index),
                  setCap(0),
                  setVersicle(0),
                  scrollViewRef.current.scrollTo({y:1, animated:false}),
                  setSwitchSelector("chapter")}}
            >
               <Text style={ livro == index ? styles.itemSelecionado : styles.selector}>{item.name}</Text>
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
           console.log('Out of Max Index')
         }
       };

      const createRowsChapter = () => {
         const columns = 5;
         let dataList = [];
         if(switchSelector == "chapter"){
            biblia.bible[livro].chapters.map((cap, id) => {
               dataList.push({id: id+1 < 10 ? "0"+(id+1).toString() : (id+1).toString() ,
               empty: false,
            })});
         }else{
            return;
         }
         const rows = Math.floor(dataList.length / columns);
         let lastRowElements = dataList.length - rows * columns;
       
         while (lastRowElements !== columns) {
            dataList.push({
             id: `empty-${lastRowElements}`,
             empty: true
           });
           lastRowElements += 1;
         }
         return dataList;
       }

       const createRowsVersicle = () => {
         const columns = 5;
         let dataList = [];
         if(switchSelector == "versicle"){
            if(biblia.version=="kjv"){
               biblia.bible[livro].chapters[cap].verses.map((cap, id) => {
                  dataList.push({id: id+1 < 10 ? "0"+(id+1).toString() : (id+1).toString() ,
                  empty: false,
               })});
            }else{
               biblia.bible[livro].chapters[cap].map((cap, id) => {
                  dataList.push({id: id+1 < 10 ? "0"+(id+1).toString() : (id+1).toString() ,
                  empty: false,
               })});
            }
         }else{return;}
         const rows = Math.floor(dataList.length / columns);
         let lastRowElements = dataList.length - rows * columns;
       
         while (lastRowElements !== columns) {
            dataList.push({
             id: `empty-${lastRowElements}`,
             empty: true
           });
           lastRowElements += 1;
         }
         return dataList;
       }

    return (
      <SafeAreaView style={styles.container}>
         <>
         <Modal
         animationType="fade"
         transparent={true}
         visible={modalVerseOption}
         onRequestClose={() => {
            setModalVerseOption(!modalVerseOption);
         }}>
            <View>
               <TouchableOpacity onPress={()=>{setModalVerseOption(false)}}>
                  <Text>Fechar</Text>
               </TouchableOpacity>
            </View>
         </Modal>
         <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => {
            setModalVisible(!modalVisible);
         }}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View>  
               <SafeAreaView>
                  <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:10,
               }}>
                     <Pressable style={{backgroundColor: "#transparent", padding:"2%"}}
                        onPress={()=>setSwitchSelector("book")}>
                        <Text style={switchSelector=="book" ? styles.selectedCap : styles.selectorCap}>{bookT}</Text>  
                     </Pressable>
                     <Pressable style={{backgroundColor: "#transparent", padding:"2%"}}
                        onPress={()=>setSwitchSelector("chapter")}>
                        <Text style={switchSelector=="chapter" ? styles.selectedCap : styles.selectorCap}>{chapterT}</Text>
                     </Pressable>
                     <Pressable style={{backgroundColor: "#transparent", padding:"2%"}}
                        onPress={()=>setSwitchSelector("versicle")}>
                        <Text style={switchSelector=="versicle" ? styles.selectedCap : styles.selectorCap}>{verseT}</Text>
                     </Pressable>
                  </View>
                  { switchSelector == "book" ? 
                     <ScrollView>
                        {_listaLivros()}
                        <Spacer/>
                     </ScrollView>   
                  : switchSelector == "chapter" ?
                  <FlatList
                     style={{marginTop:20}}
                     data={createRowsChapter()}
                     keyExtractor={item => item.id}
                     numColumns={5}
                     renderItem={({ item }) => {
                        if (item.empty) {
                           return <View style={[styles.itemGrid, styles.itemEmpty]} />;
                        }
                        return (
                              <TouchableOpacity style={cap == parseInt(item.id)-1 ? styles.itemGridSelected : styles.itemGrid}>
                                 <Text style={cap == parseInt(item.id)-1 ? styles.textItemGridSelected : styles.textItemGrid} 
                                 onPress={() =>{
                                    setCap(parseInt(item.id)-1),setVersicle(0), setSwitchSelector("versicle")
                                 }}>{item.id}</Text>
                              </TouchableOpacity>
                        );
                     }}
                  /> :
                  <FlatList
                  style={{marginTop:20}}
                  data={createRowsVersicle()}
                  keyExtractor={item => item.id}
                  numColumns={5}
                  renderItem={({ item }) => {
                     if (item.empty) {
                     return <View style={[styles.itemGrid, styles.itemEmpty]} />;
                     }
                     return (
                     <TouchableOpacity style={versicle == parseInt(item.id)-1 ? styles.itemGridSelected : styles.itemGrid} 
                     >
                        <Text style={versicle == parseInt(item.id)-1 ? styles.textItemGridSelected : styles.textItemGrid}
                        onPress={()=>{setVersicle(parseInt(item.id)-1),scrollHandler(parseInt(item.id)-1),setSwitchSelector("book")}}
                        >{item.id}</Text>
                     </TouchableOpacity>
                     );
                  }}
               />}
                  </SafeAreaView>
            </View>
               <Pressable
               style={[styles.buttonModal, styles.buttonClose]}
               onPress={() => {setModalVisible(!modalVisible), setSwitchSelector("book")}}>
               <Text style={styles.textStyle}>{closeButton}</Text>
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
         >
            <Text style={styles.title}>{_renderLivroCap}</Text>
            {buildVersText}
            <AdMobBanner style={{alignSelf:'center', marginBottom:70}}
               bannerSize="banner"
               adUnitID="ca-app-pub-3940256099942544/6300978111"
               servePersonalizedAds={false}// true or false
               onDidFailToReceiveAdWithError={(err) => console.error(err)}
                  />
         </ScrollView>
         <View style={styles.navContainer}>
            {livro == 0 & cap == 0 ? // Se for o primeiro livro disabilite o botao voltar
            <TouchableOpacity style={[{ elevation: 4, backgroundColor:"#FFF", shadowOpacity:1, borderColor:"grey", borderRadius:25, borderWidth:3}]}>
               <Entypo name="arrow-bold-left" size={adjust(35)} color="grey" />
            </TouchableOpacity> :
            <TouchableOpacity style={[{ elevation: 4, backgroundColor:"#FFF", shadowOpacity:1, borderColor:"#2196F3", borderRadius:25, borderWidth:3}]}
            onPress={() => {
               if(livro > 0 & cap == 0){
                  _backBook();
               }else{
                  _backChapter();
               }
               }}>
               <Entypo name="arrow-bold-left" size={adjust(35)} color="#2196F3" />
            </TouchableOpacity> 
            }
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonBookNav} 
            onPress={() => {setModalVisible(true)}}>
               <Text style={{color:"#FFF" ,fontSize:adjust(20)}}>
                  {biblia.bible[livro].name +" "+(cap+1)}
               </Text>
            </TouchableOpacity>
            {
            livro == 65 & cap == 21 ? //Caso seja o ultimo livro e ultimo cap desabilita botão Proximo
               <TouchableOpacity style={[{ elevation: 4, backgroundColor:"#FFF", shadowOpacity:1, borderColor:"grey", borderRadius:25, borderWidth:3}]}>
                  <Entypo name="arrow-bold-right" size={adjust(35)} color="grey" />
               </TouchableOpacity> :
               <TouchableOpacity style={[{ elevation: 4, backgroundColor:"#FFF", shadowOpacity:1, borderColor:"#2196F3", borderRadius:25, borderWidth:3}]}
               onPress={() => {
                  //Caso seja o ultimo cap do livro leva para o proximo livro
                  if(biblia.bible[livro].chapters.length <= cap+1){
                     _nextBook();
                  }else{
                     _nextChapter();
                  }}}>
                  <Entypo name="arrow-bold-right" size={adjust(35)} color="#2196F3" />
               </TouchableOpacity>
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
    navContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      position: 'absolute',
      marginBottom:10,
      bottom:0,
    },
    buttonBookNav: {
      padding:5,
      marginHorizontal:10,
      backgroundColor: '#2196F3',
      elevation: 4,
      borderRadius:10,
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
      fontSize: adjust(16),
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
      fontSize: adjust(18),
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
   justifyContent: 'space-between',
   alignItems: 'center',
   marginTop: 22,
 },
 modalView: {
   margin: "4%",
   marginVertical: "30%",
   backgroundColor: 'white',
   borderRadius: 20,
   paddingTop:"5%",
   paddingHorizontal:"5%",
   paddingBottom:"15%",
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
 itemGrid: {
   alignItems: "center",
   backgroundColor: "transparent",
   borderWidth: 1,
   borderColor: "thistle",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.6%"
 },
 itemGridSelected: {
   alignItems: "center",
   backgroundColor: "transparent",
   borderWidth: 2,
   borderColor: "blue",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.4%"
 },
 itemEmpty: {
   borderWidth: 0,
   backgroundColor: "transparent",
   borderRadius: 30,
   flexBasis: 0,
   flexGrow: 1,
   margin: 2,
   padding: "4.4%"
 },
 textItemGrid: {
   color: "#333333",
   fontSize: adjust(20),
 },
 textItemGridSelected: {
   color: "blue",
   fontSize: adjust(20),
 },
 });