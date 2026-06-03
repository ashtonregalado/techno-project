import {
  AgrimateColors,
  BorderRadius,
  Spacing,
  Typography,
} from "@/constants/design";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  style,
  icon,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`size_${size}`],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.7}>
      {icon && icon}
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  primary: {
    backgroundColor: AgrimateColors.accent,
  },
  secondary: {
    backgroundColor: AgrimateColors.primary,
  },
  outline: {
    backgroundColor: AgrimateColors.background,
    borderWidth: 2,
    borderColor: AgrimateColors.border,
  },
  size_sm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  size_md: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  size_lg: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  text: {
    fontWeight: Typography.fontWeight.bold,
  },
  text_primary: {
    color: AgrimateColors.background,
  },
  text_secondary: {
    color: AgrimateColors.background,
  },
  text_outline: {
    color: AgrimateColors.text,
  },
  textSize_sm: {
    fontSize: Typography.fontSize.sm,
  },
  textSize_md: {
    fontSize: Typography.fontSize.base,
  },
  textSize_lg: {
    fontSize: Typography.fontSize.lg,
  },
});
