/**
 * @author               Bianca Alves @bianca.alves
 * @param leftPress      callback chamado quando as opções 'Sair' ou 'Voltar' do header são selecionadas
 * @param middlePress    callback chamado quando a opção 'Menu' do header é selecionado
 * @param rightPress     callback chamado quando a opção 'Profile' do header é selecionada
 * @param isHomePage     informa se o header é com a estilização para a home page (opcional)
 * @param isProfilePage  informa se o header é com a estilização para a profile page (opcional)
 * > !! Necessário informar nas telas HomeScreen e ProfileScreen para a estilização funcionar corretamente 
 * @example              <HeaderComponent isHomePage leftPress={() => function call modal} rightPress={() => navigation.navigate('ProfileScreen')}/>
 * @example              <HeaderComponent isProfilePage leftPress={() => navigation.goBack()} middlePress={() => navigation.navigate('HomeScreen')}/>
 * @example              <View style={styles.container}>
 *                        <HeaderComponent />
 *                         ...
 *                         Screen content here
 *                         ...
 *                       </View>
 *                       const styles = StyleSheet.create({
 *                       container: {
 *                       flex: 1,
 *                       flexDirection: 'column',
 *                       },
 *                       screen: {
 *                       flex: 1,
 *                       backgroundColor: colors.backgroundScreen,
 *                       alignItems: 'center',
 *                       justifyContent: 'center',
 *                       },
 */


import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import colors from '../constants/colors';
import { fonts } from '../assets/fonts/fontlist';

export default function HeaderComponent({
  isHomePage = false,
  isProfilePage = false,
  leftPress,
  rightPress,
  middlePress,
}) {
  const [selectedButton, setSelectedButton] = React.useState(null);

  // Controla qual renderização de botão será feita
  let defineButton = '';
  if (isHomePage) defineButton = 'logout-variant';
  else defineButton = 'arrow-left';


  const handlePress = (button) => {
    setSelectedButton(button);

    if (button === 'home' && middlePress) middlePress();
    else if (button === 'profile' && rightPress) rightPress();
    else if (button === defineButton && leftPress) leftPress();
  }

  return (
    <Appbar.Header mode='center-aligned' style={styles.container}>
      <View style={styles.buttonContainer}
        accessibilityLabel={`${isHomePage ? 'Sair do aplicativo' : 'Navegar para tela anterior'}`}>
        <Appbar.Action style={styles.button}
          icon={defineButton}
          size={40}
          color={colors.textBlack}
          onPress={() => handlePress(defineButton)} />
        <Text style={[styles.text, selectedButton === defineButton]}
          importantForAccessibility='no-hide-descendants'>
          {isHomePage ? 'Sair' : 'Voltar'}
        </Text>
      </View>

      <View style={styles.buttonContainer}
        accessibilityLabel='Navegar para Página Inicial'>
        <Appbar.Action style={styles.button}
          icon='home'
          size={40}
          color={isHomePage ? colors.blue : colors.textBlack}
          onPress={() => handlePress('home')} />
        <Text style={[styles.text, isHomePage && styles.selectedText]}
          importantForAccessibility='no-hide-descendants'>
          Home
        </Text>
      </View>

      <View style={styles.buttonContainer}
        accessibilityLabel='Navegar para Perfil'>
        <Appbar.Action style={styles.button}
          icon='account'
          size={40}
          color={isProfilePage ? colors.blue : colors.textBlack}
          onPress={() => handlePress('profile')} />
        <Text style={[styles.text, isProfilePage && styles.selectedText]}
          importantForAccessibility='no-hide-descendants'>
          Perfil
        </Text>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '1%',
    width: '100%',
    height: 100,
    backgroundColor: colors.backgroundScreen,
  },

  buttonContainer: {
    margin: 0,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: 0,
    padding: 0,
  },
  text: {
    margin: 0,
    fontSize: 16,
    fontFamily: 'Oxygen-Bold',
    color: colors.textBlack,
  },
  selectedText: {
    color: colors.textBlue,
  },
});
