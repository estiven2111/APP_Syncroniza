import * as ImagePicker from 'expo-image-picker';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ImagePickerComponent({ onSubmit }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true, //return base64 data.
      //this will allow the Vision API to read this image.
    });
    if (!result.canceled) { //if the user submits an image,
        const { assets } = result;
      if (assets.length > 0) {
        const selectedAsset = assets[0];
        setImage(selectedAsset.uri);
        const googleText = await onSubmit(selectedAsset.base64);
        
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="upload" size={30} color="black" onPress={pickImage}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width:50,
    height:50,
    borderRadius: 8,
    alignItems:"center",
    justifyContent: "center",
    margin: 20
  }
})
export default ImagePickerComponent;

//! para pruebas con ocr de google
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Text } from 'react-native';

// function ImagePickerComponent({ onSubmit }) {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState('Please add an image');

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       base64: true, //return base64 data.
//       //this will allow the Vision API to read this image.
//     });
//     if (!result.canceled) { //if the user submits an image,
//         const { assets } = result;
//       if (assets.length > 0) {
//         const selectedAsset = assets[0];
//         setImage(selectedAsset.uri);
//         const googleText = await onSubmit(selectedAsset.base64);
        
//       }
//     }
//   };
//   return (
//     <View>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && (
//         <Image
//           source={{ uri: image }}
//           style={{ width: 200, height: 200, resizeMode:"contain" }}
//         />
//       )}
//     </View>
//   );
// }
// export default ImagePickerComponent;