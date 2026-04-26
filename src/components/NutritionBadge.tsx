import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BorderRadius, Colors } from "../theme/colors";

interface NutritionBadgeProps {
  label: string;
  value: number;
  unit: string;
  percentage?: number;
  color?: string;
}

export const NutritionBadge: React.FC<NutritionBadgeProps> = ({
  label,
  value,
  unit,
  percentage,
  color = Colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {percentage !== undefined && (
        <View style={styles.percentageBar}>
          <View
            style={[
              styles.percentageFill,
              { width: `${percentage}%`, backgroundColor: color },
            ]}
          />
        </View>
      )}
      {percentage !== undefined && (
        <Text style={styles.percentage}>{percentage}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: "500",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
  },
  unit: {
    fontSize: 10,
    color: Colors.textMuted,
    marginLeft: 2,
  },
  percentageBar: {
    width: 60,
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    marginBottom: 4,
  },
  percentageFill: {
    height: "100%",
    borderRadius: BorderRadius.full,
  },
  percentage: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: "600",
  },
});
