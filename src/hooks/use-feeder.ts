import {
  setFeedRate,
  setFeederPower,
  setLayerState,
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

/*
=========================================
HOOK
=========================================
*/
export function useFeeder() {
  /*
  =========================================
  FEEDER STATE
  =========================================
  */
  const [isFeeding, setIsFeeding] = useState(false);

  const [feedRate, setFeedRateState] = useState(5);

  const [feedLevel] = useState(80);

  const [feederLoading, setFeederLoading] = useState(false);

  const [feederActive, setFeederActive] = useState(false);

  const [activeFeeder, setActiveFeeder] = useState<FeederSide>(null);

  const [firstLayer, setFirstLayer] = useState(false);

  const [secondLayer, setSecondLayer] = useState(false);

  /*
  =========================================
  MACHINE STATE
  =========================================
  */
  const [isMachineRunning, setIsMachineRunning] = useState(false);

  const [machineDirection, setMachineDirectionState] =
    useState<MachineDirection>("stop");

  const [machineSpeed, setMachineSpeedState] = useState(0.3);

  const [machineLoading, setMachineLoading] = useState(false);

  /*
  =========================================
  FEEDER CONTROLS
  =========================================
  */

  const handleStartFeed = async () => {
    if (feederLoading) return;

    try {
      setFeederLoading(true);

      await setFeederPower(true);

      setFeederActive(true);
      setIsFeeding(true);
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

      await setFeederPower(false);

      setFeederActive(false);
      setIsFeeding(false);
      setActiveFeeder(null);
    } catch (error) {
      console.error(error);
    } finally {
      setFeederLoading(false);
    }
  };

  const handleRateChange = async (rate: number) => {
    setFeedRateState(rate);

    try {
      await setFeedRate(rate);
    } catch (error) {
      console.error("Feed rate update failed:", error);
    }
  };

  const handleFeederChange = async (feeder: FeederSide) => {
    const newValue = activeFeeder === feeder ? null : feeder;

    setActiveFeeder(newValue);

    try {
      const isActive = newValue !== null;

      await setFeederPower(isActive);
    } catch (error) {
      console.error("Feeder change failed:", error);
    }
  };

  const handleLayerToggle = async (layer: "first" | "second") => {
    if (layer === "first") {
      const next = !firstLayer;
      setFirstLayer(next);

      await setLayerState(next, secondLayer);
    } else {
      const next = !secondLayer;
      setSecondLayer(next);

      await setLayerState(firstLayer, next);
    }
  };

  /*
  =========================================
  MACHINE CONTROLS
  =========================================
  */

  const handleStartMachine = async () => {
    if (machineLoading || isMachineRunning) return;

    try {
      setMachineLoading(true);

      await setMachinePower(true);

      setIsMachineRunning(true);
    } catch (error) {
      console.error(error);
    } finally {
      setMachineLoading(false);
    }
  };

  const handleStopMachine = async () => {
    if (machineLoading || !isMachineRunning) return;

    try {
      setMachineLoading(true);

      await setMachinePower(false);

      setIsMachineRunning(false);
      setMachineDirectionState("stop");
    } catch (error) {
      console.error(error);
    } finally {
      setMachineLoading(false);
    }
  };

  const handleDirectionChange = async (dir: MachineDirection) => {
    if (!isMachineRunning) return;

    try {
      const newDir = machineDirection === dir ? "stop" : dir;

      setMachineDirectionState(newDir);

      await setMachineDirection(newDir);
    } catch (error) {
      console.error("Direction change failed:", error);
    }
  };

  const handleSpeedChange = async (speed: number) => {
    setMachineSpeedState(speed);

    try {
      await setMachineSpeed(speed);
    } catch (error) {
      console.error("Speed update failed:", error);
    }
  };

  /*
  =========================================
  RETURN
  =========================================
  */

  return {
    // FEEDER
    isFeeding,
    feedRate,
    feedLevel,
    feederLoading,
    feederActive,
    activeFeeder,
    firstLayer,
    secondLayer,
    handleStartFeed,
    handleStopFeed,
    handleRateChange,
    handleFeederChange,
    handleLayerToggle,

    // MACHINE
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
