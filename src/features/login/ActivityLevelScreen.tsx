// src/screens/ActivityLevelScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import { BorderRadius, Colors, Spacing } from "../../theme/colors";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ActivityLevel">;
};

const heights = Array.from({ length: 50 }, (_, i) => i + 140);
const weights = Array.from({ length: 80 }, (_, i) => i + 40);

export default function ActivityLevelScreen({ navigation }: Props) {
  const [selectedHeight, setSelectedHeight] = useState(170);
  const [selectedWeight, setSelectedWeight] = useState(59);
  const [activityLevel] = useState("Training 5-7 times (2 week, one day one )");
  const [unit, setUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "pound">("kg");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buat akun</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "40%" }]} />
        </View>
        <Text style={styles.stepLabel}>Langkah 2 dari 5</Text>

        {/* Height */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tinggi Badan</Text>
            <View style={styles.unitToggle}>
              {(["cm", "ft"] as const).map((u) => (
                <TouchableOpacity
                  key={u}
                  style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
                  onPress={() => setUnit(u)}
                >
                  <Text
                    style={[
                      styles.unitText,
                      unit === u && styles.unitTextActive,
                    ]}
                  >
                    {u}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.heightValue}>{selectedHeight}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.rulerScroll}
            contentContainerStyle={styles.rulerContent}
          >
            {heights.map((h) => (
              <TouchableOpacity
                key={h}
                style={styles.rulerTick}
                onPress={() => setSelectedHeight(h)}
              >
                <View
                  style={[
                    styles.tickLine,
                    {
                      height: h % 10 === 0 ? 28 : 16,
                      backgroundColor:
                        h === selectedHeight ? Colors.primary : Colors.gray200,
                      width: h === selectedHeight ? 2.5 : 1.5,
                    },
                  ]}
                />
                {h % 10 === 0 && <Text style={styles.tickLabel}>{h}</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Weight */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Berat Badan</Text>
            <View style={styles.unitToggle}>
              {(["kg", "pound"] as const).map((u) => (
                <TouchableOpacity
                  key={u}
                  style={[
                    styles.unitBtn,
                    weightUnit === u && styles.unitBtnActive,
                  ]}
                  onPress={() => setWeightUnit(u)}
                >
                  <Text
                    style={[
                      styles.unitText,
                      weightUnit === u && styles.unitTextActive,
                    ]}
                  >
                    {u}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.weightRow}>
            {weights
              .slice(
                Math.max(0, weights.indexOf(selectedWeight) - 3),
                weights.indexOf(selectedWeight) + 4,
              )
              .map((w) => (
                <TouchableOpacity
                  key={w}
                  style={[
                    styles.weightChip,
                    w === selectedWeight && styles.weightChipActive,
                  ]}
                  onPress={() => setSelectedWeight(w)}
                >
                  <Text
                    style={[
                      styles.weightText,
                      w === selectedWeight && styles.weightTextActive,
                      {
                        fontSize:
                          w === selectedWeight
                            ? 22
                            : w === selectedWeight - 1 ||
                                w === selectedWeight + 1
                              ? 18
                              : 14,
                      },
                    ]}
                  >
                    {w}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Activity Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilih aktivitas Anda</Text>
          <TouchableOpacity style={styles.activityPicker}>
            <Text style={styles.activityText}>{activityLevel}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("TrainingPlan")}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
        <Text style={styles.levelText}>Level0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === "ios" ? 56 : 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 18, color: Colors.textPrimary },
  headerTitle: { fontSize: 17, fontWeight: "700", color: Colors.textPrimary },
  content: { paddingHorizontal: Spacing.lg, paddingBottom: 24 },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  stepLabel: { fontSize: 12, color: Colors.gray400, marginBottom: 20 },
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  unitToggle: {
    flexDirection: "row",
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
    padding: 2,
  },
  unitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  unitBtnActive: { backgroundColor: Colors.primary },
  unitText: { fontSize: 12, color: Colors.gray600 },
  unitTextActive: { color: Colors.white, fontWeight: "700" },
  heightValue: {
    fontSize: 48,
    fontWeight: "800",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  rulerScroll: { marginHorizontal: -Spacing.lg },
  rulerContent: {
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "flex-end",
    height: 60,
    gap: 6,
  },
  rulerTick: { alignItems: "center", justifyContent: "flex-end" },
  tickLine: { borderRadius: 2 },
  tickLabel: { fontSize: 10, color: Colors.gray400, marginTop: 4 },
  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  weightChip: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  weightChipActive: {},
  weightText: { color: Colors.gray400, fontWeight: "600" },
  weightTextActive: { color: Colors.primary, fontWeight: "800" },
  activityPicker: {
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    borderWidth: 1,
    borderColor: Colors.gray200,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityText: { fontSize: 14, color: Colors.gray600, flex: 1 },
  dropdownIcon: { fontSize: 12, color: Colors.gray400 },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    paddingTop: 16,
    gap: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  nextButton: {
    width: "100%",
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: { color: Colors.white, fontSize: 16, fontWeight: "700" },
  levelText: { fontSize: 13, color: Colors.gray400 },
});
