// src/screens/GetReadyScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

// Komponen Lingkaran Timer
function TimerCircle({ size = 200, percent = 80 }) {
  const sw = 16, r = (size - sw) / 2, c = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={size/2} cy={size/2} r={r} stroke="#E8E8FF" strokeWidth={sw} fill="none" />
        <Circle cx={size/2} cy={size/2} r={r} stroke="#00B93F" strokeWidth={sw} fill="none" strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c} strokeLinecap="round" rotation="-90" origin={`${size/2},${size/2}`} />
      </Svg>
      <Text style={styles.timerText}>7 sec.</Text>
    </View>
  );
}

export default function GetReadyScreen({ navigation }: any) {
  
  // Opsional: Otomatis pindah ke layar Exercise setelah beberapa detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Exercise");
    }, 3000); // Ganti angka ini jika ingin timer jalan beneran
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Get Ready!</Text>
        <View style={styles.timerContainer}>
          <TimerCircle percent={70} size={220} />
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.replace("Exercise")} // 🔴 TERSAMBUNG KE LAYAR LATIHAN
        >
          <Text style={styles.btnText}>Mulai Lagi ↻</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { paddingHorizontal: 20, paddingTop: 20 },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 80 },
  title: { fontSize: 28, fontWeight: "700", color: "#333", marginBottom: 60 },
  timerContainer: { alignItems: "center", justifyContent: "center" },
  timerText: { fontSize: 32, fontWeight: "700", color: "#333" },
  bottomBar: { padding: 24, paddingBottom: 40 },
  btn: { backgroundColor: "#00B93F", borderRadius: 16, paddingVertical: 16, alignItems: "center" },
  btnText: { color: "#FFF", fontSize: 16, fontWeight: "700" }
});