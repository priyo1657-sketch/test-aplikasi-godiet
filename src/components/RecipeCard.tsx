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

interface RecipeCardProps {
  image: ImageSourcePropType;
  title: string;
  time?: string;
  calories?: number;
  difficulty?: "easy" | "medium" | "hard";
  rating?: number;
  onPress?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  image,
  title,
  time,
  calories,
  difficulty,
  rating,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={image} style={styles.image} />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {(time || calories) && (
          <View style={styles.infoRow}>
            {time && (
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>⏱ {time}</Text>
              </View>
            )}
            {calories && (
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>🔥 {calories} kcal</Text>
              </View>
            )}
          </View>
        )}

        {(difficulty || rating) && (
          <View style={styles.footerRow}>
            {difficulty && (
              <Text style={styles.difficultyBadge}>
                {difficulty === "easy"
                  ? "Easy"
                  : difficulty === "medium"
                    ? "Medium"
                    : "Hard"}
              </Text>
            )}
            {rating && <Text style={styles.rating}>⭐ {rating}</Text>}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  infoBadge: {
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  infoText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "500",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  difficultyBadge: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.primary,
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.warning,
  },
});
