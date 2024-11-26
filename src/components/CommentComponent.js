/**
 * @param comment      Define o objeto a ser passado pro componente
 * @param reported     Determina o estilo para comentário reportado ou não (troca botões)
 * @param onReport     callback chamado quando o usuário clica no botão de Denunciar
 * @param onAccept     callback chamado quando o admin clica no botão de Aprovar denúncia
 * @param onReject     callback chamado quando o admin clica no botão de Rejeitar denúncia
 * 
 * @example            const comment = {
 *                      userName: 'anonimo',
 *                      rating: 'L',
 *                      date: '02/02/2002',
 *                      content: 'Blablabla'
 *                     }
 *                 <CommentComponent comment={comment} reported={false} onReport={function} />
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import WarningRedIcon from '../../src/assets/icons/WarningRedIcon.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors';
import fontlist from '../assets/fonts/fontlist';
import AcceptIcon from '../assets/icons/AcceptIcon.js';
import RejectIcon from '../assets/icons/RejectIcon.js';

export default function CommentComponent({
  reported = false,
  comment,
  onReport,
  onAccept,
  onReject
}) {
  const { postId, userId, userName, content, rating, date, establishmentId } = comment;
  const isAccessible = rating === 'L' ? true : false; // true para "Achou acessível", false para "Não achou acessível"
  const accessibilityText = isAccessible
    ? 'Achou acessível'
    : 'Não achou acessível';
  const iconName = isAccessible ? 'thumb-up' : 'thumb-down';
  const iconTextColor = isAccessible ? colors.blue : colors.backgroundSearchBar; // Definindo a cor do texto e do icone

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Image
          source={require('../assets/imgs/Avatar.png')}
          style={styles.avatar}
          importantForAccessibility='no'
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userName}
              </Text>
              <Text
                style={styles.date}
                accessibilityLabel={`Data de publicação: ${date}`}
              >
                {date}
              </Text>
            </View>
            <View
              style={styles.likeContainer}
              accessibilityLabel={`Avaliação: ${accessibilityText}`}
            >
              <Text style={[styles.likeText, { color: iconTextColor }]}>
                {accessibilityText}
              </Text>
              <Icon name={iconName} size={20} color={iconTextColor} />
            </View>
          </View>
        </View>
      </View>
      <View accessibilityLabel={`Comentário: ${content}`}>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {content}
        </Text>
      </View>
      {reported ?
        (
          <View style={[styles.report, { columnGap: 10 }]}>
            <TouchableOpacity
              accessibilityLabel='Aprovar denúncia'
              onPress={() => {
                onAccept(postId, userId, userName, content, establishmentId);
              }}>
              <AcceptIcon />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel='Rejeitar denúncia'
              onPress={() => {
                onReject(postId, userId, userName, content, establishmentId);
              }}>
              <RejectIcon />
            </TouchableOpacity>
          </View>
        )
        :
        (
          <TouchableOpacity
            accessibilityLabel='Denunciar comentário'
            accessibilityHint='Envia comentário para avaliação dos administradores.'
            style={styles.report}
            onPress={() => {
              onReport(postId, userId, userName, content, establishmentId);
            }}>
            <WarningRedIcon />
            <Text style={styles.reportText} importantForAccessibility='no'>
              Denunciar
            </Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '2%',
  },

  containerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  avatar: {
    width: '13%',
    height: '71%',
    borderRadius: 19,
    marginTop: '6%',
  },

  content: {
    marginLeft: 10,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userInfo: {
    maxWidth: '40%',
    flexDirection: 'column',
    marginTop: '7%',
  },

  userName: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 16,
    textAlign: 'left',
    color: colors.textBlack,
  },

  date: {
    color: colors.textBlack,
    fontSize: 12,
    fontFamily: 'Oxygen-Regular',
    lineHeight: 15,
    marginTop: '2%',
  },

  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  likeText: {
    fontSize: 15,
    fontFamily: 'Oxygen-Bold',
    lineHeight: 17.68,
    marginRight: '4%',
  },

  text: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    lineHeight: 17.68,
    textAlign: 'left',
    color: colors.textBlack,
    marginTop: '4%',
  },

  report: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 5
  },

  reportText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 14,
    paddingTop: '1%',
    color: colors.error,
  }
});
