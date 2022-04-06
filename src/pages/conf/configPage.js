import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';
import Card from '../../components/card';
import Slider from '@react-native-community/slider';
import { useBible } from '../../context/bible';
import { useTheme } from '../../context/theme';
import adjust from '../../utils/fontAdjust';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
const appVersion = require("../../../app.json");

const ConfigPage = ({navigation, route}) => {
  const [pressed, setPressed] = useState("");
  const [open, setOpen] = React.useState(false);
  const { setBibleVersion, setFontStyle, fontSize, setFontSize } = useBible();
  const { modeStyle, setModeStyle } = useTheme(); 
  const [dropdownValue, setDropdownValue] = React.useState(null);
  const [initialSliderValue, setInitialSliderValue] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(1); 
  const [ languageButton, setLanguage] = React.useState('');
  const [fontText, setFontText] = React.useState({
    titleBible: "Cormorant-SemiBold",
    versIndex: "Cormorant-SemiBold",
    vers:"Cormorant-Medium",
    name:"Cormorant"
  });
  const [items, setItems] = React.useState([
    {label: 'NVI   pt-br', value: 'nvi'},
    {label: 'AA    pt-br', value: 'aa'},
    {label: 'ACF  pt-br', value: 'acf'},
    {label: 'KJV   en', value: 'kjv'},
    {label: 'RVR   es', value: 'es_rvr'},
  ]);
  const settings = route.params?.settings;
  const bibleVersions = route.params?.bibleVersions;
  const appearance = route.params?.appearance;
  const language = route.params?.language;
  const clearData = route.params?.clearData;
  const clearDataMessageAlert = route.params?.clearDataMessageAlert;
  const clearMessageDone = route.params?.clearMessageDone;
  const donate = route.params?.donate;
  const about = route.params?.about;
  const confirm = route.params?.confirm;
  const cancel = route.params?.cancel;
  const languageSetting = route.params?.languageSetting;
  
  useEffect(() => {
    getVersion();
    getSliderValue();
    getFont();
    getLanguage();
  },[]);
  
  const getFont = async () => {
    try{
      await AsyncStorage.getItem("@fontStyle").then((font) => {
        if(font){
          setFontText(JSON.parse(font)); 
        }else{
          setFontText({
            titleBible: "Cormorant-SemiBold",
            versIndex: "Cormorant-SemiBold",
            vers:"Cormorant-Medium",
            name:"Cormorant"
          });
        }
      })
    }catch(e){  
      console.error(e);
    }
  }
  const getSliderValue = async () => {
    try{
      await AsyncStorage.getItem("@sliderValue").then((value) => {
          if(value){
            setInitialSliderValue(parseFloat(value));
            setSliderValue(parseFloat(value));
        }else{
          setInitialSliderValue(1);
          setSliderValue(1);
        }
      })
    }catch(error){
        console.log(error);
    }
  }

  const getVersion = async () => {
    try{
      await AsyncStorage.getItem("@bibleVersion").then((value) => {
          if(value){
            setDropdownValue(value);
          }
      });
    }catch(error){
      console.log(error);
    }
  }

  const getLanguage = async () => {
    AsyncStorage.getItem("@language").then((value)=>{
      if(value){
        setLanguage(value);
      }else{
        setLanguage(languageSetting.substring(0,2));
      }
    })
  }

  const clearAllData = async () => {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert(clearMessageDone));
    await Updates.reloadAsync();
  }

  const showAlert = (type, title, message) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: cancel,
        style: 'cancel',
      },
      {
        text: confirm,
        onPress: () => handledAlertSubmit(type),
        style: 'confirm',
      },
    ],
    {
      cancelable: true,
    }
  );

  const handledAlertSubmit = async (type) => {
    if(type === "clear_data"){
      clearAllData();
    }else if(type == "light" || type == "dark"){
      setModeStyle(type);
    }else if(type == "pt" || type == "en" || type == "es"){
      AsyncStorage.setItem("@language", type);
      await Updates.reloadAsync();
    }
  }
  const setSelectedVersionBible = (value) => {
    AsyncStorage.setItem("@bibleVersion", value);
    setBibleVersion(value);
  }
  
  const setSliderValueOnStorage = async () => {
    await AsyncStorage.setItem("@sliderValue", sliderValue.toString());
  }

  const handledItemPressed = (value) => {
    if(value == pressed){
      setPressed("");
    }else{
      setPressed(value);
    }
  }

  const setFontStorage = async (font) => {
    await AsyncStorage.setItem("@fontStyle", JSON.stringify(font));
    setFontText(font);
    setFontStyle(font);
  }
  return (
    <SafeAreaView style={modeStyle == "dark" ? {
      backgroundColor: "#121212",
      flex:1
    } : {
      backgroundColor: "#fbfbff",
      flex:1
    }}>
      <StatusBar style= {modeStyle=='dark' ? "light" : "dark"} />
      <ScrollView>
        <Text style={[styles.title, 
          modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>
            {settings}
        </Text>
        <TouchableOpacity onPress={()=>{handledItemPressed("bibleVersions")}} style={styles.itemArea}>
          <Text style={[styles.itemText,modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>{bibleVersions}</Text>
          {pressed == "bibleVersions" ?<AntDesign name="down" size={15} color="black" />:<AntDesign name="right" size={15} color="black" />}
        </TouchableOpacity>
        {pressed == "bibleVersions" ?
        <DropDownPicker
          items={items}
          defaultIndex={0}
          open={open}
          value={dropdownValue}
          setOpen={setOpen}
          onChangeValue={value => setSelectedVersionBible(value)}
          setValue={setDropdownValue}
          setItems={setItems}
          containerStyle={{height: '15%', width:"40%", marginLeft: "5%"}}
          listMode="SCROLLVIEW"
          /> : null }
        <TouchableOpacity onPress={()=>{handledItemPressed("appearance")}} style={styles.itemArea}>
          <Text style={[styles.itemText,modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>{appearance}</Text>
          {pressed == "appearance" ? <AntDesign name="down" size={15} color="black" />:<AntDesign name="right" size={15} color="black" />}
        </TouchableOpacity>
        {pressed == "appearance" ? 
        <> 
          <Card>
            <Text style={{fontFamily:'MavenPro-SemiBold'}}>Theme </Text>
            <View style={{ marginHorizontal:'20%',justifyContent:'space-between', flexDirection:'row'}}>
              <TouchableOpacity onPress={ () => showAlert("light","Theme", "Do you want to apply this changes?") }>
                <Card {...(modeStyle=="light") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                (modeStyle=="light") ? {color:'#FFF'}:{color:'#000'}]}>Light</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => showAlert("dark","Theme", "Do you want to apply this changes?") }>
                <Card {...(modeStyle=="dark") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                (modeStyle=="dark") ? {color:'#FFF'}:{color:'#000'}]}>Dark</Text>
                </Card>
              </TouchableOpacity>
            </View>
          </Card>
          <Card>
            <Text style={{fontFamily:'MavenPro-SemiBold'}}>Font Style </Text>
            <View style={{ justifyContent:'space-between', flexDirection:'row'}}>
              <Pressable onPress={()=>{setFontStorage({
                titleBible: "Cormorant-SemiBold",
                versIndex: "Cormorant-SemiBold",
                vers:"Cormorant-Medium",
                name:"Cormorant"
              })}}>
                <Card {...(fontText.name == "Cormorant") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                (fontText.name == "Cormorant") ? {color:'#FFF'}:{color:'#000'}]}>Cormorant</Text>
                </Card>
              </Pressable>
              <Pressable onPress={()=>{setFontStorage({
                titleBible: "Alegreya-SemiBold",
                versIndex: "Alegreya-SemiBold",
                vers:"Alegreya-Medium",
                name:"Alegreya"
              })}}>
                <Card {...(fontText.name == "Alegreya") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                  (fontText.name == "Alegreya") ? {color:'#FFF'}:{color:'#000'}]}>Alegreya</Text>
                </Card>
              </Pressable>
              <Pressable onPress={()=>{setFontStorage({
                titleBible: "Cardo-Italic",
                versIndex: "Cardo-Bold",
                vers:"Cardo-Regular",
                name:"Cardo"
              })}}>
                <Card {...(fontText.name == "Cardo") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                (fontText.name == "Cardo") ? {color:'#FFF'}:{color:'#000'}]}>Cardo</Text>
                </Card>
              </Pressable>
              <Pressable onPress={()=>{setFontStorage({
                titleBible: "Charm-Bold",
                versIndex: "Charm-Bold",
                vers:"Charm-Regular",
                name:"Charm"
              })}}>
                <Card {...(fontText.name == "Charm") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium'},
                (fontText.name == "Charm") ? {color:'#FFF'}:{color:'#000'}]}>Charm</Text>
                </Card>
              </Pressable>
            </View>
          </Card> 
          <Card>
            <Text style={{fontFamily:'MavenPro-SemiBold'}}>Font Size </Text>
            <Slider
              minimumValue={0.75}
              maximumValue={1.25}
              minimumTrackTintColor="#D6D6D6"
              maximumTrackTintColor="#000000"
              value={initialSliderValue}
              onSlidingComplete={()=>setSliderValueOnStorage()}
              onValueChange={(value) => {
                setSliderValue(value); 
                setFontSize(value);
              }}
            />
            <Text style={[styles.titleBible,{
              fontFamily: fontText.titleBible,
              fontSize: adjust(25)*sliderValue
              }]}>
              Genesis 1
            </Text>
            <View style={{flexDirection:"row"}}>
              <View style={{alignItems:"flex-start"}}>
                <Text style={[styles.versIndex,{
                  fontFamily: fontText.versIndex, 
                  fontSize: adjust(22)*sliderValue
                  }]}>
                  1
                </Text>
              </View>
              <View style={{alignItems:"flex-end"}}>
                <Text style={[styles.vers,{
                  fontFamily: fontText.vers, 
                  fontSize: adjust(22)*sliderValue
                  }]}>
                  {`  In the beginning God created the heaven and the earth`}
                </Text>
              </View>
            </View>
          </Card> 
        </>
        : null}
        <TouchableOpacity style={styles.itemArea} onPress={()=>{handledItemPressed("language")}}>
          <Text style={[styles.itemText,modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>
            {language}</Text>
            {pressed == "language" ?
          <AntDesign name="down" size={15} color="black" />:<AntDesign name="right" size={15} color="black" />}
        </TouchableOpacity>
        {pressed == "language" ?
            <Card>
              <TouchableOpacity onPress={ () => showAlert("pt","Language", "This action requires to reload this app!\n Do you want to proceed?") }>
                <Card {...(languageButton=="pt") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium', fontSize:adjust(15)},
                (languageButton=="pt") ? {color:'#FFF'}:{color:'#000'}]}>Portuguese</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => showAlert("en","Language", "This action requires to reload this app!\n Do you want to proceed?") }>
                <Card {...(languageButton=="en") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium',fontSize:adjust(15)},
                (languageButton=="en") ? {color:'#FFF'}:{color:'#000'}]}>English</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => showAlert("es","Language", "This action requires to reload this app!\n Do you want to proceed?") }>
                <Card {...(languageButton=="es") ? {backgroundColor:"#087f23"}:null}>
                  <Text style={[{fontFamily:'MavenPro-Medium',fontSize:adjust(15)},
                (languageButton=="es") ? {color:'#FFF'}:{color:'#000'}]}>Spanish</Text>
                </Card>
              </TouchableOpacity>
            </Card> 
            : null 
        }
        <TouchableOpacity style={styles.itemArea} 
        onPress={()=>{showAlert("clear_data",clearData, clearDataMessageAlert)}}>
          <Text style={[styles.itemText,modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>
            {clearData}</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemArea}>
          <Text style={[styles.itemText,
          modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>
            {donate}</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemArea}>
          <Text style={[styles.itemText,
          modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>
            {about}</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <Text style={[styles.appVersionStyle,
        modeStyle == "dark" ? {color:"#FFF",opacity:0.86} : {color:"#000", opacity:0.86}]}>{`App Version ${appVersion.expo.version}`}</Text>
      </ScrollView>
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

export default ConfigPage;