/**
 * Componente de carrossel de imagens
 * 
 * @param data    Dados do carrosel passados como array de objetos {image: 'link', description: 'blabla'}
 * @example data    const images = [
 *   {image:  'https://picsum.photos/700', description: 'blabla'},
 *   {image:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiWZ-nSy0v_VPKQGDVcYh2-zNi666xMOvWlXXGKXplvA&s', description: 'blabla'},
 *   {image:  'https://example.com/image3.jpg', description: 'blabla'}
 *   ]; 
 * @example      <ImageCarouselComponent data={images}/>
 */

import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import RightCarouselButtonIcon from '../assets/icons/RightCarouselButtonIcon';
import LeftCarouselButtonIcon from '../assets/icons/LeftCarouselButtonIcon';

export default function ImageCarouselComponent({ data }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateX = new Animated.Value(0);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % data.length;
    setCurrentImageIndex(newIndex);
  };

  const previousImage = () => {
    const newIndex = (currentImageIndex - 1 + data.length) % data.length;
    setCurrentImageIndex(newIndex);
  };

  const gestureHandler = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true },
  );

  return (
    <View style={styles.container}>

      <Animated.View
        style={[styles.imageContainer, { transform: [{ translateX }] }]}
      >
        <Image
          source={{ uri: data[currentImageIndex].url }}
          style={styles.image}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={data[currentImageIndex].description}
        />
      </Animated.View>

      <View style={styles.buttonsContainer} accessible={false}>
        <TouchableOpacity
          onPress={previousImage}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Imagem anterior"
          style={styles.button}
        >
          <LeftCarouselButtonIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextImage}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Próxima imagem"
          style={styles.button}
        >
          <RightCarouselButtonIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '90%',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttons: {
    width: 50,
    height: 50,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
});
