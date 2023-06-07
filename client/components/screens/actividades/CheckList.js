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
      {response.map((pro) => (
        <View key={pro.proyecto} style={styles.pro}>
          {pro.componentes.map((compo) => (
            <View key={compo.componente} style={styles.compo}>
              <Text>fecha</Text>
              <Text style={styles.compTitle}>{compo.componente}</Text>
              {compo.actividades.map((act) => (
                <View>
                  <Tarea actividad={act.actividad}/>
                </View>
                ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: 'lightgrey',
    margin: 10,
    borderRadius: 10,
  },
  pro: {
    backgroundColor: "blue",
    marginVertical: 5
  },
  compo: {
    backgroundColor: "red",
    marginVertical: 5
  },
  compTitle: {
    marginHorizontal: 5
  }
});

export default Checklist;
