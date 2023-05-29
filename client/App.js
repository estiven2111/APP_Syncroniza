// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Navigation from "./Navigation";


// import Login from './components/login.js';
// import Home from './components/home';


// const Stack = createStackNavigator();

export default function App() {
  return (
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Login" component={Login} />
  //     <Stack.Screen name="Home" component={Home} />
  //     {/* Agrega más pantallas aquí */}
  //   </Stack.Navigator>
  // </NavigationContainer>
  <Navigation/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
