import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../../screens/Home/HomeScreen'
import RouteNames from '../RouteNames'
import LobbyScreen from '../../screens/Lobby/LobbyScreen'
import ProfileScreen from '../../screens/Profile/ProfileScreen'
import PreGameScreen from '../../screens/Game/PreGameScreen'
import GameScreen from '../../screens/Game/GameScreen'
import WinnerScreen from '../../screens/Winner/WinnerScreen'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteNames.Home} component={HomeScreen} />
      <Stack.Screen name={RouteNames.Lobby} component={LobbyScreen} />
      <Stack.Screen name={RouteNames.Profile} component={ProfileScreen} />
      <Stack.Screen name={RouteNames.PreGame} component={PreGameScreen} />
      <Stack.Screen name={RouteNames.Game} component={GameScreen} />
      <Stack.Screen name={RouteNames.Winner} component={WinnerScreen} />
    </Stack.Navigator>
  )
}

export default AppStack
