import React, { useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import Item from '../components/Item';
import Header from '../components/Header';


const ToDo = (props) => {


  const flatRef = useRef(null);
  const [enteredtext, setEnteredText] = React.useState('');
  const { goals, setGoals, setCompleted } = props;
  const [onActive, setOnActive] = React.useState(-1);

  function addTodo() {
    setGoals([ ...goals, {
      id: Math.random().toString(),
      value: enteredtext,
      createdAt: new Date(),
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
      markCompleted={() => setCompleted(prev => [...prev, item])}
      createdAt={item.createdAt}
      completed = {false}
    />
  ), [onActive, setOnActive]);

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