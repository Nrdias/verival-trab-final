/**
 * Componente de distancia de raio de procura de estabelecimentos
 *
 * @param onChange       Funcao pro callback da distancia
 * @example             <DistanceComponent onChange={(d) => console.log(d)}></DistanceComponent>
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AccessibilityInfo } from 'react-native';
import { fonts } from '../assets/fonts/fontlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors';

export default function DistanceSelector({ onChange }) {
  const [distance, setDistance] = useState(10);

  const announceDistance = (distance) => {
    AccessibilityInfo.announceForAccessibility(`Distância atualizada para ${distance} quilômetros`);
  };

  const increaseDistance = () => {
    let newDistance;
    if (distance >= 10) {
      newDistance = distance + 10;
    } else {
      newDistance = distance + 1;
    }
    setDistance(newDistance);
    onChange(newDistance);
    announceDistance(newDistance);
  };

  const decreaseDistance = () => {
    let newDistance;
    if (distance > 10) {
      newDistance = distance - 10;
    } else if (distance > 1) {
      newDistance = distance - 1;
    } else {
      newDistance = distance;
    }
    setDistance(newDistance);
    onChange(newDistance);
    announceDistance(newDistance);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={decreaseDistance}
        accessibilityHint="Clique para reduzir o raio de distância de pesquisa"
        accessibilityLabel='Reduzir o raio de distância de pesquisa'
      >
        <Icon name='do-not-disturb-on' color={colors.backgroundScreen} size={40} />
      </TouchableOpacity>
      <Text
        style={styles.distanceText}
        accessibilityLabel={`O raio de distância atual corresponde a ${distance} quilômetros`}
      >
        {distance} km
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={increaseDistance}
        accessibilityHint="Clique para aumentar o raio de distância de pesquisa"
        accessibilityLabel='Aumentar o raio de distância de pesquisa'
      >
        <Icon name='add-circle' color={colors.backgroundScreen} size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textBlack,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
  },
  distanceText: {
    fontSize: 20,
    fontFamily: 'Oxygen-Bold',
    color: colors.textBlack
  },
});
