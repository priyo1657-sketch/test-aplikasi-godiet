// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, BorderRadius, Spacing } from '../theme/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Green diagonal header */}
      <View style={styles.header}>
        <View style={styles.circleDecor} />
        <View style={styles.logoRow}>
          <Text style={styles.logoIcon}>🏃</Text>
          <Text style={styles.logoText}>GoDIET</Text>
        </View>
        <Text style={styles.welcomeTitle}>Hala, senang{'\n'}bertemu{'\n'}denganmu lagi!</Text>
      </View>

      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Log in to</Text>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <View
            style={[
              styles.inputBox,
              focused === 'email' && styles.inputBoxFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="contoh@gmail.com"
              placeholderTextColor={Colors.gray400}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
            <Text style={styles.inputIconRight}>✉️</Text>
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <View
            style={[
              styles.inputBox,
              focused === 'password' && styles.inputBoxFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.inputIconRight}>
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Lupa password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('CreateProfile')}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}></Text>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up link */}
        <TouchableOpacity
          style={styles.signUpRow}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signUpText}>
            Belum punya akun?{' '}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  circleDecor: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  logoIcon: { fontSize: 22 },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 34,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.gray800,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    paddingHorizontal: 16,
    height: 52,
  },
  inputBoxFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  inputIconRight: {
    fontSize: 18,
    marginLeft: 8,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray200,
  },
  dividerText: {
    color: Colors.gray400,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  socialIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  socialText: {
    fontSize: 11,
    color: Colors.gray600,
  },
  signUpRow: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: Colors.gray600,
  },
  signUpLink: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
