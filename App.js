import MainNavigator from './navigations/MainNavigator';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  return (
    <PaperProvider theme={colorScheme === "dark" ? Dark : Light}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigator goals={goals} setGoals={setGoals} completed={completed} setCompleted={setCompleted}/>
      </GestureHandlerRootView>
    </PaperProvider>
  )
}

export default App;

