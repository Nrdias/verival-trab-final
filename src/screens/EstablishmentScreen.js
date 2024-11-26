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

import fontlist from '../assets/fonts/fontlist';
import colors from '../constants/colors';
import GrayLikeIcon from '../assets/icons/GrayLikeIcon';
import BlueLikeIcon from '../assets/icons/BlueLikeIcon';
import GrayDislikeIcon from '../assets/icons/GrayDislikeIcon';
import BlueDislikeIcon from '../assets/icons/BlueDislikeIcon';
import PhoneIcon from '../assets/icons/PhoneIcon';
import GlobeIcon from '../assets/icons/GlobeIcon';
import LocationIcon from '../assets/icons/LocationIcon';

import LoaderComponent from '../components/LoaderComponent';
import AvaliationPopUpComponent from '../components/AvaliationPopUpComponent';
import NavButtonComponent from '../components/NavButtonComponent';
import CommentComponent from '../components/CommentComponent';
import ArrowForwardIcon from '../assets/icons/ArrowForward';
import ModalBoxComponent from '../components/ModalBoxComponent';
import ButtonComponent from '../components/ButtonComponent';
import HeaderComponent from '../components/HeaderComponent';
import ImageCarouselComponent from '../components/ImageCarouselComponent';
import DisabilityTagsComponent from '../components/DisabilityTagsComponent';
import TagDisplayComponent from '../components/TagDisplayComponent';

import api from '../apis/api';

