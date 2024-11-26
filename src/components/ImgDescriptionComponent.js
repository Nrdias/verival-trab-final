import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../constants/colors';

import TextBoxComponent from '../components/TextBoxComponent';
import { IconButton } from 'react-native-paper';

export default function ImgDescriptionComponent({
  placeholder,
  images,
  onImageChange,
  errors,
}) {
  const requestPermissions = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      if (permissionResult.canAskAgain) {
        Alert.alert(
          'Permissão Negada',
          'Permissão para acessar a biblioteca de mídia é necessária para anexar imagens.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Tentar Novamente', onPress: requestPermissions },
          ],
        );
      } else {
        Alert.alert(
          'Permissão Negada Permanentemente',
          'Permissão para acessar a biblioteca de mídia é necessária para anexar imagens.' +
            ' Por favor, altere as permissões nas configurações do aplicativo.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Abrir Configurações',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
      return false;
    }
    return true;
  };

  const uploadImage = async index => {
    const response = await requestPermissions();
    if (response) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.canceled) {
        const updatedItems = [...images];
        const selectedImage = pickerResult.assets[0];
        updatedItems[index] = {
          ...updatedItems[index],
          image: {
            uri: selectedImage.uri.toString(),
            size: selectedImage.fileSize,
            type: selectedImage.mimeType || 'image/jpeg',
            name: selectedImage.fileName || `image_${index}.jpg`,
          },
        };
        onImageChange(updatedItems);
      }
    }
  };

  const changeImage = index => {
    const updatedItems = [...images];
    updatedItems[index].image = null;
    onImageChange(updatedItems, index);
    uploadImage(index);
  };

  const handleDescription = (index, text) => {
    const updatedItems = [...images];
    updatedItems[index].description = text;
    onImageChange(updatedItems);
  };

  return (
    <View style={styles.container}>
      {images.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.rowContainer} accessibilityLabel={`Imagem ${index+1}`}>
            {item.image ? (
              <TouchableOpacity onPress={() => changeImage(index)}>
                <Image
                  style={styles.roundImage}
                  source={{ uri: item.image.uri }}
                  accessible={true}
                  accessibilityLabel="Imagem selecionada"
                />
              </TouchableOpacity>
            ) : (
              <IconButton
                accessibilityLabel="Clique para adicionar uma imagem"
                icon="camera"
                iconColor={errors[index] ? colors.error : colors.textBlack}
                style={{ marginRight: 10, margin: 0 }}
                size={80}
                onPress={() => uploadImage(index)}
              />
            )}
            <View style={{ maxWidth: '65%' }}>
              <TextBoxComponent
                accessibilityLabel={`Campo de texto para  a descrição da imagem ${index+1}`}
                placeholder={placeholder}
                sendText={text => handleDescription(index, text)}
                hint="Escreva aqui mais detalhes que descrevam a imagem"
                error={errors[index]}
                numberOfLines={3}
                minHeight={70}
                value={item.description} // Garantindo que a descrição seja exibida
              />
            </View>
          </View>
          {errors[index] && (
            <View style={{ minWidth: '85%', marginBottom: '3%' }}>
              <Text
                style={styles.errorText}
                accessibilityLiveRegion="polite"
                role="alert"
                accessibilityLabel={errors[index]}
              >
                {errors[index]}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '2%',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  roundImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 25,
  },

  errorText: {
    color: colors.error,
    textAlign: 'left',
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
  },
});
