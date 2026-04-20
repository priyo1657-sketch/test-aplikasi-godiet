// src/screens/OnboardingScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { BorderRadius, Colors, Spacing } from "../theme/colors";

const { width } = Dimensions.get("window");

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bgColor: string;
  isQuote?: boolean;
  quote?: string;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "",
    description: "",
    emoji: "",
    bgColor: Colors.white,
    isQuote: true,
    quote:
      '"Kesehatan bukan sekadar bebas dari penyakit, melainkan suatu keadaan kesejahteraan fisik, mental, dan sosial yang menyeluruh." -WHO',
  },
  {
    id: "2",
    title: "Temukan Jalan Menuju\nKehidupan yang Seimbang\ndan Penuh Semangat",
    description:
      "Raih hidup yang lebih sehat bersama Life. Lacak Fitur fikamus, pantau kemajuan Anda, dan raih kesuksesan dalam perjalanan Anda!",
    emoji: "🧘‍♀️",
    bgColor: Colors.white,
  },
  {
    id: "3",
    title: "Temukan Jalan Menuju\nKehidupan yang Seimbang\ndan Penuh Semangat",
    description:
      "Raih hidup yang lebih sehat bersama Life. Lacak Fitur fikamus, pantau kemajuan Anda, dan raih kesuksesan dalam perjalanan Anda!",
    emoji: "💚",
    bgColor: Colors.white,
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("SignUp");
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { width }]}>
      {item.isQuote ? (
        <View style={styles.quoteSlide}>
          <View style={styles.logoRow}>
            <Text style={styles.logoIcon}>🏃</Text>
            <Text style={styles.logoText}>DIET</Text>
          </View>
          <Text style={styles.quoteText}>{item.quote}</Text>
          <View style={styles.discoverCard}>
            <Text style={styles.discoverTitle}>Discover healthy</Text>
            <Text style={styles.discoverSubtitle}>🥗 🌿 🥑</Text>
          </View>
        </View>
      ) : (
        <View style={styles.illustrationSlide}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationEmoji}>{item.emoji}</Text>
          </View>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      )}
    </View>
  );

  const isLast = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <View style={styles.logoRowSmall}>
          <Text style={styles.logoIconSmall}>🏃</Text>
          <Text style={styles.logoTextSmall}>GoDIET</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Bottom actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {isLast ? "Mulai" : "Selanjutnya"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLinkText}>
            Sudah punya akun? <Text style={styles.loginLinkBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 24,
  },
  logoRowSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoIcon: { fontSize: 28 },
  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: 1,
  },
  logoIconSmall: { fontSize: 20 },
  logoTextSmall: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
  },
  slide: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  quoteSlide: {
    flex: 1,
    alignItems: "center",
  },
  quoteText: {
    fontSize: 15,
    color: Colors.gray800,
    textAlign: "center",
    lineHeight: 24,
    fontStyle: "italic",
    marginBottom: 32,
  },
  discoverCard: {
    width: "100%",
    height: 180,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  discoverTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
  },
  discoverSubtitle: {
    fontSize: 32,
    marginTop: 8,
  },
  illustrationSlide: {
    flex: 1,
    alignItems: "center",
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray200,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  loginLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: Colors.gray600,
  },
  loginLinkBold: {
    color: Colors.primary,
    fontWeight: "700",
  },
});
