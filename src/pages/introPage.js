import React from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/present1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/present2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present4.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 5,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present5.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 6,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present6.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 7,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present7.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 8,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present8.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 9,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/present9.png'),
    backgroundColor: '#22bcb5',
  }
];
 
const Intro = ({navigation}) => {
  const [showRealApp,setshowRealApp] = React.useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image   style={{
           alignSelf: "stretch",
            width: "100%",
            height: "100%"
          }}
        source={item.image} />
      </View>
    );
  }
  const _onDone = () => {
    // navigation or simply by controlling state
    setshowRealApp(true);
    navigation.navigate('Home');
  }
  
  return(
      !showRealApp &&  <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}/>
  )
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    backgroundColor: 'blue'
  }
});

export default Intro