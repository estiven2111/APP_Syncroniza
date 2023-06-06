import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet  } from 'react-native';
import Constants from "expo-constants";
import WelcomeBar from '../../welcomeBar';

const Indicadores = () => {
    return (
      <View style={styles.container}>
        <WelcomeBar />
        <ScrollView>
          <TextInput style={styles.inputBar} placeholder="Fecha inicio - Fecha fin" />
          <View style={styles.inputCont}>
            <Text style={styles.label}>Horas Disp.:</Text>
            <TextInput style={styles.input} placeholder="hora" />
            <Text style={styles.label}>Horas Cumplidas:</Text>
            <TextInput style={styles.input} placeholder="hora" />
          </View>
          <View style={styles.inputCont}>
            <Text style={styles.label}>Horas Prog.:</Text>
            <TextInput style={styles.input} placeholder="hora" />
            <Text style={styles.label}>Horas Frecuencia:</Text>
            <TextInput style={styles.input} placeholder="hora" />
          </View>
          <View style={styles.inputCont}>
            <Text style={styles.label}>NIVEL DE ACTIVIDAD(%):</Text>
            <TextInput style={styles.input} placeholder="%%%" />
          </View>
          <View style={styles.grafico}>
            <Text>GRAFICO AQUI</Text>
          </View>
          <View style={styles.footer}></View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flexGrow: 1,
      padding: 10,
    },
    inputBar: {
        paddingHorizontal: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginVertical: 5,
        height: 40
      },
    inputCont: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    label: {
      width: 85,
      marginRight: 5,
      fontWeight: 'bold',
    },
    input: {
      flex: 1,
      paddingHorizontal: 5,
      backgroundColor: 'lightgrey',
      borderRadius: 10,
      marginRight: 5,
      paddingVertical: 5,
    },
    grafico: {
      backgroundColor: 'lightgrey',
      height: 200,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      marginBottom: 28
    }
  });
  
  export default Indicadores;