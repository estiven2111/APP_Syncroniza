import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Keyboard } from 'react-native';

import api from "../api/api"

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get(`/proyect?search=${searchText}`);
        const data = await response.data;
        setOptions(data.map(pro => pro.proyecto));
        setShowOptions(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchText === '') {
      setShowOptions(false);
    } else {
      fetchOptions();
    }
  }, [searchText]);

  const handleSearch = (text) => {
    if (text !== searchText) {
        setSearchText(text);
        setShowOptions(true);
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectOption(item)}>
      <Text style={styles.option}>{item}</Text>
    </TouchableOpacity>
  );

  const handleSelectOption = (option) => {
    Keyboard.dismiss(); // Cierra el teclado
    setSearchText(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Busca el Proyecto o sin Proyecto"
      />
      {showOptions && (
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    marginHorizontal: 15,
    
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 10
  },
  modalContainer: {
    marginTop: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  option: {
    padding: 10,
  },
};

export default SearchBar;
