import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TempRadiance() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Temperatura e Radiância</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Temperatura:</Text>
          <Text style={styles.value}>25°C</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Radiância:</Text>
          <Text style={styles.value}>500 W/m²</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});