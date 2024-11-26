import 'react-native-gesture-handler/jestSetup';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-constants', () => ({
  manifest: { extra: { key: 'value' } },
}));

jest.mock('react-native/Libraries/Animated/Easing', () => ({
  ease: jest.fn(),
  linear: jest.fn(),
  bezier: jest.fn(),
}));

AsyncStorage.getItem.mockImplementation((key) => {
  if (key === 'token') return Promise.resolve('fake-token');
  if (key === 'id') return Promise.resolve('123');
  return Promise.resolve(null);
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ cancelled: false, uri: 'test-image-uri' })),
  launchCameraAsync: jest.fn(() => Promise.resolve({ cancelled: false, uri: 'test-camera-uri' })),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn().mockReturnValue({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}));

jest.mock('./src/apis/api.js', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  
  const Card = ({ children, style, contentStyle, testID }) => 
    React.createElement('view', { style, testID }, children);
  
  Card.Content = ({ children, style }) => 
    React.createElement('view', { style }, children);
  Card.Cover = ({ source, style }) => 
    React.createElement('view', { source, style });

  return {
    Appbar: {
      Header: ({ children }) => React.createElement('view', null, children),
      Action: ({ children }) => React.createElement('view', null, children),
    },
    Searchbar: ({ children }) => React.createElement('view', null, children),
    Portal: ({ children }) => React.createElement('view', null, children),
    Modal: ({ children }) => React.createElement('view', null, children),
    Card,
    Text: ({ children }) => React.createElement('text', null, children),
  };
});

jest.mock('expo-web-browser', () => ({
  maybeCompleteAuthSession: jest.fn(),
  openAuthSessionAsync: jest.fn(),
  warmUpAsync: jest.fn(),
  coolDownAsync: jest.fn(),
}));

jest.mock('@clerk/clerk-expo', () => ({
  useOAuth: () => ({
    startOAuthFlow: jest.fn(),
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: false,
  }),
  useUser: () => ({
    user: null,
    isLoaded: true,
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn((x) => x),
    Directions: {},
    TouchableOpacity: View,
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: {
      latitude: -23.123456,
      longitude: -46.123456,
    }
  }),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
