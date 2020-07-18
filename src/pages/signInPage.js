import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator, Platform, StatusBar} from 'react-native';
import {Input, Icon, Button, CheckBox, Overlay} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as ProfileContext} from '../context/ProfileContext';

const SignInPage = () => {
   const [userName, setUserName] = useState('');
   const [userPassword, setuserPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const { state, signin, clearErrorMessage } = useContext(AuthContext);
   const contextProfile = useContext(ProfileContext);
   const getProfile = contextProfile ? contextProfile["get"] : null;

   return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="white"/>
         <Image source={require('../../assets/texprima.png')} style={styles.image} /> 
         <Spacer />
         <NavigationEvents 
            onWillBlur={clearErrorMessage} 
         />
         <Input
            placeholder='Usuário'
            autoCompleteType="username"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            leftIcon={
               <Icon
                  name='account-circle'
                  size={24}
                  color='black'
               /> }
            value={userName}
            onChangeText={(newUser) => setUserName(newUser)}
         />
         <Input
            placeholder='Senha'
            autoCompleteType="password"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            secureTextEntry={!showPassword}
            leftIcon={
               <Icon
                  name='lock'
                  size={24}
                  color='black'
               />
            
            }
            value={userPassword}
            onChangeText={(newPass) => setuserPassword(newPass)}
         />
         <CheckBox
            iconType="Feather"
            checkedIcon={<Icon name="check-box" color="black"/>}
            uncheckedIcon={<Icon name="check-box-outline-blank" color="black"/>}
            title='Mostrar Senha'
            checked={showPassword}
            onPress={() => setShowPassword(!showPassword)}
         />
         {
            state.isLoading ? (
               <ActivityIndicator size="large" color="gray" />
            ) : null
         }
         {
            state.errorMessage ? (
               <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null
         }
         <Spacer />
         <Button 
            style={styles.button}
            title="Entrar"
            disabled={state.isLoading}
            onPress={() => signin({userName, passWord: userPassword, getProfile})}
         />
         { Platform.OS !== "ios" ?
            <Spacer/>
            : null
         }
         <Button 
            style={styles.button}
            title="Esqueci minha senha"
            onPress={() => setShowPopup(true)}
            disabled={state.isLoading}
         />
         <Overlay 
            isVisible={showPopup}
            width="auto"
            height="auto"
         >
            <>
               <Text>As instruções para redefinição de senha do usuário %user% foi enviado para %email%!</Text>
               <Spacer/>
               <Button 
                  style={styles.button}
                  title="Fechar"
                  onPress={() =>setShowPopup(false) }
               />
            </>            
         </Overlay>
      </View>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center"
   },
   image: {
      width: 240,
      height: 160,
      borderRadius: 10,
      alignSelf: "center"
   },
   button: {
      marginBottom: 10,
      marginHorizontal: 10
   },
   errorMessage: {
      fontSize: 16,
      color: 'red',
      marginLeft: 15,
      marginTop: 15
    }  
});

export default SignInPage;