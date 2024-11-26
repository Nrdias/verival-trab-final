import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet,
  Text
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../constants/colors";

import SelectDropdownComponent from "../components/SelectDropdownComponent";
import HeaderComponent from "../components/HeaderComponent";
import TagButtonPanel from "../components/TagButtonPanel";
import ButtonComponent from "../components/ButtonComponent";
import DistanceComponent from "../components/DistanceComponent";
import establishmentTypes from '../constants/establishmentTypes';
import api from "../apis/api";
import * as Location from 'expo-location';

export default function EstablishmentFilterScreen({ navigation }) {
  const [selectedEstablishmentType, setSelectedEstablishmentType] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [pressedButtons, setPressedButtons] = useState([]);
  const [token, setToken] = useState('');
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState('10')


  const handleDistanceChange = (d) => {
    console.log('Botão de distância pressionado: ', d);
    setRadius(`${d}`);
  };

  useEffect(() => {
    async function getUserToken() {
      var value = await AsyncStorage.getItem('token');
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
        setStates(response.data.sort());
      } catch (e) {
        console.log(e);
      }
    }
    fetchDataStates();
  }, [token]);

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
    fetchDataStates();

    if (token !== '') {
      fetchDataStates();
    }
  }, [token]);

  useEffect(() => {
    (async function getUserLocationPermission() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  useEffect(() => {
    console.log("Esses sao os estados de verdade: ", JSON.stringify(states));
  }, [states]);

  useEffect(() => {
    console.log("Essas sao as cidades desse estado: ", JSON.stringify(cities));
  }, [cities]);

  // Carregando as UF's na variavel dropdownOptionsStates
  const dropdownOptionsStates = states.map(state => ({
    label: state.name,
    value: state.name
  }));

  // Carregando as cidades na variavel dropdownOptionsCities
  const dropdownOptionsCities = cities.map(city => ({
    label: city.name,
    value: cities.name
  }));

  useEffect(() => {
    if (selectedState) {
      async function fetchDataCities() {
        try {
          const response = await api.get(`v1/states/${selectedState.label}/cities`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCities(response.data.sort());
          console.log(selectedState.label);
        } catch (e) {
          console.log("Erro na requisicao de cidades " + e)
        }
      }
      fetchDataCities();
    }
  }, [selectedState, token]
  );


  const handlePressedButtons = (buttonName, isPressed) => {
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
      'Banheiro adaptado': '413d60b7-56a2-3b3b-bb9e-bd81b407b595',
      'Circulação interna': '87312432-9022-3e09-b0c2-5829a0ac7231',
      'Entrada facilitada': '4374510d-f70c-3079-9ebf-9f9b1669cfa0',
      'Estacionamento': 'ad7a9706-009a-3ccb-bff7-03bfd31d9fa6',
      'Sinalização sonora': 'd017ea73-6622-36eb-b5af-396175b3a12c',
      'Sinalização': 'f215b2a9-31d9-385e-b29d-ad12d3291747',
      'Site acessível': '7d89e05d-9532-3a04-8815-6f3acae4f7de',
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
      'Amigo idoso': '6ea71b2e-cf00-3ad4-a6ec-26e2324446dd',
    };
    return tags[id];
  }

  const handleReset = () => {
    setSelectedEstablishmentType(null);
    setSelectedState(null);
    setSelectedCity(null);
    setPressedButtons([]);

    // Arrumar futuramente
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'HomeScreen' },
          { name: 'EstablishmentFilterScreen' }
        ],
      }),
    );
  }

  const handleSearch = async () => {
    const accessibilityIds = pressedButtons.map(button => tagsMapper(button));
    console.log('Mapped Accessibility IDs:', accessibilityIds);

    const params = {
      status: 'APPROVED',
      accessibilities: accessibilityIds.join(','),
    };

    if (selectedEstablishmentType && selectedEstablishmentType.value) {
      params.type = selectedEstablishmentType.value;
    }

    if (selectedState || selectedCity) {
      if (selectedState && selectedState.label) {
        params.adState = selectedState.value;
        console.log(selectedState);
      }

      if (selectedCity && selectedCity.label) {
        params.adCity = selectedCity.label;
        console.log(selectedCity);
      }
    } else {
      if (location) {
        params.longitude = `${location.coords.longitude}`;
        params.latitude = `${location.coords.latitude}`;
        params.maxDistance = radius;
      }
    }

    try {
      const response = await api.get('v1/establishments', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredlist = response.data;
      setFilteredEstablishments(null);
      setFilteredEstablishments(filteredlist);
      console.log(filteredlist);
      navigation.navigate('HomeScreen', { establishments: filteredlist });
    } catch (e) {
      console.log(e);
      Alert.alert(
        'Erro',
        'Não existe nenhum estabelecimento cadastrado que se enquadra nos seus filtros de busca.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <StatusBar backgroundColor={colors.backgroundStatusBar} />
        <HeaderComponent
          leftPress={() => navigation.goBack()}
          middlePress={() => navigation.navigate('HomeScreen')}
          rightPress={() => navigation.navigate('ProfileScreen')}
        />
        <ScrollView>
          <View
            style={styles.textsContainer}
            accessibilityLabel="Tela de Filtros. Utilize os filtros a seguir para realizar pesquisas"
          >
            <Text style={styles.title} importantForAccessibility="no">
              Filtrar
            </Text>
          </View>
          <View style={styles.dropDownsContainer}>
            <SelectDropdownComponent
              placeholder={'Tipo de estabelecimento'}
              options={establishmentTypes.map(type => ({
                status: 'APPROVED',
                label: type.label,
                value: type.value
                  .toUpperCase()
                  .replace(/[ÁÀÃÂÉÈÊÍÌÎÓÒÕÔÚÙÛ]/gi, match =>
                    match.toLowerCase(),
                  ),
              }))}
              menuWidth={'90%'}
              statusBarHeight={16 * 4}
              onChange={value => setSelectedEstablishmentType(value)}
              startValue={selectedEstablishmentType}
            />
            <View style={[
              styles.line,
              {
                marginTop: '3%',
                paddingLeft: '7%',
                paddingRight: '6%',
                columnGap: 8
              }
            ]}>
              <SelectDropdownComponent
                placeholder={'Estado'}
                options={dropdownOptionsStates}
                width={'40%'}
                menuWidth={'35%'}
                statusBarHeight={16 * 4}
                onChange={value => setSelectedState(value)}
                startValue={selectedState}
              />
              <SelectDropdownComponent
                placeholder={'Cidade'}
                options={dropdownOptionsCities}
                width={'60%'}
                menuWidth={'52%'}
                statusBarHeight={16 * 4}
                onChange={value => setSelectedCity(value)}
                startValue={selectedCity}
              />
            </View>
          </View>
          <View style={styles.distanceContainer}>
            <Text style={styles.subtitle}>Distância da pesquisa</Text>
            <DistanceComponent onChange={handleDistanceChange} />
          </View>
          <View style={styles.tagPanelContainer}>
            <Text style={styles.subtitle}>Acessibilidades</Text>
            <TagButtonPanel
              pressedCallback={handlePressedButtons}
              setPressedButtons={setPressedButtons}
            />
          </View>
          <View style={[
            styles.line,
            {
              paddingHorizontal: '7%',
              justifyContent: 'space-between',
            }
          ]}>
            <ButtonComponent
              text="Limpar"
              customWidth={'45%'}
              onPress={handleReset}
              accessibilityLabel="Limpar filtros de busca"
              accessibilityHint="Clique duas vezes para limpar os filtros aplicados"
            />
            <ButtonComponent
              text="Buscar"
              onPress={handleSearch}
              customWidth={'45%'}
              isBlue={true}
              accessibilityLabel="Pesquisar estabelecimentos"
              accessibilityHint="Clique duas vezes para realizar uma pesquisa utilizando os filtros aplicados"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen
  },

  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  distanceContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingLeft: '3%',
    paddingTop: '5%',
    marginBottom: '5%',
    rowGap: 10
  },

  tagPanelContainer: {
    paddingHorizontal: '3%',
    maxHeight: '38%',
    rowGap: 10,
    marginBottom: '15%', // Avaliar
  },

  subtitle: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    color: colors.textBlack,
    paddingLeft: '2%'
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen
  },

  textsContainer: {
    display: 'flex',
    minWidth: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    marginBottom: '2%',
    backgroundColor: colors.backgroundScreen,
  },
  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 30,
    color: colors.textBlack,
  },

  dropDownsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '100%',
  },

  line: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
