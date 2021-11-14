import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Spacer from '../../components/spacer';

export default function NotasEditor({navigation}){
   
    return (
        <View style={styles.container}>
            <Spacer/>
            <Input
                placeholder='Digite aqui...'
                autoCapitalize="none"
                multiline
                inputContainerStyle={{borderBottomWidth:0,borderColor:"transparent"}}
                inputStyle= {{fontSize:20,height: 320}}
                autoCorrect={true}
                clearButtonMode="always"
                // value={text}
                // onChangeText={(txt) => setText(txt)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginTop: 2,
    },
    input:{
        alignSelf:'stretch',
        color:'#fff',
        fontSize:25,
        padding:20,
        paddingTop:46,
        height: 320,
        backgroundColor:'#252525',
        borderTopWidth:2,
        borderTopColor:'#ededed'
    }
 });