// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormLogin from '../components/FormLogin';
import FormRegister from '../components/FormRegister';
import FormRegisterTeacher from '../components/FormRegisterTeacher';
import generar from '../app/Generar';
import escanear from '../app/Escanear';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={FormLogin} />
        <Stack.Screen name="RegisterScreen" component={FormRegister} />
        <Stack.Screen name="TeacherRegistration" component={FormRegisterTeacher} />
        <Stack.Screen name="GenerarQR" component={generar} />
        <Stack.Screen name="EscanearQR" component={escanear} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
