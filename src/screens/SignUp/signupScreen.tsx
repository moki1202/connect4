import React, { useState } from 'react'
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
  signInText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  signInLink: {
    color: '#B73FEE',
    fontWeight: 'bold',
  },
})

const schema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

const SignUpScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const navigation: any = useNavigation()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

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

  const on_submit = async (data: any) => {
    console.log('Form submission successful', data)
    try {
      await AsyncStorage.setItem('username', data.username)
      await AsyncStorage.setItem('email', data.email)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to save the username to AsyncStorage', error)
    }
  }

  const passwordValue = watch('password')
  const confirmPasswordValue = watch('confirm_password')

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/game-icon.png')}
        style={styles.gameImage}
      />
      <Text style={styles.title}>Create Your Account</Text>
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
        <MaterialCommunityIcons name='email-outline' size={24} color='white' />
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#fff'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.email && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.email.message?.toString()}
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
      {errors.password && passwordValue !== '' && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.password.message?.toString()}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name='lock-outline' size={24} color='white' />
        <Controller
          name='confirm_password'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
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
      {errors.confirm_password && confirmPasswordValue !== '' && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.confirm_password.message?.toString()}
        </Text>
      )}
      {passwordValue !== confirmPasswordValue &&
        confirmPasswordValue !== '' && (
          <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
            Passwords do not match
          </Text>
        )}
      <View style={styles.checkboxContainer}>
        <Controller
          name='termsAccepted'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
              color='#B73FEE'
            />
          )}
        />
        <Text style={styles.checkboxLabel}>Accept Terms & Conditions</Text>
      </View>
      {errors.termsAccepted && (
        <Text style={{ color: 'red', alignSelf: 'flex-start' }}>
          {errors.termsAccepted.message?.toString()}
        </Text>
      )}
      <Pressable
        style={isValid ? styles.button : styles.buttonDisabled}
        onPress={isValid ? handleSubmit(on_submit) : undefined}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </Pressable>
      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate(RouteNames.Login)}
        >
          Sign In
        </Text>
      </Text>
    </View>
  )
}

export default SignUpScreen
