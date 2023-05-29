import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "../Navbar/Navbar";
function Gastos() {
  return (
    <View>
    <Text
    style={{
      fontSize:30,
      textAlign:"center",
      marginTop:"20%"
    }}
    >Gastos</Text>
    <Navbar/>
  </View>
  )
}

export default Gastos
