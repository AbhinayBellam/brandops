import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useUser } from '../../context/UserContext';
import styles from '../../styles/LoginScreenStyles';


type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>(); 
  const { user, login, isLoading } = useUser(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});



  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleLogin = async () => {
  if (!validate()) return;

  try {
    await login(email.trim(), password);
  } catch (err: any) {
    let errorMessage = 'Something went wrong. Please try again later.';

    if (err.response?.status === 401) {
      errorMessage = err.response.data?.message || 'Invalid credentials.';
    } else if (err.response?.status === 404) {
      errorMessage = err.response.data?.message || 'User not found.';
    } else if (err.response?.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (err.message?.toLowerCase().includes('network')) {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    Alert.alert('Login Failed', errorMessage);
  }
};




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
        }}
        onBlur={() => {
          if (!email) setErrors(prev => ({ ...prev, email: 'Email is required' }));
          else if (!/\S+@\S+\.\S+/.test(email)) setErrors(prev => ({ ...prev, email: 'Email is invalid' }));
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.errorInput]}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
        }}
        onBlur={() => {
          if (!password) setErrors(prev => ({ ...prev, password: 'Password is required' }));
          else if (password.length < 6) setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', { email })}>
           <Text style={styles.linkText}>Forgot Password?</Text>
       </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
