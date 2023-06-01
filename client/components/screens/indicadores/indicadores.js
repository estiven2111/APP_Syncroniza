import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Navbar from "../../Navbar/Navbar";
const Indicadores = () => {
  return (
    <View>
      <View style={styles.Navbar}>
        <Navbar />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Busca el Proyecto o sin Proyecto"
      />
      <TextInput style={styles.input} placeholder="Fecha inicio - Fecha fin" />
      <View style={styles.inputCont}>
        <Text style={styles.input} placeholder="Valor ICA $">
          Horas Disp.:
        </Text>
        <TextInput style={styles.input} placeholder="hora" />
        <Text style={styles.input} placeholder="Valor ICA $">
          Horas Cumplidas:
        </Text>
        <TextInput style={styles.input} placeholder="hora" />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.input} placeholder="Valor ICA $">
          Horas Prog.:
        </Text>
        <TextInput style={styles.input} placeholder="hora" />
        <Text style={styles.input} placeholder="Valor ICA $">
          Horas Frecuencia:
        </Text>
        <TextInput style={styles.input} placeholder="hora" />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.input} placeholder="Valor ICA $">
          NIVEL DE ACTIVIDAD(%)
        </Text>
        <TextInput style={styles.input} placeholder="%%%" />
      </View>
      <View style={styles.grafico}>
        <Text>GRAFICO AQUI</Text>
      </View>

      <Text>Estos son los Indicadores</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    padding: 5,
    flexDirection: "row",
  },
  scan: {
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    height: "20%",
    borderRadius: 4,
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 10,
    backgroundColor: "lightgrey",
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  grafico: {
    backgroundColor: "lightgrey",
    height: "40%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
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

export default Indicadores;
