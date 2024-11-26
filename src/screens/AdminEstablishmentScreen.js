/**
 * @author                    Bianca Alves @bianca.alves
 *
 * @example                   <AdminEstablishmentScreen />
 */

import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import colors from '../constants/colors';

import HeaderComponent from '../components/HeaderComponent';
import ImageCarouselComponent from '../components/ImageCarouselComponent';
import DisabilityTagsComponent from '../components/DisabilityTagsComponent';
import TagDisplayComponent from '../components/TagDisplayComponent';
import GrayLikeIcon from '../assets/icons/GrayLikeIcon';
import BlueLikeIcon from '../assets/icons/BlueLikeIcon';
import GrayDislikeIcon from '../assets/icons/GrayDislikeIcon';
import BlueDislikeIcon from '../assets/icons/BlueDislikeIcon';
import PhoneIcon from '../assets/icons/PhoneIcon';
import GlobeIcon from '../assets/icons/GlobeIcon';
import LocationIcon from '../assets/icons/LocationIcon';
import LoaderComponent from '../components/LoaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import ModalBoxComponent from '../components/ModalBoxComponent';
import CommentComponent from '../components/CommentComponent';
import ArrowForwardIcon from '../assets/icons/ArrowForward';
import api from '../apis/api';

export default function AdminEstablishmentScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [establishmentInfo, setEstablishmentInfo] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [token, setToken] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [isLoadingComments, setIsLoadingComments] = React.useState(true);

  const { id } = route.params;

  React.useEffect(() => {
    async function getUserToken() {
      var valueToken = await AsyncStorage.getItem('token');
      setToken(valueToken);
    }
    getUserToken();
  }, []);

  React.useEffect(() => {
    async function getComments() {
      try {
        console.log('\nID: ', id, '\nToken: ', token);
        const response = await api.get(`/v1/posts?establishmentId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data);
      } catch (e) {
        if (e.response.status === 404)
          console.log('Nenhum comentário encontrado');
        else {
          console.log('Erro:', 'Aconteceu um erro inesperado');
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
        }
      } finally {
        setIsLoadingComments(false);
      }
    }

    if (token !== '') {
      getComments();
    }
  }, [token]);

  React.useEffect(() => {
    async function fetchData() {
      console.log(id);
      console.log(token);
      try {
        const response = await api.get(`v1/establishments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const establishmentData = await response.data;

        setLatitude(establishmentData.address.latitude);
        setLongitude(establishmentData.address.longitude);
        setAddress(establishmentData.address);

        const data = {
          id: establishmentData.id,
          name: establishmentData.name,
          type: establishmentData.type,
          cnpj: establishmentData.cnpj,
          address: establishmentData.address,
          phone: establishmentData.phone,
          site: establishmentData.site,
          totalLikes: establishmentData.totalLikes,
          totalDislikes: establishmentData.totalDislikes,
          disabilities: establishmentData.disabilities,
          accessiblities: establishmentData.accessibilities,
          image: establishmentData.images,
          status: establishmentData.status,
        };
        setEstablishmentInfo(data);
      } catch (e) {
        if (e.response && e.response.status === 401) {
          console.log('ERRO:', e.response.data.error);
          Alert.alert('Erro', e.response.data.error);
        } else if (e.response && e.response.status === 404) {
          console.log('ERRO:', e.response.data.error);
          Alert.alert('Erro', e.response.data.error);
        } else {
          console.log(e.response.data);
          console.log('Erro:', 'Aconteceu um erro inesperado');
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 2,
            routes: [{ name: 'HomeScreen' }],
            routes: [{ name: 'ProfileScreen' }],
            routes: [{ name: 'AdminEstablishmentsToApproveScreen' }],
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (token !== '') {
      fetchData();
    }
  }, [token]);

  const [colorTextDislike, setColorTextDislike] = useState(colors.textGray);
  const [colorTextLike, setColorTextLike] = useState(colors.textGray);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const reportComment = (postId, userId, userName, content, establishmentId) => {
    Alert.alert(
      'Reportar comentário?',
      `Deseja reportar comentário feito por ${userName}?\n\n${content}`,
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel report'),
        },
        {
          text: 'Sim',
          onPress: () => handleReport(postId, userId, establishmentId),
        },
      ],
    );
  };

  const handleReport = async (postId, userId, establishmentId) => {
    try {
      const response = await api.patch(
        `v1/posts`,
        {
          postId: postId,
          establishmentId: establishmentId,
          userId: userId,
          reported: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Alert.alert('Sucesso', 'Comentário reportado');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Não foi possível reportar o comentário');
    }
  };

  const openGoogleMaps = () => {
    if (latitude == null || longitude == null) {
      Alert.alert(
        'Erro',
        'Os dados de latitude e longitude desse estabelecimento não foram definidos.',
      );
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      Linking.openURL(url).catch(err =>
        console.error('Erro ao abrir o Google Maps:', err),
        Alert.alert('Erro', 'Não foi possível abrir o Google Maps'),
      );
    }
  };

  const handleStatus = async status => {
    const data = {
      status: status,
    };

    try {
      const response = await api.patch(`v1/admin/establishments/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      hideModal();

      Alert.alert('Sucesso', 'O estabelecimento foi atualizado com sucesso.');
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else if (e.response && e.response.status === 403) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else if (e.response && e.response.status === 404) {
        console.log('ERRO:', e.response.data.error);
        Alert.alert('Erro', e.response.data.error);
      } else {
        console.log('Erro:', 'Aconteceu um erro inesperado');
        Alert.alert('Erro', 'Aconteceu um erro inesperado');
      }
    } finally {
      navigation.dispatch(
        CommonActions.reset({
          index: 2,
          routes: [
            { name: 'HomeScreen' },
            { name: 'ProfileScreen' },
            { name: 'AdminEstablishmentsToApproveScreen' }
          ],
        }),
      );
    }
  };

  const navigateToCommentsScreen = () => {
    navigation.navigate('EstablishmentCommentsScreen', {
      id,
      establishmentInfo,
    });
  };

  if (isLoading || !establishmentInfo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={colors.backgroundStatusBar}
          importantForAccessibility="no"
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoaderComponent accessibilityLabel="Carregando dados do local" />
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
      <ScrollView>
        <View style={styles.imageCarousel}>
          <ImageCarouselComponent data={establishmentInfo.image} />
          <View
            style={styles.disabilityTags}
            accessibilityLabel={
              `Esse estabelecimento possui acessibilidades para pessoas portadoras de deficiência: ${establishmentInfo.disabilities}.`
            }
          >
            <DisabilityTagsComponent
              disabilities={establishmentInfo.disabilities}
            />
          </View>
          <View style={styles.screen}>
            <Text style={[styles.nameText, { fontSize: 25 }]}>
              {establishmentInfo.name}
            </Text>
            <Text style={styles.establishmentType}>
              {establishmentInfo.type}
            </Text>
            <View
              style={styles.tagDisplay}
              accessibilityLabel='Acessibilidades'
            >
              <TagDisplayComponent tagList={establishmentInfo.accessiblities} />
            </View>
            <View
              accessibilityLabel='Avalie este lugar. 
              Dê sua opinião selecionando uma das opções a seguir.'
            >
              <Text
                style={styles.nameText}
                importantForAccessibility='no-hide-descendants'
              >
                Avalie este lugar
              </Text>
              <Text style={styles.establishmentType}>
                Dê sua opinião
              </Text>
            </View>

            <View style={styles.buttons}>
              <View
                style={{
                  marginLeft: '7%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel='Achei acessível'
              >
                <GrayLikeIcon />
                <Text style={[styles.buttonText, { color: colorTextLike }]}>
                  Achei acessível
                </Text>
              </View>
              <View
                style={{
                  marginRight: '7%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel='Não achei acessível'
              >
                <GrayDislikeIcon />
                <Text style={[styles.buttonText, { color: colorTextDislike }]}>
                  Não achei acessível
                </Text>
              </View>
            </View>
            <View style={{ marginTop: '5%' }}>
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 15,
                  color: colors.textGray,
                }}
              >
                Escreva uma resenha
              </Text>
            </View>

            <View style={{ marginTop: '8%', marginBottom: '3%' }}>
              {establishmentInfo.phone && (
                <View style={styles.informations}>
                  <PhoneIcon />
                  <Text
                    style={styles.infoText}
                    accessibilityLabel={`Telefone: ${establishmentInfo.phone}`}
                  >
                    {establishmentInfo.phone}
                  </Text>
                </View>
              )}

              {establishmentInfo.site && (
                <View style={styles.informations}>
                  <GlobeIcon />
                  <Text
                    style={styles.infoText}
                    accessibilityLabel={`Site: ${establishmentInfo.site}`}
                  >
                    {establishmentInfo.site}
                  </Text>
                </View>
              )}

              <View style={styles.informations}>
                <LocationIcon />
                <Text
                  style={styles.infoText}
                  accessibilityLabel={
                    `Endereço: ${address.street}, ${address.number} - ${address.neighborhood
                    }, ${address.city}/${address.state}, ${address.cep}${address.additionalDetails
                      ? ` - ${address.additionalDetails}`
                      : ''
                    }`
                  }
                >
                  {`${address.street}, ${address.number} - ${address.neighborhood
                    }, ${address.city}/${address.state}, ${address.cep}${address.additionalDetails
                      ? ` - ${address.additionalDetails}`
                      : ''
                    }`
                  }
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={openGoogleMaps}
              accessibilityHint="Redirecionamento para Google Maps."
            >
              <Text
                style={{
                  fontFamily: 'Oxygen-Bold',
                  fontSize: 14,
                  color: colors.blue,
                  marginTop: '1%',
                  textDecorationLine: 'underline',
                }}
              >
                Saiba como chegar
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', paddingTop: '8%' }}>
              <View
                style={{ flexDirection: 'column' }}
                accessibilityLabel='Comentários e avaliações. Veja como outros usuários avaliaram este estabelecimento.'
              >
                <Text
                  style={{
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 18,
                    color: colors.textBlack,
                  }}
                >
                  Comentários e avaliações
                </Text>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Medium',
                    maxWidth: '90%',
                    fontSize: 15,
                    color: colors.textBlack,
                  }}
                >
                  Veja como outros usuários avaliaram este estabelecimento
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{ height: 40, justifyContent: 'center' }}
                  accessibilityLabel='Ver mais avaliações de usuários'
                  accessibilityHint='Redireciona para tela com todas as avaliações.'
                  accessibilityRole='button'
                  onPress={navigateToCommentsScreen}
                >
                  <ArrowForwardIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.buttons, { marginBottom: '4%' }]}>
              <View
                style={{
                  flex: 1,
                  marginLeft: '7%',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel={`Total de avaliações positivas: ${establishmentInfo.totalLikes}`}
              >
                <View>
                  <BlueLikeIcon />
                </View>
                <Text style={[styles.likesText, { color: colors.textBlue }]}>
                  {establishmentInfo.totalLikes}
                </Text>
                <Text
                  style={{
                    maxWidth: '80%',
                    fontFamily: 'Quicksand-Medium',
                    textAlign: 'center',
                    fontSize: 14,
                  }}
                >
                  Acharam acessível
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginRight: '7%',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel={`Total de avaliações negativas: ${establishmentInfo.totalDislikes}`}
              >
                <View>
                  <BlueDislikeIcon />
                </View>
                <Text
                  style={[
                    styles.likesText,
                    { color: colors.backgroundSearchBar },
                  ]}
                >
                  {establishmentInfo.totalDislikes}
                </Text>
                <Text
                  style={{
                    maxWidth: '80%',
                    fontFamily: 'Quicksand-Medium',
                    textAlign: 'center',
                    fontSize: 14,
                  }}
                >
                  Não acharam acessível
                </Text>
              </View>
            </View>

            <View style={isLoadingComments ? styles.loading : {}}>
              {isLoadingComments ? (
                <LoaderComponent accessibilityLabel="Carregando lista de comentários" />
              ) : comments.length ? (
                comments.slice(0, 3).map((comment, index) => (
                  <View key={index}>
                    <CommentComponent comment={comment}
                      onReport={(postId, userId, userName, content, establishmentId) =>
                        reportComment(postId, userId, userName, content, establishmentId)
                      } />
                  </View>
                ))
              ) : (
                <View marginTop={'3%'} marginBottom={'5%'}>
                  <Text style={styles.noCommentsText}>
                    {comments.length === 0
                      && 'Não há comentários'}
                  </Text>
                </View>
              )}
            </View>

            <View>
              <TouchableOpacity
                style={{ height: 40, width: 240, justifyContent: 'center' }}
                accessibilityLabel='Ver mais avaliações de usuários'
                accessibilityHint='Redireciona para tela com todas as avaliações.'
                onPress={navigateToCommentsScreen}
              >
                <Text
                  style={{
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 15,
                    color: colors.textBlue,
                    textDecorationLine: 'underline',
                  }}
                >
                  Veja mais avaliações de usuários
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonComponent
            text="Aprovar"
            isBlue
            accessibilityLabel="Aprovar estabelecimento"
            onPress={showModal}
          />
          <ButtonComponent
            text="Rejeitar"
            accessibilityLabel="Rejeitar estabelecimento"
            onPress={() => handleStatus('DENIED')}
          />
        </View>
      </ScrollView>

      <ModalBoxComponent
        visible={visible}
        onDismiss={hideModal}
        width={300}
        height={250}
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
          Aprovar local
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Medium',
            fontSize: 16,
            color: colors.textBlack,
          }}
        >
          Ao aprovar este local, ele será disponibilizado a todos usuários
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <ButtonComponent
            text="Aprovar"
            onPress={() => handleStatus('APPROVED')}
            customWidth={230}
            isBlue={true}
            accessibilityLabel="Aprovar"
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

const styles = new StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  imageCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },

  noComments: {
    paddingVertical: '7%',
    alignItems: 'flex-start',
    minWidth: '90%',
  },

  screen: {
    width: '90%',
  },

  disabilityTags: {
    justifyContent: 'center',
    alignItems: 'right',
    width: '90%',
    marginTop: '2%',
  },

  tagDisplay: {
    justifyContent: 'space-between',
    maxHeight: '20%', // Bug na altura do scroll da tela
    maxWidth: '100%',
    marginTop: '5%',
    marginBottom: '5%',
  },

  nameText: {
    fontFamily: 'Oxygen-Bold',
    color: colors.textBlack,
    fontSize: 18,
    marginTop: '2%',
  },

  infoText: {
    fontFamily: 'Oxygen-Regular',
    color: colors.textBlack,
    fontSize: 14,
    marginHorizontal: '2%',
  },

  establishmentType: {
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlack,
    fontSize: 15,
  },

  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '3%',
    marginBottom: '2%',
  },

  buttonText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 14,
    textAlign: 'center',
  },

  informations: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '3%',
  },

  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: '5%',
    padding: '4%',
  },

  noCommentsText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: colors.textBlack,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  likesText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    marginTop: 5,
  },
});
