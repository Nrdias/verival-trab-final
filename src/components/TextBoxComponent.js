/**
 * Componente de text box
 *
 * @param placeholder       Texto principal do componente
 * @param sendText          Função para enviar o texto ao componente filho do pai
 * @param label             Label de acessibilidade por exemplo: "Campo de descrição"
 * @param hint              Dica do que deve ser feito no campo: "Insira seu texto aqui"
 * @param value             Caso seja uma edição valor inicial a ser passado (opcional)
 * @param error             Caso haja erro no campo (opcional), default false
 * @param minHeight         Altura mínima do componente (opcional), default 100
 * @param numberOfLines     Número de linhas do componente (opcional), default 4
 * 
 * @example          <TextBoxComponent
 *                     placeholder="Descrição"
 *                     sendText={function}
 *                   />
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import colors from '../constants/colors';

export default function TextBoxComponent({
  placeholder,
  value = '',
  sendText,
  accessibilityLabel,
  hint,
  error = false,
  minHeight = 100,
  numberOfLines = 4,
  editable = true
}) {
  const [text, setText] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);

  function handleText(text) {
    setText(text);
    sendText(text);
  }

  return (
    <View
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: text }}
      accessibilityHint={hint}>
      <TextInput
        mode="outlined"
        label={
          <Text style={(error ? styles.labelError : isFocused ? styles.labelSelected : styles.label)}
            importantForAccessibility='no'>
            {placeholder}
          </Text>
        }
        value={text || value}
        onChangeText={text => handleText(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={true}
        numberOfLines={numberOfLines}
        style={[styles.textBox, { minHeight: minHeight }]}
        outlineColor={error ? colors.error : colors.borderStrokeBlack}
        activeOutlineColor={error ? colors.error : colors.blue}
        contentStyle={{ fontFamily: 'Quicksand-Medium', color: colors.textBlack }}
        keyboardType='default'
        theme={{
          colors: {
            primary: colors.borderStrokeBlack,
            background: colors.backgroundScreen,
          },
        }}
        importantForAccessibility='no'
        editable={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    minWidth: '100%',
    minHeight: 100,
  },

  label: {
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlack
  },
  labelSelected: {
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlue
  },
  labelError: {
    fontFamily: 'Quicksand-Medium',
    color: colors.error
  },
});
