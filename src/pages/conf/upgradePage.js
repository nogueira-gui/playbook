import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, Alert, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome,FontAwesome5,Entypo } from '@expo/vector-icons'; 
import Card from '../../components/card';
import adjust from '../../utils/fontAdjust';
import { useTheme } from '../../context/theme';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import Spacer from '../../components/spacer';

const UpgradePage = ({navigation, route}) => {
  const { modeStyle } = useTheme(); 
  const [fontText, setFontText] = React.useState({
    titleBible: "Cormorant-SemiBold",
    versIndex: "Cormorant-SemiBold",
    vers:"Cormorant-Medium",
    name:"Cormorant"
  });
  
  useEffect(() => {
  },[]);
  

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
      <Card>
        <Text style={{fontSize:adjust(14)}}><FontAwesome name="diamond" size={adjust(20)} color="black" />Aplicativo sem propagandas por tempo ilimitado</Text>
        <Text style={{fontSize:adjust(14)}}><Entypo name="heart" size={adjust(20)} color="red" />Doar para melhorar a qualidade do aplicativo</Text>
        <Text style={{fontSize:adjust(12), textAlign:'justify'}}><FontAwesome5 name="hand-holding-usd" size={adjust(20)} color="black" />Aplicamos a política de reembolso de 3 dias, então sinta-se à vontade para experimentar tudo</Text>
      </Card>
      <Card>
        <Text style={{fontSize:adjust(17)}}>Por Apenas: </Text>
        <Text style={{fontSize:adjust(50), textAlign:'center'}}>R$ 0.99 </Text>
        <TouchableOpacity style={{
                        backgroundColor:"#7db32e",
                        borderRadius:30,
                        alignItems:'center',
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
      <Card>
        <TouchableOpacity style={{
                        backgroundColor:"#7db32e",
                        borderRadius:20,
                        paddingVertical: 10,
                        marginHorizontal:'10%',
                        alignItems:'center'}}>
                          <Text style={{textAlignVertical:'center',textAlign:'center',color:'white', opacity:0.86}}><Entypo name="video" size={adjust(24)} color="white" /> Remover propagangas por 7 dias</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <AdMobBanner style={{alignSelf:'center'}}
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-8609227792865969/8303421849"
          servePersonalizedAds={false}
          onDidFailToReceiveAdWithError={(err) => console.error(err)}
          />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemArea: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: "5%",
  },
  title:{
    fontSize:adjust(30),
    fontFamily:'MavenPro-SemiBold',
    alignSelf: "center",
    marginBottom:"10%",
    marginTop:"10%",
  },
  itemText:{
    fontSize:24,
    fontFamily:'MavenPro-Medium',
  },
  appVersionStyle:{
    alignSelf:"center",
  },
  vers: {
    color: 'black',
    marginTop: 15,
    marginRight:20,
    marginBottom: 5,
  },
  versIndex: {
    color: 'blue',
    marginTop: 15,
    marginBottom: 5,
  },
  titleBible: {
    textAlign: "justify",
    color: '#040f16',
    marginLeft: 15,
    marginRight: 15,
    marginTop:10,
    alignSelf: "center",
    
  },
});

export default UpgradePage;