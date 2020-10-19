import React,{useState,useEffect,useContext} from 'react';
import {Text,View,SafeAreaView,FlatList,TouchableOpacity,StyleSheet,Image,  ActivityIndicator, RefreshControl} from 'react-native';
import { AuthContext } from "../context/authContext";
import * as firebase from 'firebase';
import 'firebase/firestore';
import ImageCard from '../components/imageCard';
import { DevContext } from "../context/devContext";
import { set } from 'react-native-reanimated';
import Spacer from '../components/spacer';


export default function Devocional({navigation}){
    const { signOut } = useContext(AuthContext);
    // const { state } = useContext(DevContext);

    let onEndReachedCalledDuringMomentum = false;

    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [devocional, setDevocional] = useState([]);

    const devRef = firebase.firestore().collection('devocionais');

    useEffect(() => {
      fetchDevocional();
    }, []);

    const fetchDevocional = async () => {
      setIsLoading(true);
  
      const snapshot = await devRef.orderBy('id','desc').limit(3).get();

      if (!snapshot.empty) {
        let newDevocional = [];

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
        for (let i = 0; i < snapshot.docs.length; i++) {

          newDevocional.push(snapshot.docs[i].data());

          // firebase.storage().ref(`capa/${newDevocional[i].id}.jpg`).getDownloadURL()
          // .then( url  =>  newDevocional[i].urlCapa = url)
        }
        setDevocional(newDevocional);
      } else {
        setLastDoc(null);
      }
  
      setIsLoading(false);
    }

    const getMore = async () => {
      if (lastDoc) {
        setIsMoreLoading(true);
  
        setTimeout(async() => {
        let snapshot = await devRef.orderBy('id','desc').startAfter(lastDoc.data().id).limit(3).get();
  
        if (!snapshot.empty) {
          let newDevocional = devocional;
  
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  
          for(let i = 0; i < snapshot.docs.length; i++) {
            newDevocional.push(snapshot.docs[i].data());
            // firebase.storage().ref(`capa/${newDevocional[i].id}.jpg`).getDownloadURL()
            // .then( url  =>  newDevocional[i].urlCapa = url)
          }
  
          setDevocional(newDevocional);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
  
        setIsMoreLoading(false);
      }, 1000);
      }
  
      onEndReachedCalledDuringMomentum = true;
    }

    const onRefresh = () => {
      setTimeout(() => {
        fetchDevocional();
      }, 1000);
    }

    const renderFooter =  () => {
      if (!isMoreLoading) return true;
      
      return (
        <ActivityIndicator
            size='large'
            color={'#D83E64'}
            style={{ marginBottom: 10 }}
        />
      )
    }

  const renderList = data => 
      <TouchableOpacity
        style={styles.list}      
        onPress={() => selectItem(data)}
      >
        <Text style={styles.item}>  {`${data.title}`} </Text>
      <ImageCard id={data.id}/>
      </TouchableOpacity>

    const selectItem = (data) => { 
      navigation.push('DevConteudo',data);
    }

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={devocional}
          keyExtractor={ item => item.id.toString()}
          renderItem={({item}) => renderList(item) }
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
            />
          }
          initialNumToRender={3}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
          onEndReached = {() => {
              if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                getMore();
              }
            }
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: "center",
     marginTop: 2,
  },
  item: {
      marginTop: 2,
      fontSize: 18,
      height: 44,
    },
  list: {
    backgroundColor: "skyblue",
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical:5,
    marginHorizontal:5,
    borderRadius: 10
  },
  input:{
     tintColor: "#FFF"
  },
  scrollView: {
    backgroundColor: 'steelblue',
    marginHorizontal: 10,
  },
   texto: {
     fontSize: 18,
     textAlign: "justify",
     color: 'white',
     marginLeft: 15,
     marginRight: 15,
     alignSelf: "center",
     marginTop: 15
   },
   title: {
    fontSize: 25,
    textAlign: "justify",
    color: 'black',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    alignSelf: "center",
    fontWeight:"bold"
  }
});