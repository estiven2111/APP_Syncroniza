import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Overlay } from "react-native-elements";
import api from "../api/api";
import logoCreame from "./images/logo_creame.png"
import LogoSync from "./images/logo_syncroniza.png"

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
      <Image source={logoCreame} style={{ height: 130, marginBottom: 50 }} resizeMode="cover" aspectRatio={3.3}/>
      <TextInput
        style={styles.input}
        placeholder=" Usuario"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder=" Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay} overlayStyle={styles.modal}>
          <Text style={styles.errorMesage}>{errorMesage}</Text>
      </Overlay>
      <View  style={styles.footer}>
        <Text style={{fontSize:17}}>Powered by: </Text>
        <Image source={LogoSync} style={{ height: 40, width:150}} resizeMode="contain"/>
      </View>
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
  logoCreame: {
    width: "400"
  },
  titulo: {
    fontSize: 30,
  },
  input: {
    width: "70%",
    backgroundColor: "lightgrey",
    padding: 5,
    margin: 8,
    borderRadius: 6,
    height: 50
  },
  modal: {
    width: 250,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20
  },
  errorMesage: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  footer: {
    position: 'absolute',
    flexDirection: "row",
    alignItems: "center",
    bottom: 0
  }
});

export default Login;
