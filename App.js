import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Biblia from "./src/pages/bibliaPage";
import NotasPage from './src/pages/notas/notasPage';
import NotasEditor from './src/pages/notas/notasEditor';
import ConfigPage from './src/pages/conf/configPage';
import ThemeProvider from './src/context/theme';
import BibleProvider from './src/context/bible';
import NoteProvider from './src/context/noteContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

i18n.translations = {
  en: { 
    bible: 'Bible', 
    notes: 'Notes', 
    settings: 'Settings', 
    editor: 'Editor', 
    book: 'Book',
    chapter: 'Chapter',
    verse: 'Verse', 
    close: 'Close',
    emptyNotesMessage: 'No notes were written.',
    bibleVersions: 'Bible Versions',
    appearance: 'Appearance',
    language: 'App Language',
    clearData: 'Clear Data',
    clearDataMessageAlert: 'This action is irreversible, do you really want to delete the data from this application?',
    clearMessageDone: 'Data has been deleted',
    donate: 'Donate',
    about: 'About',
    done: 'Done',
    cancel: 'Cancel',
    confirm: 'Confirm',
    languageSetting: 'en',
    saveButton: 'Save',
    title: 'Title',
    description: 'Description',
    reference: 'Reference',
    english: 'English',
    portuguese: 'Portuguese',
    spanish: 'Spanish',
    theme: 'Theme',
    fontStyle: 'Font Style',
    fontSize: 'Font Size',
    removeNoteMessage: 'Do you want to delete this note?',
    removeNoteTitle: 'Delete Note',
    placeholderInputDescription: 'Type your note here',
    placeholderInputTitle: 'Title',
  },
  pt: { 
    bible: 'Biblía', 
    notes: 'Notas', 
    settings: 'Ajustes', 
    editor: 'Editor', 
    book: 'Livro',
    chapter: 'Capítulo',
    verse: 'Versículo', 
    close: 'Fechar',
    emptyNotesMessage: 'Por enquanto nenhuma nota foi escrita.',
    bibleVersions: 'Traduções da Bíblia',
    appearance: 'Aparência',
    language: 'Idioma do App',
    clearData: 'Apagar dados',
    clearDataMessageAlert: 'Está ação é irreversivel, você quer mesmo excluir os dados deste aplicativo?',
    clearMessageDone: 'Dados removidos',
    donate: 'Doe',
    about: 'Sobre',
    done: 'Concluído',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    languageSetting: 'pt',
    saveButton: 'Salvar',
    title: 'Título',
    description: 'Descrição',
    reference: 'Referência',
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol',
    theme: 'Tema',
    fontStyle: 'Estilo',
    fontSize: 'Tamanho',
    removeNoteMessage: 'Você quer deletar está nota?',
    removeNoteTitle: 'Deletar Nota',
    placeholderInputDescription: 'Digite sua nota aqui',
    placeholderInputTitle: 'Digite o título aqui',
  },
};
i18n.defaultLocale='en';
// Set the locale once at the beginning of your app.
const deviceLocate = Localization.locale;
i18n.locale = deviceLocate;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const Tabs = createBottomTabNavigator();
const AppStack = createStackNavigator();

