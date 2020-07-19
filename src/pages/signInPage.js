import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator, Platform, StatusBar, Alert} from 'react-native';
import {Input, Icon, Button, CheckBox, Overlay} from 'react-native-elements';
// import { NavigationEvents } from 'react-navigation';
import Spacer from '../components/spacer';
import Spacer2 from '../components/spacer2';
import firebase from '../config/firebase';
import 'firebase/auth';

const SignInPage = ({ navigation }) => {
   // const { signIn } = useContext(authContext);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [msg, setMsg] = useState();

   function logar(){
      firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
         setMsg("sucesso")
         signIn()
         console.log(email);
         // dispatch({ type: 'SIGN_IN', userEmail:email });
      }).catch(err => {
         console.log(err);
         setMsg("erro")
      })
   }
   // console.log(useSelector(state => state.usuario_email));

return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="white"/>
         <Image source={require('../../assets/favicon.png')} style={styles.image} />
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
            uncheckedIcon={<Icon name="check-box-outline-blank" colsor="black"/>}
            title='Mostrar Senha'
            checked={showPassword}
            onPress={() => setShowPassword(!showPassword)}
         />
         <Spacer />
         <Button
            style={styles.button}
            title="Entrar"
            // disabled={state.isLoading}
            // onPress={() => signin({userName, passWord: password, getProfile})}
            onPress={() => logar()}
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
      width: 240,
      height: 160,
      borderRadius: 10,
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
    }
});

export default SignInPage;