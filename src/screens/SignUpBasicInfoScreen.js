import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import StepperComponent from '../components/StepperComponent';

import colors from '../constants/colors';

export default function SignUpBasicInfoScreen({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [date, setDate] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [celNumber, setCelNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const isGoogle = 'false';

  const [errors, setErrors] = React.useState({});

  const handleSubmit = () => {
    const errors = {};

    if (!name) errors.name = 'Por favor, insira seu nome';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errors.email = 'Por favor, insira seu email';
    else if (!emailRegex.test(email)) errors.email = 'Email inválido!';

    if (!date) errors.date = 'Por favor, insira sua data de nascimento';
    else if (date.length < 10) errors.date = 'Data deve conter 8 dígitos!';

    if (!profession) errors.profession = 'Por favor, insira sua profissão';

    if (!celNumber) errors.celNumber = 'Por favor, insira seu número de celular';
    else if (celNumber.length < 14) errors.celNumber = 'Celular deve conter 10 ou 11 dígitos!';

    if (!password) errors.password = 'Por favor, insira sua senha';
    else if (password.length < 8) errors.password = 'Senha deve conter no mínimo 8 dígitos!';

    if (!confirmPassword) errors.confirmPassword = 'Por favor, confirme sua senha';
    else if (confirmPassword !== password) errors.confirmPassword = 'As senhas devem coincidir';

    if (Object.keys(errors).length === 0) {
      const data =
      {
        name,
        email,
        date,
        password,
        profession,
        celNumber,
        isSocialLogin: isGoogle
      };
      navigation.navigate('SignUpAdditionalInfoScreen', data);
    }

    accessibilityLabel = { errors }
    setErrors(errors);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <View style={[styles.logo, { gap: 15 }]}
        accessibilityLabel='Boas-Vindas! Etapa 1 do cadastro'>
        <Text
          style={styles.OxygenBold}
          importantForAccessibility='no'
        >
          Boas-vindas!
        </Text>
        <StepperComponent steps={[0, 1]} activeStep={0} />
      </View>
      <ScrollView style={{ minWidth: '100%' }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.screen}>
            <InputComponent
              label={'Nome'}
              placeholder={'Fulano de tal'}
              onChangeText={name => setName(name)}
              value={name}
              errorMessage={errors.name}
            />
            <InputComponent
              label={'E-mail'}
              placeholder={'exemplo@email.com'}
              onChangeText={email => setEmail(email)}
              value={email}
              errorMessage={errors.email}
              emailType={true}
            />
            <InputComponent
              label={'Data de Nascimento'}
              mask={'datetime'}
              placeholder={'dd/MM/aaaa'}
              onChangeText={date => setDate(date)}
              value={date}
              errorMessage={errors.date}
            />
            <InputComponent
              label={'Profissão'}
              placeholder={'Profissão'}
              onChangeText={profession => setProfession(profession)}
              value={profession}
              errorMessage={errors.profession}
            />
            <InputComponent
              label={'Celular'}
              placeholder={'(00) 00000-0000'}
              mask={'cel-phone'}
              onChangeText={celNumber => setCelNumber(celNumber)}
              value={celNumber}
              errorMessage={errors.celNumber}
            />
            <InputComponent
              label={'Senha'}
              placeholder={'********'}
              passwordType={true}
              onChangeText={password => setPassword(password)}
              value={password}
              errorMessage={errors.password}
            />
            <InputComponent
              label={'Confirme a Senha'}
              placeholder={'********'}
              passwordType={true}
              onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
              value={confirmPassword}
              errorMessage={errors.confirmPassword}
            />
          </View>
          <View style={styles.button}>
            <ButtonComponent
              text={'Próximo'}
              onPress={handleSubmit}
              isBlue={true}
              accessibilityLabel={'Próximo'}
            />
            <ButtonComponent
              text={'Voltar'}
              onPress={() => navigation.goBack()}
              isBlue={false}
              accessibilityLabel={'Voltar'}
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
    backgroundColor: colors.backgroundScreen
  },

  logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '15%',
    marginBottom: '7%',
    gap: 8,
    backgroundColor: colors.backgroundScreen
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 25,
    marginBottom: 10,
    gap: 10,
    backgroundColor: colors.backgroundScreen
  },

  OxygenBold: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack
  },
});
