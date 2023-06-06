import React from "react";
import { ScrollView, Text, View, TextInput, StyleSheet } from "react-native";
import Constants from "expo-constants";
import WelcomeBar from "../../welcomeBar";
import Checklist from "./CheckList";
// import SearchBark

const Actividades = () => {
  return (
    <View style={styles.container}>
      <WelcomeBar />
      <ScrollView>
        <Checklist />
      </ScrollView>
    </View>
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
