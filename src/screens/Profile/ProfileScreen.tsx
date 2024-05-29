import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'

import useInGameNameStore from '../../store/zustand/IngameNameStore'
import { useAuthStore } from '../../store/zustand/AuthStore'

const ProfileScreen: React.FC = () => {
  const [editingName, setEditingName] = useState<boolean>(false)
  const [userData, setUserData] = useState<{
    username: string | null
    email: string | null
    profileImage: string | null
  }>({
    username: null,
    email: null,
    profileImage: null,
  })

  const { inGameName, setInGameName, loadInGameName } = useInGameNameStore()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const nameInputRef = useRef<TextInput>(null)

  useEffect(() => {
    loadInGameName()
    get_user_data()
  }, [loadInGameName])

  const get_user_data = async () => {
    const username = await AsyncStorage.getItem('username')
    const email = await AsyncStorage.getItem('email')
    const profileImage = await AsyncStorage.getItem('profileImage')
    setUserData({ username, email, profileImage })
  }

  const handle_edit_name = () => {
    setEditingName(true)
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus()
      }
    }, 100)
  }

  const handle_save_name = () => {
    setEditingName(false)
  }

  const handle_profile_picture_change = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri
      setUserData((prevData) => ({ ...prevData, profileImage: uri }))
      await AsyncStorage.setItem('profileImage', uri)
    }
  }

  const handle_sign_out = () => {
    setIsAuthenticated(false)
    setInGameName('Player1')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Pressable
          onPress={handle_profile_picture_change}
          style={styles.profileImageContainer}
        >
          {userData.profileImage ? (
            <Image
              source={{ uri: userData.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require('../../assets/try-hard.jpg')}
              style={styles.profileImage}
            />
          )}
          <View style={styles.editIconContainer}>
            <MaterialCommunityIcons name='camera' size={20} color='white' />
          </View>
        </Pressable>
        {editingName ? (
          <TextInput
            ref={nameInputRef}
            style={styles.nameInput}
            value={inGameName}
            onChangeText={setInGameName}
            onBlur={handle_save_name}
            autoFocus
          />
        ) : (
          <View style={styles.nameContainer}>
            <Text style={styles.inGameName}>{inGameName}</Text>
            <Pressable onPress={handle_edit_name}>
              <MaterialCommunityIcons name='pencil' size={20} color='white' />
            </Pressable>
          </View>
        )}
        <Text style={styles.userInfo}>Username: {userData.username}</Text>
        <Text style={styles.userInfo}>Email: {userData.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Stats</Text>
        <Text style={styles.sectionContent}>Wins: 10</Text>
        <Text style={styles.sectionContent}>Losses: 5</Text>
        <Text style={styles.sectionContent}>Games Played: 15</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Pressable style={styles.settingOption}>
          <Text style={styles.settingText}>Notification Preferences</Text>
        </Pressable>
        <Pressable style={styles.settingOption}>
          <Text style={styles.settingText}>Privacy Settings</Text>
        </Pressable>
        <Pressable style={styles.settingOption} onPress={handle_sign_out}>
          <Text style={styles.settingText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#181A20',
    padding: 20,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
    width: '100%',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#9720CF',
    borderRadius: 15,
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inGameName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  nameInput: {
    fontSize: 24,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  userInfo: {
    fontSize: 16,
    color: '#c9c9c9',
    marginTop: 5,
  },
  section: {
    width: '100%',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#21252E',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#c9c9c9',
    marginBottom: 5,
  },
  settingOption: {
    paddingVertical: 10,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#B73FEE',
  },
})

export default ProfileScreen
