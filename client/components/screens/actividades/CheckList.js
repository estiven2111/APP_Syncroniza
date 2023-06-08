import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import api from '../../../api/api';
import Tarea from './tarea';

const Checklist = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/proyect?search=5001`);
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
                <View style={styles.actividad}>
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
    backgroundColor: "rgba(72, 169, 229, 0.735);", //! dejar este color
    marginVertical: 5,
    borderRadius: 3
  },
  footer: {
    marginBottom: 28
  }
});

export default Checklist;

