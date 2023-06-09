import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import SearchBar from '../../searchBar';
import ImagePickerComponent from './imagePicker';
import callGoogleVisionAsync from './helperFunction';

const Gastos = () => {
    return (
        <View style={styles.container}>
            <SearchBar/>
            <ScrollView >
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Buscar anticipo'/>
                    <TextInput style={styles.input} placeholder='$000.000.000.00'/>
                </View>
                <TouchableOpacity style={styles.scan}>
                    <ImagePickerComponent onSubmit={callGoogleVisionAsync}/>
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder='*Concepto'/>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*NIT/CC'/>
                    <TextInput style={styles.input} placeholder='*Nombre'/>
                </View>
                <View style={styles.inputCont}>
                    <TextInput style={styles.input} placeholder='*Valor pagado $...'/>
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
    scan: {
        backgroundColor: "lightblue",
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        height:100 ,
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
    }
  });
export default Gastos 