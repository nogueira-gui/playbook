import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator, Platform, StatusBar, Alert} from 'react-native';
import {Input, Icon, Button, CheckBox, Overlay} from 'react-native-elements';
// import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/spacer';
import Spacer2 from '../components/spacer2';

import { AuthContext } from "../store/authContext";

const SignInPage = ({ navigation }) => {
   const { state,signIn } = useContext(AuthContext);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [msg, setMsg] = useState();

return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="white"/>
         <Image source={require('../../assets/logo.png')} style={styles.image} />
         <Text style={styles.texto}>Bem vindo (a) ao ARSENAL DA FÉ!</Text>
         <Spacer />
         {/* <NavigationEvents   onWillBlur={clearErrorMessage} /> */}
         <Input
            placeholder='Email'
            autoCompleteType="email"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            leftIcon={
               <Icon
                  name='email'
                  size={24}
                  color='black'
               /> }
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
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
            value={password}
            onChangeText={(newPass) => setPassword(newPass)}
         />
         <CheckBox
            iconType="Feather"
            checkedIcon={<Icon name="check-box" color="black"/>}
            uncheckedIcon={<Icon name="check-box-outline-blank" color="black"/>}
            title='Exibir Senha'
            checked={showPassword}
            onPress={() => setShowPassword(!showPassword)}
         />
         <Spacer />
         <Button
            style={styles.button}
            title="Entrar"
            // disabled={state.isLoading}
            // onPress={() => signin({userName, passWord: password, getProfile})}
            onPress={() => signIn({email, password})}
         />
         {msg === "erro" && <Text>Email ou Senha errado!</Text>}
         { Platform.OS !== "ios" ?
            <Spacer2/>
            : null
         }
         <Button
            style={styles.button}
            title="Cadastrar uma conta"
            onPress={() => navigation.push("SignUp")}
            // disabled={state.isLoading}
         />
         <Spacer2/>
         <Button
            style={styles.button}
            title="Esqueci minha senha"
            onPress={() => setShowPopup(true)}
            // disabled={state.isLoading}
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
      justifyContent: "center",
      // backgroundColor: "#265099",
      // tintColor: "#FFF"
   },
   image: {
      width: 160,
      height: 160,
      borderRadius: 360,
      alignSelf: "center"
   },
   input:{
      tintColor: "#FFF"
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
    },
    texto: {
      fontSize: 16,
      color: 'blue',
      marginLeft: 15,
      alignSelf: "center",
      marginTop: 15
    }
});

export default SignInPage;