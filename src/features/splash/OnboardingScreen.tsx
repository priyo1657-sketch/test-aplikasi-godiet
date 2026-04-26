import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App"; // Sesuaikan path jika perlu
import { Logo } from "../../components/Logo"; // Sesuaikan path jika perlu

const { width, height } = Dimensions.get("window");

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">; // Sesuaikan rute
};

const slides = [
  {
    id: "1",
    title: "Temukan Jalan Menuju Kehidupan yang Seimbang dan Penuh Semangat",
    description:
      '"Raih hidup yang lebih sehat bersama GO DIET. Jelajahi fitur-fiturnya, pantau kemajuan Anda, dan raih kesuksesan dalam perjalanan Anda!"',
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", // Ganti dengan aset gambar meditasi
    buttonText: "Mulai",
  },
  {
    id: "2",
    title: "Temukan Jalan Menuju Kehidupan yang Seimbang dan Penuh Semangat",
    description:
      '"Raih hidup yang lebih sehat bersama GO DIET. Jelajahi fitur-fiturnya, pantau kemajuan Anda, dan raih kesuksesan dalam perjalanan Anda!"',
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop", // Ganti dengan aset gambar rentangkan tangan
    buttonText: "Selanjutnya",
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  // 0 = Splash Screen Hijau, 1 = Welcome Screen (Salad), 2 = Slider Onboarding
  const [phase, setPhase] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const scaleAnim = React.useMemo(() => new Animated.Value(0.6), []);
  const opacityAnim = React.useMemo(() => new Animated.Value(0), []);

  // Timer untuk animasi Splash Screen
  useEffect(() => {
    if (phase === 0) {
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
        setPhase(1); // Pindah ke layar Welcome setelah 3 detik
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, opacityAnim, scaleAnim]);

  // Fungsi untuk tombol di Slider
  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      // Jika sudah di slide terakhir, navigasi ke halaman Login
      navigation.replace("Login"); // Pastikan 'Login' ada di router Anda
    }
  };

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // ==================== PHASE 0: SPLASH SCREEN (LAYAR HIJAU) ====================
  if (phase === 0) {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#45B34B" />
        <View style={styles.circleTopRight} />
        <View style={styles.circleMiddleLeft} />
        <View style={styles.circleBottomLeft} />
        <View style={styles.glowBottomRight} />

        <View style={styles.splashContent}>
          <Animated.View
            style={[
              styles.logoWrapper,
              { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
            ]}
          >
            <Logo />
          </Animated.View>
          <Text style={styles.quoteText}>
            “Kesehatan bukan sekadar bebas dari penyakit; melainkan suatu
            keadaan kesejahteraan fisik, mental, dan sosial yang menyeluruh.”
            -WHO
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==================== PHASE 1: WELCOME SCREEN (LAYAR SALAD) ====================
  if (phase === 1) {
    return (
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=1200&fit=crop",
        }}
        style={styles.welcomeContainer}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.welcomeOverlay}>
          <View style={styles.welcomeHeader}>
            <Text style={styles.welcomeTitle}> Penemuan Sehat </Text>
          </View>
          <View style={styles.welcomeBottom}>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => setPhase(2)}
            >
              <Text style={styles.mainButtonText}>Selamat Datang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={[styles.loginLinkText, { color: "#ffffff" }]}>
                Sudah punya akun?{" "}
                <Text style={[styles.loginLinkBold, { color: "#00fd3f" }]}>
                  Log in
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  // ==================== PHASE 2: SLIDER SCREEN (ONBOARDING) ====================
  return (
    <View style={styles.sliderContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: "center", paddingHorizontal: 24 }}>
            <View style={styles.illustrationContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.illustrationImage}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDesc}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.sliderBottomSection}>
        <TouchableOpacity style={styles.mainButton} onPress={goToNextSlide}>
          <Text style={styles.mainButtonText}>
            {slides[currentSlideIndex].buttonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.loginLinkText, { color: "#555" }]}>
            Sudah punya akun?{" "}
            <Text style={[styles.loginLinkBold, { color: "#333" }]}>
              Log in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- Splash Screen ---
  splashContainer: {
    flex: 1,
    backgroundColor: "#45B34B",
    position: "relative",
  },
  circleTopRight: {
    position: "absolute",
    top: -60,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#E6EFD3",
  },
  circleMiddleLeft: {
    position: "absolute",
    top: height * 0.28,
    left: -70,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#BDD19F",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#7DB662",
  },
  glowBottomRight: {
    position: "absolute",
    bottom: height * 0.15,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  splashContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    zIndex: 10,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 18,
    color: "#FFFFFF",
    lineHeight: 28,
    fontWeight: "500",
    textAlign: "left",
  },

  // --- Welcome Screen ---
  welcomeContainer: { flex: 1 },
  welcomeOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  welcomeHeader: { alignItems: "center", marginTop: 100 },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  welcomeBottom: { width: "100%", paddingBottom: 20 },

  // --- Slider Screen ---
  sliderContainer: { flex: 1, backgroundColor: "#F8F9FA" },
  illustrationContainer: {
    width: width,
    height: height * 0.5,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  illustrationImage: { width: "100%", height: "100%", resizeMode: "cover" },
  textContainer: { width: "100%" },
  slideTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 28,
  },
  slideDesc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  sliderBottomSection: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 24,
  },

  // --- Global ---
  mainButton: {
    backgroundColor: "#00B93F",
    width: "100%",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  loginLink: { alignItems: "center", marginTop: 16 },
  loginLinkText: { color: "#FFF", fontSize: 14 },
  loginLinkBold: { fontWeight: "700" },
});
