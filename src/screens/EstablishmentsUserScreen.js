import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';

import colors from '../constants/colors';
import { fonts } from '../assets/fonts/fontlist';
import AdminEstablishmentCardComponent from '../components/AdminEstablishmentCardComponent';

import HeaderComponent from '../components/HeaderComponent';
import LoaderComponent from '../components/LoaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import api from '../apis/api';

export default function EstablishmentsUserScreen({ navigation }) {
  const [establishments, setEstablishments] = React.useState([]);
  const [token, setToken] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getUserToken() {
      var value = await AsyncStorage.getItem('token');
      setToken(value);
    }

    getUserToken();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('v1/establishments', {
          params: { createdByUser: true },
          headers: { Authorization: `Bearer ${token}` },
        });
        setEstablishments(response.data);

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
    if (token !== '') {
      fetchData();
    }
  }, [token]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  const handleCardNavigation = (id) => {
    console.log(id)
    navigation.navigate('EstablishmentScreen', { id });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={colors.backgroundStatusBar}
        importantForAccessibility="no"
      />
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
      <View style={styles.screenContent}>
        <Text style={styles.title}>Meus locais cadastrados</Text>
        <Text style={styles.subtitle}>
          Aqui você pode gerenciar os seus locais cadastrados
        </Text>
        <View style={styles.divisory} />
        <ScrollView contentContainerStyle={isLoading ? styles.loading : {}}>
          {isLoading ? (
            <LoaderComponent accessibilityLabel="Carregando lista de estabelecimentos" />
          ) : establishments.length ? (
            establishments.map(establishment => (
              <View
                minWidth={'100%'}
                paddingBottom={10}
                paddingTop={10}
                key={establishment.id}
                backgroundColor={colors.backgroundColor}
              >
                <AdminEstablishmentCardComponent
                  data={establishment}
                  onClick={() => handleCardNavigation(establishment.id)}
                />
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {establishments.length === 0
                  && 'Não há nenhum estabelecimento cadastrado'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundScreen,
  },
  screenContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: colors.backgroundScreen,
  },
  title: {
    fontSize: 26,
    marginTop: '2%',
    fontFamily: 'Oxygen-Bold',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Oxygen-Light',
    paddingTop: '4%',
    paddingBottom: '3%',
  },
  divisory: {
    flexDirection: 'row',
    alignContent: 'center',
    alignContent: 'center',
    marginBottom: '3.5%',
    backgroundColor: colors.borderStrokeBlack,
    minHeight: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noResultsText: {
    textAlign: 'left',
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: colors.textBlack,
  },
});
