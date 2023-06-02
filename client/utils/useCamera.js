import {Camera, CameraType} from "expo-camera";
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


//!vamos de aqui
const UseCamera = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }

    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Icon name="refresh" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress="por definir">
                    <Icon name="camera" size={40} color="white" />
                </TouchableOpacity>
            </View>  
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        height: 300,
        backgroundColor: "black"
        },
        camera: {
            height: 500
        },
        buttonContainer: {
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: "space-around"
        },
        button: {
            alignSelf: 'center',
            alignItems: 'flex-end',
            padding: 7,
            margin: 20
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
    });

export default UseCamera