import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import Actividades from "./screens/actividades/actividades";
import Gastos from "./screens/gastos/gastos";
import Indicadores from "./screens/indicadores/indicadores";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Actividades"
        component={Actividades}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Gastos"
        component={Gastos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Indicadores"
        component={Indicadores}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Home;
