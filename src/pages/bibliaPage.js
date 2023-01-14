import React,{useEffect} from 'react';
// import {
//    AdMobBanner
//  } from 'expo-ads-admob';
import {Text,View,Modal,FlatList,SafeAreaView, ScrollView, Pressable, Dimensions} from 'react-native';
import { Entypo, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from "../components/spacer";
import CardVersicle from '../components/cardVersicle';
import AnimatedBottomView from '../components/animatedBottomView';
import adjust from '../utils/fontAdjust';
import { useBible } from '../context/bible';
import { useTheme } from '../context/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
//livros padroes
const nvi = require ("../../biblia/nvi.json");
const aa = require ("../../biblia/aa.json");
const acf = require ("../../biblia/acf.json");
const es_rvr = require("../../biblia/es_rvr.json");
const en_bbe = require("../../biblia/en_bbe.json");
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
import dark from '../style/dark';
import { useAdControl } from '../context/admobControl';
export default function Biblia({navigation, route}){
   const [modalVisible, setModalVisible] = React.useState(false);
   const {width} = Dimensions.get("window");
   const { isShowPanel, setCardColor, copySelectedVerses, sharePanel, bibleVersion, fontStyle, fontSize, editNote } = useBible();
   const { modeStyle } = useTheme();
   const { premium, tempPremium } = useAdControl();
   const scrollViewRef = React.useRef(null);
   const [livro,setLivro] = React.useState(0);
   const [cap, setCap] = React.useState(0);
   const [biblia, setBiblia] = React.useState({bible:nvi,version:"nvi"});
   const [bookList, setBookList] = React.useState(null);
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
      setCap(cap+1);
      scrollViewRef.current.scrollTo({y:0.1, animated:false});
   }   
   const _backChapter = () => {
      setCap(cap-1);
      scrollViewRef.current.scrollTo({y:0.1, animated:false});
   }
   const _nextBook = () => {
      setLivro(livro+1);
      setCap(0);
      scrollViewRef.current.scrollTo({y:0.1, animated:false});
   }
   const _backBook = () => {
      setLivro(livro-1);
      setCap(biblia.bible[livro-1].chapters.length-1); //volta para ultimo capitulo
      scrollViewRef.current.scrollTo({y:0.1, animated:false});
   }
   useEffect(() => {
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
            if( bibleVersion && bibleVersion != biblia.version){
               getBible();
            }
            setBookList(
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
            setRenderLivro( biblia.bible[livro].name +" "+(cap+1));
            if(biblia.version == "kjv"){
               setBuildVersText( 
                  biblia.bible[livro].chapters[cap].verses.map((item,index) => (
                        <View key={index} 
                           onLayout={(event) => {
                           const layout = event.nativeEvent.layout;
                           dataSourceCords[index] = layout.y;
                           setDataSourceCords(dataSourceCords);}}>      
                           <CardVersicle {...{livro, cap, index, item}}/>
                        </View>
                     )));
            }else{
               setBuildVersText(
                  biblia.bible[livro].chapters[cap].map((item,index) => (
                     <View key={index} onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        dataSourceCords[index] = layout.y;
                        setDataSourceCords(dataSourceCords);}}>
                        <CardVersicle {...{livro, cap, index, item}}/>
                     </View>
               )));
            }
            saveRecentPageView();
         }
       }, [cap,livro,biblia,yOffset, bibleVersion, fontStyle]);

      const getBible = async () => {
         try{
            await AsyncStorage.getItem("@bibleVersion").then((value) => {
               if(value != biblia){
                  if(value == "kjv"){
                     setBiblia({bible:kjv,version:"kjv"});
                     return;
                  }
                  if(value == "bbe"){
                     setBiblia({bible:en_bbe,version:"bbe"});
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
                  if(value == "aa"){
                     setBiblia({bible:aa,version:"aa"});
                     return;
                  }
                  if(value == "es_rvr"){
                     setBiblia({bible:es_rvr,version:"es_rvr"});
                     return;
                  }
               }
            })
         }catch(e){console.error(e);}
      }

      const saveRecentPageView = async () => {
         try {
            var jsonValue = "";
            if(livro==0 && cap == 0 && yOffset == 0){
               setYOffSet(1);
               jsonValue = JSON.stringify({data:{livro, cap, yOffset:1}});
            }else{
               jsonValue = JSON.stringify({data:{livro, cap, yOffset}});
            }
            await AsyncStorage.setItem("@RecentPageView",jsonValue);
         } catch (error) {
            console.log(error);
         }
      }

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
      }

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

      const copyToClipBoard = () => {
          copySelectedVerses(biblia.bible[livro].chapters[cap] || biblia.bible[livro].chapters[cap].verses,
            biblia.bible[livro].name +" "+(cap+1));
      }

      const dataToEditNote = () => {
         editNote(biblia.bible[livro].chapters[cap] || biblia.bible[livro].chapters[cap].verses, 
            biblia.bible[livro].name +" "+(cap+1));
         navigation.push('Editor');
      }

      const shareSelectedVerse = () => {
         sharePanel(biblia.bible[livro].chapters[cap] || biblia.bible[livro].chapters[cap].verses, 
            biblia.bible[livro].name +" "+(cap+1));
      }

    return (
      <SafeAreaView style={[styles.container, 
      modeStyle == "dark" ? {backgroundColor: "#121212"} : {backgroundColor: "#fbfbff"}]}>
         <>
         <Modal
         animationType="fade"
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
                        {bookList}
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
                     <TouchableOpacity style={versicle == parseInt(item.id)-1 ? styles.itemGridSelected : styles.itemGrid}>
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
         { tempPremium > new Date().getTime() || premium ? null :
         null // remover essa linha pelo ad depois
         // <AdMobBanner style={{alignSelf:'center'}}
         //       bannerSize="banner"
         //       adUnitID="ca-app-pub-8609227792865969/8052416071"
         //       servePersonalizedAds={false}// true or false
         //       onDidFailToReceiveAdWithError={(err) => console.error(err)}
         //          />
         }
         </Modal>
         <ScrollView style={[styles.scrollView, modeStyle == "dark" ? {
            backgroundColor: "#121212"
         } : {backgroundColor: "#fbfbff"}]} 
               showsVerticalScrollIndicator={false}
               onMomentumScrollEnd={event => setYOffSet(event.nativeEvent.contentOffset.y)}
               ref={scrollViewRef}
         >
            <Text style={[styles.title,{
                     fontSize: adjust(25)*fontSize,
                     fontFamily: fontStyle.titleBible,
            },modeStyle == "dark" ? {color: '#FFF',opacity:0.86 }: {color: '#040f16'}]}>{_renderLivroCap}</Text>
            {buildVersText}
            { tempPremium > new Date().getTime() || premium ? <><Spacer/><Spacer/><Spacer/></> :
            null // remover essa linha pelo ad depois
            // <AdMobBanner style={{alignSelf:'center', marginBottom:70}}
            //    bannerSize="banner"
            //    adUnitID="ca-app-pub-8609227792865969/6154625444"
            //    servePersonalizedAds={false}// true or false
            //    onDidFailToReceiveAdWithError={(err) => console.error(err)}
            //       />
            }
         </ScrollView>
         <View style={styles.navContainer}>
            { livro == 0 & cap == 0 ? // Se for o primeiro livro disabilite o botao voltar
            <TouchableOpacity style={styles.inactiveIconButton}>
               <Entypo name="arrow-bold-left" size={adjust(35)} color="grey" />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.activeIconButton}
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
               <Text style={{color:"#FFF" ,fontSize:adjust(22),fontFamily:'MavenPro-Medium'}}>
                  {biblia.bible[livro].name +" "+(cap+1)}
               </Text>
            </TouchableOpacity>
            {
            livro == 65 & cap == 21 ? //Caso seja o ultimo livro e ultimo cap desabilita botão Proximo
               <TouchableOpacity style={styles.inactiveIconButton}>
                  <Entypo name="arrow-bold-right" size={adjust(35)} color="grey" />
               </TouchableOpacity> :
               <TouchableOpacity style={styles.activeIconButton}
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
      <AnimatedBottomView>
               <View style={{flexDirection:"row"}}>
                     <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>{
                        dataToEditNote();
                        }}>
                        <Entypo name="new-message" size={adjust(28)} color="black" />
                     </TouchableOpacity>
                     <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>{copyToClipBoard()}}>
                        <Feather name="copy" size={adjust(28)} color="black" />
                     </TouchableOpacity>
                     <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>{shareSelectedVerse()}}>
                        <Ionicons name="md-share-social-outline" size={adjust(28)} color="black" />
                     </TouchableOpacity>
               </View>
               <View style={{marginTop:10, flexDirection:"row"}}>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"transparent"}]}onPress={()=>{setCardColor(livro,cap,"remove")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"grey"}]} onPress={()=>{setCardColor(livro,cap,"grey")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"#6a6ffb"}]} onPress={()=>{setCardColor(livro,cap,"#6a6ffb")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"#f93024"}]} onPress={()=>{setCardColor(livro,cap,"#f93024")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"green"}]} onPress={()=>{setCardColor(livro,cap,"green")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"yellow"}]} onPress={()=>{setCardColor(livro,cap,"yellow")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"purple"}]} onPress={()=>{setCardColor(livro,cap,"purple")}}>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.buttonColorMark,{backgroundColor:"pink"}]} onPress={()=>{setCardColor(livro,cap,"pink")}}>
                     </TouchableOpacity>
               </View>
               <View>
                  <TouchableOpacity style={{marginTop:10, width:width, alignItems:"center",justifyContent:"center"}} onPress={()=>{isShowPanel(false)}}>
                     <Text style={{fontSize: adjust(20), fontFamily:"MavenPro-Bold"}}>Close</Text>
                  </TouchableOpacity>      
               </View>
      </AnimatedBottomView>
      </SafeAreaView>
  );
}

const styles = dark;