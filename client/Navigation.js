import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //? buttom navigation
import { NavigationContainer } from "@react-navigation/native"; //? navegacion
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //? stack navigation
import { createStackNavigator } from "@react-navigation/stack";

import Activity from "./components/screens/Activity";
import Gastos from "./components/screens/Gastos";
import Indicator from "./components/screens/Indicator";
import Login from "./components/login";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

const HomeStackNavigator = createNativeStackNavigator();
const tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// function MyStack() {
//    return(
//     <HomeStackNavigator.Navigator
//     initialRouteName="ActividadesScreen"
//     >
//         <HomeStackNavigator.Screen
//         name="ActividadesScreen" component={HomeScreen} />
//         <HomeStackNavigator.Screen
//         name="Gastos" component={SettingScreen}
//         options={{
//           //  headerShown:false,
//             headerBackTitleVisible:false,

//         }}
//         />
//      </HomeStackNavigator.Navigator>
//    )
//  }

function MyTabs() {
  return (
    <tab.Navigator
    // initialRouteName="Actividades"
    // screenOptions={{
    //   tabBarActiveTintColor: "blue",
    // }}
    >
      {/* <tab.Screen name="Actividades" component={HomeScreen} */}
      <tab.Screen
        name="App_ingresos"
        component={Activity}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={24} color="black" />
          ),
          headerShown: true,
          tabBarBadge: 10, // se usa para las notificaciones
        }}
      />
      <tab.Screen
        name="Gastos"
        component={Gastos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={24} color="black" />
          ),
          headerShown: true, //? quitamos el header con esto
        }}
      />
      <tab.Screen
        name="Indicadores"
        component={Indicator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" size={24} color="black" />
          ),
        }}
      />
    </tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Mytabs" component={MyTabs} />
        {/* <MyTabs /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
