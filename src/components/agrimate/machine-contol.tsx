import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./button";
import { Card } from "./card";

interface MachineControlCardProps {
  isRunning: boolean;
  onStart?: () => void;
  onStop?: () => void;
}

export function MachineControlCard({
  isRunning,
  onStart,
  onStop,
}: MachineControlCardProps) {
  return (
    <Card style={styles.card}>
      {/* Header */}
      <LinearGradient
        colors={[AgrimateColors.primary, "#24563f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        {/* Decorative circles */}
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Machine Control</Text>
            <Text style={styles.subtitle}>Movement system status</Text>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.badge,
              isRunning ? styles.runningBadge : styles.idleBadge,
            ]}
          >
            <View
              style={[
                styles.dot,
                isRunning ? styles.dotRunning : styles.dotIdle,
              ]}
            />
            <Text
              style={[
                styles.badgeText,
                !isRunning && {
                  color: AgrimateColors.primary,
                },
              ]}
            >
              {isRunning ? "RUNNING" : "IDLE"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Body */}
      <View style={styles.content}>
        <Text style={styles.description}>
          Control the machine movement system manually.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button
            label="START"
            onPress={onStart}
            variant="primary"
            style={styles.button}
          />

          <Button
            label="STOP"
            onPress={onStop}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: 0,
    marginBottom: Spacing.lg,
    borderRadius: 18,
  },

  /* HEADER */
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    position: "relative",
  },

  circleTop: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  circleBottom: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },

  /* BADGE */
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  runningBadge: {
    backgroundColor: "#22C55E",
  },

  idleBadge: {
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  dotRunning: {
    backgroundColor: "#fff",
  },

  dotIdle: {
    backgroundColor: "rgba(27,67,50,0.4)",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  /* BODY */
  content: {
    padding: Spacing.md,
  },

  description: {
    fontSize: Typography.fontSize.sm,
    color: AgrimateColors.textMuted,
    marginBottom: Spacing.md,
  },

  buttonRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },

  button: {
    flex: 1,
  },
});
