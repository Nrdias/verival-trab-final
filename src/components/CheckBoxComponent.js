/**
 * Componente de CheckBox 
 *
 * @param isTermoDeUso         Se é um checkbox de Termo de Uso ou não, caso não seja, será a declaração de responsabilidade do local
 * @param checked              Estado do checkbox
 * @param onToggle             Função chamada ao clicar no checkbox
 * @param onPressTermosDeUso   Função chamada ao clicar no texto associado aos Termos de Uso
 *
 * @example                    const [isChecked, setIsChecked] = React.useState(false);
 *                             const checkState = (isChecked) => { setIsChecked(isChecked); }
 *                             <CheckBoxComponent
 *                                 isTermoDeUso={true}
 *                                 checked={isChecked}
 *                                 onToggle={checkState}
 *                                 onPressTermosDeUso={handlePressTermosDeUso}
 *                             />
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import colors from '../constants/colors';

export default function CheckBoxComponent({
  isTermoDeUso,
  checked,
  onToggle,
  onPressTermosDeUso,
}) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  const handlePressTermosDeUso = () => {
    if (onPressTermosDeUso) {
      onPressTermosDeUso();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessibilityLabel={
        isTermoDeUso
          ? 'Li e aceito os Termos de Uso'
          : 'Declaro ser o responsável por este local'
      }
      accessibilityHint={
        isTermoDeUso
          ? 'Clique aqui para aceitar os Termos de Uso'
          : 'Clique aqui para declarar que é o responsável por este local'
      }
    >
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxIcon}>
          <Checkbox.Android
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={handleToggle}
            importantForAccessibility='no'
            accessibilityState={{ checked: isChecked }}
            color={colors.blue}
            uncheckedColor={colors.borderStrokeBlack}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {isTermoDeUso ? (
            <>
              <Text style={styles.labelText}>Li e aceito os </Text>
              <TouchableOpacity
                onPress={handlePressTermosDeUso}
                accessibilityRole="button"
                accessibilityHint="Clique aqui para ler os Termos de Uso"
              >
                <Text style={styles.linkedText}>Termos de Uso</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.labelText}>
              {`Declaro ser o responsável por\neste local`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    minWidth: 282,
  },
  checkboxIcon: {
    transform: [{ scale: 1.5 }],
  },
  labelText: {
    fontFamily: 'Quicksand-Medium',
    marginLeft: 5,
    fontSize: 15,
    color: colors.textBlack,
  },
  linkedText: {
    fontSize: 15,
    color: colors.textBlue,
    textDecorationLine: 'none',
  },
});
