/**
 * US00 - 72
 * Componente utilizado no TagButtonPanel, composto por um ícone e um texto indicando a acessbilidade que
 * o componente representa
 * @param icon Nome do ícone utilizado de acordo com a biblioteca MaterialIcons
 * @param text                Define o texto visível no botão e que será lido pela tag accessibility label.
 * @param accessibility_hint  Define a instrução a ser lida pelo TalkBack.
 * @param state               Define se o botão será criado já pressionado ou não (caso nenhum argumento seja passado, ele será criado não pressionado).
 * @param pressedCallback     Função de callBack do componente
 * @param disabled            Caso o valor passado seja true, indica que o botão deve ser criado não clicável
 * @example          <TagButton
                            icon="accessible"
                            text="Rampas de acesso"
                            accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com rampas de acesso."
                            onPressCallback={handleButtonPress}
                            disabled={true}
                      />
 *  */

import React, { useEffect, useState } from 'react';
import colors from '../constants/colors';
import { StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AutismIcon from '../assets/icons/AutismIcon';
import { Text } from 'react-native';

export default function TagButton({
  icon,
  text,
  accessibility_hint,
  state,
  onPressCallback,
  disabled,
  width = '46%',
}) {
  const [isPressed, setIsPressed] = useState(state || false);

  useEffect(() => {
    if (state == true) {
      setIsPressed(true);
      whichIsPressed(text, true);
    }
  }, [state]);
  

  const whichIsPressed = (text, pressedState) => {
    if (onPressCallback) {
      onPressCallback(text, pressedState);
    }
  };

  const onPress = () => {
    setIsPressed(!isPressed);
    whichIsPressed(text, !isPressed);
    console.log(text);
  };

  const renderIcon = () => {
    if (icon != 'autism') {
      return (
        <Icon
          style={[
            styles.icon,
            { color: isPressed ? colors.backgroundScreen : colors.textBlack },
          ]}
          name={icon}
          size={screenWidth * 0.046}
        />
      );
    } else {
      return <AutismIcon> </AutismIcon>;
    }
  };

  const backgroundColor = disabled
    ? backgroundColor
    : isPressed
      ? colors.blue
      : colors.backgroundScreen;
  const borderColor = disabled
    ? colors.textBlack
    : isPressed
      ? colors.blue
      : colors.textBlack;

  return (
    <View
      accessible={true}
      accessibilityLabel={text}
      accessibilityHint={accessibility_hint}
      style={[styles.buttonContainer, { backgroundColor, borderColor, width }]}
      onTouchEnd={!disabled ? onPress : undefined}
    >
      <View style={styles.espacamento}>
        {renderIcon()}
        <Text
          style={[
            styles.buttonText,
            { color: isPressed ? colors.backgroundScreen : colors.textBlack },
            icon === 'autism' ? { marginTop: '1.5%' } : { marginTop: 0 }
          ]}
        >
          {' '}
          {text}{' '}
        </Text>
      </View>
    </View>
  );
}
const screenWidth = Dimensions.get('window').width;
const borderWidthPercentage = 0.5;
const borderWidthValue = (screenWidth * borderWidthPercentage) / 100;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    borderWidth: borderWidthValue,
    borderColor: colors.textBlack,
    borderRadius: 9,
    marginRight: '1.7%',
    marginLeft: '1.7%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  espacamento: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: '5 %',
  },
  buttonText: {
    width: '100%',
    fontSize: 11,
    fontFamily: 'Quicksand-SemiBold',
    paddingLeft: 3,
  },
});
