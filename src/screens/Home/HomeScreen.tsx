import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import BoardComponent from './BoardComponent'
import RouteNames from '../../navigation/RouteNames'

const data = [
  {
    imageUri: require('../../assets/onboarding.jpg'),
    title: 'Play Online with Friends',
    subTitle: 'Always on standby to play all the time together ',
  },
  {
    imageUri: require('../../assets/play-game.jpg'),
    title: 'Pro and Beautiful',
    subTitle: 'Playing while chatting live',
  },
  {
    imageUri: require('../../assets/try-hard.jpg'),
    title: 'Carried by Pro Players',
    subTitle: 'Always win and get lots of suprises in the game',
  },
]

const HomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState<ImageSourcePropType | null>(
    null
  )

  const navigation: any = useNavigation()

  useEffect(() => {
    setCurrentImage(data[currentIndex].imageUri)
  }, [currentIndex])

  const handle_next = () => {
    if (currentIndex === data.length - 1) {
      navigation.navigate(RouteNames.Lobby)
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length)
    }
  }

  const { title, subTitle } = data[currentIndex]

  return (
    <View style={styles.container}>
      {currentImage && (
        <BoardComponent
          imageSource={currentImage}
          title={title}
          subTitle={subTitle}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <Pressable style={styles.button} onPress={handle_next}>
          <Text style={styles.buttonText}>
            {currentIndex == 2 ? 'Start' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#9720CF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default HomeScreen
