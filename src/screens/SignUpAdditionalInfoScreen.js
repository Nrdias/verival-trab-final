import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import fontlist from '../assets/fonts/fontlist';
import colors from '../constants/colors';

import ButtonComponent from '../components/ButtonComponent';
import CheckButtonDisabilityPanel from '../components/CheckButtonDisabilityPanel';
import TextBoxComponent from '../components/TextBoxComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import StepperComponent from '../components/StepperComponent';
import api from '../apis/api';

export default function SignUpAdditionalInfoScreen({ navigation, route }) {
  const [description, setDescription] = React.useState('');
  const [disabilities, setDisabilities] = React.useState([]);
  const [terms, setTerms] = React.useState(false);

  const { name, email, date, password, profession, celNumber, isSocialLogin } = route.params;

  const convertToId = array => {
    const ids = array.map((str, index) => {
      var id = '';

      if (str === 'Motora') {
        id = '4c109301-44a7-3270-8ffa-23c9c691dbd9';
      }

      if (str === 'Visual') {
        id = '4557e774-91fe-3dbd-9a60-55aeb0ed00d7';
      }

      if (str === 'Cognitiva') {
        id = 'e0b7f938-1f49-309a-83f5-221dae4009cc';
      }

      if (str === 'Auditiva') {
        id = '85f1130d-59b1-3804-b236-c03510434726';
      }

      return id;
    });
    return ids;
  };

  const registerUser = async () => {
    if (!terms) {
      Alert.alert(
        'Aceite os termos de uso',
        'Você deve aceitar os termos de uso para se cadastrar',
      );
    } else {
      const myIds = convertToId(disabilities);
      const isAdmin = false;
      const data = {
        name: name,
        email: email,
        birthdate: date,
        password: password,
        occupation: profession,
        phone: celNumber,
        isAdmin: isAdmin,
        isSocialLogin: isSocialLogin,
        description: description,
        disabilities: myIds,
      };
      try {
        const response = await api.post('v1/users', data);
        if (isSocialLogin === 'true') {
          Alert.alert(
            'Boas-vindas!',
            'Foi detectado login via Google. Sua sessão será mantida ativa, porém após 7 dias de inatividade será necessário realizar um novo login.'
          );
        } else {
          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso. Faça login para continuar.')
        }

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        );
      } catch (e) {
        if (e.response && e.response.status === 400) {
          Alert.alert('Erro', e.response.data.error);
        } else {
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
        }
      }
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <View style={[styles.logo, { gap: 15 }]}
        accessibilityLabel='Boas-Vindas! Etapa 2 do cadastro'>
        <Text
          style={styles.OxygenBold}
          importantForAccessibility='no'
        >
          Boas-vindas!
        </Text>
        <StepperComponent steps={[0, 1]} activeStep={1} />
      </View>
      <ScrollView>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
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
              />
              <Text style={[styles.text, { paddingTop: '5%', paddingBottom: 5 }]}
                accessibilityLabel='E sinta-se livre para fornecer mais detalhes na descrição'>
                Sinta-se livre para fornecer mais detalhes
              </Text>
              <View maxWidth="80%">
                <TextBoxComponent
                  placeholder="Descrição"
                  sendText={text => {
                    setDescription(text);
                  }}
                  value={description}
                  accessibilityLabel="Campo de descrição"
                  hint="Escreva aqui mais detalhes sobre a sua deficiência"
                />
              </View>
              <CheckBoxComponent
                isTermoDeUso={true}
                checked={false}
                onToggle={isChecked => {
                  setTerms(isChecked);
                }}
                onPressTermosDeUso={() => {
                  console.log('Termos de uso');
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.button}>
            <ButtonComponent
              text={'Cadastrar'}
              onPress={registerUser}
              isBlue={true}
            />
            <ButtonComponent
              text={'Voltar'}
              onPress={() => navigation.goBack()}
              isBlue={false}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    gap: 5,
  },
  logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '15%',
    marginBottom: '7%',
    gap: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  OxygenBold: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 27,
    color: colors.textBlack
  },
  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: '4%',
  },
});
