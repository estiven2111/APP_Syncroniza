import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


import Logout from './logout';

const WelcomeBar = () => {
    const [info, setInfo] = useState({
        name : "Usuario",
        email: "Email"
    })

    useEffect(() => {
        const fetchToken = async () => {
          const token = await AsyncStorage.getItem("token");
          console.log(token)
          setInfo({
            name : token.substring(0,12),
            email : token.substring(12,24)
          })
        };
      
        fetchToken();
      }, []);
      

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>{info.name}</Text>
                <Text style={styles.text}>{info.email}</Text>
                <Logout/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
      marginRight: 10,
    },
  });

export default WelcomeBar