// src/screens/ExerciseScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

function SmallTimerCircle({ size = 120, percent = 60 }) {
  const sw = 10, r = (size - sw) / 2, c = 2 * Math.PI * r;
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={size/2} cy={size/2} r={r} stroke="#E8E8FF" strokeWidth={sw} fill="none" />
        <Circle cx={size/2} cy={size/2} r={r} stroke="#00B93F" strokeWidth={sw} fill="none" strokeDasharray={c} strokeDashoffset={c - (percent / 100) * c} strokeLinecap="round" rotation="-90" origin={`${size/2},${size/2}`} />
      </Svg>
      <Text style={styles.smallTimerText}>7 sec.</Text>
    </View>
  );
}

export default function ExerciseScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Video/Image Area */}
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=800&fit=crop" }}
        style={styles.videoArea}
      >
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>
        
        {/* Play Icon in center */}
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={48} color="rgba(255,255,255,0.8)" />
        </View>

        {/* Fake Video Progress Bar */}
        <View style={styles.videoProgressBar}>
          <View style={[styles.videoProgressFill, { width: "30%" }]} />
        </View>
      </ImageBackground>

      {/* Content Area */}
      <View style={styles.content}>
        <Text style={styles.exerciseTitle}>Arms Raises</Text>
        <Text style={styles.exerciseSet}>Set 1 : 20 reps</Text>
        
        <View style={styles.timerWrapper}>
          <SmallTimerCircle percent={70} />
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.stopBtn}
            onPress={() => navigation.navigate("Home")} // Atau rute lain saat di-stop
          >
            <Ionicons name="pause" size={20} color="#333" />
            <Text style={styles.stopBtnText}>Stop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn}>
            <Feather name="user" size={18} color="#FFF" />
            <Text style={styles.nextBtnText}>Latihan Berikutnya</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  videoArea: { width: "100%", height: "45%", justifyContent: "space-between", paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  headerNav: { paddingHorizontal: 20 },
  playOverlay: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, alignItems: "center", justifyContent: "center" },
  videoProgressBar: { height: 6, backgroundColor: "rgba(255,255,255,0.3)", width: "100%" },
  videoProgressFill: { height: "100%", backgroundColor: "#00B93F" },
  content: { flex: 1, padding: 24, alignItems: "center" },
  exerciseTitle: { fontSize: 24, fontWeight: "700", color: "#333", marginBottom: 8, marginTop: 10 },
  exerciseSet: { fontSize: 14, color: "#666", fontWeight: "500", marginBottom: 40 },
  timerWrapper: { marginBottom: 60 },
  smallTimerText: { fontSize: 20, fontWeight: "700", color: "#333" },
  actionRow: { flexDirection: "row", gap: 16, width: "100%" },
  stopBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, borderRadius: 16, borderWidth: 1, borderColor: "#E0E0E0" },
  stopBtnText: { fontSize: 16, fontWeight: "600", color: "#333" },
  nextBtn: { flex: 1.5, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 16, borderRadius: 16, backgroundColor: "#00B93F" },
  nextBtnText: { fontSize: 16, fontWeight: "600", color: "#FFF" }
});