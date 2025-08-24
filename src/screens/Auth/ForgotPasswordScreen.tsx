import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { handleForgotPassword, handleResetPassword } from '../../services/authService';
import styles from '../../styles/LoginScreenStyles';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; otp?: string; password?: string; confirmPassword?: string }>({});

  // ✅ Email validation
  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Enter a valid email address';
    return '';
  };

  // ✅ Password validation
  const validatePassword = (value: string) => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // ✅ Confirm password validation
  const validateConfirmPassword = (value: string) => {
    if (!value.trim()) return 'Confirm Password is required';
    if (value !== newPassword) return 'Passwords do not match';
    return '';
  };

  const sendOtp = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    try {
      setLoading(true);
      await handleForgotPassword(email.trim());
      setOtpSent(true);
      Alert.alert('Success', 'OTP sent to your email.');
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    const otpError = !otp.trim() ? 'OTP is required' : '';
    const passwordError = validatePassword(newPassword);
    const confirmError = validateConfirmPassword(confirmPassword);

    if (otpError || passwordError || confirmError) {
      setErrors({ otp: otpError, password: passwordError, confirmPassword: confirmError });
      return;
    }

    try {
      setLoading(true);
      await handleResetPassword({ email: email.trim(), otp, newPassword });
      Alert.alert('Success', 'Password reset successful', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        {!otpSent ? (
          <>
            {/* Email */}
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Enter Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              onBlur={() => {
                const error = validateEmail(email);
                if (error) setErrors(prev => ({ ...prev, email: error }));
              }}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Email (non-editable once OTP sent) */}
            <TextInput
              style={[styles.input, { backgroundColor: '#eee' }]}
              placeholder="Enter Email"
              value={email}
              editable={false}
            />

            {/* OTP */}
            <TextInput
              placeholder="Enter OTP"
              style={[styles.input, errors.otp && styles.errorInput]}
              keyboardType="numeric"
              value={otp}
              onChangeText={text => {
                setOtp(text);
                if (errors.otp) setErrors(prev => ({ ...prev, otp: undefined }));
              }}
              onBlur={() => {
                if (!otp.trim()) setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
              }}
            />
            {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

            {/* New Password */}
            <TextInput
              placeholder="New Password"
              style={[styles.input, errors.password && styles.errorInput]}
              secureTextEntry
              value={newPassword}
              onChangeText={text => {
                setNewPassword(text);
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              onBlur={() => {
                const error = validatePassword(newPassword);
                if (error) setErrors(prev => ({ ...prev, password: error }));
              }}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Confirm Password */}
            <TextInput
              placeholder="Confirm Password"
              style={[styles.input, errors.confirmPassword && styles.errorInput]}
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              onBlur={() => {
                const error = validateConfirmPassword(confirmPassword);
                if (error) setErrors(prev => ({ ...prev, confirmPassword: error }));
              }}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity style={styles.button} onPress={resetPassword} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
