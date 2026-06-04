import { AgrimateColors, Spacing } from "@/constants/design";
import { useFeeder } from "@/hooks/use-feeder";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { FeederStatusCard } from "./feeder-status-card";
import { AgrimateHeader } from "./header";
import { MachineControlCard } from "./machine-contol";

export function AgremateDashboard() {
  const {
    isFeeding,
    feedRate,
    isMachineRunning,
    handleStartFeed,
    handleStopFeed,
    handleStartMachine,
    handleStopMachine,
    handleRateChange,
  } = useFeeder();

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
            onStart={handleStartFeed}
            onStop={handleStopFeed}
            feedRate={feedRate}
            onRateChange={handleRateChange}
          />

          <MachineControlCard
            isRunning={isMachineRunning}
            onStart={handleStartMachine}
            onStop={handleStopMachine}
          ></MachineControlCard>
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
