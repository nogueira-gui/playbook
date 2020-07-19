import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const splash = () => {

    return (
        <View>
            <Text>Carregando. . .</Text>
            <ActivityIndicator/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default splash;