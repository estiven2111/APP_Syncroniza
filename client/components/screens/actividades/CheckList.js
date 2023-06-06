import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Tarea from './tarea';

const Checklist = () => {
    //? seteamos los valores de items con datos que deberian venir de la base de datos
  // const [items, setItems] = useState([
  //   { id: 1, text: 'Tarea 1', checked: false },
  //   { id: 2, text: 'Tarea 2', checked: true },
  //   { id: 3, text: 'Tarea 3', checked: false },
  // ]);

  //? esta funcion se encarga d modificar el estado haciendo un mapeo y encontrando por id el item a modificar
  const toggleCheck = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => toggleCheck(item.id)}>
  //     <View style={styles.item}>
  //       <Text style={item.checked ? styles.checkedText : styles.uncheckedText}>{item.text}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Text>Fecha - Componente</Text>
      <Tarea/>
      {/* <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "lightgrey",
    margin: 10,
    borderRadius: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  uncheckedText: {
    color: 'black',
  },
  list: {
    marginStart:15
  }
});

export default Checklist
