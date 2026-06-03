import { AgrimateColors, Spacing, Typography } from "@/constants/design";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./card";

interface ActivityItem {
  id: string;
  label: string;
  detail: string;
  time: string;
  color: string;
  icon: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const defaultActivities: ActivityItem[] = [
    {
      id: "1",
      label: "Feeding completed",
      detail: "250g",
      time: "11:30 AM",
      color: AgrimateColors.activityGreen,
      icon: "✓",
    },
    {
      id: "2",
      label: "Scheduled feed",
      detail: "200g",
      time: "8:00 AM",
      color: AgrimateColors.activityBlue,
      icon: "📅",
    },
    {
      id: "3",
      label: "Container refilled",
      detail: "4.5kg",
      time: "Yesterday",
      color: AgrimateColors.activityPurple,
      icon: "♻️",
    },
  ];

  const items = activities || defaultActivities;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Activity</Text>
        <Text style={styles.activityIcon}>📝</Text>
      </View>

      <View style={styles.activityList}>
        {items.map((item, index) => (
          <View key={item.id}>
            <View style={styles.activityItem}>
              <View
                style={[styles.activityDot, { backgroundColor: item.color }]}
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <View style={styles.activityMeta}>
                  <Text style={styles.activityDetail}>{item.detail}</Text>
                  <Text style={styles.activityTime}>• {item.time}</Text>
                </View>
              </View>
            </View>
            {index < items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: AgrimateColors.text,
  },
  activityIcon: {
    fontSize: Typography.fontSize.xl,
  },
  activityList: {
    gap: 0,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: AgrimateColors.text,
    marginBottom: Spacing.xs,
  },
  activityMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityDetail: {
    fontSize: Typography.fontSize.sm,
    color: AgrimateColors.textMuted,
  },
  activityTime: {
    fontSize: Typography.fontSize.sm,
    color: AgrimateColors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: AgrimateColors.border,
  },
});
