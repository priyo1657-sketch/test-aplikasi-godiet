// src/screens/HomeTabScreen.tsx
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Polyline, Path } from "react-native-svg";
import { BorderRadius, Colors, Spacing } from "../../../theme/colors";

type RootStackParamList = {
  NotificationSettings: undefined;
  GetReady: undefined;
  Exercise: undefined;
  WorkoutDetail: undefined;
  RecipesList: undefined;
  RecipeDetail: { id?: string };
  TrainingPlan: undefined;
  MoodSelection: undefined;
  Scanner: undefined;
  BMRCalculator: undefined; // Tambahan rute
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

// --- Komponen Visual Bantuan --- //

function GaugeProgress({
  percent,
  size = 120,
  stroke = 12,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <View style={{ height: size / 2 + stroke / 2, overflow: "hidden" }}>
      <Svg width={size} height={size}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#CFA983"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          rotation="-180"
          origin={`${cx},${cy}`}
        />
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#95D588"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-180"
          origin={`${cx},${cy}`}
        />
      </Svg>
    </View>
  );
}

function CircularProgress({
  percent,
  size = 60,
  stroke = 6,
  color = Colors.primary,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={Colors.gray200}
        strokeWidth={stroke}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${circ} ${circ}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2},${size / 2}`}
      />
    </Svg>
  );
}

function TujuanPieChart({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2v10h10a10 10 0 1 1-10-10z"
        fill="none"
        stroke="#FFA726"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12L21.5 5.5"
        fill="none"
        stroke="#FFA726"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// --- Layar Utama --- //

export const HomeTabScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🧑‍💻</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Hi, Bintang</Text>
            <Text style={styles.subGreeting}>
              Siap mencapai target kalorimu hari ini?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => navigation.navigate("NotificationSettings")}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Plan Card */}
      <TouchableOpacity
        style={styles.planCard}
        onPress={() => navigation.navigate("Exercise")}
      >
        <View style={styles.planTextContainer}>
          <Text style={styles.planTitle}>Rencanaku{"\n"}Untuk Hari Ini</Text>
        </View>
        <View style={styles.gaugeContainer}>
          <GaugeProgress percent={70} size={140} stroke={12} />
          <Text style={styles.planPercentOverlay}>70%</Text>
        </View>
      </TouchableOpacity>

      {/* Stats Container (Baris 1 & 2 digabung dalam container) */}
      <View style={styles.statsContainer}>
        {/* Kolom Kiri */}
        <View style={{ flex: 1, gap: Spacing.md }}>
          <View style={[styles.statCard, { backgroundColor: Colors.white }]}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statLabel}>Kalori</Text>
            <View
              style={{
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                percent={46}
                size={52}
                stroke={5}
                color={Colors.primary}
              />
              <Text
                style={{
                  position: "absolute",
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                46%
              </Text>
            </View>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.white }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 16,
              }}
            >
              <Text style={styles.statLabel}>Tujuan</Text>
              <Text style={{ fontSize: 16 }}>🎯</Text>
            </View>
            <View
              style={{
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TujuanPieChart size={48} />
            </View>
            <Text style={styles.statValue}>⚖️ 57 Kg</Text>
          </View>
        </View>

        {/* Kolom Kanan */}
        <View style={{ flex: 1.4, gap: Spacing.md }}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: "#FFF0F0",
                alignItems: "flex-start",
                paddingHorizontal: 16,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text style={{ fontSize: 16 }}>❤️</Text>
              <Text style={[styles.statLabel, { marginTop: 0 }]}>
                Detak Jantung
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#E53935",
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              70 bpm
            </Text>
            <Svg width="100%" height={36} style={{ marginTop: 4 }}>
              <Polyline
                points="0,28 15,20 25,22 35,10 50,16 65,8 80,14"
                fill="none"
                stroke="#E53935"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: Colors.white,
                alignItems: "flex-start",
                paddingHorizontal: 16,
              },
            ]}
          >
            <Text style={[styles.statLabel, { marginTop: 0, marginBottom: 8 }]}>
              Aktivitas
            </Text>
            <Svg width="100%" height={44}>
              <Polyline
                points="0,38 12,28 22,30 32,18 44,24 56,10 68,16 80,8 90,12"
                fill="none"
                stroke={Colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.statValue}>10 km • 25000 langkah</Text>
          </View>
        </View>
      </View>

      {/* --- FITUR BARU BERDASARKAN STYLE YANG TERSEDIA --- */}

      {/* Seksi Menu Rekomendasi (Random Sampling Menu) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rekomendasi Menu GO DIET</Text>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate("RecipesList")}
        >
          <Text style={styles.menuEmoji}>🥗</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuName}>Salad Ayam Panggang</Text>
            <Text style={styles.menuKcal}>Tinggi Protein • 320 Kcal</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Seksi Latihan / Workout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latihan Fisik</Text>
        <TouchableOpacity
          style={styles.workoutCard}
          onPress={() => navigation.navigate("WorkoutDetail", )}
        >
          <Text style={styles.workoutEmoji}>🏃‍♂️</Text>
          <View style={styles.workoutContent}>
            <Text style={styles.workoutName}>Latihan Pinggul & Kardio</Text>
            <Text style={styles.workoutSets}>
              25% Selesai • 15 Menit tersisa
            </Text>
          </View>
          <View style={styles.startBtn}>
            <Text style={styles.startBtnText}>▶</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Seksi Aksi Cepat / Fitur Utama */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aksi Cepat</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Scanner")}
          >
            <Text style={styles.actionIcon}>📸</Text>
            <Text style={styles.actionLabel}>Scan Makanan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🧮</Text>
            <Text style={styles.actionLabel}>Hitung BMR/TDEE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("TrainingPlan")}
          >
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionLabel}>Jadwal Program</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("MoodSelection")}
          >
            <Text style={styles.actionIcon}>😊</Text>
            <Text style={styles.actionLabel}>Catat Jurnal</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 22 },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subGreeting: { fontSize: 13, color: Colors.textSecondary },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIcon: { fontSize: 20 },

  planCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  planTextContainer: { flex: 1, height: 80, justifyContent: "flex-start" },
  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
    lineHeight: 26,
  },
  gaugeContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    height: 80,
  },
  planPercentOverlay: {
    position: "absolute",
    bottom: -5,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
  },

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    paddingVertical: Spacing.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  statEmoji: { fontSize: 20 },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    marginTop: 8,
    fontWeight: "500",
  },

  section: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  menuEmoji: { fontSize: 32 },
  menuContent: { flex: 1 },
  menuName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  menuKcal: { fontSize: 13, color: Colors.textSecondary },
  menuArrow: { fontSize: 20, color: Colors.primary, fontWeight: "bold" },

  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  workoutEmoji: { fontSize: 32 },
  workoutContent: { flex: 1 },
  workoutName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 4,
  },
  workoutSets: { fontSize: 13, color: "rgba(255,255,255,0.9)" },
  startBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  startBtnText: { fontSize: 14, color: Colors.white },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    justifyContent: "space-between",
  },
  actionCard: {
    width: "47%",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    gap: Spacing.sm,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  actionIcon: { fontSize: 28 },
  actionLabel: { fontSize: 13, fontWeight: "600", color: Colors.textPrimary },
});
