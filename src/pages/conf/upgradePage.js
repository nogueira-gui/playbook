import React from 'react';
import { Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  AdMobBanner,
  AdMobRewarded
} from 'expo-ads-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome,FontAwesome5,Entypo } from '@expo/vector-icons'; 
import Card from '../../components/card';
import adjust from '../../utils/fontAdjust';
import { useTheme } from '../../context/theme';
import { useAdControl } from '../../context/admobControl';
import { StatusBar } from 'expo-status-bar';
import MonetizationCtrl from "../../services/monetization";

const UpgradePage = () => {
  const { modeStyle } = useTheme(); 
  const { premium, tempPremium,setTempPremium, setPremium } = useAdControl();
  const [ showButtonTemp, setShowButtonTemp] = React.useState(false);
  const [isUpgradeBtnLoading,setIsUpgradeBtnLoading] = React.useState(false);

  React.useEffect(() => {
    return function cleanup() {
      AdMobRewarded.removeAllListeners();
      setShowButtonTemp(false);
      setIsUpgradeBtnLoading(false);
    };
  },[]);

  async function handlePurchase() {
    setIsUpgradeBtnLoading(true);

    try {
      const result = await MonetizationCtrl.I.buyUpgrade();
      if (result) {
        setPremium(true);
        Alert.alert(
          title="Upgrade app",
          message="Obrigado por utilizar nosso aplicativo!\n Esperamos garantir a melhor experiência para você!",
        );
      }
    } catch (e) {
      Alert.alert("Ocorreu um erro", JSON.stringify(e));
    }

    setIsUpgradeBtnLoading(false);
  }

  let loadAd = async () => {
    await AdMobRewarded.setAdUnitID("ca-app-pub-8609227792865969/2076908933");
    if(!showButtonTemp && tempPremium <= 0){
      await AdMobRewarded.requestAdAsync().then(()=>{
        setShowButtonTemp(true);
      }).catch(()=>{setShowButtonTemp(true)});    
    }
  }
  
  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward",(reward)=>{
    console.log("userDidEarnReward");
    if(reward.type == "removeAD"){
      removeADTemp();
    }
    // loadAd();
  });
  
  const removeADTemp = async () => {
    let tomorrow = new Date().getTime()+(24 * 60 * 60 * 1000);
    setTempPremium(tomorrow);
    await AsyncStorage.setItem("@blockAdTemp", tomorrow.toString());
  }

  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad",()=>{
    console.log("didFailtoLoad");
    if(!showButtonTemp){
      loadAd();
    }
  });
  
  AdMobRewarded.addEventListener("rewardedVideoDidDismiss",()=>{
    console.log("videoDidDismiss");
    if(!showButtonTemp){
      loadAd();
    }
  });

  loadAd();

  return (
    <SafeAreaView style={modeStyle == "dark" ? {
      backgroundColor: "#121212",
      flex:1,
      alignContent:'center'
    } : {
      backgroundColor: "#fbfbff",
      flex:1,
      alignContent:'center'
    }}>
      <StatusBar style= {modeStyle=='dark' ? "light" : "dark"} />
      {
      premium ? 
        <Card>
          <Text style={{fontSize: adjust(20), textAlign:'center'}}>{`Você já possui acesso PREMIUM  `} 
          <FontAwesome name="diamond" size={adjust(20)} color="black" /></Text> 
        </Card> :
      <>
      <Card>
        <Text style={{fontSize:adjust(14)}}><FontAwesome name="diamond" size={adjust(20)} color="black" />Aplicativo sem propagandas por tempo ilimitado</Text>
        <Text style={{fontSize:adjust(14)}}><Entypo name="heart" size={adjust(20)} color="red" />Apoiar desenvolvedores</Text>
        <Text style={{fontSize:adjust(12), textAlign:'justify'}}><FontAwesome5 name="hand-holding-usd" size={adjust(20)} color="black" />Aplicamos a política de reembolso de 3 dias, então sinta-se à vontade para experimentar tudo</Text>
      </Card>
      <Card>
        <Text style={{fontSize:adjust(17)}}>Por Apenas: </Text>
        <Text style={{fontSize:adjust(50), textAlign:'center'}}>R$ 1.99 </Text>
        <TouchableOpacity style={{
                        backgroundColor:"#7db32e",
                        borderRadius:30,
                        alignItems:'center',
                    }} onPress={()=>{
                      if(!isUpgradeBtnLoading){
                        handlePurchase();
                      }
                      }} >
          <Text style={{paddingVertical:'5%',fontSize:adjust(20), fontWeight:'bold', color:'white'}}>{`Melhorar aplicativo (Doar)`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
                        marginHorizontal:'10%',
                        marginVertical:'5%',
                        backgroundColor:"transparent",
                        borderBottomWidth: 1,
                        alignItems:'center',
                    }} >
          <Text style={{fontSize:adjust(14), fontWeight:'normal', color:'black'}}>{`Já fez essa operação antes?`}</Text>
        </TouchableOpacity>
      </Card>
      <>
      <Card>
        {
        showButtonTemp ?
        <TouchableOpacity 
        onPress={()=>{AdMobRewarded.showAdAsync()}}
        style={{
                        backgroundColor:"#7db32e",
                        borderRadius:20,
                        paddingVertical: 10,
                        marginHorizontal:'10%',
                        alignItems:'center'}}>
                          <Text style={{textAlignVertical:'center',textAlign:'center',color:'white', opacity:0.86}}><Entypo name="video" size={adjust(24)} color="white" /> Remover propagangas por 24 horas</Text>
        </TouchableOpacity> : null
        }
      </Card>
      {tempPremium > new Date().getTime() || premium ? null :
      <Card>
        <AdMobBanner style={{alignSelf:'center'}}
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-8609227792865969/8303421849"
          servePersonalizedAds={false}
          onDidFailToReceiveAdWithError={(err) => console.error(err)}
          />
      </Card>
      }
      </>
      </>
    }
    </SafeAreaView>
  );
};

export default UpgradePage;