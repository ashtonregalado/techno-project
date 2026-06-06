import { AgrimateColors, Spacing } from "@/constants/design";
import { useFeeder } from "@/hooks/use-feeder";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { FeederStatusCard } from "./feeder-status-card";
import { AgrimateHeader } from "./header";
import { LayerSelector } from "./layer";
import { MachineControlCard } from "./machine-contol";

export function AgrimateDashboard() {
  const {
    // CURRENT LAYER
    selectedLayer,
    setSelectedLayer,

    // FEEDER
    isFeeding,
    feedRate,
    activeFeeder,

    handleFeederChange,
    handleStartFeed,
    handleStopFeed,
    handleRateChange,

    // MACHINE
    isMachineRunning,
    machineDirection,
    machineSpeed,

    handleStartMachine,
    handleStopMachine,
    handleDirectionChange,
    handleSpeedChange,
  } = useFeeder();

  /*
  =========================================
  NORMALIZE DIRECTION
  =========================================
  */
  const normalizedDirection: "forward" | "reverse" | "stop" =
    machineDirection ?? "stop";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <AgrimateHeader />

        <View style={styles.content}>
          {/* ========================= */}
          {/* LAYER SELECTOR */}
          {/* ========================= */}
          <LayerSelector
            selectedLayer={selectedLayer}
            onLayerChange={setSelectedLayer}
          />

          {/* ========================= */}
          {/* FEEDER */}
          {/* ========================= */}
          <FeederStatusCard
            feederActive={isFeeding}
            activeFeeder={activeFeeder}
            feedRate={feedRate}
            onTogglePower={() =>
              isFeeding ? handleStopFeed() : handleStartFeed()
            }
            onFeederChange={handleFeederChange}
            onRateChange={handleRateChange}
          />

          {/* ========================= */}
          {/* MACHINE */}
          {/* ========================= */}
          <MachineControlCard
            isActive={isMachineRunning}
            direction={normalizedDirection}
            speed={machineSpeed}
            onTogglePower={() =>
              isMachineRunning ? handleStopMachine() : handleStartMachine()
            }
            onDirectionChange={handleDirectionChange}
            onSpeedChange={handleSpeedChange}
          />
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
    gap: Spacing.xs,
  },
});
