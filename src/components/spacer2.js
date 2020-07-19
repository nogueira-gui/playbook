import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Spacer2 = ({children}) => {
   return <Text style={styles.spacer}>{children}</Text>
}

const styles = StyleSheet.create({
   spacer: {
      marginBottom: 1
   }
});


export default Spacer2;