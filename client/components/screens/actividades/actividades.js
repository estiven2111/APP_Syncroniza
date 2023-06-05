import React, { useState } from "react";
import { ScrollView, View, TextInput, StyleSheet,FlatList } from "react-native";
import Constants from "expo-constants";
import Navbar from "../../Navbar/Navbar";
import WelcomeBar from "../../welcomeBar";
import Checklist from "./CheckList";
import api from "../../../api/api";

const Actividades = () => {
const [search,setSearch] = useState([]);
  const handlerSearch = async (search) =>{
    const response = await api.post("/proyect/search", {search});
    // const searchs = response.data.map(pro=>pro.proyect)
    setSearch(searchs)
    
  }
  return (
    <ScrollView style={styles.container}>
      <WelcomeBar />
      <View style={styles.Navbar}>
        <Navbar />
      </View>
      <View>
      <TextInput
        style={styles.input}
        placeholder="Escriba para buscar el proyecto"
        onChangeText={handlerSearch}
      ></TextInput>
      {/* <FlatList
        data={search}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item}
      /> */}
      </View>
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
  Navbar: {
    margin: 0,
    marginBottom: 40,
    padding: 0,
    width: "100%",
    height: "10%",
    // backgroundColor:"rgba(170, 164, 164, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default Actividades;
