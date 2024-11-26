import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CheckButton from '../components/CheckButton'; // Importação do componente CheckButton

/**
 * US00 - 47:
 * Um usuário, ao realizar o cadastro, se for portador de alguma deficiência, pode inserir
 * essa informação selecionando entre quatro tipos: Motora, Cognitiva, Visual ou Auditiva.
 * Esse componente encapsula cada uma dessas opções. Ao ser selecionado, assume a cor azul (#0D4186),
 * indicando qual (ou quais) tipos de deficiência o usuário possui.
 * @param state_m    Define o estado inicial do botão de deficiência motora (pressionado ou não).
 * @param state_v    Define o estado inicial do botão de deficiência visual (pressionado ou não).
 * @param state_c    Define o estado inicial do botão de deficiência cognitiva (pressionado ou não).
 * @param state_a    Define o estado inicial do botão de deficiência auditiva (pressionado ou não).
 * @param clickable  Define se o painel é clicável ou não.
 * @param pressedCallback Função de callBack do componente
 * @example          <CheckButtonDisabilityPanel
 *                      state_m={true}
 *                      state_v={false}
 *                      state_c={true}
 *                      state_a={false}
 *                      clickable={false}
 *                   />
 * @example          <View style={styles.check}>
 *                    <CheckButtonDisabilityPanel pressedCallback={(pressed) => {setDisabilities(pressed);}}/>
 *                   </View>
 */
export default function CheckButtonDisabilityPanel({
  state_m,
  state_v,
  state_c,
  state_a,
  clickable,
  pressedCallback,
}) {
  const [pressedButtons, setPressedButtons] = useState([]);

  const handleButtonPress = (button_name, pressed_state) => {
    const updatedButtons = pressed_state
      ? [...pressedButtons, button_name]
      : pressedButtons.filter(name => name !== button_name);
    setPressedButtons(updatedButtons);
  };

  useEffect(() => {
    const initialPressedButtons = [];
    if (state_m) initialPressedButtons.push('Motora');
    if (state_v) initialPressedButtons.push('Visual');
    if (state_c) initialPressedButtons.push('Cognitiva');
    if (state_a) initialPressedButtons.push('Auditiva');
    setPressedButtons(initialPressedButtons);
  }, [state_m, state_v, state_c, state_a]);

  useEffect(() => {
    // Execute a função de callback com a lista atualizada de botões pressionados
    pressedCallback(pressedButtons);
  }, [pressedButtons, pressedCallback]);

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <CheckButton
          text="Motora"
          accessibility_hint={pressedButtons.includes('Motora') ? 'Deficiência motora selecionada.' : 'Clique duas vezes para indicar que você possui deficiência motora'}
          state={state_m}
          clickable={clickable}
          onPressCallback={handleButtonPress}
        />

        <CheckButton
          text="Visual"
          accessibility_hint={pressedButtons.includes('Visual') ? 'Deficiência visua selecionada.' : 'Clique duas vezes para indicar que você possui deficiência visual'}
          state={state_v}
          clickable={clickable}
          onPressCallback={handleButtonPress}
        />
      </View>

      <View style={styles.row}>
        <CheckButton
          text="Cognitiva"
          accessibility_hint={pressedButtons.includes('Cognitiva') ? 'Deficiência cognitiva selecionada.' : 'Clique duas vezes para indicar que você possui deficiência cognitiva'}
          state={state_c}
          clickable={clickable}
          onPressCallback={handleButtonPress}
        />

        <CheckButton
          text="Auditiva"
          accessibility_hint={pressedButtons.includes('Auditiva') ? 'Deficiência auditiva selecionada.' : 'Clique duas vezes para indicar que você possui deficiência auditiva'}
          state={state_a}
          clickable={clickable}
          onPressCallback={handleButtonPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  row: {
    flexDirection: 'row',
  },
});
