import React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BorderRadius, Colors, Spacing } from "../theme/colors";

interface ActivityCardProps {
  title: string;
  image?: ImageSourcePropType;
  duration?: string;
  calories?: string;
  intensity?: "low" | "medium" | "high";
  onPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  image,
  duration,
  calories,
  intensity,
  onPress,
}) => {
  const intensityColor =
    intensity === "high"
      ? Colors.danger
      : intensity === "medium"
        ? Colors.warning
        : Colors.success;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {image && <Image source={image} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {(duration || calories || intensity) && (
          <View style={styles.infoRow}>
            {duration && (
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Duration: </Text>
                {duration}
              </Text>
            )}
            {calories && (
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Burn: </Text>
                {calories}
              </Text>
            )}
          </View>
        )}

        {intensity && (
          <View
            style={[
              styles.intensityBadge,
              { backgroundColor: intensityColor + "20" },
            ]}
          >
            <View
              style={[styles.intensityDot, { backgroundColor: intensityColor }]}
            />
            <Text style={[styles.intensityText, { color: intensityColor }]}>
              {intensity.charAt(0).toUpperCase() + intensity.slice(1)} Intensity
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  intensityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
  },
  intensityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs,
  },
  intensityText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
