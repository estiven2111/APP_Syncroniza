import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';
import { TimeInput } from '../../../utils/inputControl';


const Time = ({entrega, value, onChangeStartTime, onChangeEndTime, onPress}) => {
    // Esto maneja la alerta
    const [isVisible, setIsVisible] = useState(false);
    const toggleOverlay = () => {
      setIsVisible(!isVisible);
    };
    
    // const [startTime, setStartTime] = useState("");
    // const [endTime, setEndTime] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
      setModalVisible(true);
    };
    const closeModal = () => {
        if ((value.startTime.length===0 || value.startTime.length===5) && (value.endTime.length===0 || value.endTime.length===5)) {
            onPress(true)
            setModalVisible(false);
        } else {
            onPress(false)
            toggleOverlay()
        }
    };

    // const updateStartTime = (value) => {
    //     setStartTime(value);
    //   };
    
    //   const updateEndTime = (value) => {
    //     setEndTime(value);
    //   };

    const getDuration = () => {
        if (value.startTime.length===5 && value.endTime.length===5) {
            const start = value.startTime.split(":")
            const startMinutes = (parseInt(start[0])*60) + parseInt(start[1])

            const end = value.endTime.split(":")
            const endMinutes = (parseInt(end[0])*60 )+ parseInt(end[1])
            let totalMinutes = 0
            if (endMinutes >= startMinutes) {
                totalMinutes = endMinutes - startMinutes
            } else {
                totalMinutes = (24*60)+(endMinutes - startMinutes)
            }
            const duration = `${Math.floor(totalMinutes/60)<10 ? "0" + Math.floor(totalMinutes/60) : Math.floor(totalMinutes/60)}:${totalMinutes%60<10 ? "0" + totalMinutes%60 : totalMinutes%60}`
            return duration

        }
    }



    return (
        <View>
        <TouchableOpacity  style={entrega?styles.button:styles.disable} onPress={openModal}>
            <Text>{getDuration()?getDuration():"Tiempo"}</Text>
        </TouchableOpacity>
        <Modal animationType= "fade" visible={modalVisible} onRequestClose={closeModal} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Fecha: fx()</Text>
                    <View style={styles.hour}>
                        <Text>Hora inicio:</Text>
                        <TimeInput value={value.startTime} onChange={onChangeStartTime}/>
                    </View>
                    <View style={styles.hour}>
                        <Text>Hora final:</Text>
                        <TimeInput value={value.endTime} onChange={onChangeEndTime}/>
                    </View>
                    <Text>Duracion: {getDuration()}</Text>
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