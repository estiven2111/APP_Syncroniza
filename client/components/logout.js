import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useContext} from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../api/api";

import { AuthContext } from "./context/context";

const Logout = () => {
  const {resetInputValue} = useContext(AuthContext)
  
  const navigation = useNavigation();
  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    resetInputValue()
    api.get("/proyect/logout")
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Icon name="sign-out" size={40} color="black" style={styles.icon} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default Logout;
