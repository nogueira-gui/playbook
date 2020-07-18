import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Spacer = ({children}) => {
   return <Text style={styles.spacer}>{children}</Text>
}

const styles = StyleSheet.create({
   spacer: {
      margin: 10
   }
});


export default Spacer;