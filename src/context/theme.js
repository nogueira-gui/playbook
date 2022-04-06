import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import * as Updates from 'expo-updates';
const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [modeStyle, setMode] = useState("light");

  useEffect(() => {
    getModeStyle();
  },[]);
  const getModeStyle = async () => {
    try{
      await AsyncStorage.getItem("@theme").then((value) => {
          if(value){
            setMode(value);
          }
        });
    }catch(err){
      console.error(err);
    }
  }
  const setModeStyle = async (value) => {
      try{
          await AsyncStorage.setItem("@theme", value);
          setMode(value);
          setNavBar(value);
          await Updates.reloadAsync();
      }catch(err){
          console.error(err);
      }
  }

  const setNavBar = async (value) => {
    try{
      if(value == "dark"){
        await NavigationBar.setBackgroundColorAsync("#121212");
      }else{
        await NavigationBar.setBackgroundColorAsync("#fbfbff");
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <ThemeContext.Provider value={{ modeStyle, setModeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext must be used within a ThemeProvider");
  const { modeStyle, setModeStyle } = context;
  return { modeStyle, setModeStyle };
}