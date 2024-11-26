import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { SemBarreiras } from '../src/routes/router';

jest.mock('@react-navigation/stack', () => ({
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => <>{children}</>,
      Screen: ({ children }) => <>{children}</>,
    }),
}));

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
    getCurrentPositionAsync: jest.fn().mockResolvedValue({
      coords: {
        latitude: -23.123456,
        longitude: -46.123456,
      }
    }),
  }));

describe('Integration Test: Register New Establishment', () => {
  it('should navigate through the screens', async () => {
    // Render the actual router
    render(<SemBarreiras />);

    // Ensure we are on the initial screen
    const loginButton = await screen.findByText('Entrar'); // Adjust based on your initial screen
    expect(loginButton).toBeDefined();

    // Simulate navigation to HomeScreen
    fireEvent.press(loginButton);
    await waitFor(() => screen.findByText('Cadastrar um local'));

    // Navigate to EstablishmentRegistrationScreen
    const registerButton = screen.getByText('Cadastrar um local');
    fireEvent.press(registerButton);

    // Ensure navigation occurred
    await waitFor(() => {
      const registrationTitle = screen.getByText('Cadastre um local');
      expect(registrationTitle).toBeDefined();
    });

    // Continue interacting with fields in the registration screen
    const establishmentNameInput = screen.getByPlaceholderText('Nome do Estabelecimento*');
    fireEvent.changeText(establishmentNameInput, 'Test Establishment');
    const nextButton = screen.getByText('Próximo');
    fireEvent.press(nextButton);

    // Ensure navigation to address screen
    await waitFor(() => screen.getByText('Adicione seu endereço'));

    const streetInput = screen.getByPlaceholderText('Rua*');
    fireEvent.changeText(streetInput, 'Test Street');
    fireEvent.press(screen.getByText('Próximo'));

    // Continue testing the flow through each screen
  });
});
