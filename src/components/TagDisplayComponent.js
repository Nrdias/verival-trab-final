import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TagButton from './TagButton';
import fontlist from '../assets/fonts/fontlist';
import colors from '../constants/colors';

export default function TagDisplayComponent({ tagList = [] }) {

  function tagsMapper(id) {
    switch (id) {
      case '413d60b7-56a2-3b3b-bb9e-bd81b407b595':
        return <TagButton icon="wc" text="Banheiro adaptado" disabled={true} width='100%' />;
        break;

      case '87312432-9022-3e09-b0c2-5829a0ac7231':
        return <TagButton icon="directions-walk" text="Circulação interna" disabled={true} width='100%' />;
        break;

      case '4374510d-f70c-3079-9ebf-9f9b1669cfa0':
        return <TagButton icon="meeting-room" text="Entrada facilitada" disabled={true} width='100%' />;
        break;

      case 'ad7a9706-009a-3ccb-bff7-03bfd31d9fa6':
        return <TagButton icon="time-to-leave" text="Estacionamento" disabled={true} width='100%' />;
        break;

      case 'd017ea73-6622-36eb-b5af-396175b3a12c':
        return <TagButton icon="volume-up" text="Sinalização sonora" disabled={true} width='100%' />;
        break;

      case 'f215b2a9-31d9-385e-b29d-ad12d3291747':
        return <TagButton icon="visibility" text="Sinalização" disabled={true} width='100%' />;
        break;

      case '7d89e05d-9532-3a04-8815-6f3acae4f7de':
        return <TagButton icon="web" text="Site  acessível" disabled={true} width='100%' />;
        break;

      case '0a1788c0-82eb-3972-929b-eed7806425fe':
        return <TagButton icon="elevator" text="Elevador" disabled={true} width='100%' />;
        break;

      case 'b550e576-47ca-39ca-894a-81f3d1aa4108':
        return <TagButton icon="blind" text="Piso tátil" disabled={true} width='100%' />;
        break;

      case 'e391bc1b-7b8a-30f7-9d60-830db2f7f200':
        return <TagButton icon="casino" text="Textos em braile" disabled={true} width='100%' />;
        break;

      case '78a7e8cb-3b61-364c-b242-c8e81b03215c':
        return <TagButton icon="accessible" text="Rampas de acesso" disabled={true} width='100%' />;
        break;

      case 'a131e10a-168a-3782-81d0-4bf501c8f426':
        return <TagButton icon="table-bar" text="Móveis adaptados" disabled={true} width='100%' />;
        break;

      case 'e69d7f89-d3df-3738-b66c-c9c5a70f1948':
        return <TagButton icon="autism" text="Amigo autista" disabled={true} width='100%' />;
        break;

      case '00567fcf-b414-34bf-babd-04ce947a7527':
        return <TagButton icon="check-box" text="Serviço prioritário" disabled={true} width='100%' />;
        break;

      case '792812e7-f2e6-3ec6-b005-2f6c71d4d6cc':
        return <TagButton icon="sign-language" text="Intérprete de libras" disabled={true} width='100%' />;
        break;

      case '2c975c26-3e97-3af6-9452-3c91629dd49a':
        return <TagButton icon="chair-alt" text="Assento prioritário" disabled={true} width='100%' />;
        break;

      case '0fabe2c2-ecf8-3f88-8950-47c321749683':
        return <TagButton icon="people" text="Equipe qualificada" disabled={true} width='100%' />;
        break;

      case 'ffbd8d0d-ce77-354b-a526-de94db27fd58':
        return <TagButton icon="baby-changing-station" text="Fraldário" disabled={true} width='100%' />;
        break;

      case 'd71129a4-50b0-32f4-8826-800892819e64':
        return <TagButton icon="pets" text="Uso de cão guia" disabled={true} width='100%' />;
        break;

      case 'c6d2e8b5-8fe4-3708-83dc-ad0d93d24538':
        return <TagButton icon="child-friendly" text="Espaço descanso" disabled={true} width='100%' />;
        break;

      case '6ea71b2e-cf00-3ad4-a6ec-26e2324446dd':
        return <TagButton icon="elderly" text="Amigo idoso" disabled={true} width='100%' />;
        break;
    }
  }

  const midIndex = Math.ceil(tagList.length / 2);
  const column1 = tagList.slice(0, midIndex);
  const column2 = tagList.slice(midIndex);

  function renderColumn(tags) {
    return tags.map((id, index) => (
      <View style={styles.buttonLabel} key={index}>
        {tagsMapper(id)}
      </View>
    ));
  }

  return (
    <>
      {tagList.length > 0 ? (
        <>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.container}>
              <View style={styles.column}>{renderColumn(column1)}</View>
              <View style={styles.column}>{renderColumn(column2)}</View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.noTagsView}>
          <Text style={styles.text}>
            Nenhuma tag de acessibilidade definida para este estabelecimento
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  column: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: "48%",
    marginRight: "1%",
  },

  buttonLabel: {
    marginBottom: 5,
  },

  noTagsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  text: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlack,
    textAlign: 'center',
  },
});