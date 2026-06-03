import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { StyleSheet, Text, View } from "react-native";

export function AgrimateHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>My Agrimate</Text>
      </View>
      {/* Optional leaf pattern can go in top-right */}
      <View style={styles.leafPattern} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: AgrimateColors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    zIndex: 1,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: AgrimateColors.background,
  },
  leafPattern: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.lg,
    width: 80,
    height: 80,
    opacity: 0.1,
  },
});
