import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/Login/loginScreen'
import SignUpScreen from '../../screens/SignUp/signupScreen'
import RouteNames from '../RouteNames'

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={RouteNames.Signup} component={SignUpScreen} />
      <AuthStack.Screen name={RouteNames.Login} component={LoginScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator
