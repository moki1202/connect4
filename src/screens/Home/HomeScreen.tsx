import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from 'react-native'
import Swiper from 'react-native-swiper'
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
  const swiperRef = useRef<Swiper>(null)

  const navigation: any = useNavigation()

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index)
  }

  const handleNext = () => {
    navigation.navigate(RouteNames.Lobby)
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={handleIndexChange}
        index={currentIndex}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={{ bottom: 70 }}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <BoardComponent
              imageSource={item.imageUri}
              title={item.title}
              subTitle={item.subTitle}
            />
          </View>
        ))}
      </Swiper>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
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
