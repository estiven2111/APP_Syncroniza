import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FilePickerButton = ({ent}) => {
  const [fileCharged, setFileCharged] = useState(false)

    const handleFilePick = async () => {
      try {
        const file = await DocumentPicker.getDocumentAsync();
        console.log(file.uri);
        if (file.uri) setFileCharged(true)
      } catch (error) {
          console.log('Selección de archivo cancelada', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={fileCharged?styles.charged:styles.input}>{ent}</Text>
        <TouchableOpacity onPress={handleFilePick} style={styles.selectCont}>
          <Text style={styles.select}>...</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: "row",
      padding:5
    },
    charged: {
        backgroundColor: "lightblue",
        width: 230,
        height: 30,
        margin: 1,
        borderRadius: 5,
        fontSize:13,
        paddingHorizontal:3,
        textAlign: "center",
        textAlignVertical: "center"
    },
    input: {
      backgroundColor: "lightgrey",
        width: 230,
        height: 30,
        margin: 1,
        borderRadius: 5,
        fontSize:13,
        paddingHorizontal:3,
        textAlign: "center",
        textAlignVertical: "center"
    },
      selectCont: {
        width: 30,
        height:30,
        borderRadius: 5,
        margin: 1,
        backgroundColor: "lightgrey",
        alignItems: "center"
    },
    select: {
        width: 20,
        textAlign: "center"
    }

});
  
export default FilePickerButton