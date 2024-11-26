/**
 * @author               Bianca Alves @bianca.alves
 * Screen de perfil do usuário
 * @example              <ProfileScreen />
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Icon, Divider } from 'react-native-paper';

import colors from '../constants/colors';

import HeaderComponent from '../components/HeaderComponent';
import NavButtonComponent from '../components/NavButtonComponent';
import CheckButton from '../components/CheckButton';
import LoaderComponent from '../components/LoaderComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import ModalBoxComponent from '../components/ModalBoxComponent';
import ButtonComponent from '../components/ButtonComponent';
import api from '../apis/api';

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState(null);
  const [token, setToken] = React.useState('');
  const [id, setId] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false); // Adiciona o estado para isAdmin
  const [anyReport, setAnyReport] = React.useState(false);
  const [anyPending, setAnyPending] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDisable = async () => {
    try {
      await api.delete(`v1/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      await AsyncStorage.removeItem('token', null);
      await AsyncStorage.removeItem('email', null);
      await AsyncStorage.removeItem('id', null);
      await AsyncStorage.removeItem('isAdmin', null);

      Alert.alert('Sucesso', 'Conta desativada com sucesso');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else if (e.response && e.response.status === 404) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else {
        console.log('ERRO:', 'Aconteceu um erro inesperado');
        Alert.alert('Erro', 'Aconteceu um erro inesperado');
      }
    } finally {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        }),
      );
    }
  }

  const convertToText = array => {
    const texts = array.map((str, index) => {
      var text = '';

      if (str === '4c109301-44a7-3270-8ffa-23c9c691dbd9') text = 'Motora';
      if (str === '4557e774-91fe-3dbd-9a60-55aeb0ed00d7') text = 'Visual';
      if (str === 'e0b7f938-1f49-309a-83f5-221dae4009cc') text = 'Cognitiva';
      if (str === '85f1130d-59b1-3804-b236-c03510434726') text = 'Auditiva';

      return text;
    });
    return texts;
  };

  React.useEffect(() => {
    async function getUserTokenId() {
      var valueToken = await AsyncStorage.getItem('token');
      setToken(valueToken);

      var valueId = await AsyncStorage.getItem('id');
      setId(valueId);

      var adminStatus = await AsyncStorage.getItem('isAdmin'); // Adiciona a verificação do estado de admin
      setIsAdmin(adminStatus === 'true');
    }

    getUserTokenId();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`v1/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await response.data;

        const data = {
          name: userData.name,
          email: userData.email,
          date: userData.birthdate,
          profession: userData.occupation,
          celNumber: userData.phone,
          description: userData.description,
          disabilities: convertToText(userData.disabilities),
        };

        setUserInfo(data);
      } catch (e) {
        if (e.response && e.response.status === 401) {
          console.log('ERRO:', e.response.data.error);
          Alert.alert('Erro', e.response.data.error);
        } else if (e.response && e.response.status === 404) {
          console.log('ERRO:', e.response.data.error);
          Alert.alert('Erro', e.response.data.error);
        } else {
          console.log('ERRO:', 'Aconteceu um erro inesperado');
        }

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }

    async function getCommentsNotification() {
      try {
        const response = await api.get(`v1/admin/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.pending === true) {
          setAnyReport(true)
        }
        else {
          setAnyReport(false)
        }
      } catch (e) {
        console.log(e)
      }
    }

    async function getLocalsNotification() {
      try {
        const response = await api.get(`v1/admin/establishments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.pending === true) {
          setAnyPending(true)
        }
        else {
          setAnyPending(false)
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (token !== '' && id !== '') {
      fetchData();
      if (isAdmin) {
        getCommentsNotification()
        getLocalsNotification()
      }
    }
  }, [token, id, isAdmin]);

  if (isLoading || !userInfo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={colors.backgroundStatusBar}
          importantForAccessibility="no"
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoaderComponent accessibilityLabel="Carregando dados do usuário" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={colors.backgroundStatusBar}
        importantForAccessibility="no"
      />
      <HeaderComponent
        isProfilePage={true}
        leftPress={() => navigation.goBack()}
        middlePress={() => navigation.navigate('HomeScreen')}
      />
      <ScrollView>
        <View>
          <View style={styles.picture}>
            <Icon source="account-circle" size={130} color={colors.blue} />
            <Text style={styles.name} importantForAccessibility="yes">
              {userInfo.name}
            </Text>
            <Divider style={styles.separator} importantForAccessibility="no" />
          </View>
        </View>
        <View style={styles.disabilities} accessibilityLabel="Deficiências">
          {userInfo.disabilities.length > 0 &&
            userInfo.disabilities.map((disability, index) => (
              <CheckButton
                key={index}
                text={disability}
                state={true}
                clickable={false}
              />
            ))}
        </View>

        <View style={styles.screen}>
          <View style={styles.infoContainer} importantForAccessibility="no">
            <Text style={styles.title}>Profissão</Text>
            <Text style={styles.text}>{userInfo.profession}</Text>
          </View>
          <View style={styles.infoContainer} importantForAccessibility="no">
            <Text style={styles.title}>E-mail</Text>
            <Text style={styles.text}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoContainer} importantForAccessibility="no">
            <Text style={styles.title}>Celular</Text>
            <Text style={styles.text}>{userInfo.celNumber}</Text>
          </View>
          <View style={styles.infoContainer} importantForAccessibility="no">
            <Text style={styles.title}>Data de Nascimento</Text>
            <Text style={styles.text}>{userInfo.date}</Text>
          </View>
          {userInfo.description &&
            (
              <View style={styles.box} importantForAccessibility='no'>
                <Text style={styles.title}>Descrição</Text>
                <TextBoxComponent
                  placeholder={userInfo.description}
                  accessibilityLabel={userInfo.description}
                  editable={false}
                />
              </View>
            )
          }
        </View>

        <View style={styles.buttonContainer}>
          <NavButtonComponent
            text="Editar perfil"
            img={'Edit'}
            onClick={() =>
              navigation.navigate('UpdateBasicInfoScreen', userInfo)
            }
          />
          <NavButtonComponent
            text="Locais cadastrados"
            img={'Shop'}
            onClick={() => navigation.navigate('EstablishmentsUserScreen')}
          />
          {isAdmin && (
            <NavButtonComponent
              text="Gerenciar comentários"
              img={'Commenty'}
              onClick={() => navigation.navigate('AdminCommentaryAvaliationScreen')}
              notification={anyReport}
            />
          )}
          {isAdmin && (
            <NavButtonComponent
              text="Aprovar locais"
              img={'Check'}
              onClick={() =>
                navigation.navigate('AdminEstablishmentsToApproveScreen')
              }
              notification={anyPending}
            />
          )}

          {!isAdmin && (
            <NavButtonComponent
              text="Desativar conta"
              img={'Warning'}
              textIsRed={true}
              onClick={showModal}
            />
          )}
        </View>
      </ScrollView>
      <ModalBoxComponent
        visible={visible}
        onDismiss={hideModal}
        width={300}
        height={270}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Oxygen-Bold',
            color: colors.textBlack,
          }}
        >
          Desativar conta
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Medium',
            fontSize: 16,
            color: colors.textBlack,
          }}
        >
          {`Ao desativar sua conta, você perderá permanentemente o\nacesso a ela.`}
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <ButtonComponent
            text="Desativar"
            onPress={() => handleDisable()}
            customWidth={230}
            isBlue={true}
            accessibilityLabel="Desativar"
          />
        </View>
        <View>
          <ButtonComponent
            text="Cancelar"
            onPress={hideModal}
            customWidth={230}
            isBlue={false}
            accessibilityLabel="Cancelar"
          />
        </View>
      </ModalBoxComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },

  screen: {
    marginHorizontal: '7%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.backgroundScreen,
  },

  picture: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
  },
  name: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 25,
    textAlign: 'center',
    color: colors.textBlack,
  },
  separator: {
    borderWidth: 0.4,
    borderColor: colors.borderStrokeOpacity,
    minWidth: '86%',
    marginVertical: '3%',
  },

  disabilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    marginBottom: '3%',
  },

  infoContainer: {
    paddingBottom: '2%',
  },
  title: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 16,
    textAlign: 'left',
    color: colors.textBlack,
  },
  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: colors.textBlack,
    textAlign: 'left',
    paddingBottom: '3%',
  },

  buttonContainer: {
    display: 'flex',
    minWidth: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4%',
    paddingHorizontal: '7%',
  },

  box: {
    minWidth: '100%',
    paddingBottom: '2%',
    columnGap: 10,
  },
});
