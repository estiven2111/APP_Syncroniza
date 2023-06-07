import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import Actividades from "./screens/actividades/actividades";
import Gastos from "./screens/gastos/gastos";
import Indicadores from "./screens/indicadores/indicadores";
import WelcomeBar from "./welcomeBar";

import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
const Tab = createMaterialTopTabNavigator();

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <WelcomeBar/>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: "white",
            height: 60,
          },
          activeTintColor: "black",
          inactiveTintColor: "gray",
          indicatorStyle: {
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="Actividades"
          component={Actividades}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkbox-outline" size={20} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Gasto"
          component={Gastos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="attach-money" size={20} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Indicadores"
          component={Indicadores}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="bar-graph" size={20} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Ajusta el espacio superior según tus necesidades
  },
});
export default Home;
