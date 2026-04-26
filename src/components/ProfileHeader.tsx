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

interface ProfileHeaderProps {
  name: string;
  avatar?: ImageSourcePropType;
  weeklyProgress?: number;
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatar,
  weeklyProgress,
  onNotificationPress,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.profileSection}>
          {avatar && <Image source={avatar} style={styles.avatar} />}
          <View style={styles.info}>
            <Text style={styles.greeting}>Hi, {name}!</Text>
            {weeklyProgress !== undefined && (
              <Text style={styles.progress}>{weeklyProgress}% this week</Text>
            )}
          </View>
        </View>

        <View style={styles.actionButtons}>
          {onNotificationPress && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onNotificationPress}
            >
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
          )}
          {onSettingsPress && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSettingsPress}
            >
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {weeklyProgress !== undefined && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(weeklyProgress, 100)}%` },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
    borderBottomLeftRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    backgroundColor: Colors.gray100,
  },
  info: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  progress: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.gray200,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
});
