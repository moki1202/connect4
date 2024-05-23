import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import RouteNames from '../../navigation/RouteNames'
import useInGameNameStore from '../../store/zustand/store'

const LobbyScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  const { inGameName, loadInGameName } = useInGameNameStore()

  useEffect(() => {
    loadInGameName()
  }, [loadInGameName])

  const handle_play_press = () => {
    navigation.navigate(RouteNames.PreGame)
  }

  const handle_profile_press = () => {
    navigation.navigate(RouteNames.Profile)
  }

  const handle_view_rules_press = () => {
    setModalVisible(true)
  }

  const handle_close_modal = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handle_profile_press} style={styles.profileContainer}>
        <Image
          source={require('../../assets/try-hard.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.inGameName}>{inGameName}</Text>
      </Pressable>
      <Text style={styles.title}>Connect 4</Text>
      <Image
        source={require('../../assets/game-icon.png')}
        style={styles.image}
      />
      <Pressable onPress={handle_play_press} style={styles.playButton}>
        <Image
          source={require('../../assets/play-button.png')}
          height={100}
          width={100}
        />
      </Pressable>
      <Pressable style={styles.profileButton} onPress={handle_view_rules_press}>
        <Text style={styles.profileButtonText}>View Rules</Text>
      </Pressable>

      <Modal
        transparent={true}
        animationType='slide'
        visible={modalVisible}
        onRequestClose={handle_close_modal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Game Rules</Text>
              </View>
              <View style={styles.ruleContainer}>
                <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                <Text style={styles.modalText}>
                  Connect 4 is a two-player game where players take turns
                  dropping colored discs into a grid.
                </Text>
              </View>
              <View style={styles.ruleContainer}>
                <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                <Text style={styles.modalText}>
                  The goal is to connect four discs in a row vertically,
                  horizontally, or diagonally.
                </Text>
              </View>
              <View style={styles.ruleContainer}>
                <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                <Text style={styles.modalText}>
                  The first player to connect four discs wins the game.
                </Text>
              </View>
              <View style={styles.ruleContainer}>
                <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                <Text style={styles.modalText}>
                  If the grid is completely filled and no player has connected
                  four discs, the game is a draw.
                </Text>
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={handle_close_modal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    right: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  inGameName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  info: {
    fontSize: 16,
    color: '#c9c9c9',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  playButton: {
    marginBottom: 40,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#21252E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#191A1F',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 20,
    maxHeight: '50%',
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  modalTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
    color: 'gold',
  },
  ruleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  bulletPoint: {
    fontSize: 24,
    lineHeight: 26,
    marginRight: 5,
    width: 20,
    color: 'gold',
  },
  modalText: {
    fontSize: 16,
    flex: 1,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#21252E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'gold',
    fontSize: 16,
  },
})

export default LobbyScreen
