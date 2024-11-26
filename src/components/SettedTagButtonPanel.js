import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TagButton from './TagButton';


export default function TagButtonPanel({ pressedCallback, initialPressedButtons, tagPanelHeight }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pressedStates, setPressedStates] = useState({});

  useEffect(() => {
    if (initialPressedButtons) {
      setIsLoading(false);
    }
  }, [initialPressedButtons]);

  const tags = {
    'Banheiro adaptado': '413d60b7-56a2-3b3b-bb9e-bd81b407b595',
    'Circulação interna': '87312432-9022-3e09-b0c2-5829a0ac7231',
    'Entrada facilitada': '4374510d-f70c-3079-9ebf-9f9b1669cfa0',
    'Estacionamento': 'ad7a9706-009a-3ccb-bff7-03bfd31d9fa6',
    'Sinalização sonora': 'd017ea73-6622-36eb-b5af-396175b3a12c',
    'Sinalização visual': 'f215b2a9-31d9-385e-b29d-ad12d3291747',
    // 'Site acessível': '7d89e05d-9532-3a04-8815-6f3acae4f7de',
    'Elevador': '0a1788c0-82eb-3972-929b-eed7806425fe',
    'Piso tátil': 'b550e576-47ca-39ca-894a-81f3d1aa4108',
    'Textos em braile': 'e391bc1b-7b8a-30f7-9d60-830db2f7f200',
    'Rampas de acesso': '78a7e8cb-3b61-364c-b242-c8e81b03215c',
    'Móveis adaptados': 'a131e10a-168a-3782-81d0-4bf501c8f426',
    'Amigo autista': 'e69d7f89-d3df-3738-b66c-c9c5a70f1948',
    'Serviço prioritário': '00567fcf-b414-34bf-babd-04ce947a7527',
    'Intérprete de libras': '792812e7-f2e6-3ec6-b005-2f6c71d4d6cc',
    'Assento prioritário': '2c975c26-3e97-3af6-9452-3c91629dd49a',
    'Equipe qualificada': '0fabe2c2-ecf8-3f88-8950-47c321749683',
    'Fraldário': 'ffbd8d0d-ce77-354b-a526-de94db27fd58',
    'Uso de cão guia': 'd71129a4-50b0-32f4-8826-800892819e64',
    'Espaço descanso': 'c6d2e8b5-8fe4-3708-83dc-ad0d93d24538',
  };

  const handleButtonPress = (buttonName, isPressed) => {
    setPressedStates(prevState => ({ ...prevState, [buttonName]: isPressed }));
    if (pressedCallback) {
      pressedCallback(buttonName, isPressed);
    }
  };

  const isTagPressed = (tagId) => {
    return initialPressedButtons.includes(tagId);
  };

  if (isLoading){
    
    return null;
  } 

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
              state={isTagPressed(tags['Rampas de acesso'])}
              
            />
            <TagButton
              icon="wc"
              text="Banheiro adaptado"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com banheiro adaptado."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Banheiro adaptado'])}
            />
          </View>

          {/* Row 2 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="elevator"
              text="Elevador"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com elevador."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Elevador'])}
            />
            <TagButton
              icon="casino"
              text="Textos em braile"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com textos em braile."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Textos em braile'])}
            />
          </View>

          {/* Row 3 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="blind"
              text="Piso tátil"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com piso tátil."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Piso tátil'])}
            />
            <TagButton
              icon="time-to-leave"
              text="Estacionamento"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com estacionamento."
              onPressCallback={handleButtonPress}
              state={isTagPressed(['Estacionamento'])}
            />
          </View>

          {/* Row 4 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="volume-up"
              text="Sinalização sonora"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com sinalização sonora."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Sinalização sonora'])}
            />
            <TagButton
              icon="visibility"
              text="Sinalização"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com sinalização."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Sinalização visual'])}
            />
          </View>

          {/* Row 5 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="table-bar"
              text="Móveis adaptados"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com móveis adaptados."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Móveis adaptados'])}
            />
            <TagButton
              icon="autism"
              text="Amigo autista"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com acessibilidade para pessoas autistas."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Amigo autista'])}
            />
          </View>

          {/* Row 6 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="check-box"
              text="Serviço prioritário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com atendimento prioritário."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Serviço prioritário'])}
            />
            <TagButton
              icon="sign-language"
              text="Intérprete de libras"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com intérprete de libras."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Intérprete de libras'])}
            />
          </View>

          {/* Row 7 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="chair-alt"
              text="Assento prioritário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com assento prioritário."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Assento prioritário'])}
            />
            <TagButton
              icon="people"
              text="Equipe qualificada"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com equipe qualificada."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Equipe qualificada'])}
            />
          </View>

          {/* Row 8 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="meeting-room"
              text="Entrada facilitada"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com entrada facilitada."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Entrada facilitada'])}
            />
            <TagButton
              icon="baby-changing-station"
              text="Fraldário"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com fraldário."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Fraldário'])}
            />
          </View>

          {/* Row 9 */}
          <View style={[styles.row, styles.rowSpacing]}>
            <TagButton
              icon="pets"
              text="Uso de cão guia"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos que permitem o uso de cão guia."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Uso de cão guia'])}
            />
            <TagButton
              icon="child-friendly"
              text="Espaço descanso"
              accessibility_hint="Clique duas vezes para indicar que você deseja pesquisar estabelecimentos com espaço para descanso."
              onPressCallback={handleButtonPress}
              state={isTagPressed(tags['Espaço descanso'])}
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
