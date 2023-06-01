import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
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

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { user, password });
      const token = response.data.token;
      await AsyncStorage.setItem("token", token); // Almacena el token en el dispositivo
      setPassword("");

      // Realiza la navegación a la siguiente pantalla
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      // Manejo de errores de inicio de sesión
    }
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
});

export default Login;
