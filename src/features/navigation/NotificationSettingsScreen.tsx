import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";


type Nav = NativeStackNavigationProp<RootStackParamList>;

interface NotificationSettings {
  workout: boolean;
  meal: boolean;
  reminder: boolean;
  sound: boolean;
  vibration: boolean;
  darkMode: boolean;
}

export default function NotificationSettingsScreen() {
  const navigation = useNavigation<Nav>();
  const [settings, setSettings] = useState<NotificationSettings>({
    workout: true,
    meal: true,
    reminder: true,
    sound: true,
    vibration: true,
    darkMode: false,
  });

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings, // Mempertahankan nilai pengaturan lainnya (workout, meal, dll)
      darkMode: !prevSettings.darkMode, // Membalikkan nilai: true jadi false, false jadi true
    }));
  };

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSettingRow = (label: string, key: keyof NotificationSettings) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLabel}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSetting(key)}
        trackColor={{ false: "#E0E0E0", true: "#B9D870" }}
        thumbColor={settings[key] ? "#00B93F" : "#F4F3F4"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Notification Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {renderSettingRow("Workout Reminders", "workout")}
          {renderSettingRow("Meal Plans", "meal")}
          {renderSettingRow("Daily Reminders", "reminder")}
        </View>

        {/* Sound & Vibration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound & Vibration</Text>
          {renderSettingRow("Sound", "sound")}
          {renderSettingRow("Vibration", "vibration")}
        </View>

        {/* Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          {renderSettingRow("Dark Mode", "darkMode")}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Feather name="info" size={16} color="#00B93F" />
          <Text style={styles.infoText}>
            Customize your notification preferences. You can change these
            settings anytime.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 0 : 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingLabel: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 20,
    marginTop: 24,
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 18,
  },
});
