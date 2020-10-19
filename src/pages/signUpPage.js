import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Text, Platform, StatusBar,ActivityIndicator} from 'react-native';
import {Input, Icon, Button, CheckBox, Overlay} from 'react-native-elements';
// import { NavigationEvents } from 'react-navigation';

import Spacer from '../components/spacer';
import firebase from '../config/firebase'
import 'firebase/auth'

import { AuthContext } from "../context/authContext";

const SignUpPage = ({ navigation }) => {
   const { state,signUp } = useContext(AuthContext);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [password2, setPassword2] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [msg, setMsg] = useState();
   const [loading, setLoading] = useState(false);

   function cadastrar(){
    setLoading(true);
    setMsg(null);
    if(password === password2){ 
        if(!email || !password || !password2){
            setMsg('Você precisar informar email e senha para cadastrar!')
            setLoading(false);
            return;
        }else { 
      firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
         setMsg("cadastrado")
         setLoading(false);
         signUp({email});
         navigation.navigate("Intro");
      }).catch(err => {
         setLoading(false);
         switch(err.message){ 
             case "Password should be at least 6 characters":
                setMsg("Senha deve conter mais que 6 caracteres!");
             break;
             case "The email address is already in use by another account.":
                setMsg("O email já existe!");
             break;
             case "The email address is badly formatted.":
                setMsg("Formato de email não indentificado!");
             break;
             default:
                 setMsg("Ocorreu algum erro ao cadastrar, tente novamente mais tarde!");
             break;
         }
        })
    }
    } else { 
        setMsg('Senha digitada é diferente da primeira!'); 
        setLoading(false);
    }
   }

return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="white"/>
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
        <Input
            placeholder='Confirmar senha'
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
            value={password2}
            onChangeText={(newPass) => setPassword2(newPass)}
         />
         <Spacer />
         { loading ? <ActivityIndicator/> : 
         <Button 
            style={styles.button}
            title="Criar"
            // disabled={state.isLoading}
            onPress={() => cadastrar()}
         /> }
         {msg && <Text>{msg}</Text>}
         { Platform.OS !== "ios" ?
            <Spacer/>
            : null
         }
         <Overlay 
            isVisible={showPopup}
            width="auto"
            height="auto"
         >
            <>
               <Text>Confirme email cadastrado!</Text>
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

export default SignUpPage;