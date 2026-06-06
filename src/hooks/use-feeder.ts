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
      feedRate: 5,
    },
    second: {
      feederActive: false,
      isFeeding: false,
      activeFeeder: null,
      feedRate: 5,
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
  const handleStartFeed = async () => {
    if (feederLoading) return;
    if (!currentLayer.activeFeeder) return; // side must be selected first

    try {
      setFeederLoading(true);

      await Promise.all([
        setFeedRate(selectedLayer, currentLayer.feedRate),
        setFeederSide(selectedLayer, currentLayer.activeFeeder),
      ]);
      await setFeederPower(selectedLayer, true);

      setLayerStates((prev) => ({
        ...prev,
        [selectedLayer]: {
          ...prev[selectedLayer],
          feederActive: true,
          isFeeding: true,
        },
      }));
    } catch (error) {
      console.error("Start feed failed:", error);
    } finally {
      setFeederLoading(false);
    }
  };

  /**
   * Stops feeder and clears active side.
   */
  const handleStopFeed = async () => {
    if (feederLoading) return;

    try {
      setFeederLoading(true);

      await setFeederPower(selectedLayer, false);

      setLayerStates((prev) => ({
        ...prev,
        [selectedLayer]: {
          ...prev[selectedLayer],
          feederActive: false,
          isFeeding: false,
          activeFeeder: null,
        },
      }));
    } catch (error) {
      console.error("Stop feed failed:", error);
    } finally {
      setFeederLoading(false);
    }
  };

  /**
   * Updates feed rate in state.
   * API call is deferred — rate is sent to ESP32 only when handleStartFeed is called.
   */
  const handleRateChange = (rate: number) => {
    setLayerStates((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        feedRate: rate,
      },
    }));
  };

  /**
   * Toggles feeder side selection.
   * Blocked while feeding — side can only be changed when stopped.
   * Side is not sent to ESP32 here; it is sent when handleStartFeed is called.
   */
  const handleFeederChange = (feeder: FeederSide) => {
    if (currentLayer.isFeeding) return; // block mid-feed changes

    const current = currentLayer.activeFeeder;
    const newValue = current === feeder ? null : feeder;

    setLayerStates((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        activeFeeder: newValue,
      },
    }));
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
    handleStartFeed,
    handleStopFeed,
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
