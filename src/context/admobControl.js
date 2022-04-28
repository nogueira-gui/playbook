import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MonetizationCtrl from "../services/monetization";
const AdContext = createContext();

export default function AdProvider({ children }) {
  const [premium, setPremium] = useState(false);
  const [tempPremium, setTempPremium] = useState(0);

  useEffect(()=>{
      hasUpgradedToPremium();
      if(tempPremium < new Date().getTime()){
        getLoadTempPremiumStorage();
      }
  })

  const hasUpgradedToPremium = async () => {
      await AsyncStorage.getItem("@premium").then((premium) => {
          if(premium){
            setPremium(JSON.parse(premium));
        } else {
          restoreUpgrade();
        }
      });
    }
    
    const restoreUpgrade = async () => {
      await MonetizationCtrl.I.restoreUpgrade().then(result => {
        if(result){
          setPremium(true);
        }
      });      
    }
  const getLoadTempPremiumStorage = async () => {
    await AsyncStorage.getItem("@blockAdTemp").then((timestamp)=>{
        if(timestamp && parseInt(timestamp) > parseInt(new Date().getTime())){
            setTempPremium(parseInt(timestamp));
        }
    })
  }

  return (
    <AdContext.Provider value={{ premium, setPremium, tempPremium, setTempPremium }}>
      {children}
    </AdContext.Provider>
  );
}

export function useAdControl() {
  const context = useContext(AdContext);
  if (!context) throw new Error("AdContext must be used within a AdProvider");
  const { premium, setPremium, tempPremium, setTempPremium } = context;
  return { premium, setPremium, tempPremium, setTempPremium };
}