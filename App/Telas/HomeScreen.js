import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [mostrarGraficos, setMostrarGraficos] = useState(false);

  // Dados fixos para os gráficos
  const tensaoData = [30, 32, 31, 33, 35, 34];
  const correnteData = [5, 5.5, 5.2, 5.8, 6, 5.7];
  const curvaIVData = [6.5, 6.3, 6.0, 5.7, 5.2, 4.5, 3.5, 0];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráficos de Linha</Text>
      {!mostrarGraficos ? (
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setMostrarGraficos(true)}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* Gráfico 1 - Tensão ao longo do tempo */}
          <Text style={styles.chartTitle}>Tensão ao longo do tempo</Text>
          <LineChart
            data={{
              labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
              datasets: [{ data: tensaoData }],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel="V"
            chartConfig={chartConfig}
            style={styles.chart}
          />

          {/* Gráfico 2 - Corrente ao longo do tempo */}
          <Text style={styles.chartTitle}>Corrente ao longo do tempo</Text>
          <LineChart
            data={{
              labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
              datasets: [{ data: correnteData }],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel="A"
            chartConfig={chartConfig}
            style={styles.chart}
          />

          {/* Gráfico 3 - Curva IV do painel solar */}
          <Text style={styles.chartTitle}>Curva IV do Painel Solar</Text>
          <LineChart
            data={{
              labels: ['0V', '5V', '10V', '15V', '20V', '25V', '30V', '35V'],
              datasets: [{ data: curvaIVData }],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel="A"
            xAxisLabel="V"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#DDDDDD',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#FF4500' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    alignSelf: 'center',
  },

  button: {
    width: 211,
    height: 58,
    borderRadius: 25,
    backgroundColor: '#6EC1E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    marginLeft: 90,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
