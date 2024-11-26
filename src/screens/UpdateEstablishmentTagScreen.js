/**
 * Tela de edição de tags de acessibilidade de estabelecimento
 *
 * @example           <UpdateEstablishmentTagsScreen />
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';

import colors from '../constants/colors';

import HeaderComponent from '../components/HeaderComponent';
import SettedTagButtonPanel from '../components/SettedTagButtonPanel';
import ButtonComponent from '../components/ButtonComponent';
import StepperComponent from '../components/StepperComponent';

export default function UpdateEstablishmentTagScreen({ navigation, route }) {
  const [pressedButtons, setPressedButtons] = useState([]);
  const [initialPressed, setInitialPressed] = useState([]);
  const { establishmentData } = route.params;
  console.log('Dados do estabelecimento:', establishmentData);
  console.log(establishmentData.accessiblities);

  useEffect(() => {
    if (establishmentData.accessiblities) {
      setInitialPressed(establishmentData.accessiblities);
    }
  }, [establishmentData]);

  const handleSubmit = async () => {
    const accessibilityIds = pressedButtons.map(button => tagsMapper(button));
    // Manter os dados existentes e adicionar os novos
    const updatedData = {
      ...establishmentData,
      accessibilities: accessibilityIds,
    };
    handleNextScreen(updatedData);
  };

  const handleNextScreen = updatedData => {
    navigation.navigate('UpdateEstablishmentImgScreen', {
      establishmentData: updatedData,
    });
  };

  const handlePressedButtons = (buttonName, isPressed) => {
    if (typeof buttonName === 'undefined' || typeof isPressed === 'undefined') {
      console.error(
        'handlePressedButtons was called with insufficient arguments',
      );
      return; // Early return to prevent further execution
    }

    setPressedButtons(prevPressedButtons => {
      if (isPressed) {
        return [...prevPressedButtons, buttonName];
      } else {
        return prevPressedButtons.filter(name => name !== buttonName);
      }
    });
  };

  function tagsMapper(id) {
    const tags = {
      'Banheiro adaptado': '413d60b7-56a2-3b3b-bb9e-bd81b407b595', //
      'Circulação interna': '87312432-9022-3e09-b0c2-5829a0ac7231',
      'Entrada facilitada': '4374510d-f70c-3079-9ebf-9f9b1669cfa0', //
      'Estacionamento': 'ad7a9706-009a-3ccb-bff7-03bfd31d9fa6', //
      'Sinalização sonora': 'd017ea73-6622-36eb-b5af-396175b3a12c', //
      'Sinalização': 'f215b2a9-31d9-385e-b29d-ad12d3291747', //
      'Site acessível': '7d89e05d-9532-3a04-8815-6f3acae4f7de',
      'Elevador': '0a1788c0-82eb-3972-929b-eed7806425fe', //
      'Piso tátil': 'b550e576-47ca-39ca-894a-81f3d1aa4108', //
      'Textos em braile': 'e391bc1b-7b8a-30f7-9d60-830db2f7f200', //
      'Rampas de acesso': '78a7e8cb-3b61-364c-b242-c8e81b03215c', //
      'Móveis adaptados': 'a131e10a-168a-3782-81d0-4bf501c8f426', //
      'Amigo autista': 'e69d7f89-d3df-3738-b66c-c9c5a70f1948', //
      'Serviço prioritário': '00567fcf-b414-34bf-babd-04ce947a7527', //
      'Intérprete de libras': '792812e7-f2e6-3ec6-b005-2f6c71d4d6cc', //
      'Assento prioritário': '2c975c26-3e97-3af6-9452-3c91629dd49a', //
      'Equipe qualificada': '0fabe2c2-ecf8-3f88-8950-47c321749683', //
      'Fraldário': 'ffbd8d0d-ce77-354b-a526-de94db27fd58', //
      'Uso de cão guia': 'd71129a4-50b0-32f4-8826-800892819e64', //
      'Espaço descanso': 'c6d2e8b5-8fe4-3708-83dc-ad0d93d24538', //
    };
    return tags[id];
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <View style={styles.screen}>
        <HeaderComponent
          leftPress={() => navigation.goBack()}
          middlePress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              }),
            );
          }}
          rightPress={() => navigation.navigate('ProfileScreen')}
        />
        <View
          style={styles.titleContainer}
          accessibilityLabel='Edição de local, etapa 3'
        >
          <Text
            style={styles.title}
            importantForAccessibility='no'
          >
            Edite seu local
          </Text>
          <StepperComponent
            steps={[0, 1, 2, 3]}
            activeStep={2}
          />

          <View style={styles.subtextsContainer}>
            <Text
              style={styles.subtitle}
              accessibilityLabel="Atualize as tags de acessiblidade do seu estabelecimento"
            >
              Atualize as tags
            </Text>
            <Text style={styles.text}>
              {`Selecione os recursos de acessibilidade\ndisponíveis em seu estabelecimento`}
            </Text>
          </View>
        </View>
        <View style={styles.scrollView}>
          <SettedTagButtonPanel
            pressedCallback={handlePressedButtons}
            initialPressedButtons={initialPressed}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            text={'Próximo'}
            isBlue={true}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },

  screen: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  scrollView: {
    maxHeight: '48%',
    paddingHorizontal: '3%',
  },

  buttonContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
    gap: 15,
  },

  subtextsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: '100%',
    paddingHorizontal: '6%',
    marginTop: '2%',
  },
  subtitle: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    color: colors.textBlack,
  },
  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: colors.textBlack,
  },
});