export default function App () {
  const [recentPageView, setRecentPageView] = React.useState(null);
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [modeStyle, setModeStyle] = React.useState("light");
  React.useEffect(() => {
    setAppLanguage();
    getTheme();
    locateDeviceAndSetBibleVersion();
    getRecentPageView();
    loadFonts();
  },[]);

  const setAppLanguage = async () => {
    AsyncStorage.getItem("@language").then((value)=>{
      if(value){
        i18n.locale=value;
      }
    });
  }
  
  const getTheme = async () => {
    await AsyncStorage.getItem("@theme").then((value) => {
      if(value && value == "dark"){
        setModeStyle(value);
        NavigationBar.setBackgroundColorAsync("#121212");
        NavigationBar.setButtonStyleAsync("light");
      }else if(value == "light"){
        setModeStyle(value);
        NavigationBar.setBackgroundColorAsync("#fbfbff");
        NavigationBar.setButtonStyleAsync("dark");
      }else{
        setModeStyle("light");
        NavigationBar.setBackgroundColorAsync("#fbfbff");
        NavigationBar.setButtonStyleAsync("dark");
      }
    });
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      'Cormorant-Regular': require('./assets/fonts/Cormorant-Regular.ttf'),
      'Cormorant-SemiBold': require('./assets/fonts/Cormorant-SemiBold.ttf'),
      'Cormorant-Light': require('./assets/fonts/Cormorant-Light.ttf'),
      'Cormorant-Medium': require('./assets/fonts/Cormorant-Medium.ttf'),
      'MavenPro-Medium': require('./assets/fonts/static/MavenPro-Medium.ttf'),
      'MavenPro-Bold': require('./assets/fonts/static/MavenPro-Bold.ttf'),
      'MavenPro-Black': require('./assets/fonts/static/MavenPro-Black.ttf'),
      'MavenPro-Regular': require('./assets/fonts/static/MavenPro-Regular.ttf'),
      'MavenPro-SemiBold': require('./assets/fonts/static/MavenPro-SemiBold.ttf'),
      'Alegreya-Regular': require('./assets/fonts/static/Alegreya-Regular.ttf'),
      'Alegreya-Medium': require('./assets/fonts/static/Alegreya-Medium.ttf'),
      'Alegreya-SemiBold': require('./assets/fonts/static/Alegreya-SemiBold.ttf'),
      'Alegreya-Bold': require('./assets/fonts/static/Alegreya-Bold.ttf'),
      'Alegreya-MediumItalic': require('./assets/fonts/static/Alegreya-MediumItalic.ttf'),
      'Cardo-Bold': require('./assets/fonts/Cardo-Bold.ttf'),
      'Cardo-Italic': require('./assets/fonts/Cardo-Italic.ttf'),
      'Cardo-Regular': require('./assets/fonts/Cardo-Regular.ttf'),
      'Charm-Bold': require('./assets/fonts/Charm-Bold.ttf'),
      'Charm-Regular': require('./assets/fonts/Charm-Regular.ttf'),
    });
    setFontLoaded(true);
  }
  
  const locateDeviceAndSetBibleVersion = async () => {
    try{
      await AsyncStorage.getItem("@bibleVersion").then((value) => {
        if(!value && deviceLocate =="pt-BR"){
          AsyncStorage.setItem("@bibleVersion", "nvi");
          return;
        }
        if(!value && deviceLocate == "en-US"){
          AsyncStorage.setItem("@bibleVersion", "kjv");
          return;
        }
      })
    }catch(e){console.error(e);}
  }
  const getRecentPageView  = async () => {
    try {
      await AsyncStorage.getItem("@RecentPageView").then((value) => {
        if(!value){
          setRecentPageView({data:{livro:0, cap:0, yOffset:1}});
          return;
        }
        setRecentPageView(JSON.parse(value));
      });
      } catch(e) {
      // error reading value
      console.error(e);
      }
    };
    
    if(!fontLoaded){
        return <AppLoading />;
    }
    
    const TabScreens = () => {
      return(
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === i18n.t('bible')) {
          iconName = focused ? 'book-open' : 'bible';
        } else if (route.name === i18n.t('notes')) {
          iconName = focused ? 'pencil-alt' : 'pencil-alt';
        } else if (route.name === i18n.t('settings')) {
          iconName = focused ? 'cog' : 'cog';
        }

        // Posso retornar qualquer componente aqui!!
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      style: modeStyle == "dark" ? {backgroundColor:"#121212"} : {backgroundColor:"#fbfbff"},
      activeTintColor: modeStyle == "dark" ? "#2196F3" : '#3581b8', //blue
      inactiveTintColor: modeStyle == "dark" ? "#fbfbff" : 'grey', //soft grey
    }}>
      <Tabs.Screen name={i18n.t('bible')} component={Biblia} initialParams={
          {
            recentPage: recentPageView,
            previous: i18n.t('previous'),
            next: i18n.t('next'),
            book: i18n.t('book'),
            chapter: i18n.t('chapter'),
            verse: i18n.t('verse'),
            close: i18n.t('close'),
          }
        }/> 
      <Tabs.Screen name={i18n.t('notes')} component={NotasPage} initialParams={
        {
          notes: i18n.t('notes'),
          emptyNotesMessage: i18n.t('emptyNotesMessage'),
          removeNoteMessage: i18n.t('removeNoteMessage'),
          removeNoteTitle: i18n.t('removeNoteTitle'),
          cancel: i18n.t('cancel'),
          confirm: i18n.t('confirm'),
        }
      } />
      <Tabs.Screen name={i18n.t('settings')} component={ConfigPage}  initialParams={
          {
            settings: i18n.t('settings'),
            bibleVersions: i18n.t('bibleVersions'),
            appearance: i18n.t('appearance'),
            language: i18n.t('language'),
            clearData: i18n.t('clearData'),
            clearDataMessageAlert: i18n.t('clearDataMessageAlert'),
            clearMessageDone: i18n.t('clearMessageDone'),
            donate: i18n.t('donate'),
            about: i18n.t('about'),
            done: i18n.t('done'),
            cancel: i18n.t('cancel'),
            confirm: i18n.t('confirm'),
            languageSetting: i18n.t('languageSetting'),
            english: i18n.t('english'),
            portuguese: i18n.t('portuguese'),
            theme: i18n.t('theme'),
            fontStyle: i18n.t('fontStyle'),
            fontSize: i18n.t('fontSize'),
          }
        } />
    </Tabs.Navigator> 
    )
  }
  const AppScreens = () => {
    return(
      <AppStack.Navigator>
        <AppStack.Screen name = "Home" component ={TabScreens} 
          options={{ headerShown: false}}
        />
        <AppStack.Screen name = 'Note' title='Note' component = {NotasPage}/>
        <AppStack.Screen name = 'Editor' title="Note editor" component = {NotasEditor} 
          initialParams={{
            saveButton: i18n.t('saveButton'),
            title: i18n.t('title'),
            description: i18n.t('description'),
            reference: i18n.t('reference'),
            placeholderInputDescription: i18n.t('placeholderInputDescription'),
            placeholderInputTitle: i18n.t('placeholderInputTitle'),
          }}
          options={{
            headerBackImage: () => modeStyle == "dark" ? 
            <Ionicons name="ios-chevron-back-outline" size={36} color="white" /> :
            <Ionicons name="ios-chevron-back-outline" size={36} color="black" />,
            headerTitleStyle:modeStyle == "dark" ? {color:"#FFF", opacity:0.86} : {color:"#000", opacity:0.86},
            headerStyle: modeStyle == "dark" ? 
          {
            backgroundColor:"#121212",
          }:{
            backgroundColor:"#fbfbff"
          }}}/>
        <AppStack.Screen name = 'Settings' component = {ConfigPage} options={{ title: i18n.t('settings')}} />
      </AppStack.Navigator>
      );
  }
  return (
        <NavigationContainer>
          <ThemeProvider>
            <BibleProvider>
              <NoteProvider>
                <AppScreens/>
                <StatusBar  style= {modeStyle == 'dark' ? "light" : "dark"} />
              </NoteProvider>
            </BibleProvider>
          </ThemeProvider>
        </NavigationContainer>
  );
}
