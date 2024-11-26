/**
 * @author               Bianca Alves @bianca.alves
 * Screen da edição de disabilities
 * @example              <UpdateAdditionalInfoScreen />
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import colors from '../constants/colors';

import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import CheckButtonDisabilityPanel from '../components/CheckButtonDisabilityPanel';
import TextBoxComponent from '../components/TextBoxComponent';
import StepperComponent from '../components/StepperComponent';
import api from '../apis/api';

export default function UpdateBasicInfoScreen({ navigation, route }) {
  const [description, setDescription] = React.useState(route.params.description);
  const state_m = route.params.disabilities.includes('Motora');
  const state_v = route.params.disabilities.includes('Visual');
  const state_c = route.params.disabilities.includes('Cognitiva');
  const state_a = route.params.disabilities.includes('Auditiva');
  const [disabilities, setDisabilities] = React.useState('');
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');

  const { name, email, date, profession, celNumber, password } = route.params;

  React.useEffect(() => {
    async function getUserTokenId() {
      var valueToken = await AsyncStorage.getItem('token');
      setToken(valueToken);

      var valueId = await AsyncStorage.getItem('id');
      setId(valueId);
    }

    getUserTokenId();
  }, []);

  const convertToId = array => {
    const ids = array.map((str, index) => {
      var id = '';

      if (str === 'Motora') id = '4c109301-44a7-3270-8ffa-23c9c691dbd9';

      if (str === 'Visual') id = '4557e774-91fe-3dbd-9a60-55aeb0ed00d7';

      if (str === 'Cognitiva') id = 'e0b7f938-1f49-309a-83f5-221dae4009cc';

      if (str === 'Auditiva') id = '85f1130d-59b1-3804-b236-c03510434726';

      return id;
    });
    return ids;
  };

  const handleUpdate = async () => {
    const myIds = convertToId(disabilities);
    const isAdmin = false;
    var data = null;

    if (password === '') {
      data = {
        name: name,
        email: email,
        birthdate: date,
        occupation: profession,
        phone: celNumber,
        isAdmin: isAdmin,
        description: description,
        disabilities: myIds,
      };
    }
    else {
      data = {
        name: name,
        email: email,
        birthdate: date,
        occupation: profession,
        phone: celNumber,
        isAdmin: isAdmin,
        description: description,
        disabilities: myIds,
        password: password,
      };
    }

    try {
      const response = await api.patch(`v1/users/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (email !== route.params.currentEmail) {
        await AsyncStorage.removeItem('token', null);
        await AsyncStorage.removeItem('email', null);
        await AsyncStorage.removeItem('id', null);
        await AsyncStorage.removeItem('isAdmin', null);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'LoginScreen' },
            ],
          })
        );

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso. E-mail alterado, faça login novamente.');
        return;
      }

      if (!(password === '')) {
        await AsyncStorage.removeItem('token', null);
        await AsyncStorage.removeItem('email', null);
        await AsyncStorage.removeItem('id', null);
        await AsyncStorage.removeItem('isAdmin', null);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'LoginScreen' },
            ],
          })
        );

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso. Senha alterada, faça login novamente.');
        return;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'HomeScreen' },
            { name: 'ProfileScreen' }
          ],
        })
      );
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else if (e.response && e.response.status === 404) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else if (e.response && e.response.status === 400) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else {
        console.log('ERRO:', 'Aconteceu um erro inesperado');
      }
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'HomeScreen' },
          { name: 'ProfileScreen' }
        ],
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
        <HeaderComponent
          leftPress={() => navigation.goBack()}
          middlePress={() => navigation.navigate('HomeScreen')} />
        <View style={styles.titleContainer}
          accessibilityLabel='Edição de perfil, etapa 2'>
          <Text style={styles.title} importantForAccessibility='no'>Edição de perfil</Text>
          <StepperComponent steps={[0, 1]} activeStep={1} />
        </View>
      </View>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.screen}>
              <Text style={styles.text}
                accessibilityLabel={'Selecione as categorias que você se enquadra.'}>
                {'Selecione as categorias que você\nse enquadra'}
              </Text>
              <CheckButtonDisabilityPanel
                style={{ width: 300, height: 200 }}
                pressedCallback={pressed => {
                  setDisabilities(pressed);
                }}
                state_a={state_a}
                state_c={state_c}
                state_m={state_m}
                state_v={state_v}
              />
              <Text style={[styles.text, { paddingTop: '5%', paddingBottom: 5 }]}
                accessibilityLabel='E sinta-se livre para fornecer mais detalhes na descrição'>
                Sinta-se livre para fornecer mais detalhes
              </Text>
              <View maxWidth="80%" paddingBottom='18%'>
                <TextBoxComponent
                  placeholder="Descrição"
                  sendText={text => {
                    setDescription(text);
                  }}
                  value={description}
                  accessibilityLabel={description ? 'Descrição' : 'Descrição, escreva aqui mais detalhes sobre a sua deficiência'}
                  hint='Escreva aqui mais detalhes sobre a sua deficiência'
                />
              </View>

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  text='Confirmar'
                  onPress={handleUpdate}
                  isBlue={true}
                  accessibilityLabel='Confirmar' />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView >
    </SafeAreaView>
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

  titleContainer: {
    display: 'flex',
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    padding: '5%',
    marginTop: '8%',
    marginBottom: '3%',
    paddingBottom: '5%',
    backgroundColor: colors.backgroundScreen,
  },
  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },

  buttonContainer: {
    display: 'flex',
    gap: 15,
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6%',
  },

  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: colors.textBlack,
    textAlign: 'center',
    paddingBottom: '4%',
  },
});
