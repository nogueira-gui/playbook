import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Biblia from "./src/pages/bibliaPage";
import NotasPage from './src/pages/notas/notasPage';
import NotasEditor from './src/pages/notas/notasEditor';
import ConfigPage from './src/pages/conf/configPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

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
  const tabBarRef = React.useRef(null);
  React.useEffect(() => {
    locateDeviceAndSetBibleVersion();
    getRecentPageView();
  },[]);

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
      activeTintColor: 'steelblue',
      inactiveTintColor: 'grey',
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
          notes: i18n.t('notes')
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
        {/* <AppStack.Screen name = "DevConteudo" component ={DevConteudo} /> */}
        <AppStack.Screen name = {i18n.t('note')} component = {NotasPage}/>
        <AppStack.Screen name = {i18n.t('editor')} component = {NotasEditor} />
        <AppStack.Screen name = {i18n.t('settings')} component = {ConfigPage} options={{ title: i18n.t('settings')}} />
      </AppStack.Navigator>
      );
  }
  return (
        <NavigationContainer>
              <AppScreens/>
        </NavigationContainer>
  );
}
