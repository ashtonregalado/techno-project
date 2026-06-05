import {
  AgrimateColors,
  BorderRadius,
  Spacing,
  Typography,
} from "@/constants/design";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  style,
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    isDisabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{label}</Text>
        </>
      )}
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

  fullWidth: {
    width: "100%",
  },

  disabled: {
    opacity: 0.5,
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

  textDisabled: {
    opacity: 0.7,
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
