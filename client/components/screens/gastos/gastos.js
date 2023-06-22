import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Dimensions, Image } from 'react-native';
import Constants from "expo-constants";
import SearchBar from '../../searchBar';
import ImagePickerComponent from './imagePicker';
import callGoogleVisionAsync from './helperFunction';
import UseCameraOCR from '../../../utils/useCamOCR';
import Camera from '../actividades/camera';

const Gastos = () => {
    const [openCamera, setOpenCamera] = useState(false);
    const openCam = () => {
        setOpenCamera(true);
    };
    const closeCam = () => {
      setOpenCamera(false);
    };

    const [toScan, setToScan] = useState("")
    const newPhoto = (value) => {
        setToScan(value)
        console.log("llego", toScan)
    }
useEffect(()=> {

}, [toScan])

const handlerScan = () => {
    console.log("vamos bien!!")
}

const mentira = {
    concepto: "Factura",
    nombre: "estiven",
    valor: "20000",
    nit:"1020445"
}

    return (
        <View style={styles.container}>
            <SearchBar/>
            <ScrollView >
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Buscar anticipo'/>
                    <TextInput style={styles.input} placeholder='$000.000.000.00'/>
                </View>
                <View style={styles.scan}>
                {toScan?<Image source={{uri: toScan}} style={styles.photo}/>:null}
                <TouchableOpacity style={styles.button} onPress={toScan?handlerScan:openCam}>
                    <Text>{toScan?"Escanear":"abrir camara"}</Text>
                </TouchableOpacity>
                <Modal visible={openCamera} onRequestClose={closeCam} transparent={true}>
                    <View style={styles.modalContainer}>
                        <UseCameraOCR setToScan={newPhoto} closeCam={closeCam}/>
                        <TouchableOpacity onPress={closeCam}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                </View>
                <TextInput style={styles.input} placeholder='*Concepto' value={toScan?mentira.concepto:""}/>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*NIT/CC'/>
                    <TextInput style={styles.input} placeholder='*Nombre' value={toScan?mentira.nombre:""}/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Valor pagado $...' value={toScan?mentira.valor:""}/>
                    <TextInput style={styles.input} placeholder='Valor IVA $...'/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='Valor Rete fuente $'/>
                    <TextInput style={styles.input} placeholder='*DD/MM/AAAA'/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='Valor ICA $'/>
                    <TextInput style={styles.input} placeholder='Escriba el Municipio'/>
                </View>
                <TextInput style={styles.input} placeholder='Centro de costos...'/>
                <TouchableOpacity style={styles.scan}>
                    <Text>Confirmar envío...</Text>
                </TouchableOpacity>
                <View style={styles.footer}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1
      },
    inputCont : {
        padding: 5,
        flexDirection: "row"
    },
    button: {
        backgroundColor: 'white',
        padding: 5,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
      },
    scan: {
        backgroundColor: "pink",
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        height:135 ,
        borderRadius: 4,
        justifyContent: "center"
    },
    input: {
      paddingHorizontal: 10,
      backgroundColor: "lightgrey",
      marginHorizontal: 10,
      borderRadius: 10,
      flex: 1
    },
    footer: {
      marginBottom: 40
    },
    modalContainer: {
      // flex: 1,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para el modal
  },
  photo: {
    // width: "100%",
    height: 100
}
  });
export default Gastos 