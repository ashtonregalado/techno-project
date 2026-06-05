import {
  AgrimateColors,
  BorderRadius,
  Shadows,
  Spacing,
} from "@/constants/design";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

export function Card({ children, style, noPadding = false }: CardProps) {
  return (
    <View style={[styles.card, !noPadding && styles.padding, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AgrimateColors.background,
    borderWidth: 2,
    borderColor: AgrimateColors.border,
    borderRadius: BorderRadius.md,
    ...Shadows.md,
  },
  padding: {
    padding: Spacing.md,
  },
});
