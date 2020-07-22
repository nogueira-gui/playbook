import React from 'react';
import {Text,View,Button} from 'react-native';
import { AuthContext } from "../store/authContext";

export default function Home(){
    const { signOut } = React.useContext(AuthContext);
    return (
    <View>
        <Text>Bem vindo </Text>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Button title="Sign out" onPress={signOut} />
    </View>    
    )
}