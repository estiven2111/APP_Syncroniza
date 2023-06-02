import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from "react-native"
import { CheckBox } from 'react-native-elements';
import Time from "./time"
import Camera from './camera';

const Tarea = () => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    return (
        <View style={styles.container}>
            <Text>tarea index</Text>
            <CheckBox 
                title=""
                checked={checked}
                onPress={handleCheckboxToggle}
            />
            <Time/>
            <TouchableOpacity style={styles.button}>
                <Text>...</Text>
            </TouchableOpacity>
            <Camera/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8
    },
    button: {
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
        width: 200,
        padding: 10,
        borderRadius: 10,
    },
        hour: {
        flexDirection: "row",
        margin: 10,
        justifyContent: "space-around"
    }
});

export default Tarea