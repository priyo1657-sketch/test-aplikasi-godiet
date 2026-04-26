import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../../App";

type Nav = NativeStackNavigationProp<RootStackParamList>;

// Data Menu Profil
const menuSections = [
  {
    title: "Account",
    items: [
      {
        id: "edit-profil",
        icon: "pencil",
        label: "Edit Profil",
        library: "MaterialCommunityIcons",
      },
      {
        id: "notifikasi",
        icon: "bell-outline",
        label: "Notifikasi",
        library: "MaterialCommunityIcons",
        route: "NotificationSettings",
      },
    ],
  },
  {
    title: "Statics",
    items: [
      {
        id: "edit-rencana",
        icon: "square-edit-outline",
        label: "Edit Rencana",
        library: "MaterialCommunityIcons",
      },
      {
        id: "progres",
        icon: "chart-line-variant",
        label: "Progres saya",
        library: "MaterialCommunityIcons",
      },
    ],
  },
  {
    title: "My Scan",
    items: [
      {
        id: "scanku",
        icon: "qrcode-scan",
        label: "ScanKu",
        library: "MaterialCommunityIcons",
      },
    ],
  },
  {
    title: "Help",
    items: [
      {
        id: "pengaturan",
        icon: "cog-outline",
        label: "Pengaturan",
        library: "MaterialCommunityIcons",
      },
      {
        id: "help",
        icon: "message-processing-outline",
        label: "Help and report",
        library: "MaterialCommunityIcons",
      },
      {
        id: "light-mode",
        icon: "toggle-switch-outline",
        label: "Light mode",
        library: "MaterialCommunityIcons",
      },
    ],
  },
];

export const ProfileTabScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const handleNavigation = (route?: string) => {
    if (route) {
      // Pastikan route ada di RootStackParamList sebelum navigasi
      // @ts-ignore
      navigation.navigate(route);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop", // Ganti dengan aset gambar kucing Anda
          }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>Cats Green</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Berat 👏</Text>
          <Text style={styles.statValue}>64 kg</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Tinggi 🔥</Text>
          <Text style={styles.statValue}>176</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Umur 🪄</Text>
          <Text style={styles.statValue}>27</Text>
        </View>
      </View>

      {/* Menu Sections */}
      <View style={styles.menuContainer}>
        {menuSections.map((section, index) => (
          <View key={index} style={styles.sectionGroup}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => handleNavigation(item.route)}
              >
                <View style={styles.menuIconContainer}>
                  {item.library === "MaterialCommunityIcons" ? (
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={22}
                      color="#555555"
                    />
                  ) : (
                    <Feather
                      name={item.icon as any}
                      size={22}
                      color="#555555"
                    />
                  )}
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Feather name="chevron-right" size={20} color="#CCCCCC" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Spacer untuk bottom tab nav */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0F2E9", // Warna hijau muda background kucing
    marginBottom: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333333",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  menuContainer: {
    paddingHorizontal: 24,
  },
  sectionGroup: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 4,
  },
  menuIconContainer: {
    width: 28,
    alignItems: "flex-start",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#333333",
    fontWeight: "400",
  },
});
