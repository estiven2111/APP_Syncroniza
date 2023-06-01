import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Logout from './logout';



const WelcomeBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nombre de Usuario</Text>
            <Logout/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
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