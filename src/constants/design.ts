/**
 * My Agrimate Design System
 * Color palette, spacing, and typography constants
 */

export const AgrimateColors = {
  primary: "#1B4332", // Deep forest green
  accent: "#F59E0B", // Warm amber
  background: "#FFFFFF", // White
  mutedBackground: "#F3F4F6", // Light gray
  border: "#E5E7EB", // Border gray
  text: "#111827", // Foreground text
  textMuted: "#6B7280", // Muted text
  success: "#10B981", // Green
  info: "#3B82F6", // Blue
  warning: "#F59E0B", // Amber
  error: "#EF4444", // Red
  statusFeeding: "#10B981",
  statusStandby: "#FFFFFF",
  activityGreen: "#10B981",
  activityBlue: "#3B82F6",
  activityPurple: "#8B5CF6",
} as const;

export const Spacing = {
  xxs: 8,
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;
