import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/context';

import api from '../../../api/api';
import Tarea from './tarea';

const Checklist = () => {
  const [response, setResponse] = useState([]);
  const {inputValue} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(inputValue!==""){
          const response = await api.get(`/proyect?search=${inputValue}`);
          setResponse(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [inputValue]);

  const [numberOfLines, setNumberOfLines] = useState(true);
  const handlePress = () => {
      setNumberOfLines(!numberOfLines);
  };

  return (
    <View style={styles.container}>
      {response?.map((pro,index) => (
       <View key={index} style={styles.pro}>
          {pro.componentes.map((compo,index) => (
            <View key={index} style={styles.compo}>
              <View style={styles.compoCont}>
                <Text style={styles.compTitle}>{compo.fecha}</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Text ellipsizeMode="tail" numberOfLines={numberOfLines?1:2} style={styles.compTitle}>{compo.componente}</Text>
                </TouchableOpacity>
              </View>
              {compo.actividades.map((act,ind) => (
                <View key={ind} style={styles.actividad}>
                  <Tarea proyecto={pro.proyecto} componente={compo.componente} actividad={act.actividad} entregable={act.entregable} listaEntregable={act.nombre_entregable}/>
                </View>
                ))}
            </View>
          ))}
        </View>
      ))}
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop:5
  },
  pro: {
    marginBottom: 10,
    borderRadius: 5,
  },
  compoCont: {
    flexDirection: "row",
    width : 280,
  },
  compo: {
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    padding:3,
    fontSize: 15
  },
  compTitle: {
    marginHorizontal: 5,
    fontSize: 15
  },
  actividad: {
    backgroundColor: "rgba(72, 169, 229, 0.735)", //! dejar este color
    marginVertical: 5,
    borderRadius: 3
  },
  footer: {
    marginBottom: 28
  }
});

export default Checklist;

