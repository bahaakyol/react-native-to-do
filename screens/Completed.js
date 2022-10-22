import { SafeAreaView, StyleSheet, FlatList, View, Text } from 'react-native';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import Item from '../components/Item';
import Error from '../components/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Completed = (props) => {
  const [search, setSearch] = useState([]);
  const { completed, setCompleted } = props;
  const [filtered, setFiltered] = useState(completed);
  const flatRef = useRef(null);
  const [onActive, setOnActive] = React.useState(-1);

  useEffect(() => {
    setFiltered(completed.filter(item => item.value.includes(search)));
  }, [search]);

  useEffect(() => {
    setFiltered(completed);
  }, [completed]);

  const deleteHandler = (item) => {
    setOnActive(-1);
    const newCompleted = completed.filter((goal) => goal.id !== item.id)
    AsyncStorage.setItem('completed', JSON.stringify(newCompleted)).then(() => {
      setCompleted(newCompleted);
    })
  }

  const renderItem = useCallback(({ item, index }) => (
    <Item
      label={item.value}
      active={onActive}
      setOnActive={setOnActive}
      index={index}
      deleteItem={() => deleteHandler(item)}
      createdAt={item.createdAt}
      completed={true}
    />
  ), [onActive, setOnActive, completed]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        search={true}
        text={search}
        setText={setSearch}
        title={"Completed"}
      />
      {filtered?.length === 0 ? <Error /> : <View style={styles.container}>
        <FlatList
          ref={flatRef}
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>}
    </SafeAreaView>
  )
}

export default Completed

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  
})