import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import api from "../../../api/api";
import { TimeInput } from "../../../utils/inputControl";

const Time = ({ entrega, postInfo, isTime, setChecked}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const updateStartTime = (value) => {
    setStartTime(value);
  };
  const updateEndTime = (value) => {
    setEndTime(value);
  };
  const [manualDuration, setManualDuration] = useState(false);
  const [newDuration, setNewDuration] = useState("");
  const [editedTime, setEditedTime] = useState(false)
  const handleNewDuration = (value) => {
    setNewDuration(value);
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

  const [errorModal, setErrorModal] = useState(false);
  const toggleOverlay = () => {
    setErrorModal(!errorModal);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    if (startTime.length === 0 && endTime.length === 0) {
      if (editedTime) {
        sendInfoDB()
        setNewDuration("")
        setModalVisible(false)
        setEditedTime(false)
        return
      } else {

        return setModalVisible(false);
      }
    }
    if (startTime.length === 5 && endTime.length === 5) {
      sendInfoDB();
      updateStartTime("");
      updateEndTime("");
      setModalVisible(false);
    } else {
      toggleOverlay();
    }
  };

  const [date, setDate] = useState("");
  useEffect(() => {
    const getDate = () => {
      const currentDate = new Date();
      const formatDate = currentDate.toISOString().split("T")[0];
      setDate(formatDate);
    };
    getDate();
  }, []);

  const [totalTime, setTotalTime] = useState("");

  useEffect(() => {
    const solicitud = async () => {
      try {
        const response = await api.get(`/proyect/hours?activity=${postInfo.activity}&proyect=${postInfo.proyect}`);
        
        setTotalTime(response.data)
        isTime(response.data)
        setChecked(false)
      } catch (error) {
        console.error("No se envio la informacion correctamente", error);
      }
    };
    solicitud();
  }, [postInfo.activity, postInfo.proyect]);
  
  
  const sendInfoDB = async () => {
    try {
      const response = await api.post("/proyect/hours", {
        ...postInfo,
        fecha: date,
        inicio : startTime?startTime.split(":").join("."):"00.00",
        fin : endTime?endTime.split(":").join("."):"00.00",
        HParcial : editedTime?newDuration.split(":").join("."):getDuration().split(":").join(".")
      });
      isTime(response.data.horaTotal)
      setTotalTime(response.data.horaTotal);
    } catch (error) {
      console.error("No se envio la informacion correctamente", error);
    }
  };


  const handleCheckboxToggle = () => {
    //! faltaria definir una funcion de determine que se va a hacer cuando el check se marque
    setConfirmModal(true)
  };

  

  return (
    <View>
      <TouchableOpacity
        style={entrega ? styles.button : styles.disable}
        onPress={openModal}
      >
        <Text>{!isNaN(totalTime) ? totalTime : "00:00"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{date}</Text>
            <View style={styles.hour}>
              <Text>Hora inicio:</Text>
              <TimeInput value={startTime} onChange={updateStartTime} />
            </View>
            <View style={styles.hour}>
              <Text>Hora final:</Text>
              <TimeInput value={endTime} onChange={updateEndTime} />
            </View>
            {manualDuration
              ?
              <View style={styles.duration}>
              <Text>Duracion:</Text>
                <TextInput style={styles.manualDuration} value={newDuration} onChangeText={handleNewDuration}></TextInput>
                <TouchableOpacity onPress={()=>{setEditedTime(true); setManualDuration(false)}}>
                  <Icon name="check" size={15} color="#000"/>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.duration}>
              <Text>Duracion:</Text>
              {editedTime
              ?
              <Text style={styles.textDuration}>{newDuration}</Text>
              :
              <Text style={styles.textDuration}>{getDuration() !== "" ?getDuration(): "00:00"}</Text>
              }
              <TouchableOpacity onPress={()=>setManualDuration(true)}>
                <Icon name="pencil" size={15} color="#000"/>
              </TouchableOpacity>
            </View>
            }
            <Text>Tiempo Total: {!isNaN(totalTime) ? totalTime : "00:00"}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>OK</Text>
            </TouchableOpacity>
            <Overlay
              isVisible={errorModal}
              onBackdropPress={toggleOverlay}
              overlayStyle={styles.modal}
            >
              <Text style={styles.errorMesage}>Formato no válido</Text>
            </Overlay>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 5,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
  },
  disable: {
    // backgroundColor: "rgba(108, 108, 110, 0.393)",
    backgroundColor: "white",
    padding: 5,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
  },
  duration: {
    flexDirection: "row"
  },
  manualDuration: {
    width:70,
    marginHorizontal: 5,
    backgroundColor: "lightgrey",
    borderRadius: 5
  },
  textDuration: {
    width:70,
    marginHorizontal: 5,
    borderRadius: 5,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente para el modal
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    padding: 10,
    borderRadius: 10,
  },
  hour: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    width: 190
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
    fontWeight: "bold",
  },
});

export default Time;
