/**
 * Tags de disability de um estabelecimento
 * @param   disabilities = [
 * '4c109301-44a7-3270-8ffa-23c9c691dbd9',
 * '4557e774-91fe-3dbd-9a60-55aeb0ed00d7',
 * '85f1130d-59b1-3804-b236-c03510434726',
 * 'e0b7f938-1f49-309a-83f5-221dae4009cc',
 * ];
 *
 * @example          <DisabilityTagsComponent />
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import MotorIcon from '../assets/icons/MotorIcon.js';
import AuditoryIcon from '../assets/icons/AudirotyIcon.js';
import VisualIcon from '../assets/icons/VisualIcon.js';
import CognitiveIcon from '../assets/icons/CognitiveIcon.js';

function renderDisabilityIcons(disability) {
  if (disability == 'Visual')
    return <VisualIcon accessibilityLabel="Tag de acessibilidade visual" />;
  if (disability == 'Motora')
    return <MotorIcon accessibilityLabel="Tag de acessibilidade motora" />;
  if (disability == 'Auditiva')
    return <AuditoryIcon accessibilityLabel="Tag de acessibilidade auditiva" />;
  if (disability == 'Cognitiva')
    return <CognitiveIcon accessibilityLabel="Tag de acessibilidade cognitiva" />
};

export default function DisabilityTagsComponent({ disabilities }) {
  return (
    <View style={styles.disabilityIconsContainer}>
      {disabilities &&
        disabilities.map((disability, index) => (
          <View key={index} style={styles.singleIconContainer}>
            {renderDisabilityIcons(disability)}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  disabilityIconsContainer: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'flex-end',
    flex: 3,
  },

  singleIconContainer: {
    justifyContent: 'center',
  },
});
