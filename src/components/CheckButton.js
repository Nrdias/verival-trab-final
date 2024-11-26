import React, { useState } from 'react';
import colors from '../constants/colors';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

/**
 * US00 - 47:
 * Esse componente encapsula uma opção passível de ser selecionada por um usuário. Seu uso se dá
 * principalmente no componente CheckButtonDisabilityPanel, utilizado para indicar quais tipos
 * de deficiências determinado usuário possui ao realizar o cadastro ou ao editar seu perfil.
 * @param text                Define o texto visível no botão e que será lido pela tag accessibility label.
 * @param accessibility_hint  Define a instrução a ser lida pelo TalkBack.
 * @param state               Define se o botão será criado já pressionado ou não (caso nenhum argumento seja passado, ele será criado não pressionado).
 * @param clickable           Define se o botão é clicável ou não. Se o valor passado for false, cria um botão não clicável (caso nenhum valor seja 
 *                            passado como argumento o botão será criado como clicável)
 * @param onPressCallback     Função que indica que passa ao componente pai qual botão está sendo pressionado
 *                            
 * @example          <CheckButton
 *                     text="Motora"
 *                     accessibility_hint="Dê um duplo clique para indicar que você é uma pessoa portadora de deficiência (tipo_deficiencia)"
 *                     state = {true}
 *                     clickable = {false}
 *                     onPressCallback = {handleButtonPress}
 *                   />
 */

export default function CheckButton({
  text,
  accessibility_hint,
  state,
  clickable,
  onPressCallback
}) {
  const [isPressed, setIsPressed] = useState(state || false);
  const isClickable = clickable === false ? false : true;

  const whichIsPressed = (text, pressedState) => {
    if (onPressCallback) {
      onPressCallback(text, pressedState);
    }
  }

  const onPress = () => {
    if (isClickable) {
      setIsPressed(!isPressed);
      whichIsPressed(text, !isPressed);
    }
  };

  return (
    <View style={[styles.buttonContainer, { backgroundColor: isPressed ? colors.blue : colors.backgroundScreen }]}>
      <Button
        labelStyle={[styles.buttonText, { color: isPressed ? colors.backgroundScreen : colors.blue }]}
        onPress={onPress}
        accessibilityLabel={text}
        accessibilityHint={accessibility_hint ? accessibility_hint : ''}
        disabled={clickable}
      >
        {text}
      </Button>
    </View>
  );
}

//Obtém a largura da tela
const screenWidth = Dimensions.get('window').width;
//Define a porcentagem utilizada para criar a espessura da borda 
const borderWidthPercentage = 0.5;
//Define a espessura da borda
const borderWidthValue = (screenWidth * borderWidthPercentage) / 100;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '30%',
    borderWidth: borderWidthValue,
    borderColor: colors.blue,
    borderRadius: 9,
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
