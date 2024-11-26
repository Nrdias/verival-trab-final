/**
 * @author               Bianca Alves @bianca.alves
 * Screen de edição de informações básicas do usuário
 * @example              <UpdateBasicInfoScreen />
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../constants/colors';

import HeaderComponent from '../components/HeaderComponent';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import StepperComponent from '../components/StepperComponent';

export default function UpdateBasicInfoScreen({ navigation, route }) {
  const [name, setName] = React.useState(route.params.name);
  const [email, setEmail] = React.useState(route.params.email);
  const [date, setDate] = React.useState(route.params.date);
  const [profession, setProfession] = React.useState(route.params.profession);
  const [celNumber, setCelNumber] = React.useState(route.params.celNumber);
  const currentEmail = route.params.email;
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [isGoogle, setIsGoogle] = React.useState('');

  React.useEffect(() => {
    async function getUserLogin() {
      var value = await AsyncStorage.getItem('isGoogle');
      setIsGoogle(JSON.parse(value));
    }

    getUserLogin();
  }, []);

  const [errors, setErrors] = React.useState({});

  const handleUpdate = () => {
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

    if (password.length > 0 && password.length < 8) errors.password = 'Senha deve conter no mínimo 8 dígitos!';

    if (passwordConfirmation !== password) errors.passwordConfirmation = 'As senhas devem coincidir';

    if (password === '') password => setPassword(route.params.password);

    if (Object.keys(errors).length === 0) {
      const data = {
        name,
        email,
        currentEmail,
        date,
        profession,
        celNumber,
        description: route.params.description,
        disabilities: route.params.disabilities,
        password
      };
      navigation.navigate('UpdateAdditionalInfoScreen', data);
    }

    accessibilityLabel = { errors }
    setErrors(errors);
    console.log(errors);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
        <HeaderComponent
          leftPress={() => navigation.goBack()}
          middlePress={() => navigation.navigate('HomeScreen')} />
        <View
          style={[
            styles.titleContainer,
            !isGoogle && {
              marginTop: 0,
              padding: 0,
              paddingBottom: '5%',
            }
          ]}
          accessibilityLabel='Edição de perfil, etapa 1'>
          <Text style={styles.title} importantForAccessibility='no'>Edição de perfil</Text>
          <StepperComponent steps={[0, 1]} activeStep={0} />
        </View>
      </View>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.screen}>
            <View style={styles.inputContainer}>
              <InputComponent
                label='Nome'
                value={name}
                onChangeText={name => setName(name)}
                errorMessage={errors.name} />

              <InputComponent
                emailType
                label='E-mail'
                value={email}
                onChangeText={email => setEmail(email)}
                errorMessage={errors.email}
                editable={!isGoogle} />

              <InputComponent
                label='Data de Nascimento'
                value={date}
                mask='datetime'
                onChangeText={date => setDate(date)}
                errorMessage={errors.date} />

              <InputComponent
                label='Celular'
                value={celNumber}
                mask='cel-phone'
                onChangeText={celNumber => setCelNumber(celNumber)}
                errorMessage={errors.celNumber} />

              <InputComponent
                label='Profissão'
                value={profession}
                onChangeText={profession => setProfession(profession)}
                errorMessage={errors.profession} />

              {!isGoogle && <>
                <InputComponent
                  label='Senha'
                  value={password}
                  passwordType={true}
                  onChangeText={password => setPassword(password)}
                  errorMessage={errors.password} />

                <InputComponent
                  label='Confirmação de senha'
                  value={passwordConfirmation}
                  passwordType={true}
                  onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
                  errorMessage={errors.passwordConfirmation} />
              </>}
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                text='Próximo'
                onPress={handleUpdate}
                isBlue={true}
                accessibilityLabel='Próximo' />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView >
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

  titleContainer: {
    display: 'flex',
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    padding: '5%',
    marginTop: '8%',
    paddingBottom: '10%',
    backgroundColor: colors.backgroundScreen,
  },
  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },

  inputContainer: {
    display: 'flex',
    gap: 7,
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '4%',
  },

  buttonContainer: {
    display: 'flex',
    gap: 15,
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6%',
  },
});
