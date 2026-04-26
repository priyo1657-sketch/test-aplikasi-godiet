import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { BorderRadius, Colors, Spacing } from "../theme/colors";

interface StatsCardProps {
  label: string;
  value: number;
  target: number;
  unit?: string;
  color?: string;
  size?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  target,
  unit = "",
  color = Colors.primary,
  size = 80,
}) => {
  const percent = Math.min((value / target) * 100, 100);
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={Colors.gray200}
            strokeWidth={8}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={8}
            fill="none"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.centerContent}>
          <Text style={styles.percentText}>{Math.round(percent)}%</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>
            {value}
            <Text style={styles.unit}>{unit}</Text>
          </Text>
        </View>
        <Text style={styles.target}>
          Target: {target}
          {unit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  progressContainer: {
    position: "relative",
    marginRight: Spacing.lg,
  },
  centerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: "500",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  target: {
    fontSize: 11,
    color: Colors.textMuted,
  },
});
