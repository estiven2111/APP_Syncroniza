import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/context';

import api from '../../../api/api';
import Tarea from './tarea';

const Checklist = () => {
  const [response, setResponse] = useState([]);
  const {inputValue} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(inputValue)
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

  return (
    <View style={styles.container}>
      {response?.map((pro, index) => (
        <View key={index} style={styles.pro}>
          {pro.componentes.map((compo,index) => (
            <View key={index} style={styles.compo}>
              <Text>fecha</Text>
              <Text style={styles.compTitle}>{compo.componente}</Text>
              {compo.actividades.map((act,index) => (
                <View key={index} style={styles.actividad}>
                  <Tarea actividad={act.actividad}/>
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
  compo: {
    marginVertical: 2,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding:2
  },
  compTitle: {
    marginHorizontal: 5
  },
  actividad: {
    backgroundColor: "grey",
    marginVertical: 5,
    borderRadius: 3
  },
  footer: {
    marginBottom: 28
  }
});

export default Checklist;

