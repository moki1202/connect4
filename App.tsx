import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import AuthNavigator from './src/navigation/Stack/AuthStack'
import AppStack from './src/navigation/Stack/AppStack'
import { useAuthStore } from './src/store/zustand/AuthStore'

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar style='dark' />
          <NavigationContainer>
            {isAuthenticated ? <AppStack /> : <AuthNavigator />}
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
