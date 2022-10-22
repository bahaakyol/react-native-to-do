import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import Item from '../components/Item';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDo = (props) => {


  const flatRef = useRef(null);
  const [enteredtext, setEnteredText] = React.useState('');
  const { goals, setGoals, setCompleted, completed } = props;
  const [onActive, setOnActive] = React.useState(-1);

  function addTodo() {
    const newGoals = [...goals, {
      id: Math.random().toString(),
      value: enteredtext,
      createdAt: new Date(),
    }];
    AsyncStorage.setItem('goals', JSON.stringify(newGoals)).then(() => {
      setGoals(newGoals);
      flatRef.current.scrollToEnd();
      setEnteredText('');
    });
  }

  const markCompleted = (item) => {
    const newCompleted = [...completed, item];
    AsyncStorage.setItem('completed', JSON.stringify(newCompleted)).then(async() => {
      await deleteHandler(item);
      setCompleted(newCompleted);
    })
  }

  const deleteHandler = async (item) => {
    setOnActive(-1);
    const newGoals = goals.filter((goal) => goal.id !== item.id);
    await AsyncStorage.setItem('goals', JSON.stringify(newGoals));
    setGoals(newGoals);
  }

  const renderItem = ({item, index}) => (
    <Item
      label={item.value}
      active={onActive}
      setOnActive={setOnActive}
      index={index}
      deleteItem={() => deleteHandler(item)}
      markCompleted={() => markCompleted(item)}
      createdAt={item.createdAt}
      completed={false}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={"To-Do"}
        text={enteredtext}
        addToDo={addTodo}
        search={false}
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
  );
}

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

export default ToDo;