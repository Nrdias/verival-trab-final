import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "@clerk/clerk-expo";

import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import StepperComponent from '../components/StepperComponent';

import colors from '../constants/colors';

export default function GoogleSignUpBasicInfoScreen({ navigation, route }) {
  const email = route.params.email;
  const password = route.params.password;
  const isGoogle = 'true';
  const [name, setName] = React.useState(route.params.name);
  const [date, setDate] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [celNumber, setCelNumber] = React.useState('');

  const [errors, setErrors] = React.useState({});

  const handleSubmit = () => {
    const errors = {};

    if (!name) errors.name = 'Por favor, insira seu nome';

    if (!date) errors.date = 'Por favor, insira sua data de nascimento';
    else if (date.length < 10) errors.date = 'Data deve conter 8 dígitos!';

    if (!profession) errors.profession = 'Por favor, insira sua profissão';

    if (!celNumber) errors.celNumber = 'Por favor, insira seu número de celular';
    else if (celNumber.length < 14) errors.celNumber = 'Celular deve conter 10 ou 11 dígitos!';

    if (Object.keys(errors).length === 0) {
      const data = {
        name: name,
        email: email,
        password: password,
        date,
        profession,
        celNumber,
        isSocialLogin: isGoogle
      };
      console.log(data);
      navigation.navigate('SignUpAdditionalInfoScreen', data);
    }

    accessibilityLabel = { errors }
    setErrors(errors);
  };

  // Sign out if user is already signed in for a fresh sign in
  const { isSignedIn, signOut } = useAuth();
  const handleGoBack = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.warn("Error during sign out:", e);
      }
    }

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
      <View style={[styles.logo, { gap: 15 }]}>
        <Text
          accessibilityLabel={'Boas-vindas!'}
          style={styles.OxygenBold}
        >
          Boas-vindas!
        </Text>
        <StepperComponent steps={[0, 1]} activeStep={0}/>
        <View style={styles.subtextsContainer}>
          <Text style={styles.subtitle} accessibilityLabel="Informações adicionais, etapa 1">
            Informações adicionais
          </Text>
          <Text style={styles.text}>
            {`Para uma experiência sem barreiras, nos conte um pouco mais sobre você! Por favor, preencha os campos abaixo.`}
          </Text>
        </View>
      </View>
      <ScrollView style={{ minWidth: '100%' }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.screen}>
            <InputComponent
              label={'Nome'}
              placeholder={'Fulano de Tal'}
              value={name}
              onChangeText={name => setName(name)}
              errorMessage={errors.name}
            />
            <InputComponent
              label={'E-mail'}
              placeholder={'E-mail*'}
              value={email}
              emailType={true}
              editable={false}
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
              placeholder={'Profissão*'}
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
              onPress={() => handleGoBack()}
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

  subtextsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: '100%',
    paddingHorizontal: '9%',
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
});
