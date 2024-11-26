/**
 * @author                   Natan Dias & Bianca Alves @natan.dias & @bianca.alves
 * @param navigation         objeto de navegação entre as telas
 * 
 * @example                  <GoogleAuthComponent navigation={navigation} />
 */

import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useAuth, useUser } from "@clerk/clerk-expo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import ButtonComponent from './ButtonComponent';
import api from '../apis/api';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuthComponent({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);

  useEffect(() => {
    if (authLoaded && userLoaded) {
      setInitialAuthCheckDone(true);
    }
  }, [authLoaded, userLoaded]);

  useEffect(() => {
    async function handleSubmit() {
      const data = {
        email: user.emailAddresses[0].emailAddress,
        password: user.id
      };

      try {
        const response = await api.post('v1/auth/login', data);
        const token = response.data.token;
        const id = response.data.userId;
        const isAdmin = response.data.admin.toString();
        const isGoogle = response.data.socialLogin.toString();
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', data.email);
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('isAdmin', isAdmin);
        await AsyncStorage.setItem('isGoogle', isGoogle);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          })
        );
      } catch (e) {
        if (e.response && e.response.status === 401) {
          Alert.alert('Erro', e.response.data.error);
        } else if (e.response && e.response.status === 404) {
          data['name'] = user.fullName;
          navigation.navigate('GoogleSignUpBasicInfoScreen', data);
        } else {
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
          console.log(e);
        }
      }
    };

    if (initialAuthCheckDone && isSignedIn && user) handleSubmit();
  }, [initialAuthCheckDone, isSignedIn, user]);

  async function signIn() {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        // useEffect will handle the navigation
      } else {
        console.log("Fluxo de autenticação não foi completado.");
        Alert.alert("Erro", "Não foi possível completar a autenticação. Tente novamente.");
      }
    } catch (error) {
      console.log("Erro: ", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        const errorMessage = error.errors[0]?.longMessage || "Um erro desconhecido ocorreu.";
        Alert.alert("Erro", errorMessage);
      } else {
        Alert.alert("Erro", "Aconteceu um erro inesperado. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ButtonComponent
      onPress={signIn}
      disabled={(isLoading || isSignedIn)}
      text={(isLoading || isSignedIn) ? "Carregando..." : "Entrar com Google"}
      accessibilityLabel={"Fazer login com Google"}
      isGoogle={true}
    />
  );
}