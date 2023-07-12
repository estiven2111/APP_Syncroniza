import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Dimensions, Image } from 'react-native';
import Constants from "expo-constants";
import SearchBar from '../../searchBar';
import callGoogleVisionAsync from './helperFunction';
import UseCameraOCR from '../../../utils/useCamOCR';
import Camera from '../actividades/camera';
import ImagePickerComponent from "./imagePicker"
import api from '../../../api/api';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    }
    

//! este estado se debe cambiar por los parametros de cada input
const [fillData, setFillData] = useState(false)
const [responsedata,setResponsedata] = useState({
    nit:"",
    numFact:"",
    doc:"",
    total:"",
    nombre:"",
    rete:""
})
const handlerScan = async () => {
    try {
        const formData = new FormData();
        formData.append('imagen', {
          uri: toScan,
          type: 'image/jpeg',
          name: 'nombre_de_la_imagen.jpg'
        });
    
        const response = await api.post('/proyect/ocr', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // const num = parseFloat(`2${response.data.total}`)
        
        // const iva =  (num * 19) / 100;
        // const rete = (num * 4) / 100;
        // console.log(iva)
        setResponsedata({
            nit:response.data.nit,
            numFact:response.data.numFact,
            doc:response.data.doc,
            total:response.data.total,
            nombre:response.data.nombre,
            iva:response.data.iva,
            rete:response.data.rete,
            fecha:response.data.fecha,
            concepto:response.data.concepto
        })
        console.log(responsedata)
        setFillData(true)
      } catch (error) {
        console.error(error);
      }
}

const handlerCancel = () => {
    setResponsedata({
        nit:"",
        numFact:"",
        doc:"",
        total:"",
        nombre:"",
        rete:"",
        iva:"",
        fecha:"",
        concepto:""
    })
    setToScan("");
}

const handlerSend = () => {
    setResponsedata({
        nit:"",
        numFact:"",
        doc:"",
        total:"",
        nombre:"",
        rete:"",
        iva:"",
        fecha:"",
        concepto:""
    })
    setToScan("");
    setFillData(false)
}

// const mentira = {
//     concepto: "Factura",
//     nombre: "estiven",
//     valor: "20000",
//     nit:"1020445"
// }

    return (
        <View style={styles.container}>
            <SearchBar/>
            <ScrollView >
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Buscar anticipo'/>
                    <TextInput style={styles.input} placeholder='$000.000.000.00'/>
                </View>
                <View style={styles.scan}>
                    <View>
                        {toScan?<Image source={{uri: toScan}} style={styles.photo} resizeMode='contain'/>:null}
                    </View>
                {toScan
                ?
                //! aqui me quede!!!!!!
                    <View style={styles.scanCont}>
                        <TouchableOpacity style={styles.buttonScan} onPress={handlerScan}>
                                <Text>Escanear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonScan} onPress={handlerCancel}>
                                <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View style={styles.select}>
                        <TouchableOpacity style={styles.button} onPress={openCam}>
                            <Icon name="camera" size={30} color="black"/>
                        </TouchableOpacity>
                        <ImagePickerComponent setToScan={newPhoto}/>
                    </View>
                }
                
                <Modal visible={openCamera} onRequestClose={closeCam} transparent={true}>
                    <View style={styles.modalContainer}>
                        <UseCameraOCR setToScan={newPhoto} closeCam={closeCam}/>
                    </View>
                </Modal>
                </View>
                <TextInput style={styles.input} placeholder='*Concepto' value={fillData?responsedata.concepto:""}/>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*NIT/CC'value={fillData?responsedata.nit:""}/>
                    <TextInput style={styles.input} placeholder='*Nombre' value={fillData?responsedata.nombre:""}/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Valor pagado $...' value={fillData?`${responsedata.total}`:""}/>
                    <TextInput style={styles.input} placeholder='Valor IVA $...'value={fillData?`${responsedata.iva}`:""}/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='Valor Rete fuente $'value={fillData?`${responsedata.rete}`:""}/>
                    <TextInput style={styles.input} placeholder='*DD/MM/AAAA' value={fillData?`${responsedata.fecha}`:""}/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='Valor ICA $'/>
                    <TextInput style={styles.input} placeholder='Escriba el Municipio'/>
                </View>
                <TextInput style={styles.input} placeholder='Centro de costos...'/>
                <TouchableOpacity style={[styles.sendButton, fillData?{borderColor: "rgb(0,255,255)", borderWidth: 2}:null]} onPress={handlerSend} disabled={!fillData}>
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
    select: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        marginHorizontal: 50,
        height: 50,
        width: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
    },
    scanCont: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonScan: {
        alignItems: "center",
        margin: 3,
        backgroundColor: "rgb(151,151,151)",
        width: 100,
        padding: 3,
        borderRadius: 5
    },
    scan: {
        backgroundColor: "rgb(200,200,200)",
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        height:220 ,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: "lightgrey",
        marginHorizontal: 10,
        borderRadius: 10,
        height:40,
        flex: 1
    },
    icon: {
        margin: 5
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
        width: 300,
        height: 180
    },
    sendButton: {
        padding: 8,
        height: 40,
        margin: 10,
        backgroundColor: "rgb(151,151,151)",
        borderRadius: 8,
        alignItems: "center"
    }
});
export default Gastos 