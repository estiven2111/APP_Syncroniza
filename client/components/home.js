import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import Actividades from "./screens/actividades/actividades";
import Gastos from "./screens/gastos/gastos";
import Indicadores from "./screens/indicadores/indicadores"
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Actividades" component={Actividades} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="checkbox-outline" size={24} color="black" />
                    ),
                    headerShown: true,
                    // tabBarBadge: 10, // se usa para las notificaciones
                  }}
                />
                <Tab.Screen name="Gastos" component={Gastos} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="attach-money" size={24} color="black" />
                    ),
                    headerShown: true, //? quitamos el header con esto
                  }}
                />
                <Tab.Screen name="Indicadores" component={Indicadores} 
                 options={{
                    tabBarIcon: ({ color, size }) => (
                      <Entypo name="bar-graph" size={24} color="black" />
                    ),
                  }}
                />
            </Tab.Navigator>
    )
}
export default Home 