import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from "./src/pages/splash";
import Home from "./src/pages/home";
import SignIn from './src/pages/signInPage';
import SignUp from './src/pages/signUpPage';

import firebase from './src/config/firebase';
import 'firebase/auth';
import { AuthContext } from "./src/store/authContext";

const Stack = createStackNavigator();


export default function App ({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
//   const [userToken, setUserToken] = React.useState(null);
  const [userEmail, setEmail] = React.useState(null);

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
            // console.log("Weeee Funcional o Context  ",email)
            setEmail(email);
            dispatch({ type: 'SIGN_IN', email: email/*, token: 'dummy-auth-token'*/ });
         }).catch(err => {
            console.log(err);
         })
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        // dispatch({ type: 'SIGN_IN', email: userEmail/*, token: 'dummy-auth-token'*/ });
      },
      signOut: () =>  dispatch({ type: 'SIGN_OUT' }),
      signUp: async ({email}) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        //A partir do metodo SIGN UP devemos iniciar a tela de apresentação do aplicativo

        dispatch({ type: 'SIGN_IN', email: email /* ,token: 'dummy-auth-token' */});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={Splash} />
          ) : state.userEmail == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: 'Sign in',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={Home} />
          )}
          <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
