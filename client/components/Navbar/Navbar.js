import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { styles } from "./styles";

function Navbar() {
  return (
    <>
    <Text style={styles.text}>Luis Fernando ospina   </Text>
    <Text style={styles.text}>Luis@gmail.com </Text>
<TouchableOpacity
style={styles.buton}
>
<Text style={styles.textButon}>...</Text>
</TouchableOpacity>
     </>
  );
}

export default Navbar;
