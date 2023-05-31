import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Navbar from "../../Navbar/Navbar"
import Checklist from './CheckList';

const Actividades = () => {
    return (
        <View>
          <View style={styles.Navbar}>
        <Navbar />
      </View>
            {/* <Text>BIENVENIDO : Usuario</Text> */}
            <TextInput style={styles.input} placeholder='Escriba para buscar el proyecto'></TextInput>
            <Checklist/>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
      padding: 10,
      backgroundColor: "lightgrey",
      margin: 10,
      borderRadius: 10
    },
    Navbar:{
      margin:0,
      marginBottom:40,
      padding:0,
      width:"100%",
      height:"10%",
      // backgroundColor:"rgba(170, 164, 164, 0.9)",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
      flexWrap:"wrap"

    },
  });
export default Actividades