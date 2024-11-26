/**
 * US00 - 72
 * Esse componente encapsula todas as tags de acessibilidade existentes em um painel, que será utilizado
 * para realizar o cadastro, edição e pesquisa de estabelecimentos.
 * @param pressedCallback Função de callBack do componente
 * @example          <TagButtonPanel pressedCallback={handlePressedButtons} />
 *  */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TagButton from '../components/TagButton';

export default function TagButtonPanel({ pressedCallback, setPressedButtons, tagPanelHeight }) {

  const handleButtonPress = (buttonName, isPressed) => {
    if (pressedCallback) {
      pressedCallback(buttonName, isPressed);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        height={tagPanelHeight}
        contentContainerStyle={styles.scrollViewContent}
        nestedScrollEnabled={true}>
        <View style={styles.screen}>
          {/* Row 1 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="accessible"
              text="Rampas de acesso"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com rampas de acesso."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="wc"
              text="Banheiro adaptado"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com banheiro adaptado."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 2 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="elevator"
              text="Elevador"
              acc
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com elevador."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="casino"
              text="Textos em braile"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com textos em braile."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 3 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="blind"
              text="Piso tátil"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com piso tátil."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="time-to-leave"
              text="Estacionamento"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com estacionamento."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 4 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="volume-up"
              text="Sinalização sonora"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com sinalização sonora."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="visibility"
              text="Sinalização"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com sinalização."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 5 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="table-bar"
              text="Móveis adaptados"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com móveis adaptados."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="autism"
              text="Amigo autista"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com acessibilidade para pessoas autistas."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 6 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="check-box"
              text="Serviço prioritário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com atendimento prioritário."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="sign-language"
              text="Intérprete de libras"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com intérprete de libras."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 7 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="chair-alt"
              text="Assento prioritário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com assento prioritário."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="people"
              text="Equipe qualificada"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com equipe qualificada."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 8 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="meeting-room"
              text="Entrada facilitada"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com entrada facilitada."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="baby-changing-station"
              text="Fraldário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com fraldário."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 9 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="pets"
              text="Uso de cão guia"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos que permitem o uso de cão guia."
              onPressCallback={handleButtonPress}
            />

            <TagButton
              icon="child-friendly"
              text="Espaço descanso"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com espaço para descanso."
              onPressCallback={handleButtonPress}
            />
          </View>

          {/* Row 9 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="elderly"
              text="Amigo idoso"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar com inclusividade idosos."
              onPressCallback={handleButtonPress}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowSpacing: {
    marginBottom: '2%',
  },
});
