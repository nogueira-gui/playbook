import React from 'react';
import {Text,View} from 'react-native';

export default function Home(){
    const { signOut } = React.useContext(AuthContext);
    return (
    <View>
        <Text>HOME SCREEN</Text>
        <Button title="Sign out" onPress={signOut} />
    </View>    
    )
}