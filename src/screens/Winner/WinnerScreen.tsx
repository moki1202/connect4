import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')

const WinnerScreen: React.FC = ({ route }: any) => {
  const { winner } = route.params

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
  },
})

export default WinnerScreen
