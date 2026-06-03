import { AgrimateColors, Spacing } from "@/constants/design";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { FeedContainer } from "./feed-container";
import { FeedRateControl } from "./feed-rate-control";
import { FeederStatusCard } from "./feeder-status-card";
import { AgrimateHeader } from "./header";

export function AgremateDashboard() {
  const [isFeeding, setIsFeeding] = useState(false);
  const [feedRate, setFeedRate] = useState(5);
  const [feedLevel, setFeedLevel] = useState(78);

  const handleStart = () => {
    setIsFeeding(true);
    // Simulate feed level decrease
    setTimeout(() => {
      setIsFeeding(false);
    }, 3000);
  };

  const handleStop = () => {
    setIsFeeding(false);
  };

  const handleRateChange = (rate: number) => {
    setFeedRate(rate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AgrimateHeader />

        {/* Main Content */}
        <View style={styles.content}>
          {/* Section 1: Smart Chicken Feeder */}
          <FeederStatusCard
            isFeeding={isFeeding}
            onStart={handleStart}
            onStop={handleStop}
          />

          {/* Section 2: Feed Rate Control */}
          <FeedRateControl
            feedRate={feedRate}
            onRateChange={handleRateChange}
          />

          {/* Section 3: Feed Container Visualization */}
          <FeedContainer feedLevel={feedLevel} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AgrimateColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
