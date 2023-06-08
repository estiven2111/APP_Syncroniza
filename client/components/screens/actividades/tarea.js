import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import Time from "./time";
import Entregables from "./entregables";
import Camera from "./camera";
import { color } from "react-native-elements/dist/helpers";

const Tarea = (props) => {
  const [checked, setChecked] = useState(false);
  
  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <Text style={props.entregable?styles.title:styles.disable} >{props.actividad}</Text>
      <CheckBox
        checked={checked}
        onPress={handleCheckboxToggle}
        containerStyle={styles.checkBoxContainer}
        checkedColor="black"
      />
      <Time entrega={props.entregable}/>
      <Entregables entrega={props.entregable}/>
      <Camera entrega={props.entregable}/>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    width: "40%",
  },
  disable: {
    width: "40%",
    backgroundColor:"rgba(57, 162, 228, 0.895)"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 8,
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
  },
});

export default Tarea;
