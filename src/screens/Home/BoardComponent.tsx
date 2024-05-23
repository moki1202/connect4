import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RouteNames from '../../navigation/RouteNames'

interface BoardComponentProps {
  imageSource: ImageSourcePropType
  title: string
  subTitle: string
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  skipText: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#c9c9c9',
    textAlign: 'center',
  },
})

const BoardComponent: React.FC<BoardComponentProps> = ({
  imageSource,
  title,
  subTitle,
}) => {
  const navigation: any = useNavigation()

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <Text
          style={styles.skipText}
          onPress={() => {
            navigation.navigate(RouteNames.Lobby)
          }}
        >
          Skip
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>
    </>
  )
}

export default BoardComponent
