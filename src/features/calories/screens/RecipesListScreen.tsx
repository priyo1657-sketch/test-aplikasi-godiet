// src/screens/RecipesListScreen.tsx
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TABS = ["Breakfast", "Lunch", "Dinner"];
const RECIPES = [
  {
    id: 1,
    name: "Salad Alpukat",
    time: "25 min",
    kcal: "230 Kcal",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Breakfast Bowl",
    time: "25 min",
    kcal: "230 Kcal",
    img: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Healthy Snacks",
    time: "25 min",
    kcal: "230 Kcal",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Meal salad",
    time: "25 min",
    kcal: "230 Kcal",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
  },
];

export default function RecipesListScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState("Breakfast");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Info */}
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.subtitle}>Your Breakfast</Text>
            <Text style={styles.title}>Today, 4 Aug</Text>
          </View>
        </View>
        <Feather name="calendar" size={24} color="#333" />
      </View>

      {/* Recipes Title & Icons */}
      <View style={styles.actionRow}>
        <Text style={styles.pageTitle}>
          Recipes <Feather name="refresh-cw" size={16} color="#888" />
        </Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Feather name="search" size={22} color="#333" />
          <TouchableOpacity onPress={() => navigation.navigate("FilterModal")}>
            <Ionicons name="options-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid Recipes */}
      <View style={styles.gridContainer}>
        {RECIPES.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() =>
              navigation.navigate("RecipeDetail", { id: recipe.id.toString() })
            }
          >
            <Feather
              name="heart"
              size={18}
              color="#FF5252"
              style={styles.heartIcon}
            />
            <Image source={{ uri: recipe.img }} style={styles.recipeImg} />
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.recipeMeta}>
              <Text style={styles.recipeMetaText}>⏱ {recipe.time}</Text>
              <Text style={styles.recipeMetaText}>{recipe.kcal}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  headerProfile: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  subtitle: { fontSize: 12, color: "#888" },
  title: { fontSize: 16, fontWeight: "700", color: "#333" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pageTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tabBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  tabBtnActive: { backgroundColor: "#00B93F" },
  tabText: { fontSize: 14, color: "#888", fontWeight: "600" },
  tabTextActive: { color: "#FFF" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  recipeCard: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  heartIcon: { position: "absolute", right: 12, top: 12, zIndex: 1 },
  recipeImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  recipeMeta: { flexDirection: "row", justifyContent: "space-between" },
  recipeMetaText: { fontSize: 10, color: "#888" },
});
