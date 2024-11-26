import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';

import colors from '../constants/colors';
import { fonts } from '../assets/fonts/fontlist';

import HeaderComponent from '../components/HeaderComponent';
import LoaderComponent from '../components/LoaderComponent';
import AdminEstablishmentCardComponent from '../components/AdminEstablishmentCardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../apis/api';

export default function AdminEstablishmentsToApproveScreen({ navigation }) {
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
      console.log(token);
      try {
        const response = await api.get('v1/establishments', {
          params: { status: 'PENDING' },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setEstablishments(response.data);

        setIsLoading(false);
      } catch (e) {
        console.log(e.response);

        setIsLoading(false);
      }
    }
    if (token !== '') {
      fetchData();
    }
  }, [token]);

  const handleCardNavigation = (id) => {
    navigation.navigate('AdminEstablishmentScreen', { id });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={colors.backgroundStatusBar}
        importantForAccessibility="no"
      />
      <HeaderComponent
        leftPress={() => navigation.goBack()}
        rightPress={() => navigation.navigate('ProfileScreen')}
        middlePress={() => navigation.navigate('HomeScreen')}
      />
      <View style={styles.screenContent}>
        <Text
          style={{ fontFamily: 'Oxygen-Bold', fontSize: 26, marginTop: '2%' }}
        >
          Gerenciar locais cadastrados
        </Text>
        <View style={styles.subtitle}>
          <Text
            style={{ fontFamily: 'Oxygen-Light', fontSize: 18, color: colors.textBlack }}
          >
            Aqui você pode autorizar cadastros e edições de locais cadastrados
          </Text>
        </View>
        <View style={styles.divisory} />
        <ScrollView contentContainerStyle={isLoading ? styles.loading : {}}>
          {isLoading ? ( // Carregando...
            <LoaderComponent accessibilityLabel="Carregando lista de estabelecimentos" />
          ) : establishments.length ? (
            establishments.map((establishment, index) => (
              <View
                minWidth={'100%'}
                paddingBottom={10}
                paddingTop={10}
                key={index}
                backgroundColor={colors.backgroundScreen}
              >
                <AdminEstablishmentCardComponent
                  data={establishment}
                  onClick={() => handleCardNavigation(establishment.id)} />
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {establishments.length === 0
                  && 'Não há nenhum estabelecimento pendente'}
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
  subtitle: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: '4%',
    paddingBottom: '3%',
  },
  divisory: {
    flexDirection: 'row',
    alignContent: 'center',
    alignContent: 'center',
    marginBottom: '3.5%',
    backgroundColor: colors.borderStrokeBlack,
    minHeight: 1
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
