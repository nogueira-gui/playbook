import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';


export default function Home({navigation}){
    
    return (
    <View style={styles.container}>
      <View style={styles.container3}>
          <TouchableOpacity style={styles.avatar}
          onPress={() => { navigation.push('Perfil')}}> 
              <Text>{`
        Perfil`}</Text>
          </TouchableOpacity>
                  <Text style={styles.title}>Nome do usuário</Text>
      </View>
      <View style={styles.container2}>
          <TouchableOpacity style={styles.box}
          onPress={() => { navigation.push('Ilustracoes')}}> 
              <Text>Ilustrações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}
          onPress={() => { navigation.push('Gota')}}> 
              <Text>Gota</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.container2}>
          <TouchableOpacity style={styles.box}
            onPress={() => { navigation.push('Notas')}}> 
              <Text>Notas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}
          onPress={() => { navigation.push('Cursos')}}> 
              <Text>Cursos</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.container2}>
          <TouchableOpacity style={styles.box}
          onPress={() => { navigation.push('Mensagens')}}> 
              <Text>Mensagens</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}
          onPress={() => { navigation.push('Config')}}> 
              <Text>Configurações</Text>
          </TouchableOpacity>
      </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
       flex: 2,
       justifyContent: "space-around",
       marginTop: 2,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 360,
      marginLeft: 15,
      backgroundColor: "grey",
      alignSelf: "flex-start"
   },
    container2: {
      flexDirection: "row",
      justifyContent: "center",
   },
   container3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
 },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: '#AAA',
      marginHorizontal: 10,
    },  
    box: {
      backgroundColor: "skyblue",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginHorizontal:10,
      borderRadius: 10,
      height: 150,
      width: 150,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 4,
    },
     texto: {
       fontSize: 18,
       textAlign: "justify",
       color: 'black',
       marginLeft: 15,
       marginRight: 15,
       alignSelf: "center",
       marginTop: 15
     },
     title: {
      fontSize: 25,
      textAlign: "justify",
      color: 'black',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold"
      
    },
    subtitle: {
      fontSize: 24,
      textAlign: "justify",
      color: '#FFF',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginTop: 15
    },
    byLine: {
      fontSize: 14,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginBottom: 100
    }
 });