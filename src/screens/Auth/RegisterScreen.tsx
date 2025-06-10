import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/RegisterScreenStyles';
import { useUser } from '../../context/UserContext';

import { registerUser } from '../../api/authApi';

const roles = ['Franchisor', 'Franchisee', 'Customer'];

type RootStackParamList = {
  Login: undefined;
  // Add other routes here if needed
};

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { register, isLoading } = useUser();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        break;
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone number must be 10 digits';
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!value) return 'Confirm your password';
        if (value !== form.password) return 'Passwords do not match';
        break;
      case 'role':
        if (!value) return 'Select a role';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));

    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));

    // Also re-validate confirmPassword when password changes
    if (field === 'password' && form.confirmPassword) {
      const confirmError = validateField('confirmPassword', form.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    Object.keys(form).forEach(field => {
      const error = validateField(field, (form as any)[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    // const a = await axios.get('http://10.0.2.2:3000/api/users/683566f77c5895c8cf274858');
    // console.log('Fetched user:', a.data);

    if (!validateForm()) return;

    try {
      // console.log('Registering user:', form);
      // const resp = await axios.post('http://10.0.2.2:3000/api/users/register', 
      //  { 
      //   name: form.name.trim(),
      //   email: form.email.trim(),        
      //   phone: form.phone.trim(),
      //   password: form.password,
      //   role: form.role
      // },
      // );
      // console.log('Fetched user:', resp.data);
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role,
      });
      Alert.alert('Registration Successful', 'You can now log in with your credentials');
      navigation.navigate('Login');
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        style={[styles.input, errors.name && styles.errorInput]}
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        style={[styles.input, errors.email && styles.errorInput]}
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={text => handleChange('email', text)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Phone"
        style={[styles.input, errors.phone && styles.errorInput]}
        keyboardType="number-pad"
        value={form.phone}
        onChangeText={text => handleChange('phone', text)}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        placeholder="Password"
        style={[styles.input, errors.password && styles.errorInput]}
        secureTextEntry
        value={form.password}
        onChangeText={text => handleChange('password', text)}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm Password"
        style={[styles.input, errors.confirmPassword && styles.errorInput]}
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={text => handleChange('confirmPassword', text)}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <View style={[styles.pickerWrapper, errors.role && styles.errorInput]}>
        <Picker
          selectedValue={form.role}
          onValueChange={value => handleChange('role', value)}
        >
          <Picker.Item label="Select Role" value="" />
          {roles.map(role => (
            <Picker.Item label={role} value={role} key={role} />
          ))}
        </Picker>
      </View>
      {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;
