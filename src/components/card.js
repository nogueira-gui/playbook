import React from 'react';
import {StyleSheet, View} from 'react-native';

export default  function Card(props){
    const bgColor = props.backgroundColor;
    return(
        <View style={[styles.card, (bgColor) ? {backgroundColor:bgColor} : {backgroundColor:'#FFF'}]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
        )
}
const styles = StyleSheet.create({
    card: {
       borderRadius: 6,
       elevation: 3,
       backgroundColor: "#FFF",
       shadowOffset: {width: 1, height: 1},
       shadowColor: "#333",
       shadowOpacity: 0.3,
       shadowRadius: 2,
       marginHorizontal: 4,
       marginVertical: 6
    },
    cardContent: {
        marginHorizontal: 10,
        marginVertical: 5
    }
 });