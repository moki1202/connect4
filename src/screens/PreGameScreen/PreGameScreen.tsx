import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import RouteNames from '../../navigation/RouteNames'

const PreGameScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const [player1Name, setPlayer1Name] = useState<string>('')
  const [player2Name, setPlayer2Name] = useState<string>('')

  const handle_start_game = () => {
    if (player1Name && player2Name) {
      navigation.navigate(RouteNames.Game, {
        player1Name,
        player2Name,
      })
    } else {
      alert('Please fill all the fields')
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Game Settings</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Player 1 Name'
          placeholderTextColor='#888'
          value={player1Name}
          onChangeText={setPlayer1Name}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Player 2 Name'
          placeholderTextColor='#888'
          value={player2Name}
          onChangeText={setPlayer2Name}
        />
      </View>
      <Pressable style={styles.button} onPress={handle_start_game}>
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#181A20',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: 'white',
    fontWeight: '700',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#21252E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    marginTop: 20,
    backgroundColor: '#9720CF',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default PreGameScreen
