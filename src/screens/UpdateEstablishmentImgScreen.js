/**
 * Tela de edição de imagens de estabelecimento
 *
 * @example           <UpdateEstablishmentImgScreen />
 */

import { useState, useEffect } from 'react';
import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import colors from '../constants/colors';

import ImgDescriptionComponent from '../components/ImgDescriptionComponent';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import StepperComponent from '../components/StepperComponent';
import api from '../apis/api';

export default function UpdateEstablishmentImgScreen({ navigation, route }) {
  const [images, setImages] = useState([
    { image: null, description: '' },
    { image: null, description: '' },
    { image: null, description: '' },
    { image: null, description: '' },
    { image: null, description: '' },
  ]);
  const [errors, setErrors] = useState(Array(5).fill(''));
  const [token, setToken] = useState('');

  const { establishmentData } = route.params;

  useEffect(() => {
    async function getUserToken() {
      const value = await AsyncStorage.getItem('token');
      setToken(value);

      // if (
      //   establishmentData &&
      //   establishmentData.image &&
      //   Array.isArray(establishmentData.image)
      // ) {
      //   const updatedImages = establishmentData.image.map(
      //     (imageData, index) => ({
      //       image: {
      //         uri: imageData.url,
      //         name: `image_${index}`,
      //         type: 'image/jpeg',
      //       },
      //       description: imageData.description || '',
      //     }),
      //   );

      //   // Garantindo que haja sempre 5 espaços para imagens
      //   const filledImages = [...updatedImages];
      //   while (filledImages.length < 5) {
      //     filledImages.push({ image: null, description: '' });
      //   }

      //   setImages(filledImages);
      //   setErrors(Array(5).fill(''));
      // }
    }
    getUserToken();
  }, [establishmentData]);

  const validateFields = items => {
    const newErrors = Array(items.length).fill('');
    let hasImage = false;

    items.forEach((item, index) => {
      if (item.image) {
        hasImage = true;
        if (!item.description.trim()) {
          newErrors[index] = 'Por favor, insira uma descrição.';
        }
      }
    });

    if (!hasImage) {
      newErrors[0] = 'Por favor, insira ao menos uma imagem.';
    }

    setErrors(newErrors);
    return newErrors.every(error => error === '');
  };

  const handleImageChange = updatedItems => {
    setImages(updatedItems);
    const newErrors = [...errors];
    updatedItems.forEach((item, index) => {
      if (item.image && item.description.trim()) {
        newErrors[index] = '';
      }
    });
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    if (validateFields(images)) {
      const formData = new FormData();
      const myLocalId = establishmentData.id
      delete establishmentData.id
      delete establishmentData.totalLikes
      delete establishmentData.totalDislikes
      delete establishmentData.createdByUser
      delete establishmentData.status
      delete establishmentData.disabilities
      delete establishmentData.image

      // Manter os dados existentes e adicionar os novos
      const requestjson = JSON.stringify({
        ...establishmentData,
        imageDescriptions: images.map(image => image.description),
      });

      // Adicionando o objeto JSON no FormData
      formData.append('request', requestjson);

      // Adicionando arquivos de imagem no FormData
      images.forEach(item => {
        if (item.image && !item.image.uri.startsWith('http')) {
          formData.append('images', {
            uri: item.image.uri,
            name: item.image.name,
            type: item.image.type,
          });
        }
      });
      console.log('Form data:\n', formData);

      try {
        const response = await api.post(
          `v1/establishments/${myLocalId}/update`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            transformRequest: data => data,
          },
        );

        Alert.alert('Sucesso', 'Estabelecimento atualizado com sucesso!');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          }),
        );
      } catch (error) {
        console.error('Erro:', error);
        console.log(error.response.data)
        if (error.response && error.response.status === 400) {
          Alert.alert(
            'Erro',
            'Campo obrigatório não preenchido ou dados inválidos.',
            error.response.data.error,
          );
        } else if (error.response && error.response.status === 401) {
          Alert.alert(
            'Erro',
            'Usuário não autorizado',
            error.response.data.error,
          );
        } else if (error.response && error.response.status === 404) {
          Alert.alert(
            'Erro',
            'Estabelecimento não encontrado',
            error.response.data.error,
          );
        } else {
          Alert.alert('Erro', 'Aconteceu um erro inesperado.');
        }
      }
    }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={styles.textsContainer}
          accessibilityLabel={
            "Edite seu local, etapa 4. Atualize as imagens. Locais que possuem evidências de acessibilidade tendem a receber melhores avaliações!"
          }
        >
          <Text
            style={styles.title}
            importantForAccessibility="no"
          >
            Edite seu local
          </Text>
          <StepperComponent
            steps={[0, 1, 2, 3]}
            activeStep={3}
          />
          <View style={styles.subtextsContainer}>
            <Text style={styles.subtitle}>
              Atualize as imagens
            </Text>
            <Text style={styles.text}>
              {`Locais que possuem evidências de\nacessibilidade tendem a receber melhores avaliações!`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.screen}>
            <ImgDescriptionComponent
              placeholder="Descrição*"
              images={images}
              onImageChange={handleImageChange}
              errors={errors}
              numberOfLines={3}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              text="Concluir"
              onPress={handleSubmit}
              isBlue={true}
              accessibilityLabel="Concluir"
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  textsContainer: {
    display: 'flex',
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    paddingHorizontal: '3%',
    marginBottom: '3%',
    backgroundColor: colors.backgroundScreen,
  },
  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    color: colors.textBlack,
  },
  subtextsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: '100%',
    paddingHorizontal: '5%',
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

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '3%',
  },
});
