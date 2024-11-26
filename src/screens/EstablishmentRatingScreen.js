import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import fontlist from '../assets/fonts/fontlist';
import HeaderComponent from '../components/HeaderComponent';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import GrayLikeIcon from '../assets/icons/GrayLikeIcon';
import BlueLikeIcon from '../assets/icons/BlueLikeIcon';
import GrayDislikeIcon from '../assets/icons/GrayDislikeIcon';
import BlueDislikeIcon from '../assets/icons/BlueDislikeIcon';
import LoaderComponent from '../components/LoaderComponent';
import EstablishmentCardComponent from '../components/EstablishmentCardComponent';
import TextBoxComponent from '../components/TextBoxComponent';
import { CommonActions } from '@react-navigation/native';
import ButtonComponent from '../components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../apis/api';

export default function EstablishmentRatingScreen({ navigation, route }) {
  const { id, liked, disliked, establishmentInfo: initialInfo } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isClickedLike, setIsClickedLike] = useState(liked);
  const [isClickedDislike, setIsClickedDislike] = useState(disliked);
  const [colorTextDislike, setColorTextDislike] = useState(
    disliked ? colors.textBlack : colors.textGray,
  );
  const [colorTextLike, setColorTextLike] = useState(
    liked ? colors.blue : colors.textGray,
  );
  const [establishmentInfo, setEstablishmentInfo] = useState(initialInfo);
  const [token, setToken] = React.useState('');

  useEffect(() => {
    async function getUserTokenId() {
      var valueToken = await AsyncStorage.getItem('token');
      setToken(valueToken);
    }
    getUserTokenId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(token);
        const response = await api.get(`v1/establishments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const establishmentData = await response.data;
        const data = {
          id: establishmentData.id,
          name: establishmentData.name,
          type: establishmentData.type,
          totalLikes: establishmentData.totalLikes,
          totalDislikes: establishmentData.totalDislikes,
          disabilities: establishmentData.disabilities,
          accessiblities: establishmentData.accessibilities,
          image: establishmentData.images[0],
        };
        setEstablishmentInfo(data);
      } catch (e) {
        console.log('Error fetching establishment data', e);
      } finally {
        setIsLoading(false);
      }
    }

    if (token !== '') fetchData();
  }, [token]);

  const handlePressLike = () => {
    setIsClickedLike(true);
    setIsClickedDislike(false);
    setColorTextLike(colors.blue);
    setColorTextDislike(colors.textGray);
  };

  const handlePressDislike = () => {
    setIsClickedDislike(true);
    setIsClickedLike(false);
    setColorTextDislike(colors.backgroundSearchBar);
    setColorTextLike(colors.textGray);
  };

  const handleSubmitReview = async () => {
    if (!isClickedDislike && !isClickedLike) {
      Alert.alert(
        'Erro',
        'Avalie selecione uma das opções para realizar sua avaliação',
      );
    } else {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(isClickedLike);
        await api.post(
          'v1/posts',
          {
            content: comment,
            rating: isClickedLike ? 'L' : 'D',
            establishmentId: id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'HomeScreen' },
              { name: 'EstablishmentScreen', params: { id } }
            ],
          }),
        );
      } catch (e) {
        console.log('Error submitting review', e);
        if (e.response && e.response.status === 404) {
          Alert.alert('Erro', 'Nenhum estabelecimento encontrado');
        } else if (e.response && e.response.status === 401) {
          Alert.alert('Erro', 'Usuário não autorizado');
        } else {
          Alert.alert(
            'Erro',
            'Não foi possível enviar a avaliação. Tente novamente.',
          );
        }
      }
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={colors.backgroundStatusBar} importantForAccessibility="no" />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LoaderComponent accessibilityLabel="Carregando dados do local" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider backgroundColor={colors.backgroundScreen}>
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
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.screen}>
            <EstablishmentCardComponent
              data={establishmentInfo}
              onClick={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.container}>
              <Image
                source={require('../assets/imgs/Avatar.png')}
                style={styles.avatar}
                accessibilityLabel="Avatar"
              />
              <View style={styles.content}>
                <Text style={styles.userName}>
                  Seu Nome aparecerá para outras pessoas!
                </Text>
                <Text style={styles.text}>
                  As avaliações são públicas e incluem as informações do seu
                  perfil.
                </Text>
              </View>
            </View>
            <View style={styles.evaluationContainer}>
              <Text style={styles.subHeaderText}>Avalie este lugar</Text>
              <Text style={styles.descriptionText}>Dê sua opinião</Text>
              <View style={styles.buttons}>
                <View style={styles.buttonContainer}
                  accessibilityLabel='Achei acessível'>
                  <TouchableOpacity onPress={handlePressLike}
                    importantForAccessibility='no-hide-descendants'
                  >
                    {isClickedLike ? <BlueLikeIcon /> : <GrayLikeIcon />}
                  </TouchableOpacity>
                  <Text style={[styles.buttonText, { color: colorTextLike }]}>
                    Achei acessível
                  </Text>
                </View>
                <View style={styles.buttonContainer}
                  accessibilityLabel='Não achei acessível'>
                  <TouchableOpacity onPress={handlePressDislike}
                    importantForAccessibility='no-hide-descendants'
                  >
                    {isClickedDislike ? (
                      <BlueDislikeIcon />
                    ) : (
                      <GrayDislikeIcon />
                    )}
                  </TouchableOpacity>
                  <Text
                    style={[styles.buttonText, { color: colorTextDislike }]}
                  >
                    Não achei acessível
                  </Text>
                </View>
              </View>
              <Text style={styles.commentHeaderText}>Deixe um comentário</Text>
              <TextBoxComponent
                placeholder="Escreva seu comentário aqui (opcional)"
                value={comment}
                sendText={text => setComment(text)}
                accessibilityLabel="Campo de comentário"
                hint="Insira seu comentário aqui"
                minHeight={142}
                numberOfLines={4}
                style={styles.commentBox}
              />
              <View style={styles.buttonWrapper}>
                <ButtonComponent
                  text="Enviar avaliação"
                  onPress={handleSubmitReview}
                  isBlue={true}
                  accessibilityLabel="Enviar Avaliação"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    flexGrow: 1
  },
  screen: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginBottom: 22,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontFamily: 'Oxygen-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20.2,
    textAlign: 'left',
    marginLeft: 3,
    color: colors.textBlack,
  },
  text: {
    fontFamily: 'Oxygen-Light',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17.68,
    textAlign: 'left',
    color: colors.textBlack,
    marginLeft: 3,
    marginTop: 5,
  },
  evaluationContainer: {
    width: '100%',
    paddingHorizontal: 3,
    marginTop: 5,
  },
  subHeaderText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 18,
    color: colors.textBlack,
    marginTop: '5%',
  },

  descriptionText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: colors.textBlack,
  },

  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: '5%',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
  },
  commentHeaderText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 18,
    color: colors.textBlack,
    alignSelf: 'flex-start',
    marginTop: '7%',
  },
  buttonWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  commentBox: {
    width: '100%',
  },
});
