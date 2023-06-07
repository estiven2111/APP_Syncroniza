import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import api from '../../../api/api';
import Tarea from './tarea';

const Checklist = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/proyect?search=5`);
        setResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {response.map((pro, index) => (
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

