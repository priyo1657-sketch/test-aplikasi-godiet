import React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BorderRadius, Colors, Spacing } from "../theme/colors";

interface MealItemCardProps {
  image: ImageSourcePropType;
  name: string;
  weight: string;
  amount?: string;
}

export const MealItemCard: React.FC<MealItemCardProps> = ({
  image,
  name,
  weight,
  amount,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.weight}>{weight}</Text>
        {amount && <Text style={styles.amount}>{amount}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  weight: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  amount: {
    fontSize: 11,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
});
