import type { FeederSide, Layer, MachineDirection } from "@/api/esp32";
import {
  setFeedRate,
  setFeederPower,
  setFeederSide,
  setMachineDirection,
  setMachinePower,
  setMachineSpeed,
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

  /**
   * Requires a side to be selected before feeding.
   * Order: setFeedRate → setFeederSide → setFeederPower
   */
  // const handleStartFeed = async () => {
  //   if (feederLoading) return;
  //   if (!currentLayer.activeFeeder) return; // side must be selected first

  //   try {
  //     setFeederLoading(true);

  //     await Promise.all([
  //       setFeedRate(selectedLayer, currentLayer.feedRate),
  //       setFeederSide(selectedLayer, currentLayer.activeFeeder),
  //     ]);
  //     await setFeederPower(selectedLayer, true);

  //     setLayerStates((prev) => ({
  //       ...prev,
  //       [selectedLayer]: {
  //         ...prev[selectedLayer],
  //         feederActive: true,
  //         isFeeding: true,
  //       },
  //     }));
  //   } catch (error) {
  //     console.error("Start feed failed:", error);
  //   } finally {
  //     setFeederLoading(false);
  //   }
  // };

  const handleFeederChange = async (feeder: FeederSide) => {
    if (feederLoading) return;

    const isTogglingOff = feeder === null;

    try {
      setFeederLoading(true);

      if (isTogglingOff) {
        // Power off — also stops any active feeding
        await setFeederPower(selectedLayer, false);

        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            activeFeeder: null,
            feederActive: false,
            isFeeding: false,
          },
        }));
      } else {
        // Power on the selected side
        await setFeederSide(selectedLayer, feeder);
        await setFeederPower(selectedLayer, true);

        setLayerStates((prev) => ({
          ...prev,
          [selectedLayer]: {
            ...prev[selectedLayer],
            activeFeeder: feeder,
            feederActive: true,
            isFeeding: false, // not feeding yet until rate is adjusted
          },
        }));
      }
    } catch (err) {
      console.error("Feeder toggle failed:", err);
    } finally {
      setFeederLoading(false);
    }
  };

  const handleRateChange = async (rate: number) => {
    // Always update local state
    setLayerStates((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        feedRate: rate,
      },
    }));

    // Can't feed without feeder powered on
    if (!currentLayer.feederActive || !currentLayer.activeFeeder) return;

    try {
      setFeederLoading(true);

      await setFeedRate(selectedLayer, rate);

      setLayerStates((prev) => ({
        ...prev,
        [selectedLayer]: {
          ...prev[selectedLayer],
          isFeeding: true,
        },
      }));
    } catch (err) {
      console.error("Feed rate update failed:", err);
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
  const [machineSpeed, setMachineSpeedState] = useState(0.3);
  const [machineLoading, setMachineLoading] = useState(false);

  /**
   * State is only updated if the API call succeeds.
   */
  const handleStartMachine = async () => {
    if (machineLoading || isMachineRunning) return;

    setMachineLoading(true);

    try {
      await setMachinePower(true);
      setIsMachineRunning(true);
    } catch (error) {
      console.error("Machine start failed:", error);
    } finally {
      setMachineLoading(false);
    }
  };

  const handleStopMachine = async () => {
    if (machineLoading || !isMachineRunning) return;

    setMachineLoading(true);

    try {
      await setMachinePower(false);
      setIsMachineRunning(false);
      setMachineDirectionState("stop");
    } catch (error) {
      console.error("Machine stop failed:", error);
    } finally {
      setMachineLoading(false);
    }
  };

  /**
   * Toggles direction — clicking the active direction sets it back to "stop".
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

  const handleSpeedChange = async (speed: number) => {
    setMachineSpeedState(speed);

    try {
      await setMachineSpeed(speed);
    } catch (error) {
      console.error("Speed change failed:", error);
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
    // handleStartFeed,
    // handleStopFeed,
    handleRateChange,
    handleFeederChange,

    // Machine state
    isMachineRunning,
    machineDirection,
    machineSpeed,
    machineLoading,

    // Machine handlers
    handleStartMachine,
    handleStopMachine,
    handleDirectionChange,
    handleSpeedChange,
  };
}