export default function EstablishmentScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [establishmentInfo, setEstablishmentInfo] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [address, setAddress] = React.useState('');
  const [token, setToken] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [isLoadingComments, setIsLoadingComments] = React.useState(true);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);

  const showModal = () => setIsVisibleModal(true);
  const hideModal = () => setIsVisibleModal(false);

  const { id } = route.params;

  React.useEffect(() => {
    async function getUserTokenId() {
      var valueToken = await AsyncStorage.getItem('token');
      setToken(valueToken);
    }
    getUserTokenId();
  }, []);

  React.useEffect(() => {
    async function getComments() {
      try {
        const response = await api.get(`/v1/posts?establishmentId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data);
      } catch (e) {
        if (e.response.status === 404) {
          console.log('Nenhum comentário encontrado');
        } else {
          console.log(e.response.data);
          console.log('Erro:', 'Aconteceu um erro inesperado');
          Alert.alert('Erro', 'Aconteceu um erro inesperado');
        }
      } finally {
        setIsLoadingComments(false);
      }
    }
    if (token !== '' && id !== '') {
      getComments();
    }
  }, [id, token]);

  React.useEffect(() => {
    async function fetchData() {
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
          latitude: establishmentData.latitude,
          longitude: establishmentData.longitude,
          status: establishmentData.status,
          createdByUser: establishmentData.createdByUser,
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
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }
    if (token !== '' && id !== '') {
      fetchData();
    }
  }, [id, token]);

  const [isClickedLike, setIsClickedLike] = useState(true);
  const [isClickedDislike, setIsClickedDislike] = useState(true);
  const [colorTextDislike, setColorTextDislike] = useState(colors.textGray);
  const [colorTextLike, setColorTextLike] = useState(colors.textGray);

  const isEstablishmentApproved = establishmentInfo?.status === 'APPROVED';

  const handleDelete = async () => {
    try {
      console.log(establishmentInfo.id);
      const response = await api.delete(
        `v1/establishments/${establishmentInfo.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      Alert.alert('Sucesso', 'Estabelecimento excluído');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        }),
      );
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Não foi possível excluir o estabelecimento');
    }
  };

  const handlePressLike = () => {
    setIsClickedLike(!isClickedLike);
    setColorTextLike(!isClickedLike ? colors.textGray : colors.blue);
    setColorTextDislike(colors.textGray);

    if (isClickedLike === true) {
      setIsClickedDislike(true);
      navigateToRatingScreen(true, false);
    }
  };

  const reportComment = (
    postId,
    userId,
    userName,
    content,
    establishmentId,
  ) => {
    Alert.alert(
      'Reportar comentário?',
      `Deseja reportar comentário feito por ${userName}?\n\n"${content}"`,
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

  const handlePressDislike = () => {
    setIsClickedDislike(!isClickedDislike);
    setColorTextDislike(
      !isClickedDislike ? colors.textGray : colors.backgroundSearchBar,
    );
    setColorTextLike(colors.textGray);

    if (isClickedDislike === true) {
      setIsClickedLike(true);
      navigateToRatingScreen(false, true);
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

  const navigateToRatingScreen = (like, dislike) => {
    navigation.navigate('EstablishmentRatingScreen', {
      id,
      liked: like,
      disliked: dislike,
      establishmentInfo,
    });
  };

  const navigateToCommentsScreen = () => {
    navigation.navigate('EstablishmentCommentsScreen', {
      id,
      establishmentInfo,
    });
  };

  const handleEdit = establishmentData => {
    console.log(establishmentData);
    navigation.navigate('UpdateEstablishmentRegistrationScreen', {
      establishmentData,
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
        leftPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            }),
          );
        }}
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
              `Inclui acessibilidades para pessoas portadoras de deficiência: ${establishmentInfo.disabilities}.`
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
                  flex: 1,
                  marginLeft: '7%',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel='Achei acessível'
              >
                <TouchableOpacity
                  onPress={() => {
                    isEstablishmentApproved
                      ? handlePressLike()
                      : Alert.alert(
                        'Erro',
                        'Você não pode avaliar um estabelecimento que não está aprovado.',
                      );
                  }}
                  importantForAccessibility='no-hide-descendants'
                >
                  {isClickedLike ? <GrayLikeIcon /> : <BlueLikeIcon />}
                </TouchableOpacity>
                <Text style={[styles.buttonText, { color: colorTextLike }]}>
                  Achei acessível
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginRight: '7%',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
                accessibilityLabel='Não achei acessível'
              >
                <TouchableOpacity
                  onPress={() => {
                    isEstablishmentApproved
                      ? handlePressDislike()
                      : Alert.alert(
                        'Erro',
                        'Você não pode avaliar um estabelecimento que não está aprovado.',
                      );
                  }}
                  importantForAccessibility='no-hide-descendants'
                >
                  {isClickedDislike ? <GrayDislikeIcon /> : <BlueDislikeIcon />}
                </TouchableOpacity>
                <Text style={[styles.buttonText, { color: colorTextDislike }]}>
                  Não achei acessível
                </Text>
              </View>
            </View>
            <View style={{ marginTop: '5%' }}>
              <TouchableOpacity
                onPress={() =>
                  isEstablishmentApproved
                    ? navigateToRatingScreen(!isClickedLike, !isClickedDislike)
                    : Alert.alert(
                      'Erro',
                      'Você não pode avaliar um estabelecimento que não está aprovado.',
                    )
                }
                accessibilityHint='Redireciona para tela de avaliação.'
              >
                <Text
                  style={{
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 15,
                    color: isEstablishmentApproved
                      ? colors.textBlue
                      : colors.textGray,
                    textDecorationLine: isEstablishmentApproved
                      ? 'underline'
                      : 'none',
                  }}
                >
                  Escreva uma resenha
                </Text>
              </TouchableOpacity>
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
                  fontSize: 15,
                  color: colors.textBlue,
                  textDecorationLine: 'underline',
                  marginTop: '1%',
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
                    <CommentComponent
                      comment={comment}
                      onReport={(
                        postId,
                        userId,
                        userName,
                        content,
                        establishmentId,
                      ) =>
                        reportComment(
                          postId,
                          userId,
                          userName,
                          content,
                          establishmentId,
                        )
                      }
                    />
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

            {establishmentInfo.createdByUser && (
              <View style={{ marginTop: '3%', paddingBottom: '3%' }}>
                <NavButtonComponent
                  text={'Editar local'}
                  img={'Edit'}
                  onClick={() => handleEdit(establishmentInfo)}
                />
                <NavButtonComponent
                  onClick={showModal}
                  text={'Indicar desativação'}
                  img={'Warning'}
                  textIsRed={true}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <ModalBoxComponent
        visible={isVisibleModal}
        onDismiss={hideModal}
        width={300}
        height={300}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Oxygen-Bold',
            color: colors.textBlack,
            paddingBottom: '3%',
          }}
        >
          Indicar desativação
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Medium',
            fontSize: 16,
            color: colors.textBlack,
          }}
        >
          Ao desativar este local, ele não poderá mais ser visualizado por
          outros usuários.
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <ButtonComponent
            text="Desativar"
            onPress={() => {
              handleDelete();
            }}
            customWidth={230}
            isBlue={true}
            accessibilityLabel="Sair"
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

      <View style={styles.popUp}>
        <AvaliationPopUpComponent status={establishmentInfo.status} />
      </View>
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
    display: 'flex',
    width: '100%',
    position: 'relative',
  },

  screen: {
    width: '90%',
    display: 'flex',
  },

  disabilityTags: {
    justifyContent: 'center',
    alignItems: 'right',
    display: 'flex',
    width: '90%',
    marginTop: '2%',
  },

  tagDisplay: {
    justifyContent: 'space-between',
    maxHeight: '20%',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    bottom: '5%',
    width: '80%',
    left: '10%',
    backgroundColor: 'transparent',
  },

  noCommentsText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: colors.textBlack,
  },

  likesText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 20,
    marginTop: 5,
  },
});
