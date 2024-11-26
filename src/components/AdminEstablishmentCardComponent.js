/**
 * Componente que cria um card que mostra as informações de um estabelecimento e seu status de aprovaçao
 *
 *
 *
 * @example AdminEstablishmentCardConponent data={object} status={'APPROVED'} />
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

function statusBarColor(status) {
  if (status == 'APPROVED') return colors.approvedEstablisment;
  if (status == 'PENDING') return colors.pendingEstablisment;
  if (status == 'DENIED') return colors.deniedEstablisment;
}

function statusBarAccessibilityLabel(status) {
  if (status == 'APPROVED') return 'Aprovado';
  if (status == 'PENDING') return 'Pendente';
  if (status == 'DENIED') return 'Negado';
}

export default function EstablishmentCardComponent({ data, onClick }) {
  const { id, name, type, totalLikes, disabilities, image, status } = data;

  return (
    <Card
      contentStyle={{ flexDirection: 'row' }}
      style={styles.cardContainer}
      accessibilityLabel={
        `${data.name} é um estabelecimento do tipo ${data.type}.
        Esse estabelecimento possui acessibilidades para pessoas portadoras de deficiência ${data.disabilities}. 
        Número de avaliações positivas é igual a ${data.totalLikes}.
        A descrição de sua imagem é ${data.image.description}`
      }
    >
      <Card.Cover
        source={{ uri: data.image.url }}
        style={styles.imageContainer}
        importantForAccessibility='no'
      />
      <View style={styles.contentContainer}>
        <View style={styles.copyContainer}>
          <Text
            style={{ fontFamily: 'Oxygen-Bold' }}
            numberOfLines={1}
            ellipsizeMode="tail"
            variant="titleLarge"
          >
            {data.name}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ fontFamily: 'Oxygen-Bold' }}
          >
            {data.type}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.disabilityContainer}>
            {disabilities &&
              disabilities.map((disability, index) => (
                <View paddingRight={5} justifyContent="center" key={index}>
                  {renderDisabilityIcons(disability)}
                </View>
              ))}
          </View>
          <View style={styles.likesContainer}>
            {status == 'APPROVED' &&
              (
                <View style={styles.likesContainer}>
                  <TotalLikesIcon />
                  <Text
                    style={{
                      color: colors.textBlue,
                      fontFamily: 'Oxygen-Bold',
                    }}
                    variant="bodyMedium"
                  >
                    {data.totalLikes}
                  </Text>
                </View>
              )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          accessibilityLabel="Ver mais informações do estabelecimento"
          accessibilityHint="Redireciona para tela de informações do estabelecimento."
          onPress={() => { onClick(id); }}
        >
          <Text style={styles.buttonText}>Saiba mais</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.statusSidebarContainer}
        backgroundColor={statusBarColor(data.status)}
        accessibilityLabel={`Status de aprovação do estabelecimento: ${statusBarAccessibilityLabel(data.status)}`}
      ></View>
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
  contentContainer: {
    flex: 1,
    marginLeft: 16
  },
  copyContainer: {
    marginTop: 4,
    flexDirection: 'column'
  },
  iconsContainer: {
    flexDirection: 'row'
  },
  disabilityContainer: {
    flexDirection: 'row',
    paddingBottom: 6
  },
  likesContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1
  },
  buttonContainer: {
    height: 40,
    maxWidth: 80,
    justifyContent: 'center',
    marginTop: -8,
  },
  buttonText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 15,
    color: colors.textBlue,
    textDecorationLine: 'underline',
  },
  statusSidebarContainer: {
    minWidth: '3%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
