import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function TelaInicial({ navigation }) { 
  return (
    <View style={styles.container}>
      <Image source={require('../assets/01.png')} style={styles.logo} />
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  button: {
    width: 211,
    height: 58,
    borderRadius: 25,
    backgroundColor: '#6EC1E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
