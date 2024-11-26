import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import HeaderComponent from '../components/HeaderComponent';
import fontlist from '../assets/fonts/fontlist';
import colors from '../constants/colors';
import CommentComponent from '../components/CommentComponent';
import ModalBoxComponent from '../components/ModalBoxComponent';
import ButtonComponent from '../components/ButtonComponent';
import LoaderComponent from '../components/LoaderComponent';
import api from '../apis/api';

export default function AdminCommentaryAvaliation({ navigation }) {
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visibleDeclineModal, setVisibleDeclineModal] = React.useState(false);
  const showDeclineModal = () => setVisibleDeclineModal(true);
  const hideDeclineModal = () => setVisibleDeclineModal(false);

  const [currentId, setCurrentId] = useState({});

  const handleCommentDelete = async () => {
    try {
      const response = await api.delete(
        `/v1/admin/posts?postId=${currentId.postId}&establishmentId=${currentId.establishmentId}&userId=${currentId.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const indexToDelete = comments.findIndex(
        comment => comment.postId === currentId.postId,
      );
      if (indexToDelete !== -1) {
        comments.splice(indexToDelete, 1);
      }
      Alert.alert('Sucesso', 'Comentário excluido com sucesso');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Não foi possível excluir o comentário');
    } finally {
      hideModal();
    }
  };

  const handleReportDeclined = async () => {
    try {
      const response = await api.patch(
        `v1/posts`,
        {
          postId: currentId.postId,
          establishmentId: currentId.establishmentId,
          userId: currentId.userId,
          reported: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const indexToDelete = comments.findIndex(
        comment => comment.postId === currentId.postId,
      );
      if (indexToDelete !== -1) {
        comments.splice(indexToDelete, 1);
      }
      Alert.alert('Comentário restaurado com sucesso');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Falha ao restaurar comentário');
    }
    finally {
      hideDeclineModal();
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
        const response = await api.get(`/v1/posts`, {
          params: { reported: true },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
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

  return (
    <View style={styles.safeArea}>
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
      <ScrollView Style={isLoading ? styles.loading : null}>
        {isLoading ? (
          <LoaderComponent accessibilityLabel="Carregando lista de comentários reportados" />
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={[
                styles.screen,
                {
                  borderBottomColor: colors.borderStrokeBlack,
                  borderBottomWidth: 1,
                  marginBottom: '3.5%',
                },
              ]}
            >
              <Text style={styles.mainText}>
                Gerenciar comentários reportados
              </Text>
              <Text style={styles.subText}>
                Aqui você pode optar por excluir comentários
              </Text>
            </View>
            <View style={styles.comments}>
              {comments.length ? (
                comments.map((comment, index) => (
                  <View key={index}>
                    <CommentComponent
                      comment={comment}
                      reported={true}
                      onAccept={(
                        postId,
                        userId,
                        userName,
                        content,
                        establishmentId,
                      ) => {
                        const commentData = {
                          postId,
                          userId,
                          userName,
                          content,
                          establishmentId,
                        };
                        setCurrentId(commentData);
                        showModal();
                      }}
                      onReject={(
                        postId,
                        userId,
                        userName,
                        content,
                        establishmentId,
                      ) => {
                        const commentData = {
                          postId,
                          userId,
                          userName,
                          content,
                          establishmentId,
                        };
                        setCurrentId(commentData);
                        showDeclineModal();
                      }}
                    />
                  </View>
                ))
              ) : (
                <View marginTop={'2%'}>
                  <Text style={styles.noCommentsText}>
                    {comments.length === 0
                      && 'Não há nenhum comentário reportado'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
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
          Excluir comentário
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Medium',
            fontSize: 16,
            color: colors.textBlack,
          }}
        >
          Ao excluir um comentário ele não poderá ser recuperado
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <ButtonComponent
            text="Excluir"
            onPress={() => {
              handleCommentDelete();
            }}
            customWidth={230}
            isBlue={true}
            accessibilityLabel="Excluir"
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

      <ModalBoxComponent
        visible={visibleDeclineModal}
        onDismiss={hideDeclineModal}
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
          Rejeitar denúncia
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Medium',
            fontSize: 16,
            color: colors.textBlack,
          }}
        >
          Rejeitar uma denúncia manterá o comentário visível aos usuários
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <ButtonComponent
            text="Rejeitar"
            onPress={() => {
              handleReportDeclined();
            }}
            customWidth={230}
            isBlue={true}
            accessibilityLabel="Rejeitar denúncia de comentário"
          />
        </View>
        <View>
          <ButtonComponent
            text="Cancelar"
            onPress={hideDeclineModal}
            customWidth={230}
            isBlue={false}
            accessibilityLabel="Cancelar"
          />
        </View>
      </ModalBoxComponent>
    </View>
  );
}

const styles = new StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },

  screen: {
    width: '90%',
  },

  mainText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 26,
    marginTop: '2%'
  },

  subText: {
    fontFamily: 'Oxygen-Light',
    fontSize: 18,
    width: '80%',
    paddingTop: '4%',
    paddingBottom: '3%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentsText: {
    textAlign: 'left',
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: colors.textBlack,
  },
  comments: {
    flex: 1,
    flexDirection: 'column',
    width: '86%',
  },
});
