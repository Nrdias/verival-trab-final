import React from 'react';
import { SemBarreiras } from './src/routes/router';
import * as Font from 'expo-font';
import fonts from './src/assets/fonts/fontlist';
import { PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  getToken: (key) => SecureStore.getItemAsync(key),
  saveToken: (key, value) => SecureStore.setItemAsync(key, value),
};

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts(fonts);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={"pk_live_Y2xlcmsuc2VtYmFycmVpcmFzLm1lJA"}
      tokenCache={tokenCache}
    >
      <PaperProvider onLayout={onLayoutRootView} theme={{ dark: false }}>
        <SemBarreiras />
      </PaperProvider>
    </ClerkProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
