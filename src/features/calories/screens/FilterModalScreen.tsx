// src/screens/FilterModalScreen.tsx
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FilterModalScreen({ navigation }: any) {
  const [activeMeal, setActiveMeal] = useState("Breakfast");
  const [activeCal, setActiveCal] = useState("0-500kcal");

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Snacks",
    "Dinner",
    "Desert",
    "Salad",
    "Juice",
    "Soup",
  ];
  const calTypes = ["0-500kcal", "500-1000kcal", "2000+kcal", "800-2000kcal"];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x-circle" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Recent all</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Type */}
      <Text style={styles.sectionTitle}>Meal type</Text>
      <View style={styles.chipsContainer}>
        {mealTypes.map((meal) => (
          <TouchableOpacity
            key={meal}
            onPress={() => setActiveMeal(meal)}
            style={[styles.chip, activeMeal === meal && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                activeMeal === meal && styles.chipTextActive,
              ]}
            >
              {meal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cooking Time (Static UI for display) */}
      <Text style={styles.sectionTitle}>Cooking time</Text>
      <View style={styles.sliderMockup}>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: "50%" }]} />
        </View>
        <View style={styles.sliderThumb}>
          <View style={styles.thumbLabel}>
            <Text style={styles.thumbLabelText}>15 min</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sliderRangeText}>Cooking time 15-30 min</Text>

      {/* Calories */}
      <Text style={styles.sectionTitle}>Calories</Text>
      <View style={styles.chipsContainer}>
        {calTypes.map((cal) => (
          <TouchableOpacity
            key={cal}
            onPress={() => setActiveCal(cal)}
            style={[styles.chip, activeCal === cal && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                activeCal === cal && styles.chipTextActive,
              ]}
            >
              {cal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.applyBtnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#333" },
  resetText: { fontSize: 14, color: "#00B93F", fontWeight: "600" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  chipActive: { backgroundColor: "#00B93F", borderColor: "#00B93F" },
  chipText: { fontSize: 13, color: "#555", fontWeight: "500" },
  chipTextActive: { color: "#FFF" },
  sliderMockup: {
    height: 40,
    justifyContent: "center",
    marginBottom: 8,
    marginTop: 20,
  },
  sliderTrack: { height: 6, backgroundColor: "#E0E0E0", borderRadius: 3 },
  sliderFill: { height: "100%", backgroundColor: "#00B93F", borderRadius: 3 },
  sliderThumb: {
    position: "absolute",
    left: "50%",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#00B93F",
    marginLeft: -8,
  },
  thumbLabel: {
    position: "absolute",
    top: -30,
    left: -16,
    backgroundColor: "#555",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  thumbLabelText: { color: "#FFF", fontSize: 10 },
  sliderRangeText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginBottom: 30,
  },
  bottomSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00B93F",
    alignItems: "center",
  },
  resetBtnText: { fontSize: 14, fontWeight: "600", color: "#00B93F" },
  applyBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#00B93F",
    alignItems: "center",
  },
  applyBtnText: { fontSize: 14, fontWeight: "600", color: "#FFF" },
});
