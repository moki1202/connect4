import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native'
import { Checkbox } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import RouteNames from '../../navigation/RouteNames'
import { useAuthStore } from '../../store/zustand/AuthStore'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
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
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#21252E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#9720CF',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    width: '100%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#9720CF',
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'flex-start',
    width: '100%',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#fff',
  },
  gameImage: {
    width: 150,
    height: 150,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  signUpLink: {
    color: '#B73FEE',
    fontWeight: 'bold',
  },
})

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const LoginScreen: React.FC = () => {
  const [rememberPassword, setRememberPassword] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [authInfo, setAuthInfo] = useState<{
    username: string | null
    password: string | null
  }>({
    username: null,
    password: null,
  })

  const navigation: any = useNavigation()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  const load_auth_info = async () => {
    const username = await AsyncStorage.getItem('username')
    const password = await AsyncStorage.getItem('password')
    setAuthInfo({ username, password })
  }

  useEffect(() => {
    load_auth_info()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const toggle_password_visibility = () => {
    setShowPassword(!showPassword)
  }

  const on_submit = (data: any) => {
    if (
      data.username === authInfo.username &&
      data.password === authInfo.password
    ) {
      setIsAuthenticated(true)
      navigation.navigate(RouteNames.Home)
    } else {
      alert('Incorrect username or password. Please try again!')
    }
  }

  const password_value = watch('password')

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/game-icon.png')}
        style={styles.gameImage}
      />
      <Text style={styles.title}>Login Your Account</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name='account-outline'
          size={24}
          color='white'
        />
        <Controller
          name='username'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Username'
              placeholderTextColor='#fff'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.username && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.username.message?.toString()}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' size={24} color='white' />
        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor='#fff'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
            />
          )}
        />
        <Pressable onPress={toggle_password_visibility}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color='white'
          />
        </Pressable>
      </View>
      {errors.password && password_value !== '' && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.password.message?.toString()}
        </Text>
      )}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={rememberPassword ? 'checked' : 'unchecked'}
          onPress={() => setRememberPassword(!rememberPassword)}
          color='#B73FEE'
        />
        <Text style={styles.checkboxLabel}>Remember Password</Text>
      </View>
      <Pressable
        style={isValid ? styles.button : styles.buttonDisabled}
        onPress={handleSubmit(on_submit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      <Text style={styles.signUpText}>
        Don't have an account?
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate(RouteNames.Signup)}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  )
}

export default LoginScreen
