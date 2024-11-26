import React from 'react';
import { render, fireEvent, waitFor, screen, act} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import EstablishmentRegistrationScreen from '../src/screens/EstablishmentRegistrationScreen';
import EstablishmentAddressScreen from '../src/screens/EstablishmentAddressScreen';
import EstablishmentTagsScreen from '../src/screens/EstablishmentTagsScreen';
import EstablishmentImgScreen from '../src/screens/EstablishmentImgScreen';
import api from '../src/apis/api';

const AppStack = createStackNavigator();

const TestNavigator = () => (
    <NavigationContainer>
        <AppStack.Navigator
            initialRouteName='HomeScreen'
        >
            <AppStack.Screen name="HomeScreen" component={HomeScreen} />
            <AppStack.Screen name="EstablishmentRegistrationScreen" component={EstablishmentRegistrationScreen} />
            <AppStack.Screen name="EstablishmentAddressScreen" component={EstablishmentAddressScreen} />
            <AppStack.Screen name="EstablishmentTagsScreen" component={EstablishmentTagsScreen} />
            <AppStack.Screen name="EstablishmentImgScreen" component={EstablishmentImgScreen} />
        </AppStack.Navigator>
    </NavigationContainer>
);

describe('Register New Establishment Integration Flow', () => {
    const fakeEstablishment = {
        id: '1',
        name: 'Test Academia',
        type: 'ACADEMIA',
        cnpj: '12345678901234',
        address: {
          street: 'Test Street',
          number: '123',
          neighborhood: 'Test Neighborhood',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345-678',
          latitude: -23.123456,
          longitude: -46.123456
        },
        phone: '11999999999',
        site: 'www.testacademia.com',
        totalLikes: 10,
        totalDislikes: 2,
        disabilities: ['VISUAL', 'PHYSICAL'],
        accessiblities: ['RAMP', 'ELEVATOR'],
        image: ['test-image-1.jpg', 'test-image-2.jpg'],
        latitude: -23.123456,
        longitude: -46.123456,
        status: 'APPROVED',
        createdByUser: '123'
    }

  beforeEach(() => {
    jest.clearAllMocks();

    api.post.mockImplementation((url, data) => {
      if (url === 'v1/auth/login') {
        return Promise.resolve({
          data: {
            token: 'fake-token',
            userId: '123',
            admin: false
          }
        });
      }
      if (url === 'v1/establishments') {
        return Promise.resolve({
          data: fakeEstablishment
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    api.get.mockImplementation((url) => {
      if (url.includes('v1/establishments')) {
        return Promise.resolve({
          data: [fakeEstablishment]
        });
      }
      if (url === 'v1/states') {
        return Promise.resolve({
          data: [
            { label: 'São Paulo', value: 'SP' },
            { label: 'Rio de Janeiro', value: 'RJ' }
          ]
        });
      }
      if (url.includes('v1/states/São Paulo/cities')) {
        return Promise.resolve({
          data: [
            { label: 'São Paulo', value: 'SAO_PAULO' },
            { label: 'Campinas', value: 'CAMPINAS' }
          ]
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });
  it('should allow user to navigate to register new establishment screen', async () => {
    render(<TestNavigator />);
    // const registerEstablishmentButton = await screen.findByText('Cadastrar um local');
    // expect(registerEstablishmentButton).toBeDefined();
    // await fireEvent.press(registerEstablishmentButton);

    // await waitFor(() => {
    //   expect(screen.getByText('Cadastre um local')).toBeTruthy();
    // });
    // const registerEstablishmentButton = await screen.findByText('Cadastrar um local');
    // expect(registerEstablishmentButton).toBeDefined();
    // await fireEvent.press(registerEstablishmentButton);

    // await waitFor(() => {
    //   expect(mockNavigation.navigate).toHaveBeenCalledWith('EstablishmentRegistrationScreen');
    // });
    
    // const establishmentNameInput = await screen.findByText('Nome do Estabelecimento');
    // const establishmentCnpjInput = await screen.findByText('CNPJ');
    // const establishmentTypeInput = await screen.findByText('Tipo de estabelecimento');
    // const establishmentPhoneInput = await screen.findByText('Telefone');
    // const establishmentSiteInput = await screen.findByText('Site');
    // const checkbox = await screen.findByText('Li e aceito os Termos de Uso');

    // expect(establishmentNameInput).toBeDefined();
    // expect(establishmentCnpjInput).toBeDefined();
    // expect(establishmentTypeInput).toBeDefined();
    // expect(establishmentPhoneInput).toBeDefined();
    // expect(establishmentSiteInput).toBeDefined();
    // expect(checkbox).toBeDefined();

    // fireEvent.changeText(establishmentNameInput, fakeEstablishment.name);
    // fireEvent.changeText(establishmentCnpjInput, fakeEstablishment.cnpj);
    // fireEvent.changeText(establishmentPhoneInput, fakeEstablishment.phone);
    // fireEvent.changeText(establishmentSiteInput, fakeEstablishment.site);
    // fireEvent.press(checkbox);

    // const nextAddresScreenButton = await screen.findByText('Próximo');
    // expect(nextAddresScreenButton).toBeDefined();
    // fireEvent.press(nextAddresScreenButton);

    // const establishmentAddressScreen = await screen.findByText('Cadastre um local');
    // expect(establishmentAddressScreen).toBeDefined();

    // const streetInput = await screen.findByPlaceholderText('Rua');
    // const neighborhoodInput = await screen.findByPlaceholderText('Bairro');
    // const stateInput = await screen.findByPlaceholderText('Estado');
    // const cityInput = await screen.findByPlaceholderText('Cidade');
    // const numberInput = await screen.findByPlaceholderText('Número');
    // const cepInput = await screen.findByPlaceholderText('CEP');
    // const complementInput = await screen.findByPlaceholderText('Complemento');

    // fireEvent.changeText(streetInput, fakeEstablishment.address.street);
    // fireEvent.changeText(neighborhoodInput, fakeEstablishment.address.neighborhood);
    // fireEvent.changeText(stateInput, fakeEstablishment.address.state);
    // fireEvent.changeText(cityInput, fakeEstablishment.address.city);
    // fireEvent.changeText(numberInput, fakeEstablishment.address.number);
    // fireEvent.changeText(cepInput, fakeEstablishment.address.zipCode);
    // fireEvent.changeText(complementInput, fakeEstablishment.address.additionalDetails);

    // const nextTagsScreenButton = await screen.findByText('Próximo');
    // expect(nextTagsScreenButton).toBeDefined();
    // fireEvent.press(nextTagsScreenButton);

    // const establishmentTagsScreen = await screen.findByText('Adicione tags');
    // const firstTag = await screen.findByText('Rampas de acesso"');
    // fireEvent.press(firstTag);

    // const nextImagesScreenButton = await screen.findByText('Próximo');
    // expect(nextImagesScreenButton).toBeDefined();
    // fireEvent.press(nextImagesScreenButton);

    // const establishmentImagesScreen = await screen.findByText('Adicione imagens');
    // expect(establishmentImagesScreen).toBeDefined();

    // const finishButton = await screen.findByText('Concluir');
    // expect(finishButton).toBeDefined();
    // fireEvent.press(finishButton);

    // expect(api.post).toHaveBeenCalledWith(
    //   'v1/establishments',
    //   expect.any(FormData),
    //   {
    //     headers: {
    //       Authorization: `Bearer fake-token`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     transformRequest: expect.any(Function)
    //   }
    // );
  });
});
