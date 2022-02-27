import React, { createContext, useState, useContext } from "react";
import { ToastAndroid, Share } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import orderArray from  '../utils/orderArray';
import * as Clipboard from 'expo-clipboard';
const BibleContext = createContext();

export default function BibleProvider({ children }) {
  const [verseList, setVerseList] = useState([]);
  const [updateCard, setUpdateCard] = useState(false);
  const [showPanel, isShowPanel] = useState(false);

  const setList = (verseId, pressed) => {
    var list= verseList;
    var index = list.indexOf(verseId);
    if (pressed && index == -1){
      list.push(verseId)
    }
    else
    {
      if (index > -1) {
        list.splice(index, 1);
      }
    }
    if(list.length > 0){
      isShowPanel(true);
    }else{
      isShowPanel(false);
    }
    setVerseList(list);
  }
  
  const setCardColor = (livro, cap, color) => {
    setUpdateCard(true);
    if(color == "remove"){
      verseList.map((verse)=>{
        removeStoreVerse(livro,cap,verse);
      });
      return;
    }
    verseList.map((verse)=>{
      storeVerse(livro,cap,verse,color);
    });
  }
  const removeStoreVerse = async(livro,cap,verse) => {
    try{
        await AsyncStorage.removeItem(`@Versicle-${livro}-${cap}-${verse}`);
    }
    catch(e){
      console.error(e);
    }
  }

  const storeVerse = async (livro,cap,verse,color) => {
    try{
      await AsyncStorage.setItem(`@Versicle-${livro}-${cap}-${verse}`, color);
    }
    catch(e){console.error(e)}
  }

  const copySelectedVerses = (chapterBibleSelected, ref) => {
    var textClipboard = "";
    var list = orderArray(verseList);
    list.forEach((value)=>{
      if(!chapterBibleSelected.verses){
        textClipboard += `${value+1}. ${chapterBibleSelected[value]}\n`;
      }else{
        textClipboard += `${value+1}. ${chapterBibleSelected.verses[value].text}\n`;
      } 
      // setVerseList([]);
      // setUpdateCard(true);
      // isShowPanel(false);
    })
    textClipboard += `\n${ref} :${checkVerseSequences()}`;
    Clipboard.setString(textClipboard);
    ToastAndroid.show("Copiado!", ToastAndroid.SHORT);
  }

  const sharePanel = (chapterBibleSelected, ref) => {
    var textClipboard = "";
    var list = orderArray(verseList);
    list.forEach((value)=>{
      if(!chapterBibleSelected.verses){
        textClipboard += `${value+1}. ${chapterBibleSelected[value]}\n`;
      }else{
        textClipboard += `${value+1}. ${chapterBibleSelected.verses[value].text}\n`;
    }
  });
  textClipboard += `\n${ref} :${checkVerseSequences()}`;
  share(textClipboard);
    // setVerseList([]);
    // setUpdateCard(true);
    // isShowPanel(false);
  }

  const share = async (text) => {
    try {
      const result = await Share.share({
        message:
          `${text}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const checkVerseSequences = () =>{
    var refPart2 = "";
    var count= 0;
	 for(var i =0; i < verseList.length; i++){
	 	if(verseList[i+1]-verseList[i]==1){
	 		count++;
	 	} else if(count > 0){
	 		refPart2 += `, ${verseList[i-count]+1}-${verseList[i]+1}`;
	 		count=0;
	 	}else{
	 		refPart2+= `, ${verseList[i]+1}`;
	 	}
	 }
    return refPart2.substring(1);
  }

  return (
    <BibleContext.Provider value={{ showPanel, isShowPanel, verseList, setList, setVerseList, setCardColor, updateCard, setUpdateCard, copySelectedVerses, sharePanel }}>
      {children}
    </BibleContext.Provider>
  );
}

export function useBible() {
  const context = useContext(BibleContext);
  if (!context) throw new Error("BibleContext must be used within a BibleProvider");
  const { showPanel, isShowPanel, verseList, setList, setVerseList, setCardColor, updateCard, setUpdateCard, copySelectedVerses, sharePanel} = context;
  return { showPanel, isShowPanel, verseList, setList, setVerseList, setCardColor, updateCard, setUpdateCard, copySelectedVerses, sharePanel };
}