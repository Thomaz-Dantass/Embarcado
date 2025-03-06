import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Temp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Temperatura!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});