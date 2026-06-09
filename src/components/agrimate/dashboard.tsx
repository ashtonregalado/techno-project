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

    // FEEDER
    isFeeding,
    feedRate,
    activeFeeder,
    feederActive,

    handleFeederChange,

    // MACHINE
    isMachineRunning,
    machineDirection,

    handleTogglePower,
    handleDirectionChange,
    handleToggleFeederPower,

    handleLayerChange,
    layerLoading,
    powerLoading,
    feedingLoading,
    machineLoading,
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
            onLayerChange={handleLayerChange}
            disabled={
              layerLoading || powerLoading || feedingLoading || machineLoading
            }
          />
          {/* ========================= */}
          {/* FEEDER */}
          {/* ========================= */}

          <FeederStatusCard
            feederActive={feederActive}
            activeFeeder={activeFeeder}
            isFeeding={isFeeding}
            powerLoading={powerLoading}
            feedingLoading={feedingLoading}
            onFeederChange={handleFeederChange}
            onTogglePower={handleToggleFeederPower} // ← add this
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
