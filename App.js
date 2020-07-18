import React from 'react';
import {Image,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

//import { NavigationContainer } from '@react-navigation/native';
import {createAppContainer, createSwitchNavigator} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/tabs';

import {setNavigator, navigate} from './src/navigationRef';

import {Provider as AuthProvider} from './src/context/AuthContext';

import SignInPage from './src/pages/signInPage';
import SignUpPage from './src/pages/signUpPage';
import gotaPage from './src/pages/gotaPage';
import devocionalPage from './src/pages/devocionalPage';
import bibliaPage from './src/pages/bibliaPage';
import loadAppPage from './src/pages/loadAppPage';
import blocoPage from './src/pages/blocoPage';
import ebookPage from './src/pages/ebookPage';

const navigator = createSwitchNavigator({
    loadApp: loadAppPage,
    authRoutes: createStackNavigator({
                signIn: SignInPage,
                signUp: SignUpPage
    }, 
    {
    initialRouteName: "signIn",
    defaultNavigationOptions: {
        title: "PlayBOOK"
    }
}),
    appRoutes: createStackNavigator({
        main: createBottomTabNavigator({
          devocional: devocionalPage, 
          gota: gotaPage,
          biblia: bibliaPage,
          blocoNota: blocoPage,
          ebook: ebookPage
        },
        {
            initialRouteName: "devocional"
        }),
        /**Listar aqui as proximas telas */
    },{
        defaultNavigationOptions:{
            title: "Nome Page",
            headerLeft: () => <TouchableOpacity
                onPress={() => navigate("drawer")}
            >
            <Icon 
            name = "menu"
            size = {28}
            paddingRight={14}
            color='black'
            />
            </TouchableOpacity>
        }
    })
},
{
    initialRouteName: "loadApp"
});

const App = createAppContainer(navigator);

export default () => {
    return (
        <AuthProvider>
            <App ref={(navigator) => { setNavigator(navigator)}} />
        </AuthProvider>
    );
}











