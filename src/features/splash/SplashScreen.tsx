// src/screens/SplashScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { Logo } from "../../components/Logo";
import { Colors } from "../../theme/colors";

// Dimensions imported but not used for specific values

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Splash">;
};

export default function SplashScreen({ navigation }: Props) {
  const scaleAnim = React.useMemo(() => new Animated.Value(0.6), []);
  const opacityAnim = React.useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, opacityAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
        ]}
      >
        <Logo size="large" />
        <Text style={styles.tagline}>Your Healthy Companion</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    fontSize: 36,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.white,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
