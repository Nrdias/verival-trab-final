/**
 * @author               Diogo Camargo @diogo.camargo
 * Screen de recuperação de senha
 * @example              <PasswordRecoveryScreen />
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';

import LogoIcon from '../assets/icons/LogoIcon';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

import api from '../apis/api';

export default function PasswordRecoveryScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleEmailSending = async () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'Por favor, insira seu email';
    else if (!emailRegex.test(email)) errors.email = 'Email inválido!';

    if (Object.keys(errors).length === 0) {
      try {
        const response = await api.post('v1/users/password-reset', { email });

        Alert.alert('Email enviado', 'Verifique sua caixa de entrada.');
        navigation.goBack();
      } catch (e) {
        if (e.response && e.response.status === 400) {
          Alert.alert('Erro', e.response.data.error);
        }
        else if (e.response && e.response.status === 404) {
          Alert.alert('Erro', 'Usuário não encontrado. Insira um e-mail válido.');
        }
        else if (e.response && e.response.status === 409) {
          Alert.alert('Erro', 'Usuário desativado. Não é possível recuperar a senha.');
        }
        else {
          Alert.alert('Erro', 'Aconteceu um erro inesperado. Tente novamente mais tarde.');
        }
        return;
      }

      accessibilityLabel = { errors }
      setErrors(errors);
    };
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <KeyboardAvoidingView>
        <ScrollView>
          <View>
            <View style={styles.logoContainer}
              accessibilityLabel='Sem Barreiras, design Inclusivo. Tela de recuperação de senha.'>
              <LogoIcon />
              <Text style={styles.textLogoName}>Sem Barreiras</Text>
              <Text style={styles.textLogoDescription}>Design Inclusivo</Text>
            </View>

            <View style={styles.recoveryContainer}>
              <Text style={styles.subtitle} importantForAccessibility='no'> Redefinir senha </Text>
              <Text style={styles.recoveryDescription}
                importantForAccessibility='yes'
                accessibilityLabel='Confirme seu endereço de e-mail para recebimento do email de recuperação de senha no campo de texto abaixo.'>
                Confirme seu e-mail para receber o código de recuperação de senha.
              </Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <InputComponent
              emailType
              label='E-mail'
              placeholder='exemplo@email.com'
              onChangeText={email => setEmail(email)}
              value={email}
              errorMessage={errors.email}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ButtonComponent
              text='Enviar'
              onPress={handleEmailSending}
              isBlue={true}
              accessibilityLabel='Clique duas vezes para enviar o email de recuperação de senha para o endereço de email inserido.' />
            <ButtonComponent
              text='Voltar'
              onPress={() => navigation.goBack()}
              isBlue={false}
              accessibilityLabel='Clique duas vezes para retornar para a tela anterior.' />
          </View>
        </ScrollView >
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5%',
    marginTop: '25%',
    paddingBottom: '9%',
    backgroundColor: colors.backgroundScreen,
  },

  textLogoName: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },

  textLogoDescription: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: colors.textBlack,
  },

  recoveryContainer: {
    alignItems: 'center',
    paddingBottom: '4%'
  },

  subtitle: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    color: colors.textBlack,
    paddingBottom: '4%',
  },

  recoveryDescription: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    width: '75%',
    alignContent: 'center',
    textAlign: 'center',
  },

  inputContainer: {
    gap: 7,
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '6%',
  },

  buttonContainer: {
    gap: 15,
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6%',
  },
});