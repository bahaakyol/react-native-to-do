import MainNavigator from './navigations/MainNavigator';
import React,{useEffect} from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#000',
    text: '#fff',
    card: '#121212',
    border: '#cccccc50'
  },
}

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    background: '#fff',
    text: '#000',
    card: '#fff',
    border: '#cccccc50'
  },
}


const App = () => {
  const colorScheme = useColorScheme();

  const [goals, setGoals] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);

  const getData = () => {
    AsyncStorage.getItem('goals').then((str_goals) => {
      str_goals && setGoals(JSON.parse(str_goals));
    });
    AsyncStorage.getItem('completed').then((str_completed) => {
      str_completed && setCompleted(JSON.parse(str_completed));
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <PaperProvider theme={colorScheme === "dark" ? Dark : Light}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigator goals={goals} setGoals={setGoals} completed={completed} setCompleted={setCompleted}/>
      </GestureHandlerRootView>
    </PaperProvider>
  )
}

export default App;

