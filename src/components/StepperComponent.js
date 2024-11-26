/**
 * Componente de Stepper
 *
 * @param {array} steps - Um array contendo o número de steppers.
 * @param {number} activeStep - O índice da etapa ativa no processo.
 *
 * @example
 *
 * // Exemplo de uso
 * <StepperComponent
 *   steps={[1, 2, 3]}
 *   activeStep={0}
 * />
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function StepperComponent({ steps = [], activeStep = 0 }) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, steps.length < 3 && { width: 95 }]}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <View
            style={[
              styles.circle,
              index <= activeStep ? styles.activeCircle : styles.inactiveCircle,
            ]}
          />
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                index < activeStep ? styles.activeLine : styles.inactiveLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 170,
    height: 19,
  },
  circle: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    borderWidth: 3,
    borderColor: colors.blue,
  },
  activeCircle: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  inactiveCircle: {
    backgroundColor: colors.background,
    borderColor: colors.blue,
  },
  line: {
    flex: 1,
    width: 61,
    height: 6,
    borderWidth: 3,
    borderColor: colors.blue,
  },
  activeLine: {
    backgroundColor: colors.blue,
  },
  inactiveLine: {
    backgroundColor: colors.blue,
    opacity: 1,
  },
});
