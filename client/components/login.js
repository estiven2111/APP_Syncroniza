import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Overlay } from "react-native-elements";
import api from "../api/api";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleGetToken = async () => {
    const datatoken = await AsyncStorage.getItem("token");
    if (!datatoken) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 0);
  }, []);

  const [errorMesage, setErrorMessage] = useState("")
  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { user, password });
      await AsyncStorage.multiSet([
        ["name", response.data.userName],
        ["token", response.data.token],
        ["email", response.data.userEmail]
      ]);
      setPassword("");
      // Realiza la navegación a la siguiente pantalla
      navigation.navigate("Home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message)
        toggleOverlay()
      }

    }
  };

  const [isVisible, setIsVisible] = useState(false);
    const toggleOverlay = () => {
      setIsVisible(!isVisible);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>EMPRESA</Text>
      <Text>Ingresa tus datos</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay} overlayStyle={styles.modal}>
          <Text style={styles.errorMesage}>{errorMesage}</Text>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
  },
  input: {
    width: "60%",
    backgroundColor: "lightgrey",
    padding: 4,
    margin: 5,
    borderRadius: 6,
  },
  modal: {
    width: 250,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMesage: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default Login;
