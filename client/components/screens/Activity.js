import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Navbar from "../Navbar/Navbar";

function Activity() {
  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <Navbar />
      </View>
    </View>
  );
}

export default Activity;
