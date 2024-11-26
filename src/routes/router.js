/**
 * Componente principal de rotas para todas as telas da aplicação
 *
 * @example          <SemBarreiras/>
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpBasicInfoScreen from '../screens/SignUpBasicInfoScreen.js';
import SignUpAdditionalInfoScreen from '../screens/SignUpAdditionalInfoScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import UpdateBasicInfoScreen from '../screens/UpdateBasicInfoScreen.js';
import UpdateAdditionalInfoScreen from '../screens/UpdateAdditionalInfoScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import EstablishmentScreen from '../screens/EstablishmentScreen.js';
import AdminEstablishmentScreen from '../screens/AdminEstablishmentScreen.js';
import AdminEstablishmentsToApproveScreen from '../screens/AdminEstablishmentsToApproveScreen.js';
import EstablishmentFilterScreen from '../screens/EstablishmentFilterScreen.js';
import EstablishmentRegistrationScreen from '../screens/EstablishmentRegistrationScreen.js';
import EstablishmentTagsScreen from '../screens/EstablishmentTagsScreen.js';
import EstablishmentImgScreen from '../screens/EstablishmentImgScreen.js';
import EstablishmentsUserScreen from '../screens/EstablishmentsUserScreen.js';
import EstablishmentRatingScreen from '../screens/EstablishmentRatingScreen.js';
import EstablishmentAddressScreen from '../screens/EstablishmentAddressScreen.js';
import UpdateEstablishmentRegistrationScreen from '../screens/UpdateEstablishmentRegistrationScreen.js';
import UpdateEstablishmentAddressScreen from '../screens/UpdateEstablishmentAddressScreen.js';
import UpdateEstablishmentTagScreen from '../screens/UpdateEstablishmentTagScreen.js';
import UpdateEstablishmentImgScreen from '../screens/UpdateEstablishmentImgScreen.js';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen.js';
import EstablishmentCommentsScreen from '../screens/EstablishmentCommentsScreen.js';
import GoogleSignUpBasicInfoScreen from '../screens/GoogleSignUpBasicInfoScreen.js';
import AdminCommentaryAvaliationScreen from '../screens/AdminCommentaryAvaliationScreen.js'

const AppStack = createStackNavigator();

export function SemBarreiras() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LoginScreen"
      >
        <AppStack.Screen name="LoginScreen" component={LoginScreen} />
        <AppStack.Screen name="SignUpBasicInfoScreen" component={SignUpBasicInfoScreen} />
        <AppStack.Screen name="SignUpAdditionalInfoScreen" component={SignUpAdditionalInfoScreen} />
        <AppStack.Screen name="HomeScreen" component={HomeScreen} />
        <AppStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <AppStack.Screen name="EstablishmentFilterScreen" component={EstablishmentFilterScreen} />
        <AppStack.Screen name="UpdateBasicInfoScreen" component={UpdateBasicInfoScreen} />
        <AppStack.Screen name="UpdateAdditionalInfoScreen" component={UpdateAdditionalInfoScreen} />
        <AppStack.Screen name="AdminEstablishmentsToApproveScreen" component={AdminEstablishmentsToApproveScreen} />
        <AppStack.Screen name="AdminEstablishmentScreen" component={AdminEstablishmentScreen} />
        <AppStack.Screen name="EstablishmentScreen" component={EstablishmentScreen} />
        <AppStack.Screen name="EstablishmentRegistrationScreen" component={EstablishmentRegistrationScreen} />
        <AppStack.Screen name="EstablishmentAddressScreen" component={EstablishmentAddressScreen} />
        <AppStack.Screen name="EstablishmentTagsScreen" component={EstablishmentTagsScreen} />
        <AppStack.Screen name="EstablishmentImgScreen" component={EstablishmentImgScreen} />
        <AppStack.Screen name="EstablishmentsUserScreen" component={EstablishmentsUserScreen} />
        <AppStack.Screen name="EstablishmentRatingScreen" component={EstablishmentRatingScreen} />
        <AppStack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
        <AppStack.Screen name="EstablishmentCommentsScreen" component={EstablishmentCommentsScreen} />
        <AppStack.Screen name="GoogleSignUpBasicInfoScreen" component={GoogleSignUpBasicInfoScreen} />
        <AppStack.Screen name="AdminCommentaryAvaliationScreen" component={AdminCommentaryAvaliationScreen} />
        <AppStack.Screen name="UpdateEstablishmentRegistrationScreen" component={UpdateEstablishmentRegistrationScreen} />
        <AppStack.Screen name="UpdateEstablishmentAddressScreen" component={UpdateEstablishmentAddressScreen} />
        <AppStack.Screen name="UpdateEstablishmentTagScreen" component={UpdateEstablishmentTagScreen} />
        <AppStack.Screen name="UpdateEstablishmentImgScreen" component={UpdateEstablishmentImgScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
