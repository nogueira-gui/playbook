import * as React from 'react';
import { AsyncStorage,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';
import Splash from "./src/pages/splash";
import Biblia from "./src/pages/bibliaPage";
import HomePage from "./src/pages/homePage";
import ConfigPage from "./src/pages/devocionalPage";
import DevConteudo from "./src/pages/devConteudo";
import Intro from "./src/pages/introPage";
import SignIn from './src/pages/signInPage';
import SignUp from './src/pages/signUpPage';
import NotasPage from './src/pages/notas/notasPage';
import NotasEditor from './src/pages/notas/notasEditor';
import ConfigPage from './src/pages/conf/configPage';
import IlustracoesPage from './src/pages/ilustracoes/ilustracoesPage';
import GotasPage from './src/pages/gotas/gotasPage';
import CursosPage from './src/pages/Cursos/cursosPage';
import MensagensPage from './src/pages/mensagens/mensagensPage';
import PerfilPage from './src/pages/perfil/perfilPage';
import * as Facebook from 'expo-facebook';
import firebase from './src/config/firebase';
import 'firebase/auth';
import "firebase/functions";

import { AuthContext } from "./src/context/authContext";
import { DevContext } from "./src/context/devContext";

const SplashStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const AppStack = createStackNavigator();



export default function App ({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
//   const [userToken, setUserToken] = React.useState(null);
  const [userEmail, setEmail] = React.useState(null);
  const [msg, setMsg] = React.useState();
  const [goIntro, setGoIntro] = React.useState(false);

  const TabScreens = () => {
    return(
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Bíblia') {
          iconName = focused
            ? 'book-open'
            : 'bible';
        } else if (route.name === 'Principal') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Devocional') {
          iconName = focused ? 'dove' : 'dove';
        }

        // Posso retornar qualquer componente aqui!!
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'steelblue',
      inactiveTintColor: 'gray',
    }}>
      <Tabs.Screen name="Bíblia" component={Biblia} options={{ title: "Bíblia"}}/>
      <Tabs.Screen name="Principal" component={HomePage} options={{ title: "Principal"}}/>
      <Tabs.Screen name="Ajustes" component={ConfigPage} options={{ title: "Ajustes"}}/>
    </Tabs.Navigator> 
    )
  }
  const AppScreens = () => {
    return(
      <AppStack.Navigator>
        <AppStack.Screen name = "Home" component ={TabScreens} 
          options={{ headerShown: false}}
        />
        <AppStack.Screen name = "DevConteudo" component ={DevConteudo} />
        <AppStack.Screen name = "Notas" component = {NotasPage}/>
        <AppStack.Screen name = "Editor" component = {NotasEditor} />
        <AppStack.Screen name = "Ajustes" component = {ConfigPage} options={{ title: "Ajustes"}} />
      </AppStack.Navigator>
      );
  }
  return (
    <DevContext.Provider>
        <NavigationContainer>
              <AppScreens/>
        </NavigationContainer>
    </DevContext.Provider>
  );
}
