import React from 'react';
import {Text,View,Button,SafeAreaView,ScrollView,StyleSheet,Overlay} from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from "../context/authContext";
import Spacer from "../components/spacer";
import { TouchableOpacity } from 'react-native-gesture-handler';
//livros padroes
const nvi = require ("../../biblia/nvi.json");
const aa = require ("../../biblia/aa.json");
const acf = require ("../../biblia/acf.json");

export default function Biblia({navigation}){
   const { signOut } = React.useContext(AuthContext);
   const [showSelec,setShowSelec] = React.useState(false);
   const [showSelecCap, setShowSelecCap] = React.useState(false);
   const [livro,setLivro] = React.useState(0);
   const [cap, setCap] = React.useState(0);
   const [biblia, setBiblia] = React.useState(nvi);
   const [_renderLivroCap, setRenderLivro] = React.useState();
   const [_renderVers, setRenderVers] = React.useState();

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
      setCap(biblia[livro-1].chapters.length-1) //volta para ultimo capitulo
      return
   }
   React.useEffect(() => {
         setRenderLivro( biblia[livro].name +" "+(cap+1) )

         setRenderVers( biblia[livro].chapters[cap].map((item,index) => {
            return(
            <Text style={styles.vers} key={index}>{index+1} {item}</Text>
            )
         }))

       }, [cap,livro,biblia]);

       const _listaLivros = () => (
         <>
           {biblia.map((item,index) => (
                     <TouchableOpacity key={index} onPress={() => {setLivro(index)}}>
                         <Text style={ livro == index ? styles.itemSelecionado : styles.vers}>{item.name}</Text>
                      </TouchableOpacity>
           ))}
         </>
       ); 
      const  ListaCap = () => (
         <>
         {  biblia[livro].chapters.map((value,id) => ( 
         <TouchableOpacity key={id} onPress={() => {setCap(id), setShowSelec(false)}}>
            <Text style={ cap == id ? styles.itemSelecionado : styles.vers}>
               Capitulo - {id+1}
            </Text>
         </TouchableOpacity>
            ))}
            </>
          ); 
    return (
 
      <SafeAreaView style={styles.container}>
      { !showSelec ? (
         <>
         <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{_renderLivroCap}</Text>
            {_renderVers}
         </ScrollView>
         <View style={styles.fixToText}>
            {biblia[livro].abbrev == "gn" & cap == 0 ? // Se for o primeiro livro disabilite o botao voltar
               <Button title="Anterior" disabled /> :
            livro > 0 & cap == 0 ?
               <Button title="Anterior" onPress={() => {_backBook()}} /> :
               <Button title="Anterior" enabled onPress={()=> {_backChapter()}}/> 
            }
            <Button title={biblia[livro].name +" "+(cap+1)} onPress={() => {setShowSelec(true),setCap(0)}} />
            {biblia[livro].chapters.length <= cap+1 ? //Caso seja o ultimo cap do livro leva para o proximo livro
               <Button title="Próximo" onPress={() => {_nextBook()}} /> :
               <Button title="Próximo" onPress={() => {_nextChapter()}}/> 
            }
         </View>
      </>
      ) : (      
      <View style={styles.ScrollSelector}>  
         <>     
         <ScrollView>
               {_listaLivros()}
                  <Spacer/>
         </ScrollView>       
         <ScrollView>
                  {ListaCap()}
                  <Spacer/>
         </ScrollView> 
         </>  
      </View>

      ) 
      }
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       backgroundColor: "white",
       marginTop: 2,//Constants.statusBarHeight,
    },
    fixToText: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      marginBottom: 3
    },
     vers: {
       fontSize: 18,
       textAlign: "justify",
       color: 'black',
       marginLeft: 15,
       marginRight: 15,
       alignSelf: "center",
       marginTop: 15
     },
     title: {
      fontSize: 25,
      textAlign: "justify",
      color: 'black',
      marginLeft: 15,
      marginRight: 15,
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
      // alignSelf: "",
      fontWeight:"bold",
      marginBottom: 100
    },
    ScrollSelector: {
       alignContent: "space-between",
       flexDirection: "row"
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
    }
 });