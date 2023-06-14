import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

const Entregables = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
    return (
        <View>
        <TouchableOpacity style={props.entrega?styles.button:styles.disable} disabled={props.entrega?false:true} onPress={openModal}>
            <Text>...</Text>
        </TouchableOpacity>
        <Modal animationType= "fade" visible={modalVisible} onRequestClose={closeModal} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Entregables a enviar:</Text>
                    {props.lista.map((ent, index) => {
                        return( 
                        <View style={styles.entregables}>
                            <Text style={styles.input} key={index}>{ent}</Text>
                            <TouchableOpacity style={styles.selectCont}>
                                <Text style={styles.select} key={index}>...</Text>
                            </TouchableOpacity>
                        </View> )
                    })}
                    <TouchableOpacity onPress={closeModal}>
                        <Text>OK</Text>
                    </TouchableOpacity>
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
        backgroundColor: "rgba(108, 108, 110, 0.393)",
        padding: 5,
        height: 30,
        borderRadius: 8,
        justifyContent: "center"
    },
    entregables : {
        flexDirection: "row",
    },
    input: {
        backgroundColor: "lightgrey",
        width: 150,
        margin: 1,
        borderRadius: 5,
        fontSize:11,
        paddingHorizontal:3
    },
    selectCont: {
        width: 20,
        borderRadius: 5,
        margin: 1,
        backgroundColor: "lightgrey"
    },
    select: {
        width: 20,
        textAlign: "center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo semitransparente para el modal
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

export default Entregables