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
    handleRateChange,

    // MACHINE
    isMachineRunning,
    machineDirection,

    handleTogglePower,
    handleDirectionChange,
  } = useFeeder();

  /*
  =========================================
  NORMALIZE DIRECTION
  =========================================
  */

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
            disabled={isFeeding}
          />

          {/* ========================= */}
          {/* FEEDER */}
          {/* ========================= */}
          <FeederStatusCard
            feederActive={!!activeFeeder}
            activeFeeder={activeFeeder}
            feedRate={feedRate}
            isFeeding={isFeeding}
            onFeederChange={handleFeederChange}
            onRateChange={handleRateChange}
          />

          {/* ========================= */}
          {/* MACHINE */}
          {/* ========================= */}
          <MachineControlCard
            isActive={isMachineRunning}
            direction={machineDirection}
            onTogglePower={handleTogglePower}
            onDirectionChange={handleDirectionChange}
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
