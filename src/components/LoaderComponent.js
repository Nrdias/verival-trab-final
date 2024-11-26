/**
 * @author                    Bianca Alves @bianca.alves
 *
 * @example                   <LoaderComponent accessibilityLabel='Carregando lista de estabelecimentos' />
 */

import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';
import { fonts } from '../assets/fonts/fontlist';

export default function LoaderComponent({ accessibilityLabel }) {
  return (
    <View style={styles.container}
      accessibilityLabel={accessibilityLabel}>
      <ActivityIndicator size={'large'} color={colors.blue} importantForAccessibility='no' />
      <Text style={styles.text}
        importantForAccessibility='no'>
        Carregando
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },

  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: colors.textBlue
  }
});