import React, {useState, useContext} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';
import { TimeInput } from '../../../utils/inputControl';


const Time = (props) => {
    // Esto maneja la alerta
    const [isVisible, setIsVisible] = useState(false);
    const toggleOverlay = () => {
      setIsVisible(!isVisible);
    };
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
      setModalVisible(true);
    };
    const closeModal = () => {
        if ((startTime.length===0 || startTime.length===5) && (endTime.length===0 || endTime.length===5)) {
            setModalVisible(false);
        } else {
            toggleOverlay()
        }
    };

    const updateStartTime = (value) => {
        setStartTime(value);
      };
    
      const updateEndTime = (value) => {
        setEndTime(value);
      };



    return (
        <View>
        <TouchableOpacity  style={props.entrega?styles.button:styles.disable} onPress={openModal}>
            <Text>Tiempo</Text>
        </TouchableOpacity>
        <Modal animationType= "fade" visible={modalVisible} onRequestClose={closeModal} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Fecha: fx()</Text>
                    <View style={styles.hour}>
                        <Text>Hora inicio:</Text>
                        <TimeInput position="start" value={startTime} onChange={updateStartTime}/>
                    </View>
                    <View style={styles.hour}>
                        <Text>Hora final:</Text>
                        <TimeInput position="end" value={endTime} onChange={updateEndTime}/>
                    </View>
                    <Text>Duracion: Fx()</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text>OK</Text>
                    </TouchableOpacity>
                    <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
                        <Text>Formato no valido</Text>
                    </Overlay>
                </View>
            </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        padding: 5,
        height: 30,
        borderRadius: 8,
        justifyContent: "center"
    },
    disable: {
        // backgroundColor: "rgba(108, 108, 110, 0.393)",
        backgroundColor: "white",
        padding: 5,
        height: 30,
        borderRadius: 8,
        justifyContent: "center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el modal
    },
    modalContent: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        padding: 10,
        borderRadius: 10,
    },
    hour: {
        flexDirection: "row",
        padding: 5
    }
});

export default Time