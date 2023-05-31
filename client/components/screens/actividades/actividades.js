import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Constants from "expo-constants";

import WelcomeBar from '../../welcomeBar';
import Checklist from './CheckList';

const Actividades = () => {
    return (
      <View style={styles.container}>
        <WelcomeBar/>
        <TextInput style={styles.input} placeholder='Escriba para buscar el proyecto'></TextInput>
        <Checklist/>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight
    },
    input: {
      padding: 10,
      backgroundColor: "lightgrey",
      margin: 10,
      borderRadius: 10
    },
  });
export default Actividades