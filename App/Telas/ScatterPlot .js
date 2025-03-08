import React from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Circle, Line, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const ScatterPlot = ({ voltage, current }) => {
  const width = screenWidth - 40; // Largura do gráfico
  const height = 220; // Altura do gráfico
  const padding = 40; // Espaço para os eixos

  // Se os dados estiverem vazios, evita erro
  if (voltage.length === 0 || current.length === 0) return <View />;

  // Encontrar valores máximos e mínimos para normalização
  const minX = Math.min(...voltage);
  const maxX = Math.max(...voltage);
  const minY = Math.min(...current);
  const maxY = Math.max(...current);

  // Funções para converter valores em coordenadas dentro do gráfico
  const scaleX = (val) => padding + ((val - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (val) => height - padding - ((val - minY) / (maxY - minY)) * (height - 2 * padding);

  return (
    <Svg width={width} height={height} style={{ backgroundColor: '#fff' }}>
      {/* Eixo X (Tensão) */}
      <Line x1={padding} y1={height - padding} x2={width - padding / 2} y2={height - padding} stroke="black" strokeWidth="2" />
      {/* Eixo Y (Corrente) */}
      <Line x1={padding} y1={padding / 2} x2={padding} y2={height - padding} stroke="black" strokeWidth="2" />

      {/* Título do gráfico */}
      <SvgText x={width / 2 - 30} y={padding / 2} fill="black" fontSize="14">Curva IV</SvgText>

      {/* Rótulo do eixo X */}
      <SvgText x={width / 2 - 20} y={height - 10} fill="black" fontSize="12">Tensão (V)</SvgText>
      {/* Rótulo do eixo Y */}
      <SvgText x={10} y={height / 2} fill="black" fontSize="12" rotation="-90">Corrente (A)</SvgText>

      {/* Pontos da Curva IV */}
      {voltage.map((v, i) => (
        <Circle key={i} cx={scaleX(v)} cy={scaleY(current[i] || 0)} r="4" fill="blue" />
      ))}
    </Svg>
  );
};


export default ScatterPlot;