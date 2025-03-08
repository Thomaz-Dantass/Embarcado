import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Paho from 'paho-mqtt';
import ScatterPlot from './ScatterPlot ';

const screenWidth = Dimensions.get('window').width;
const client = new Paho.Client('10.44.1.35', 9001, '/');

export default function HomeScreen() {
  const [mostrarGraficos, setMostrarGraficos] = useState(false);
  const [voltage, setVoltage] = useState([]);
  const [current, setCurrent] = useState([]);
  

  useEffect(() => {
    const onMessageArrived = (message) => {
      if (message.destinationName === 'esp32/voltage') {
        setVoltage((prevVoltage) => {
          const newVoltage = parseFloat(message.payloadString);
          // Mantém os 6 últimos valores de tensão
          if (prevVoltage.length >= 200) {
            return [...prevVoltage.slice(1), newVoltage];
          }
          return [...prevVoltage, newVoltage];
        });
      }

      if (message.destinationName === 'esp32/current') {
        setCurrent((prevCurrent) => {
          const newCurrent = parseFloat(message.payloadString);
          // Mantém os 6 últimos valores de corrente
          if (prevCurrent.length >= 200) {
            return [...prevCurrent.slice(1), newCurrent];
          }
          return [...prevCurrent, newCurrent];
        });
      }
    };

    const onConnect = () => {
      console.log("Conexão bem-sucedida!");
      client.subscribe('esp32/voltage');
      client.subscribe('esp32/current');
    };

    client.connect({ onSuccess: onConnect });
    client.onMessageArrived = onMessageArrived;

    return () => {
      client.disconnect();
      

    };
  }, []);

  const handleStart = () => {
    try {
      const message = new Paho.Message("on");
      message.destinationName = "esp01/led";
      client.send(message);
      console.log("enviado");
      setMostrarGraficos(true);
    } catch (error) {
      console.error("Erro ao enviar comando:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monitoramento Solar</Text>
      
      {!mostrarGraficos ? (
        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Iniciar Teste</Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* Dados em tempo real */}
          <View style={styles.realTimeData}>
            <Text style={styles.dataText}>
              Tensão: {voltage.length > 0 ? `${voltage[voltage.length - 1].toFixed(2)} V` : '--'}
            </Text>
            <Text style={styles.dataText}>
              Corrente: {current.length > 0 ? `${current[current.length - 1].toFixed(2)} A` : '--'}
            </Text>
          </View>

          {/* Gráfico 1 - Tensão */}
          <Text style={styles.chartTitle}>Tensão ao Longo do Tempo</Text>
          <LineChart
            data={{
              labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
              datasets: [{
                data: voltage.length > 0 ? voltage : [0, 0, 0, 0, 0, 0], // Atualiza com os dados da voltagem
              }],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel="V"
            chartConfig={chartConfig}
            style={styles.chart}
          />

          {/* Gráfico 2 - Corrente */}
          <Text style={styles.chartTitle}>Corrente ao Longo do Tempo</Text>
          <LineChart
            data={{
              labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
              datasets: [{
                data: current.length > 0 ? current : [0, 0, 0, 0, 0, 0], // Atualiza com os dados da corrente
              }],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel="A"
            chartConfig={chartConfig}
            style={styles.chart}
          />

          {/* Gráfico 3 - Curva IV */}
          <Text style={styles.chartTitle}>Curva IV do Painel Solar</Text>
          <ScatterPlot voltage={voltage} current={current} />

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
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 5,
    color: '#333',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 50,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  realTimeData: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dataText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
  curveChart: { height: 220, width: screenWidth - 20, alignSelf: 'center' },
});
