import React, {useState} from 'react';
import { View, Text, StyleSheet } from "react-native"
import { CheckBox } from 'react-native-elements';
import Time from "./time";
import Entregables from './entregables';
import Camera from './camera';

const Tarea = (props) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.actividad}</Text>
            <CheckBox checked={checked}
        onPress={handleCheckboxToggle}
        containerStyle={styles.checkBoxContainer}
        checkedColor="black"/>
            <Time/>
            <Entregables/>
            <Camera/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        width:"40%",
        borderColor: "black",
        borderWidth: 2
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8
    },
    checkBoxContainer: {
        padding: 0,
        margin: 0
    }
});

export default Tarea