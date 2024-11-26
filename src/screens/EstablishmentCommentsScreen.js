/**
 * @param establishment       label e value do item caso já tenha um valor selecionado anteriormente
 * @example                  <EstablishmentCommentsScreen establishment={establishment} />
 */

import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import '../constants/colors';
import EstablishmentCardComponent from '../components/EstablishmentCardComponent';
import HeaderComponent from '../components/HeaderComponent';
import CommentComponent from '../components/CommentComponent';
import LoaderComponent from '../components/LoaderComponent';
import ToggleButtons from '../components/ToggleButtonComponent';
import api from '../apis/api';

export default function EstablishmentCommentsScreen({ navigation, route }) {
  const { id, establishmentInfo: initialInfo } = route.params
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [establishment, setEstablishment] = useState(initialInfo);
  const [comments, setComments] = useState([]);
  const [commentsFilter, setCommentsFilter] = useState('all');

  const handleActivate = (filterType) => {
    setCommentsFilter(filterType);
  };

  const handleDeactivate = () => {
    setCommentsFilter('all');
  };

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
      console.log(response);
      Alert.alert('Sucesso', 'Comentário reportado');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Não foi possível reportar o comentário');
    }
  };

  React.useEffect(() => {
    async function getUserToken() {
      const value = await AsyncStorage.getItem('token');
      setToken(value);
    }
    getUserToken();
  }, []);

  React.useEffect(() => {
    async function getComments() {
      try {
        const response = await api.get(`/v1/posts?establishmentId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(response.data);
      } catch (e) {
        console.log('Error', e);
      } finally {
        setIsLoading(false);
      }
    }
    if (token !== '') {
      getComments();
    }
  }, [token]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`v1/establishments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const establishmentData = await response.data;

        const data = {
          id: establishmentData.id,
          name: establishmentData.name,
          type: establishmentData.type,
          totalLikes: establishmentData.totalLikes,
          disabilities: establishmentData.disabilities,
          image: establishmentData.images[0],
        };

        setEstablishment(data);

        setIsLoading(false);
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
    if (token !== '') {
      fetchData();
    }
  }, [token]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
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
          <View style={{ paddingLeft: 24, paddingRight: 24 }}>
            <EstablishmentCardComponent
              data={establishment}
              onClick={() => { navigation.navigate('EstablishmentScreen', { id: establishment.id }) }}
            />
          </View>
          <View>
            <View style={styles.avaliation}>
              <ToggleButtons
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              ></ToggleButtons>
            </View>
          </View>
          <View style={styles.commentsContainer}>
            {commentsFilter === 'all' && comments.map((comment, index) => (
              <CommentComponent
                key={index}
                comment={comment}
                onReport={(postId, userId, userName, content, establishmentId) =>
                  reportComment(postId, userId, userName, content, establishmentId)
                }
              />
            ))}
            {commentsFilter === 'positive' && comments.filter((comment) => comment.rating === 'L').map((comment, index) => (
              <CommentComponent
                key={index}
                comment={comment}
                onReport={(postId, userId, userName, content, establishmentId) =>
                  reportComment(postId, userId, userName, content, establishmentId)
                }
              />
            ))}
            {commentsFilter === 'negative' && comments.filter((comment) => comment.rating === 'D').map((comment, index) => (
              <CommentComponent
                key={index}
                comment={comment}
                onReport={(postId, userId, userName, content, establishmentId) =>
                  reportComment(postId, userId, userName, content, establishmentId)
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  commentsContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  avaliation: {
    paddingTop: 10,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});
