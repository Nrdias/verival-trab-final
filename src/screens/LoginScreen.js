/**
 * @author               Bianca Alves @bianca.alves
 * Screen da Login
 * @example              <LoginScreen />
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import colors from '../constants/colors';
import LogoIcon from '../../src/assets/icons/LogoIcon.js';

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import GoogleAuthComponent from '../components/GoogleAuthComponent.js';
import api from '../apis/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'Por favor, insira seu email';
    else if (!emailRegex.test(email)) errors.email = 'Email inválido!';

    if (!password) errors.password = 'Por favor, insira sua senha';
    else if (password.length < 8)
      errors.password = 'Senha deve conter no mínimo 8 dígitos!';

    if (Object.keys(errors).length === 0) {
      const data = { email: email, password: password };

      try {
        const response = await api.post('v1/auth/login', data);
        const token = response.data.token;
        const id = response.data.userId;
        const isAdmin = response.data.admin.toString();
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('isAdmin', isAdmin);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          }),
        );
      } catch (e) {
        if (e.response && e.response.status === 401) {
          Alert.alert('Erro', e.response.data.error);
        } else {
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
          console.log(e);
        }
      }
      return;
    }

    accessibilityLabel = { errors };
    setErrors(errors);
  };

  const handlePasswordRecovery = () => {
    navigation.navigate("PasswordRecoveryScreen");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <KeyboardAvoidingView>
        <ScrollView>
          <View accessibilityLabel='Sem Barreiras, design Inclusivo. Tela de login'>
            <View style={styles.logoContainer}>
              <LogoIcon />
              <Text style={styles.textLogoName}>Sem Barreiras</Text>
              <Text style={styles.textLogoDescription}>Design Inclusivo</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <InputComponent
              emailType
              label="E-mail"
              placeholder="exemplo@email.com"
              onChangeText={email => setEmail(email)}
              value={email}
              errorMessage={errors.email}
            />

            <InputComponent
              passwordType
              label="Senha"
              placeholder="********"
              onChangeText={password => setPassword(password)}
              value={password}
              errorMessage={errors.password}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ButtonComponent
              text="Entrar"
              onPress={handleSubmit}
              isBlue={true}
              accessibilityLabel="Entrar"
            />

            <GoogleAuthComponent navigation={navigation} />

            <TouchableOpacity
              style={styles.textButtonContainer}
              accessibilityLabel='Esqueci minha senha'
              onPress={handlePasswordRecovery}>
              <Text style={styles.textButton}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textButtonContainer}
              accessibilityLabel="Cadastrar-se"
              onPress={() => navigation.navigate('SignUpBasicInfoScreen')}
            >
              <Text style={styles.textButton}>
                Ainda não tem conta? Cadastre-se!
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={styles.signatureText}>© 2024 Sem Barreiras. Todos os direitos reservados.</Text>
            <Text style={styles.signatureOwner}>OSC Conexão Solidária</Text>
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
    justifyContent: 'flex-end',
    alignContent: 'center',
  },

  logoContainer: {
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5%',
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
    padding: '4%',
  },

  textButtonContainer: {
    alignItems: 'center',
    backgroundColor: colors.backgroundScreen,
    padding: '3%',
  },
  textButton: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 16,
    color: colors.textBlue,
  },

  signatureContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '6%',
  },
  signatureText: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
  signatureOwner: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 13,
    color: colors.textGray,
  },
});
