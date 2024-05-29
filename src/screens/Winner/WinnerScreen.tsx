import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'
import RouteNames from '../../navigation/RouteNames'

const { width, height } = Dimensions.get('window')

const WinnerScreen: React.FC = ({ route }: any) => {
  const { winner } = route.params
  const navigation: any = useNavigation()

  const handleGoToHome = () => {
    navigation.navigate(RouteNames.Lobby)
  }

  useEffect(() => {
    const backAction = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/fireworks.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{winner} Wins!</Text>
        <Text style={styles.subTitle}>Congratulations!</Text>
      </View>
      <Pressable style={styles.button} onPress={handleGoToHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A20',
  },
  animation: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9720CF',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default WinnerScreen
