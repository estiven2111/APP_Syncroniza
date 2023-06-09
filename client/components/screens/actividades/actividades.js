import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Checklist from "./CheckList";
import SearchBar from "../../searchBar";

const Actividades = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Checklist />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },

});
export default Actividades;
