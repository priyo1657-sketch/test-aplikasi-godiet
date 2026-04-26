import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BorderRadius, Colors, Spacing } from "../theme/colors";

interface QuickActionButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
  badge?: number;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  onPress,
  badge,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
        {badge !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryBg,
    marginHorizontal: Spacing.xs,
  },
  iconContainer: {
    position: "relative",
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.full,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.white,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "center",
  },
});
