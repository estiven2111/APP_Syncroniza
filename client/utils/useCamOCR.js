import {Camera, CameraType} from "expo-camera";
import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as MediaLibrary from 'expo-media-library';


//!vamos de aqui
const UseCameraOCR = ({setToScan, closeCam}) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestPermissions] = MediaLibrary.usePermissions()
    
    const [photoModal, setPhotoModal] = useState(null);
    const [photo, setPhoto] = useState("");
    useEffect(() => {
        setToScan(photo)
    },[photo, setToScan])
    
    const camRef = useRef(null);


    if (!permission) {
      return <View />;
    }
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    if (!permissionResponse) {
        return <View />;
    }
    if (!permissionResponse.granted) {
    return (
        <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to access Media Library</Text>
        <Button onPress={requestPermissions} title="grant permission" />
        </View>
    );
    }

    const takePicture = async () => {
        if (camRef) {
            const data = await camRef.current.takePictureAsync()
            setPhoto(data.uri)
            setPhotoModal(true)
        }
    }

    const savePicture = ()=> {
        MediaLibrary.saveToLibraryAsync(photo)
        setPhotoModal(false)
        closeCam()
    }


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={camRef}/>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => toggleCameraType()}>
                        <Icon name="refresh" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
                        <Icon name="camera" size={40} color="white" />
                    </TouchableOpacity>
                </View>
                <Modal animationType= "slide" visible={photoModal} transparent={false}>
                    <View style={styles.modalOptions}>
                        <TouchableOpacity onPress={() => savePicture()} style={styles.prueba}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPhotoModal(false) }>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        photo: {
            width: "100%",
            height: 350
        },
        // modalCont: {
        //     justifyContent:"center",
        //     alignItems: "center",
        //     backgroundColor: "red"
        // },
        modalOptions: {
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
            flexDirection: "row"
          },
          prueba: {
            width: 150,
            backgroundColor: "red"
          }
    });

export default UseCameraOCR