import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import api from "../../../api/api";
import { TimeInput } from "../../../utils/inputControl";

const Time = ({
  entrega,
  value,
  onChangeStartTime,
  onChangeEndTime,
  onPress,
  getDuration,
  postInfo,
  activity,
}) => {
  const [errorModal, setErrorModal] = useState(false);
  const toggleOverlay = () => {
    setErrorModal(!errorModal);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    if (value.startTime.length === 0 && value.endTime.length === 0) {
      return setModalVisible(false);
    }
    if (value.startTime.length === 5 && value.endTime.length === 5) {
      if (value.endTime) {
        onPress(true);
      } else {
        onPress(false);
      }
      sendInfoDB();
      onChangeStartTime("");
      onChangeEndTime("");
      setModalVisible(false);
    } else {
      onPress(false);
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
        console.log("vamos entrando")
        console.log(postInfo.proyect,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
        const response = await api.get(`/proyect/hours?activity=${postInfo.activity}&proyect=${postInfo.proyect}`);
        console.log(response.data)
        
       setTotalTime(response.data)
      } catch (error) {
        console.error("No se envio la informacion correctamente", error);
      }
    };
    solicitud();
  }, [activity]);
  //! hacer un get para q aparezca lleno

  const sendInfoDB = async () => {
    try {
      const response = await api.post("/proyect/hours", {
        ...postInfo,
        fecha: date,
      });
      console.log(response.data);
      setTotalTime(response.data.horaTotal);
    } catch (error) {
      console.error("No se envio la informacion correctamente", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={entrega ? styles.button : styles.disable}
        onPress={openModal}
      >
        <Text>{!isNaN(totalTime) ? totalTime : "Tiempo"}</Text>
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
              <TimeInput value={value.startTime} onChange={onChangeStartTime} />
            </View>
            <View style={styles.hour}>
              <Text>Hora final:</Text>
              <TimeInput value={value.endTime} onChange={onChangeEndTime} />
            </View>
            <Text>Duracion: {getDuration() !== "" ?getDuration(): "00:00"}</Text>
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
