import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <TouchableOpacity style={styles.button}>
                <Text>Tiempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Icon name="camera" size={20} color="black" />
            </TouchableOpacity>
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
});

export default Tarea