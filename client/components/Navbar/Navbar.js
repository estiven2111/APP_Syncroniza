import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { styles } from "./styles";

function Navbar() {
  const [proyect, setProyect] = useState("");
  const handlesConfig = () => {
    Alert.alert("Configuraciones");
  };
  return (
    <>
      <View>
        <Text style={styles.text}>Luis Fernando ospina </Text>
        <Text style={styles.text}>Luis@gmail.com </Text>
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
