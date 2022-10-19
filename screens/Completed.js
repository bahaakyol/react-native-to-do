import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Item from '../components/Item';


const Completed = (props) => {
    const [search, setSearch] = useState([]);
    const { completed, setCompleted } = props;
    const flatRef = useRef(null);
    const [onActive, setOnActive] = React.useState(-1);

    const deleteHandler = (item) => {
        setOnActive(-1);
        setCompleted(completed.filter((goal) => goal.id !== item.id));
      } 

    const renderItem = useCallback(({ item, index }) => (
        <Item
          label={item.value}
          active={onActive}
          setOnActive={setOnActive}
          index={index}
          deleteItem={() => deleteHandler(item)}
          createdAt={item.createdAt}
          completed = {true}
        />
      ), [onActive, setOnActive]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                search={true}
                text={search}
                setText={setSearch}
                title={"Completed"}
            />
            <View style={styles.container}>
            <FlatList
              ref={flatRef}
              data={completed}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
    )
}

export default Completed

const styles = StyleSheet.create({
    container: {
        flex: 6,
    },
})