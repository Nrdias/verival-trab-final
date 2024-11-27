import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import ProfileScreen from '../src/screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  CommonActions: {
    reset: jest.fn(),
  },
  useNavigation: jest.fn(),
}));

jest.mock('../src/apis/api', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      name: 'Test User',
      profession: 'Developer',
    }
  }))
}));

jest.mock('../src/apis/api', () => ({
  get: jest.fn((url) => {
    if (url === `v1/users/mock-id`) {
      return Promise.resolve({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          birthdate: '1990-01-01',
          occupation: 'Developer',
          phone: '1234567890',
          description: 'Test description',
          disabilities: ['Visual', 'Auditiva']
        }
      });
    } else if (url === 'v1/admin/posts') {
      return Promise.resolve({
        data: {
          pending: false
        }
      });
    } else if (url === 'v1/admin/establishments') {
      return Promise.resolve({
        data: {
          pending: false
        }
      });
    }
    return Promise.reject(new Error('Not found'));
  }),
  delete: jest.fn()
}));

jest.mock('react-native-paper', () => ({
  Icon: 'Icon',
  Button: 'Button',
  Divider: 'Divider',
  TextInput: 'TextInput',
  Portal: 'Portal',
  Modal: 'Modal',
  Appbar: {
    Header: 'Appbar.Header',
    Action: 'Appbar.Action',
    Content: 'Appbar.Content'
  }
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

describe('ProfileScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    // Mock AsyncStorage
    jest.spyOn(AsyncStorage, 'getItem')
      .mockImplementation((key) => {
        switch(key) {
          case 'token': return Promise.resolve('mock-token');
          case 'id': return Promise.resolve('mock-id');
          case 'isAdmin': return Promise.resolve('false');
          default: return Promise.resolve(null);
        }
      });

    const { getByText } = render(<ProfileScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Profissão')).toBeVisible();
      expect(getByText('Test User')).toBeVisible();
      expect(getByText('Developer')).toBeVisible();
      expect(getByText('test@example.com')).toBeVisible();
    });
  });
});
