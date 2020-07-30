import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from "./src/pages/splash";
import Home from "./src/pages/home";
import Gota from "./src/pages/gotaPage"
import Devocional from "./src/pages/devocionalPage";
import Intro from "./src/pages/introPage";
import SignIn from './src/pages/signInPage';
import SignUp from './src/pages/signUpPage';


import firebase from './src/config/firebase';
import 'firebase/auth';
import { AuthContext } from "./src/context/authContext";
import { set } from 'react-native-reanimated';

const SplashStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const IntroStack = createStackNavigator();



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
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
    //   let userToken;
      let userEmail;
      try {
        userEmail = await AsyncStorage.getItem('userEmail');
        // userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        console.log('Erro ao recuperar: ',e)
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', email: userEmail /*, token: userToken*/ });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({email,password}) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
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
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} options={{ title: "Principal"}}/>
      <Tabs.Screen name="Gota" component={Gota} options={{ title: "Gota"}}/>
      <Tabs.Screen name="Devocional" component={Devocional} options={{ title: "Devocional"}}/>
    </Tabs.Navigator> 
    )
  }
  const HomeStackScreens = () => {
    return (
    <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={TabScreens} options={{ title: "Arsenal da Fé" , headerTitleAlign: "center" , headerLeft: null}}/> 
            <HomeStack.Screen name="Gota" component={Gota} options={{ title: "Gota", headerTitleAlign: "center"}} />   
    </HomeStack.Navigator>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {
            state.isLoading ? (
              <SplashStack.Navigator>
                <SplashStack.Screen name="Splash" component={Splash} />
              </SplashStack.Navigator>
            ) : state.userEmail == null ? (
              <AuthStackScreens/>
            ) : (
            <HomeStackScreens/>
            )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
