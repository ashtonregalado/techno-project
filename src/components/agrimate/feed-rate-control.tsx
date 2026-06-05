import {
  AgrimateColors,
  BorderRadius,
  Spacing,
  Typography,
} from "@/constants/design";
import Slider from "@react-native-community/slider";
import { Gauge } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./card";

interface FeedRateControlProps {
  feedRate: number;
  disabled?: boolean;
  onRateChange?: (rate: number) => void;
}

export function FeedRateControl({
  feedRate,
  disabled = false,
  onRateChange,
}: FeedRateControlProps) {
  return (
    <Card style={[styles.card, disabled && styles.disabledCard]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Gauge size={20} color={AgrimateColors.primary} />
          </View>

          <Text style={styles.title}>Feed Rate</Text>
        </View>

        <Text style={styles.feedRateText}>{feedRate.toFixed(1)}g/s</Text>
      </View>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={0.5}
        value={feedRate}
        onValueChange={onRateChange}
        disabled={disabled}
        minimumTrackTintColor={AgrimateColors.accent}
        maximumTrackTintColor={AgrimateColors.mutedBackground}
        thumbTintColor={AgrimateColors.accent}
      />

      {/* Labels */}
      <View style={styles.labels}>
        <Text style={styles.labelText}>1g/s</Text>
        <Text style={styles.labelText}>Medium</Text>
        <Text style={styles.labelText}>10g/s</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.xs,
    padding: Spacing.xxs,
  },

  disabledCard: {
    opacity: 0.45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(27, 67, 50, 0.08)", // primary/10
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: AgrimateColors.text,
  },

  feedRateText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: AgrimateColors.accent,
  },

  slider: {
    width: "100%",
    height: 40,
    marginBottom: 2,
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  labelText: {
    fontSize: Typography.fontSize.xs,
    color: AgrimateColors.textMuted,
    fontWeight: "500",
  },
});
