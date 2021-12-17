import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Biblia from "./src/pages/bibliaPage";
import NotasPage from './src/pages/notas/notasPage';
import NotasEditor from './src/pages/notas/notasEditor';
import ConfigPage from './src/pages/conf/configPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'firebase/auth';
// import "firebase/functions";

const Tabs = createBottomTabNavigator();
const AppStack = createStackNavigator();



export default function App () {
  const [recentPageView, setRecentPageView] = React.useState(null);
  React.useEffect(() => {
    getRecentPageView();
  },[]);

  const getRecentPageView  = async () => {
    try {
        await AsyncStorage.getItem("@RecentPageView").then( (value) => {
           setRecentPageView(JSON.parse(value));
        });
      } catch(e) {
      // error reading value
        console.error(e);
      }
  };

  const TabScreens = () => {
    return(
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Bible') {
          iconName = focused
            ? 'book-open'
            : 'bible';
        } else if (route.name === 'Notas') {
          iconName = focused ? 'pencil-alt' : 'pencil-alt';
        } else if (route.name === 'Ajustes') {
          iconName = focused ? 'cog' : 'cog';
        }

        // Posso retornar qualquer componente aqui!!
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'steelblue',
      inactiveTintColor: 'grey',
    }}>
      <Tabs.Screen name="Bible" component={Biblia} initialParams={recentPageView}/>
      <Tabs.Screen name="Notas" component={NotasPage} />
      <Tabs.Screen name="Ajustes" component={ConfigPage} />
    </Tabs.Navigator> 
    )
  }
  const AppScreens = () => {
    return(
      <AppStack.Navigator>
        <AppStack.Screen name = "Home" component ={TabScreens} 
          options={{ headerShown: false}}
        />
        {/* <AppStack.Screen name = "DevConteudo" component ={DevConteudo} /> */}
        <AppStack.Screen name = "Notas" component = {NotasPage}/>
        <AppStack.Screen name = "Editor" component = {NotasEditor} />
        <AppStack.Screen name = "Ajustes" component = {ConfigPage} options={{ title: "Ajustes"}} />
      </AppStack.Navigator>
      );
  }
  return (
        <NavigationContainer>
              <AppScreens/>
        </NavigationContainer>
  );
}
