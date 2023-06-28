import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import Time from "./time";
import Entregables from "./entregables";
import Camera from "./camera";

const Tarea = (props) => {
  const [checked, setChecked] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false)
  const [isTotalTime, setIsTotalTime] = useState("")
  const [finished, setFinished] = useState (false)

  useEffect(() => {
      setFinished(false)
    console.log(finished)
  },[props.proyecto])
  
  const handleCheckboxToggle = () => {
    //! faltaria definir una funcion de determine que se va a hacer cuando el check se marque
    setConfirmModal(true)
  };
  const confirmChecked = () => {
    setConfirmModal(false); 
    setChecked(true); 
    setFinished(true)
  }

  const postInfo =
  {
    proyect : props.proyecto,
    component : props.componente,
    activity : props.actividad,
  }

  const [numberOfLines, setNumberOfLines] = useState(true);
  const handlePress = () => {
      setNumberOfLines(!numberOfLines);
  };

  return (
    <View style={finished?styles.disabledContainer:styles.container}>
      <View style={styles.pruebas}>
        <TouchableOpacity onPress={handlePress}>
          <Text ellipsizeMode="tail" numberOfLines={numberOfLines?2:10} style={props.entregable?styles.title:styles.disable} >{props.actividad}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconsCont}>
        <CheckBox
          checked={checked}
          containerStyle={styles.checkBoxContainer}
          checkedColor="black"
          uncheckedColor="black"
          onPress={() => {
            if (!isNaN(isTotalTime)) {
              handleCheckboxToggle();
            }
          }}
        />
        <Modal visible={confirmModal} transparent={true} >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>Después de aceptar no podrá editar la tarea</Text>
              <View style={styles.botones}>
                <TouchableOpacity style={styles.boton} onPress={confirmChecked}>
                  <Text>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={()=>{setConfirmModal(false)}}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Time entrega={props.entregable} postInfo={postInfo} isTime={setIsTotalTime} setChecked={setChecked}/>
        <Entregables entrega={props.entregable} lista={props.listaEntregable}/>
        <Camera entrega={props.entregable}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "justify"
  },
  disable: {
    textAlign: "justify"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  disabledContainer: {
    display: "none"
  },
  pruebas: {
    width : "50%"

  },
  iconsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%"
  },
  modalContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 270,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20
  },
  text: {
    textAlign: "center",
    fontSize: 20
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 190,
    margin: 20
  },
  boton: {
    backgroundColor: "lightgrey",
    padding: 8,
    borderRadius: 7,

  },
  checkBoxContainer: {
    padding: 0,
    margin: 0
  },
});

export default Tarea;
