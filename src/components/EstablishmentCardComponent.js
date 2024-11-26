/**
 * Componente que cria um card que mostra as informações de um estabelecimento
 *
 *
 *
 * @example          <EstablishmentCardComponent />
 */

import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import TotalLikesIcon from '../assets/icons/TotalLikesIcon.js';
import MotorIcon from '../assets/icons/MotorIcon.js';
import AuditoryIcon from '../assets/icons/AudirotyIcon.js';
import VisualIcon from '../assets/icons/VisualIcon.js';
import CognitiveIcon from '../assets/icons/CognitiveIcon.js';
import { fonts } from '../assets/fonts/fontlist.js';
import colors from '../constants/colors.js';

function renderDisabilityIcons(disability) {
  if (disability == 'Visual')
    return <VisualIcon width={28} height={28} accessibilityLabel="Tag de acessibilidade visual" />;
  if (disability == 'Motora')
    return <MotorIcon width={30} height={30} accessibilityLabel="Tag de acessibilidade motora" />;
  if (disability == 'Auditiva')
    return <AuditoryIcon width={28} height={28} accessibilityLabel="Tag de acessibilidade auditiva" />;
  if (disability == 'Cognitiva')
    return <CognitiveIcon width={30} height={30} accessibilityLabel="Tag de acessibilidade cognitiva" />
};

export default function EstablishmentCardComponent({ data, onClick }) {
  const { id, name = 'Unknown', type = 'Unknown', totalLikes = 0, disabilities = [], image = {} } = data;

  if(!data || data === undefined) return null;

  return (
    <Card contentStyle={{ flexDirection: 'row' }} style={styles.cardContainer}>
      <Card.Cover
        source={{ uri: data.image.url}}
        importantForAccessibility='no'
        style={styles.imageContainer}
      />
      <Card.Content style={styles.bodyContainer}>
        <Card.Content style={styles.copyContainer}>
          <Text
            style={{ fontFamily: 'Oxygen-Bold', color: colors.textBlack }}
            accessibilityLabel={`${data.name}`}
            numberOfLines={1}
            ellipsizeMode="tail"
            variant="titleLarge"
          >
            {data.name}
          </Text>
          <Text
            accessibilityLabel={`Sua categoria de estabelecimento é ${data.type}`}
            variant="bodyMedium"
            style={{ fontFamily: 'Quicksand-SemiBold', color: colors.textBlack }}
          >
            {data.type}
          </Text>
        </Card.Content>
        <Card.Content style={styles.fillContainer}>
          <Card.Content style={styles.disabilityIconsContainer}>
            <View style={styles.disabilitiesLike}>
              {disabilities &&
                disabilities.map((disability, index) => (
                  <View paddingRight={5} justifyContent="center" key={index}>
                    {renderDisabilityIcons(disability)}
                  </View>
                ))}
              <View style={styles.likesContainer}>
                <TotalLikesIcon />
                <Text
                  accessibilityLabel={
                    `Esse estabelecimento possui acessibilidades para pessoas portadoras de deficiência ${data.disabilities}.
                    Número de avaliações positivas é igual a ${data.totalLikes}.
                    A descrição de sua imagem é ${data.image.description}`
                  }
                  style={{ color: colors.textBlue, fontFamily: 'Oxygen-Bold' }}
                  variant="bodyMedium"
                >
                  {data.totalLikes}
                </Text>
              </View>
            </View>
          </Card.Content>
          <Card.Content style={styles.buttonContainer}>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={{ height: 40, justifyContent: 'center' }}
                accessibilityLabel="Ver mais informações do estabelecimento"
                accessibilityHint="Redireciona para tela de informações do estabelecimento."
                onPress={() => { onClick(id); }}
              >
                <Text
                  style={{
                    fontFamily: 'Oxygen-Bold',
                    fontSize: 15,
                    color: colors.textBlue,
                    textDecorationLine: 'underline',
                  }}
                >
                  Saiba mais
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: colors.backgroundCardEstablisment,
    height: 130,
  },
  imageContainer: {
    width: '40%',
    height: 130
  },
  bodyContainer: {
    flex: 1,
    borderRadius: 16,
  },
  copyContainer: {
    marginLeft: -16,
    marginRight: -16,
    marginTop: 4,
    flexDirection: 'column',
  },
  fillContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: -16,
  },
  disabilityIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: -16,
    marginRight: -16,
  },
  disabilitiesLike: {
    flexDirection: 'row',
    paddingTop: 55,
  },
  likesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '5%',
  },

  buttonContainer: {
    marginLeft: -16,
    marginBottom: -15,
  },
  bottomContainer: {
    flexDirection: 'row',
  },
});
