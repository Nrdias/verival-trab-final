/**
 * @param startValue          label e value do item caso já tenha um valor selecionado anteriormente
 * @param options             Array de objetos com label e value
 * @param placeholder         Texto inicial
 * @param width               Largura do componente (botão pai)
 * @param menuWidth           Largura do menu suspenso
 * @param errorMessage        Mensagem de erro a ser passada
 * @param onChange            Função de callback que retorna o label e o value do item selecionado
 * @param maxHeight           Altura máxima do menu de opções ao expandir
 * 
 * @example                  <SelectDropdownComponent placeholder={"Tipo de estabelecimento"} options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }, { label: 'Option 3', value: '3' }]} width={200} errorMessage={""} onChange={console.log("Hello, World")} />
 */

import * as React from 'react';
import { Menu, Button } from 'react-native-paper';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import colors from '../constants/colors';

export default function SelectDropdownComponent({
  startValue,
  options,
  placeholder,
  width,
  menuWidth,
  errorMessage = '',
  onChange,
  maxHeight = 200
}) {
  const [error, setError] = React.useState(errorMessage);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(startValue != undefined ? startValue.value : placeholder);

  React.useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const openMenu = () => {
    setVisible(true);
    setError('');
  };
  const closeMenu = () => setVisible(false);

  const selectOption = (value) => {
    setSelected(value);
    closeMenu();
    onChange(value);
  };

  return (
    <>
      <View style={[
        styles.view,
        width ? { width: width } : { width: menuWidth },
        error ? { borderColor: colors.error } : { borderColor: colors.borderStrokeBlack }
      ]}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={[styles.menu, { width: menuWidth, maxHeight: maxHeight }]}
          elevation={0}
          statusBarHeight={50}
          anchor={
            <Button
              icon="menu-down"
              onPress={openMenu}
              labelStyle={error ? styles.textErrorStyles : styles.textStyles}
              style={styles.menuAnchor}
              contentStyle={styles.anchorContent}
              accessibilityLabel={startValue != undefined ? `Campo ${placeholder}, valor ${startValue.value} detectado` : `${placeholder}`}
              accessibilityHint={'Clique para expandir o menu de opções'}
            >
              {selected}
            </Button>
          }
        >
          <ScrollView style={{ maxHeight: maxHeight }}>
            {
              options.map((option, index) => (
                <Menu.Item
                  key={index}
                  titleStyle={styles.textStyles}
                  style={styles.menuTile}
                  contentStyle={{ paddingLeft: 2, paddingRight: 2, justifyContent: 'center', width: '100%' }}
                  onPress={() => { selectOption(option.label); onChange(option); }}
                  title={option.label}
                />
              ))
            }
          </ScrollView>
        </Menu>
      </View>
      {error &&
        <View style={{ justifyContent: 'right', width: menuWidth }}
          accessibilityLabelledBy={placeholder}
          accessibilityLabel={`Erro no campo ${placeholder}. ${error}`}
          accessibilityLiveRegion="polite">
          <Text style={styles.errorMessage}>{error}</Text>
        </View>}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
    padding: 0,
    height: 50,
    borderRadius: 5,
    borderColor: colors.borderStrokeBlack,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  menu: {
    marginTop: 0,
    alignSelf: 'flex-start',
    //marginLeft: '1%', // Avaliar se sem alinha a caixa da lista de opções
    marginRight: '1%',
    width: '1%',
    alignItems: 'flex-end',
    backgroundColor: colors.backgroundScreen,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuAnchor: {
    backgroundColor: colors.backgroundScreen,
    borderColor: colors.borderStrokeBlack,
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  anchorContent: {
    backgroundColor: colors.backgroundScreen,
    borderColor: colors.borderStrokeBlack,
    paddingLeft: 2,
    paddingRight: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  menuTile: {
    height: 50,
    minWidth: '100%',
    justifyContent: 'center',
  },
  errorMessage: {
    color: colors.error,
    fontSize: 15,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'left'
  },
  textStyles: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: colors.textBlack
  },

  textErrorStyles: {
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: colors.error
  },
});
