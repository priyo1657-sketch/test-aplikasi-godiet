// src/screens/CaloriesDashboardScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Svg, { Circle, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

// Komponen Gauge Setengah Lingkaran
const SemiCircleGauge = ({ percent }: { percent: number }) => {
  const size = 200,
    sw = 12,
    r = (size - sw) / 2,
    cy = r + sw / 2;
  const circumference = Math.PI * r;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const d = `M ${sw / 2} ${cy} A ${r} ${r} 0 0 1 ${size - sw / 2} ${cy}`;

  return (
    <View style={{ width: size, height: cy + 10, alignItems: "center" }}>
      <Svg width={size} height={cy + 10}>
        <Path
          d={d}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d={d}
          stroke="#FFCA28"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View style={{ position: "absolute", bottom: 0, alignItems: "center" }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#FFF" }}>
          1500
        </Text>
        <Text style={{ fontSize: 12, color: "#FFF", fontWeight: "600" }}>
          KCAL
        </Text>
      </View>
    </View>
  );
};

// Komponen Lingkaran Penuh Makro
const MacroCircle = ({
  percent,
  color,
}: {
  percent: number;
  color: string;
}) => {
  const size = 56,
    sw = 4,
    r = (size - sw) / 2,
    c = 2 * Math.PI * r;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={sw}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={sw}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c - (percent / 100) * c}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
        />
      </Svg>
      <Text style={{ fontSize: 13, fontWeight: "700", color: "#FFF" }}>
        {percent}%
      </Text>
    </View>
  );
};

export const CaloriesTabScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Hi, Ays</Text>
            <Text style={styles.date}>Today, 4 Aug</Text>
          </View>
        </View>
        <Feather name="bell" size={24} color="#333" />
      </View>

      <View style={styles.greenCard}>
        <Text style={styles.cardTitle}>My Calories </Text>
        <View style={styles.gaugeContainer}>
          <SemiCircleGauge percent={75} />
        </View>
        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <MacroCircle percent={46} color="#FFF" />
            <Text style={styles.macroLabel}>Karbohidrat</Text>
            <Text style={styles.macroVal}>15g / 300 gr</Text>
          </View>
          <View style={styles.macroItem}>
            <MacroCircle percent={74} color="#FFF" />
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroVal}>40g / 150 gr</Text>
          </View>
          <View style={styles.macroItem}>
            <MacroCircle percent={14} color="#FFF" />
            <Text style={styles.macroLabel}>Lemak</Text>
            <Text style={styles.macroVal}>40g / 150 gr</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meals today</Text>
        <Text style={styles.seeAll}>All</Text>
      </View>

      {[1, 2, 3].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.mealCard}
          activeOpacity={0.8}
          // 3. SEKARANG NAVIGATION BISA BERFUNGSI MENGARAH KE DAFTAR RESEP
          onPress={() => navigation.navigate("RecipesList")} 
        >
          <View style={styles.mealImagePlaceholder}>
            <Text>🥪</Text>
          </View>

          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.mealName}>
              {index === 0 ? "Sarapan" : index === 1 ? "Makan Siang" : "Makan Malam"}
            </Text>
            <Text style={styles.mealKcal}>230 Kcal</Text>
          </View>

          <Feather name="chevron-right" size={20} color="#CCC" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 16, fontWeight: "700", color: "#333" },
  date: { fontSize: 12, color: "#888" },
  greenCard: {
    backgroundColor: "#00B93F",
    borderRadius: 20,
    margin: 20,
    padding: 20,
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  gaugeContainer: { alignItems: "center", marginBottom: 20 },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  macroItem: { alignItems: "center" },
  macroLabel: { fontSize: 11, color: "#FFF", fontWeight: "600", marginTop: 8 },
  macroVal: { fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#333" },
  seeAll: { fontSize: 12, color: "#888" },
  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  mealImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  mealName: { fontSize: 15, fontWeight: "600", color: "#333" },
  mealKcal: { fontSize: 13, color: "#FFCA28", marginTop: 4, fontWeight: "500" },
});
