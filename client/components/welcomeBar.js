import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Logout from './logout';
import SearchBar from './searchBar';

const WelcomeBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Nombre de Usuario</Text>
                <Logout/>
            </View>
            <SearchBar/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
      marginRight: 10,
    },
  });

export default WelcomeBar