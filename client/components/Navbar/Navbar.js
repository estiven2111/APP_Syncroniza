import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { styles } from "./styles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
function Navbar() {
  const [proyect, setProyect] = useState("");
  // cosnt [user,setUser] = useState("")
  // setUser("fern")
  const handlesConfig = () => {
    Alert.alert("Configuraciones");
  };
  return (
    <>
      <View>
        <Text style={styles.text}>Estiven </Text>
        <Text style={styles.text}>estiven@gmail.com </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.buton} onPress={handlesConfig}>
          <Text style={styles.textButon}>...</Text>
        </TouchableOpacity>
       </View>

    
    </>
  );
}
{
  /* <TextInput
style={styles.input}
        placeholder="Busca tu proyecto aqui ....."
        value={proyect}
        onChangeText={setProyect}
      /> */
}
export default Navbar;
