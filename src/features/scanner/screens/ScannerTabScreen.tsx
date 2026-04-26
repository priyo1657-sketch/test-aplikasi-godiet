// src/screens/ScannerScreen.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Menggunakan Feather icon

// Sesuaikan dengan daftar rute di App.tsx Anda
type RootStackParamList = {
  RecipeAdded: undefined; // Rute ke halaman "Status Saya"
  Home: undefined;
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.7; // Ukuran kotak scanner

export const ScannerTabScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x-circle" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanner</Text>
        <View style={{ width: 26 }} /> {/* Spacer agar text di tengah */}
      </View>

      {/* --- Camera Feed (Simulated with ImageBackground) --- */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=800&fit=crop", // Gambar Roti Telur (Healthy egg)
        }}
        style={styles.cameraArea}
      >
        {/* Dark Overlay with Transparent Cutout */}
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddleRow}>
          <View style={styles.overlaySide} />
          
          {/* Kotak Frame Scanner */}
          <View style={styles.scanFrame}>
            {/* Sudut Putih (Corners) */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Garis Scan yang menyala */}
            <View style={styles.scanLine} />
          </View>
          
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />

        {/* --- Hasil Scan (Floating Card di Bawah) --- */}
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <View>
              <Text style={styles.foodName}>Healthy egg</Text>
              <Text style={styles.foodDesc}>120 Calories 15 min</Text>
            </View>

            {/* Tombol Panah Kanan (Menuju Recipe Added / Status Saya) */}
            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("RecipeAdded")}
            >
              <Feather name="arrow-right" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingBottom: 20,
    backgroundColor: "#F5F5F5",
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  cameraArea: {
    flex: 1,
    width: "100%",
  },
  // --- Overlay System ---
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  overlayMiddleRow: {
    flexDirection: "row",
    height: FRAME_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  // --- Scan Frame ---
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    backgroundColor: "transparent",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#FFFFFF",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: "absolute",
    width: "90%",
    height: 3,
    backgroundColor: "#FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  // --- Result Card ---
  resultContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 24,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },
  foodDesc: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "500",
  },
  nextBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#333333",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});