/**
 * Tela de edição de tags de dados do estabelecimento
 *
 * @example           <UpdateEstablishmentRegistrationScreen />
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions } from '@react-navigation/native';
import colors from '../constants/colors';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import SelectDropdownComponent from '../components/SelectDropdownComponent';
import CheckBoxComponent from '../components/CheckBoxComponent';
import StepperComponent from '../components/StepperComponent';
import establishmentTypes from '../constants/establishmentTypes';

export default function UpdateEstablishmentRegistrationScreen({
  navigation,
  route,
}) {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [site, setSite] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const { establishmentData } = route.params;
  console.log(establishmentData.address);

  useEffect(() => {
    if (establishmentData) {
      setName(establishmentData.name || '');
      setCnpj(establishmentData.cnpj || '');
      setType(establishmentData.type || '');
      setPhone(establishmentData.phone || '');
      setSite(establishmentData.site || '');
      setTerms(establishmentData.verifiedOwner || false);
    }
  }, [establishmentData]);

  const handleSubmit = () => {
    const errors = {};

    if (!name) errors.name = 'Por favor, insira o nome';
    if (!type) errors.type = 'Por favor, insira o tipo';
    if (terms && !phone) errors.phone = 'Por favor, insira o telefone';
    else if ((terms || phone) && phone.length < 14) errors.phone = 'Telefone deve conter 10 ou 11 dígitos!';

    if (Object.keys(errors).length === 0) {
      const updatedData = {
        ...establishmentData, // Inclui os dados antigos
        name: name,
        cnpj: cnpj,
        type: type.toUpperCase(),
        phone: phone,
        site: site,
        verifiedOwner: terms,
      };
      handleNextScreen(updatedData);
    }

    setErrors(errors);
  };

  const handleNextScreen = updatedData => {
    navigation.navigate('UpdateEstablishmentAddressScreen', {
      establishmentData: updatedData,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility='no' />
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
      <View
        style={styles.titleContainer}
        accessibilityLabel='Edição de local, etapa 1'>
        <Text style={styles.title}>
          Edite seu local
        </Text>
        <StepperComponent
          steps={[0, 1, 2, 3]}
          activeStep={0}
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.inputsContainer}>
            <InputComponent
              label={'Nome do estabelecimento'}
              placeholder={'Nome do Estabelecimento*'}
              onChangeText={name => setName(name)}
              value={name}
              errorMessage={errors.name}
            />
            <InputComponent
              label={'CNPJ'}
              placeholder={'CNPJ'}
              onChangeText={cnpj => setCnpj(cnpj)}
              mask="cnpj"
              value={cnpj}
            />
            <SelectDropdownComponent
              placeholder={'Tipo de estabelecimento'}
              menuWidth={'80%'}
              startValue={{
                value: establishmentData.type,
                label: establishmentData.type,
              }}
              options={establishmentTypes.map(type => ({
                label: type.label,
                value: type.value
                  .toUpperCase()
                  .replace(/[ÁÀÃÂÉÈÊÍÌÎÓÒÕÔÚÙÛ]/gi, match =>
                    match.toLowerCase(),
                  ),
              }))}
              onChange={value => setType(value.value)}
              value={type}
              errorMessage={errors.type}
            />
            <InputComponent
              label={'Telefone'}
              placeholder={'Telefone*'}
              onChangeText={phone => setPhone(phone)}
              mask="cel-phone"
              value={phone}
              errorMessage={errors.phone}
            />
            <InputComponent
              label={'Site'}
              placeholder={'Site'}
              onChangeText={site => setSite(site)}
              value={site}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBoxComponent
              isTermoDeUso={false}
              checked={terms}
              onToggle={isChecked => {
                setTerms(isChecked);
              }}
              onPressTermosDeUso={() => {
                console.log('Termos de uso');
              }}
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              Object.keys(errors).length > 1
                ? { paddingBottom: '20%' }
                : { paddingBottom: 0 },
            ]}
          >
            <ButtonComponent
              text={'Próximo'}
              onPress={handleSubmit}
              isBlue={true}
              accessibilityLabel="Clique para dar continuidade a edição do estabelecimento"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },

  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  inputsContainer: {
    backgroundColor: colors.backgroundScreen,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
    marginBottom: '3%',
  },

  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
    gap: 15,
    marginBottom: '20%',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },

  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
});
