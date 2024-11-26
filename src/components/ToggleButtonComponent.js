import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';
import { Button } from 'react-native-paper';

export default function ToggleButtons ({ onActivate, onDeactivate }) {
  const [activeButton, setActiveButton] = useState(1);

  const handlePress = (buttonId) => {
    if (activeButton === buttonId) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonId);
    }
  };

  const firstButtonLabel = 'Todos';
  const secondButtonLabel = 'Positivos';
  const thirdButtonLabel = 'Negativos';

  useEffect(() => {
    if (activeButton !== null) {
      const filterType = activeButton === 1 ? 'all' : activeButton === 2 ? 'positive' : 'negative';
      onActivate(filterType);
    } else {
      onDeactivate();
    }
  }, [activeButton, onActivate, onDeactivate]);

  return (
    <View style={styles.toggleButtonContainer}>
      <View style={[styles.buttonContainer, { backgroundColor: activeButton == 1 ? colors.blue : colors.backgroundScreen }]}>
        <Button
          labelStyle={[styles.buttonText, { color: activeButton == 1 ? colors.backgroundScreen : colors.blue }]}
          onPress={() => handlePress(1)}
          accessible={true}
          accessibilityLabel={'O botão seleciona todas as avaliações.'}
        >
          {firstButtonLabel}
        </Button>
      </View>
      <View style={[styles.buttonContainer, { backgroundColor: activeButton == 2 ? colors.blue : colors.backgroundScreen }]}>
        <Button
          labelStyle={[styles.buttonText, { color: activeButton == 2 ? colors.backgroundScreen : colors.blue }]}
          onPress={() => handlePress(2)}
          accessible={true}
          accessibilityLabel={'O botão seleciona as avaliações positivas.'}
        >
          {secondButtonLabel}
        </Button>
      </View>
      <View style={[styles.buttonContainer, { backgroundColor: activeButton == 3 ? colors.blue : colors.backgroundScreen }]}>
        <Button
          labelStyle={[styles.buttonText, { color: activeButton == 3 ? colors.backgroundScreen : colors.blue }]}
          onPress={() => handlePress(3)}
          accessible={true}
          accessibilityLabel={'O botão seleciona as avaliações críticas.'}
        >
          {thirdButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const borderWidthPercentage = 0.5;
const borderWidthValue = (screenWidth * borderWidthPercentage) / 100;

const styles = StyleSheet.create({
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '30%',
    borderColor: colors.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5%',
    marginHorizontal: '0.8%',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
  },
});
