import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./card";

interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon: string;
  percentage?: number;
  barColor?: string;
  highlightColor?: string;
}

interface StatsGridProps {
  battery: number;
  feedPercentage: number;
  todayUsage: number;
  nextFeedTime: string;
}

export function StatsGrid({
  battery,
  feedPercentage,
  todayUsage,
  nextFeedTime,
}: StatsGridProps) {
  const stats: StatItem[] = [
    {
      label: "Battery",
      value: `${battery}%`,
      icon: "🔋",
      percentage: battery,
      barColor: AgrimateColors.statusFeeding,
    },
    {
      label: "Feed Left",
      value: `${feedPercentage}%`,
      icon: "📦",
      percentage: feedPercentage,
      barColor: AgrimateColors.accent,
    },
    {
      label: "Today's Usage",
      value: `${todayUsage}kg`,
      subtext: "↑ 12% vs yesterday",
      icon: "📊",
      highlightColor: AgrimateColors.statusFeeding,
    },
    {
      label: "Next Feed",
      value: nextFeedTime,
      subtext: "In 45 min",
      icon: "⏰",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard} noPadding>
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                {stat.subtext && (
                  <Text
                    style={[
                      styles.statSubtext,
                      stat.highlightColor && { color: stat.highlightColor },
                    ]}
                  >
                    {stat.subtext}
                  </Text>
                )}
              </View>
            </View>
            {stat.percentage !== undefined && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${stat.percentage}%`,
                      backgroundColor: stat.barColor,
                    },
                  ]}
                />
              </View>
            )}
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    padding: Spacing.md,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  statIcon: {
    fontSize: Typography.fontSize.xl,
    marginRight: Spacing.md,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: AgrimateColors.textMuted,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: AgrimateColors.text,
  },
  statSubtext: {
    fontSize: Typography.fontSize.xs,
    color: AgrimateColors.textMuted,
    marginTop: Spacing.xs,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: AgrimateColors.mutedBackground,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
