/**
 * Componente de Modal Box
 * @param children                Componentes filhos do modal
 * @param width                   Tamanho do modal        
 * @param height                  Altura do modal
 * @param visible                 Visibilidade do modal
 * @param onDismiss               Callback para fechar o modal
 * @example                       <ModalBoxComponent visible={visible} onDismiss={hideModal} width={200} height={200}> <Text>Confirma?</Text> <Button title="Sim" onPress={hideModal} /> <Button title="Não" onPress={hideModal} /> </ModalBoxComponent>
 */
import * as React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View, StyleSheet, } from 'react-native';
import colors from '../constants/colors';

export default function ModalBoxComponent(
  {
    children,
    width,
    height,
    visible,
    onDismiss,
  }
) {
  return (
    <Portal>
      <Modal
        overlayAccessibilityLabel='Clique fora da caixa de confirmação para fechá-la'
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modalStyle, { width: width, height: height }]}
      >
        <View style={[styles.textContent]} >
          {children[0]}
          {children[1]}
        </View>
        <View style={styles.buttonContent}>
          {children[2]}
          {children[3]}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: colors.backgroundScreen,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  modalContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonStyle: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: 49,
    height: 49,
    position: 'absolute',
  },
  textContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 25,
    color: colors.textBlack,
  },
  buttonContent: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
