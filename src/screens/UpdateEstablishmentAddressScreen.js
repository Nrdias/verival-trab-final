/**
 * Tela de edição de endereço do estabelecimento
 *
 * @example           <UpdateEstablishmentAddressScreen />
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../constants/colors';

import InputComponent from '../components/InputComponent';
import SelectDropdownComponent from '../components/SelectDropdownComponent';
import StepperComponent from '../components/StepperComponent';
import { CommonActions } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import api from '../apis/api';

export default function UpdateEstablishmentAddressScreen({
  navigation,
  route,
}) {
  const [token, setToken] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cep, setCep] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [errors, setErrors] = useState({});

  const { establishmentData } = route.params;

  useEffect(() => {
    async function getUserToken() {
      const value = await AsyncStorage.getItem('token');
      setToken(value);
    }
    getUserToken();
  }, []);

  useEffect(() => {
    async function fetchDataStates() {
      try {
        const response = await api.get('v1/states', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStates(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    if (token) {
      fetchDataStates();
    }
  }, [token]);

  useEffect(() => {
    if (selectedState) {
      async function fetchDataCities() {
        try {
          const response = await api.get(
            `v1/states/${selectedState.label}/cities`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setCities(response.data);
        } catch (e) {
          console.log('Erro na requisicao de cidades ' + e);
        }
      }
      fetchDataCities();
    }
  }, [selectedState, token]);

  useEffect(() => {
    if (establishmentData) {
      setStreet(establishmentData.address.street || '');
      setNeighborhood(establishmentData.address.neighborhood || '');
      setSelectedState({
        label: establishmentData.address.state,
        value: establishmentData.address.state,
      });
      setSelectedCity({
        label: establishmentData.address.city,
        value: establishmentData.address.city,
      });
      setNumber(establishmentData.address.number || '');
      setCep(establishmentData.address.cep || '');
      setAdditionalDetails(establishmentData.address.additionalDetails || '');
    }
  }, [establishmentData]);

  const handleSubmit = () => {
    const errors = {};

    if (!selectedCity) errors.city = 'Por favor, insira a cidade';
    if (!selectedState) errors.state = 'Por favor, insira o estado';
    if (!street) errors.street = 'Por favor, insira a rua';
    if (!neighborhood) errors.neighborhood = 'Por favor, insira o bairro';
    if (!number) errors.number = 'Por favor, insira o nº';
    if (!cep) errors.cep = 'Por favor, insira o CEP';

    if (Object.keys(errors).length === 0) {
      const updatedData = {
        ...establishmentData,
        address: {
          number: number,
          street: street,
          neighborhood: neighborhood,
          city: selectedCity.label,
          state: selectedState.value,
          cep: cep,
          additionalDetails: additionalDetails,
        },
      };
      handleNextScreen(updatedData);
    } else {
      setErrors(errors);
    }
  };

  const handleNextScreen = updatedData => {
    navigation.navigate('UpdateEstablishmentTagScreen', {
      establishmentData: updatedData,
    });
  };

  const dropdownOptionsStates = states.map(state => ({
    label: state.name,
    value: state.name,
  }));

  const dropdownOptionsCities = cities.map(city => ({
    label: city.name,
    value: city.name,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
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
        accessibilityLabel="Edição de local, etapa 2"
      >
        <Text
          style={styles.title}
          importantForAccessibility='no'
        >
          Edite seu local
        </Text>
        <StepperComponent
          steps={[0, 1, 2, 3]}
          activeStep={1}
        />
        <View style={styles.subtextsContainer}>
          <Text
            style={styles.subtitle}
            accessibilityLabel="Altere seu endereço"
          >
            Altere seu endereço
          </Text>
          <Text style={styles.text}>
            {`Informe onde podemos encontrar seu estabelecimento`}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.inputsContainer}>
            <InputComponent
              label={'Rua'}
              placeholder={'Rua*'}
              onChangeText={street => setStreet(street)}
              value={street}
              errorMessage={errors.street}
            />
            <InputComponent
              label={'Bairro'}
              placeholder={'Bairro*'}
              onChangeText={neighborhood => setNeighborhood(neighborhood)}
              value={neighborhood}
              errorMessage={errors.neighborhood}
            />
            <View style={{ marginTop: '1%', gap: 9 }}>
              <SelectDropdownComponent
                placeholder={'Estado'}
                options={dropdownOptionsStates}
                menuWidth={'80%'}
                statusBarHeight={16 * 4}
                maxHeight={200}
                errorMessage={errors.state}
                onChange={value => setSelectedState(value)}
                startValue={{ value: establishmentData.address.state }}
              />
              <SelectDropdownComponent
                placeholder={'Cidade'}
                options={dropdownOptionsCities}
                menuWidth={'80%'}
                statusBarHeight={16 * 4}
                maxHeight={200}
                errorMessage={errors.city}
                onChange={value => setSelectedCity(value)}
                startValue={{ value: establishmentData.address.city }}
              />
            </View>
            <View style={styles.line}>
              <View style={styles.numberLine}>
                <InputComponent
                  label={'Número'}
                  placeholder={'Número*'}
                  mask="only-numbers"
                  onChangeText={number => setNumber(number)}
                  value={number}
                  errorMessage={errors.number}
                />
              </View>
              <View style={styles.complementLine}>
                <InputComponent
                  label={'CEP'}
                  placeholder={'CEP*'}
                  onChangeText={cep => setCep(cep)}
                  mask="zip-code"
                  value={cep}
                  errorMessage={errors.cep}
                />
              </View>
            </View>
            <InputComponent
              label={'Complemento'}
              placeholder={'Complemento'}
              onChangeText={additionalDetails =>
                setAdditionalDetails(additionalDetails)
              }
              value={additionalDetails}
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              Object.keys(errors).length > 1
                ? { paddingBottom: '40%' }
                : { paddingBottom: 0 },
            ]}
          >
            <ButtonComponent
              text={'Próximo'}
              onPress={handleSubmit}
              isBlue={true}
              accessibilityLabel="Clique para dar continuidade ao cadastro do estabelecimento"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },

  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  inputsContainer: {
    display: 'flex',
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    marginBottom: '10%',
  },

  numberLine: {
    width: '45%',
  },
  complementLine: {
    width: '55%',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 21,
    paddingRight: 19,
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
    paddingHorizontal: '10%',
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

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
