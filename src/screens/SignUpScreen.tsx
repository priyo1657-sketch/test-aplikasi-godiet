// src/screens/SignUpScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, BorderRadius, Spacing } from '../theme/colors';

const { height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

export default function SignUpScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Green top section */}
      <View style={styles.topSection}>
        <View style={styles.circleDecor1} />
        <View style={styles.circleDecor2} />

        <View style={styles.logoRow}>
          <Text style={styles.logoIcon}>🏃</Text>
          <Text style={styles.logoTextGreen}>GoDIET</Text>
        </View>

        <Text style={styles.headline}>
          Start your healthy with{'\n'}
          <Text style={styles.headlineBrand}>🏃 GoDiet </Text>
          Today
        </Text>
      </View>

      {/* White card section */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('CreateProfile')}
          activeOpacity={0.85}
        >
          <Text style={styles.emailIcon}>✉️</Text>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.termsRow}>
          <Text style={styles.termsText}>
            Dengan mendaftar, kamu menyetujui{' '}
            <Text style={styles.termsLink}>Syarat & Ketentuan</Text> dan{' '}
            <Text style={styles.termsLink}>Kebijakan Privasi</Text> kami.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topSection: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circleDecor1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  circleDecor2: {
    position: 'absolute',
    bottom: 40,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  logoIcon: { fontSize: 28 },
  logoTextGreen: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  headline: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.white,
    lineHeight: 40,
  },
  headlineBrand: {
    fontWeight: '800',
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 48,
    gap: Spacing.md,
  },
  signUpButton: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emailIcon: { fontSize: 18 },
  signUpText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
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
  loginButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.gray200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
  loginText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  termsRow: {
    paddingTop: 8,
  },
  termsText: {
    fontSize: 12,
    color: Colors.gray400,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
