import React from "react";
import { ScrollView, View, TextInput, StyleSheet } from "react-native";
import Constants from "expo-constants";
import WelcomeBar from "../../welcomeBar";
import Checklist from "./CheckList";

const Actividades = () => {
  return (
    <ScrollView style={styles.container}>
      <WelcomeBar />
      <TextInput
        style={styles.input}
        placeholder="Escriba para buscar el proyecto"
      ></TextInput>
      <Checklist />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  input: {
    padding: 10,
    backgroundColor: "lightgrey",
    margin: 10,
    borderRadius: 10,
  },
});
export default Actividades;
