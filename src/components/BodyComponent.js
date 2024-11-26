/**
 * Componente de exibição do conteúdo em qualquer tela
 *
 * @param children   Componente a ser renderizado
 * @example          <BodyComponent style={style}>
 *                     {children}
 *                   <BodyComponent/>
 */

import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export default function BodyComponent({ style, children }) {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.body}>{children}</ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
});
