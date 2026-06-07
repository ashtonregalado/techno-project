import type { FeederSide, Layer, MachineDirection } from "@/api/esp32";
import {
  setFeederPower,
  setFeederSide,
  setMachineDirection,
  setMachinePower,
} from "@/api/esp32";
import { useState } from "react";

/*
=========================================
TYPES
=========================================
*/

interface LayerState {
  feederActive: boolean;
  isFeeding: boolean;
  activeFeeder: FeederSide;
  feedRate: number;
}

/*
=========================================
HOOK
=========================================
*/
export function useFeeder() {
  const [selectedLayer, setSelectedLayer] = useState<Layer>("first");

  const [layerStates, setLayerStates] = useState<Record<Layer, LayerState>>({
    first: {
      feederActive: false,
      isFeeding: false,
      activeFeeder: null,
      feedRate: 0,
    },
    second: {
      feederActive: false,
      isFeeding: false,
      activeFeeder: null,
      feedRate: 0,
    },
  });

  const currentLayer = layerStates[selectedLayer];

  const [feedLevel, setFeedLevel] = useState(0);
  const [feederLoading, setFeederLoading] = useState(false);

  /*
  =========================================
  FEEDER CONTROLS
  =========================================
  */

  const handleToggleFeederPower = async () => {
    if (feederLoading) return;
    setFeederLoading(true);
    try {
      if (currentLayer.feederActive) {
        await setFeederPower(selectedLayer, false);
        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            feederActive: false,
            activeFeeder: null,
            isFeeding: false,
            feedRate: 0,
          },
        }));
      } else {
        await setFeederPower(selectedLayer, true);
        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            feederActive: true,
          },
        }));
      }
    } catch (err) {
      console.error("Feeder power toggle failed:", err);
    } finally {
      setFeederLoading(false);
    }
  };

  const handleFeederChange = async (feeder: FeederSide) => {
    if (feederLoading || !currentLayer.feederActive) return;
    setFeederLoading(true);
    try {
      if (feeder === null) {
        await setFeederSide(selectedLayer, null);
        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            activeFeeder: null,
            isFeeding: false,
          },
        }));
      } else {
        await setFeederSide(selectedLayer, feeder);
        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            activeFeeder: feeder,
            isFeeding: true,
          },
        }));
      }
    } catch (err) {
      console.error("Feeder side change failed:", err);
    } finally {
      setFeederLoading(false);
    }
  };
  /*
  =========================================
  MACHINE CONTROLS
  =========================================
  */

  const [isMachineRunning, setIsMachineRunning] = useState(false);
  const [machineDirection, setMachineDirectionState] =
    useState<MachineDirection>("stop");
  const [machineLoading, setMachineLoading] = useState(false);

  const handleTogglePower = async () => {
    if (machineLoading) return;

    setMachineLoading(true);

    try {
      if (isMachineRunning) {
        await setMachinePower(false);
        setIsMachineRunning(false);
        setMachineDirectionState("stop");
      } else {
        await setMachinePower(true);
        setIsMachineRunning(true);
      }
    } catch (error) {
      console.error("Machine power toggle failed:", error);
    } finally {
      setMachineLoading(false);
    }
  };

  /**
   * Toggles direction — tapping the active direction sets it back to "stop".
   * Blocked if machine is not running.
   */
  const handleDirectionChange = async (dir: "forward" | "reverse") => {
    if (!isMachineRunning) return;

    const newDir = machineDirection === dir ? "stop" : dir;

    setMachineDirectionState(newDir);

    try {
      await setMachineDirection(newDir);
    } catch (error) {
      console.error("Direction change failed:", error);
      setMachineDirectionState(machineDirection); // revert on failure
    }
  };

  /*
  =========================================
  RETURN
  =========================================
  */

  return {
    // Layer
    selectedLayer,
    setSelectedLayer,

    // Feeder state (scoped to current layer)
    isFeeding: currentLayer.isFeeding,
    feederActive: currentLayer.feederActive,
    activeFeeder: currentLayer.activeFeeder,
    feedRate: currentLayer.feedRate,

    // Feeder misc
    feedLevel,
    feederLoading,

    // Feeder handlers
    handleToggleFeederPower,
    handleFeederChange,

    // Machine state
    isMachineRunning,
    machineDirection,
    machineLoading,

    // Machine handlers
    handleTogglePower,
    handleDirectionChange,
  };
}
