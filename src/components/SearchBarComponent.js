/**
 * @param onChangeText   Função de controle de mudança de texto
 * @param onSubmit       Função de controle de submit da entrada do usuário
 * @param value          valor da query do usuário (deve ser passada a variável de searchQuery aqui)
 *
 * @example <SearchBar onChangeText={onChangeText} onSubmit={onSubmit} value={searchQuery} ></SearchBar>
 */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, DefaultTheme } from 'react-native-paper';
import colors from '../constants/colors';

export default function SearchBarComponent({ onChangeText, value, onSubmit }) {
  return (
    <View
      accessibilityRole='search'
      accessibilityLabel="Pesquisar local"
      accessibilityHint="Pressione o botão de pesquisa para iniciar uma busca"
      importantForAccessibility='yes'>
      <Searchbar
        accessible={false}
        importantForAccessibility='no-hide-descendants'
        placeholder="Pesquisar local"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        value={value}
        iconColor={colors.backgroundScreen}
        placeholderTextColor={colors.textSearchBar}
        mode={'bar'}
        trailingIconColor={colors.textSearchBar}
        inputStyle={{
          color: colors.textSearchBar,
          fontFamily: 'Quicksand-Medium',
          fontSize: 17,
        }}
        style={styles.component}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.backgroundSearchBar,
    minWidth: '100%',
    minHeight: 50,
    fontSize: 50,
  },
});
