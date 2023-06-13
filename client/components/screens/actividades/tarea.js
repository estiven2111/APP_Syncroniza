import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import Time from "./time";
import Entregables from "./entregables";
import Camera from "./camera";
import { color } from "react-native-elements/dist/helpers";

const Tarea = (props) => {
  const [checked, setChecked] = useState(false);
  
  const handleCheckboxToggle = (condition) => {
    setChecked(condition);
  };
  
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const updateStartTime = (value) => {
    setStartTime(value);
  };
  const updateEndTime = (value) => {
    setEndTime(value);
  };

  const getDuration = () => {
    if (startTime.length===5 && endTime.length===5) {
        const start = startTime.split(":")
        const startMinutes = (parseInt(start[0])*60) + parseInt(start[1])

        const end = endTime.split(":")
        const endMinutes = (parseInt(end[0])*60 )+ parseInt(end[1])
        let totalMinutes = 0
        if (endMinutes >= startMinutes) {
            totalMinutes = endMinutes - startMinutes
        } else {
            totalMinutes = (24*60)+(endMinutes - startMinutes)
        }
        const duration = `${Math.floor(totalMinutes/60)<10 ? "0" + Math.floor(totalMinutes/60) : Math.floor(totalMinutes/60)}:${totalMinutes%60<10 ? "0" + totalMinutes%60 : totalMinutes%60}`
        return duration
    } else {
      return ""
    }
  }

    const postInfo =
    {
      proyect : props.proyecto,
      component : props.componente,
      activity : props.actividad,
      inicio : startTime.split(":").join("."),
      fin : endTime.split(":").join("."),
      HParcial : getDuration().split(":").join(".")
    }
  



  return (
    <View style={styles.container}>
      <Text style={props.entregable?styles.title:styles.disable} >{props.actividad}</Text>
      <CheckBox
        checked={checked}
        containerStyle={styles.checkBoxContainer}
        checkedColor="black"
      />

      <Time entrega={props.entregable} activity={props.actividad} value={{startTime, endTime}} onChangeStartTime={updateStartTime} onChangeEndTime={updateEndTime} onPress={handleCheckboxToggle} getDuration={getDuration} postInfo={postInfo}/>
      <Entregables entrega={props.entregable} lista={props.listaEntregable}/>
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
