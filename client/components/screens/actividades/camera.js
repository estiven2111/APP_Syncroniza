import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from "react-native";
import UseCamera from '../../../utils/useCamera';
import Icon from 'react-native-vector-icons/FontAwesome';

const Camera = () => {
    const [openCamera, setOpenCamera] = useState(false);

    const openCam = () => {
      setOpenCamera(true);
    };
  
    const closeCam = () => {
      setOpenCamera(false);
    };
    return (
        <View>
        <TouchableOpacity style={styles.button} onPress={openCam}>
            <Icon name="camera" size={20} color="black" />
        </TouchableOpacity>
        
        <Modal visible={openCamera} onRequestClose={closeCam} transparent={true}>
            <View style={styles.modalContainer}>
                    <UseCamera/>
                    <TouchableOpacity onPress={closeCam}>
                        <Text>OK</Text>
                    </TouchableOpacity>
            </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 5,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
      },
      modalContainer: {
        // flex: 1,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el modal
    },
});

export default Camera