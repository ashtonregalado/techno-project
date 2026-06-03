import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./card";

interface FeedContainerProps {
  feedLevel: number;
}

const CONTAINER_HEIGHT = 160;
const MARKER_POSITIONS = [100, 75, 50, 25, 0];

export function FeedContainer({ feedLevel }: FeedContainerProps) {
  const pellets = React.useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    [],
  );

  return (
    <Card style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Feed Container</Text>

        <Text style={styles.percentage}>{feedLevel}%</Text>
      </View>

      {/* Container Visualization */}
      <View style={styles.containerWrapper}>
        {/* Feed Fill */}
        <LinearGradient
          colors={["#f59e0b", "#fcd34d"]}
          style={[
            styles.fill,
            {
              height: `${feedLevel}%`,
            },
          ]}
        >
          {/* Pellets texture */}
          <View style={styles.pelletLayer}>
            {pellets.map((pellet) => (
              <View
                key={pellet.id}
                style={[
                  styles.pellet,
                  {
                    left: pellet.left,
                    top: pellet.top,
                  },
                ]}
              />
            ))}
          </View>
        </LinearGradient>

        {/* Markers inside */}
        <View style={styles.markerOverlay}>
          {MARKER_POSITIONS.map((level) => (
            <View key={level} style={styles.markerRow}>
              <Text style={styles.markerText}>{level}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Low Feed Warning */}
      {feedLevel < 25 && (
        <View style={styles.warningCard}>
          <AlertTriangle size={14} color="#dc2626" />

          <Text style={styles.warningText}>Low feed - Refill soon</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: AgrimateColors.text,
  },

  percentage: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: AgrimateColors.accent,
  },

  containerWrapper: {
    height: CONTAINER_HEIGHT,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: AgrimateColors.border,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: Spacing.md,
    position: "relative",
  },

  fill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  pelletLayer: {
    ...StyleSheet.absoluteFill,
    opacity: 0.4,
  },

  pellet: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#92400e",
  },

  markerOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
    padding: Spacing.sm,
    pointerEvents: "none",
  },

  markerRow: {
    alignItems: "flex-end",
  },

  markerText: {
    fontSize: 10,
    fontWeight: "600",
    color: AgrimateColors.textMuted,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },

  warningCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  warningText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: "#dc2626",
  },
});
