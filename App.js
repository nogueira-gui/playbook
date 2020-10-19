import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,Entypo } from '@expo/vector-icons';
import Splash from "./src/pages/splash";
import Biblia from "./src/pages/bibliaPage";
import Principal from "./src/pages/homePage";
import Devocional from "./src/pages/devocionalPage";
import DevConteudo from "./src/pages/devConteudo";
import Intro from "./src/pages/introPage";
import SignIn from './src/pages/signInPage';
import SignUp from './src/pages/signUpPage';
import NotasPage from './src/pages/notas/notasPage';
import ConfigPage from './src/pages/conf/configPage';


import firebase from './src/config/firebase';
import 'firebase/auth';
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

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            // userToken: action.token,
            userEmail: action.email,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            // userToken: action.token,
            userEmail: action.email
          };
        case 'SIGN_UP':
            return {
              ...prevState,
              isSignout: false,
              // userToken: action.token,
              userEmail: action.email,
              goIntro: true
            };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            // userToken: null,
            userEmail: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
    //   userToken: null,
      userEmail: null
    }
  );

  React.useEffect(() => {
    // realiza Fetch do token ou Email e navega para a pagina home caso validado
    const bootstrapAsync = async () => {
    //   let userToken;
      let userEmail;
      try {
        userEmail = await AsyncStorage.getItem('userEmail');
        // userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Token falhou
        console.log('Erro ao recuperar: ',e)
      }

      // Depois de restaurar o token, necessita validar o app em produção

      // Cria o switch de AuthScreen para AppScreen
      dispatch({ type: 'RESTORE_TOKEN', email: userEmail /*, token: userToken*/ });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({email,password}) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            // console.log(result)
            setEmail(email);
            dispatch({ type: 'SIGN_IN', email: email/*, token: 'dummy-auth-token'*/ });
         }).catch(err => {
            console.log(err);
         })
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' })
      } ,
      signUp: async ({email}) => {
          setEmail(email);
          dispatch({ type: 'SIGN_UP', email: email /* ,token: 'dummy-auth-token' */});
      },
    }),
    []
  );

  const AuthStackScreens = () => {
    return(
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignIn} options={{
          title: 'Acesso',
          // Quando o usuario faz o loggout uma animação intuitiva ocorre
          animationTypeForReplace: state.isSignout ? 'pop' : 'push',
      }} />
      <AuthStack.Screen name="SignUp" component={SignUp} options={{title: 'Cadastro' }}/>
      <AuthStack.Screen name="Intro" component={Intro} options={{title: 'Tutorial'}} />
    </AuthStack.Navigator>
    )
  }

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
      <Tabs.Screen name="Principal" component={Principal} options={{ title: "Principal"}}/>
      <Tabs.Screen name="Devocional" component={Devocional} options={{ title: "Devocional"}}/>
    </Tabs.Navigator> 
    )
  }
  const AppScreens = () => {
    return(
      <AppStack.Navigator>
        <AppStack.Screen name = "Home" component ={TabScreens} 
          options={{ headerShown: false,
            // headerTitle: () => <Header navigation={navigation} 
           }}
        />
        <AppStack.Screen name = "DevConteudo" component ={DevConteudo} />
        <AppStack.Screen name = "Notas" component = {NotasPage}/>
        <AppStack.Screen name = "Config" component = {ConfigPage} />
        <AppStack.Screen name = "Intro" component = {Intro} options={{ headerShown: false}} />
      </AppStack.Navigator>
      );
  }
  return (
    <DevContext.Provider>
      <AuthContext.Provider value={ authContext }>
        <NavigationContainer>
            {
              state.isLoading ? (
                <SplashStack.Navigator>
                  <SplashStack.Screen name="Splash" component={Splash} />
                </SplashStack.Navigator>
              ) : state.userEmail == null ? (
                <AuthStackScreens/>
              ) : (
              <AppScreens/>
              )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </DevContext.Provider>
  );
}
