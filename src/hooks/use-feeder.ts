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
type MachineDirection = "forward" | "reverse" | "stop";

type FeederSide = "left" | "right" | "both" | null;

type Layer = "first" | "second";

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

  const [feedLevel] = useState(80);
  const [feederLoading, setFeederLoading] = useState(false);

  /*
  =========================================
  FEEDER CONTROLS
  =========================================
  */

  const handleStartFeed = async () => {
    if (feederLoading) return;

    try {
      setFeederLoading(true);

      const rate = currentLayer.feedRate;

      await setFeedRate(selectedLayer, rate);
      await setFeederPower(selectedLayer, true);
      await setFeederSide(selectedLayer, "left");

      setLayerStates((prev) => ({
        ...prev,
        [selectedLayer]: {
          ...prev[selectedLayer],
          feederActive: true,
          isFeeding: true,
        },
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setFeederLoading(false);
    }
  };

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
      console.error(error);
    } finally {
      setFeederLoading(false);
    }
  };

  const handleRateChange = async (rate: number) => {
    setLayerStates((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        feedRate: rate,
      },
    }));

    try {
      await setFeedRate(selectedLayer, rate);
    } catch (error) {
      console.error("Feed rate update failed:", error);
    }
  };

  const handleFeederChange = async (feeder: FeederSide) => {
    const current = currentLayer.activeFeeder;

    const newValue = current === feeder ? null : feeder;

    setLayerStates((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        activeFeeder: newValue,
      },
    }));

    try {
      await setFeederSide(selectedLayer, newValue);
    } catch (error) {
      console.error("Feeder change failed:", error);
    }
  };

  /*
  =========================================
  MACHINE CONTROLS (UNCHANGED LOGIC)
  =========================================
  */

  const [isMachineRunning, setIsMachineRunning] = useState(false);

  const [machineDirection, setMachineDirectionState] =
    useState<MachineDirection>("stop");

  const [machineSpeed, setMachineSpeedState] = useState(0.3);

  const [machineLoading, setMachineLoading] = useState(false);

  const handleStartMachine = async () => {
    if (machineLoading || isMachineRunning) return;

    setMachineLoading(true);

    try {
      await setMachinePower(true);
      setIsMachineRunning(true);
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
    } finally {
      setMachineLoading(false);
    }
  };

  const handleDirectionChange = async (dir: "forward" | "reverse") => {
    if (!isMachineRunning) return;

    const newDir = machineDirection === dir ? "stop" : dir;

    setMachineDirectionState(newDir);

    await setMachineDirection(newDir);
  };

  const handleSpeedChange = async (speed: number) => {
    setMachineSpeedState(speed);

    await setMachineSpeed(speed);
  };

  /*
  =========================================
  RETURN
  =========================================
  */

  return {
    selectedLayer,
    setSelectedLayer,

    isFeeding: currentLayer.isFeeding,
    feederActive: currentLayer.feederActive,
    activeFeeder: currentLayer.activeFeeder,
    feedRate: currentLayer.feedRate,

    feedLevel,
    feederLoading,

    handleStartFeed,
    handleStopFeed,
    handleRateChange,
    handleFeederChange,

    isMachineRunning,
    machineDirection,
    machineSpeed,
    machineLoading,

    handleStartMachine,
    handleStopMachine,
    handleDirectionChange,
    handleSpeedChange,
  };
}
