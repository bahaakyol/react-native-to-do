import React, { useCallback, useRef } from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Text, FlatList, Button } from 'react-native';
import Item from './components/Item';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './components/Header';
import { useColorScheme } from 'react-native';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

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

  console.log("colorScheme", colorScheme);
  const flatRef = useRef(null);
  const [enteredtext, setEnteredText] = React.useState('');
  const [goals, setGoals] = React.useState([]);
  const [onActive, setOnActive] = React.useState(-1);

  function addTodo() {
    setGoals([ ...goals, {
      id: Math.random().toString(),
      value: enteredtext
    }]);
    flatRef.current.scrollToEnd();
    setEnteredText('');
  }


  const deleteHandler = (item) => {
    setOnActive(-1);
    setGoals(goals.filter((goal) => goal.id !== item.id));
  } 
  const renderItem = useCallback(({ item, index }) => (
    <Item
      label={item.value}
      active={onActive}
      setOnActive={setOnActive}
      index={index}
      deleteItem={() => deleteHandler(item)}
    />
  ), [onActive, setOnActive]);

  return (
    <PaperProvider theme={colorScheme === "dark" ? Dark : Light}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            title={"To-Do"}
            text={enteredtext}
            addToDo={addTodo}
            setText={setEnteredText} />
          <View style={styles.container}>
            <FlatList
              ref={flatRef}
              data={goals}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

export default App;


const styles = StyleSheet.create({

  container: {
    flex: 6,
  },

  text: {
    fontSize: 30,
    color: 'red',
  },


  textinputContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'mediumseagreen',
    width: '100%',
  },

  textinput: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    width: 200,
    height: 50,
    fontSize: 15,
  },
});