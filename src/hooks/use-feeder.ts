import type { FeederSide, Layer, MachineDirection } from "@/api/esp32";
import {
  setFeederLayer,
  setFeederPower,
  setFeederSide,
  setMachineDirection,
  setMachinePower,
} from "@/api/esp32";
import { useState } from "react";

/*
=========================================
HOOK
=========================================
*/
export function useFeeder() {
  /*
  =========================================
  LAYER CONTROLS
  =========================================
  */

  const [selectedLayer, setSelectedLayer] = useState<Layer>("first");
  const [layerLoading, setLayerLoading] = useState(false);

  const handleLayerChange = async (layer: Layer) => {
    if (layerLoading || layer === selectedLayer) return;
    setLayerLoading(true);
    try {
      await setFeederLayer(layer);
      setSelectedLayer(layer);
    } catch (err) {
      console.error("Layer change failed:", err);
    } finally {
      setLayerLoading(false);
    }
  };

  /*
  =========================================
  FEEDER CONTROLS
  =========================================
  */

  const [feederActive, setFeederActive] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [activeFeeder, setActiveFeeder] = useState<FeederSide>(null);
  const [feedRate, setFeedRate] = useState(0);
  const [feedLevel, setFeedLevel] = useState(0);
  const [powerLoading, setPowerLoading] = useState(false);

  const [feedingLoading, setFeedingLoading] = useState(false);

  const handleToggleFeederPower = async () => {
    if (powerLoading) return;

    setPowerLoading(true);

    try {
      if (feederActive) {
        await setFeederPower(false);
        setFeederActive(false);
        setActiveFeeder(null);
        setIsFeeding(false);
        setFeedRate(0);
      } else {
        await setFeederPower(true);
        setFeederActive(true);
      }
    } catch (err) {
      console.error("Feeder power toggle failed:", err);
    } finally {
      setPowerLoading(false);
    }
  };

  const handleFeederChange = async (feeder: FeederSide) => {
    if (feedingLoading || !feederActive) return;
    setFeedingLoading(true);
    try {
      await setFeederSide(feeder);
      setActiveFeeder(feeder);
      setIsFeeding(feeder !== null);
    } catch (err) {
      console.error("Feeder side change failed:", err);
    } finally {
      setFeedingLoading(false);
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

  // Separate machine loading states
  const [machinePowerLoading, setMachinePowerLoading] = useState(false);
  const [machineDirectionLoading, setMachineDirectionLoading] = useState(false);

  // Track which button was pressed
  const [pendingDirection, setPendingDirection] = useState<
    "forward" | "reverse" | null
  >(null);

  const handleTogglePower = async () => {
    if (machinePowerLoading) return;

    setMachinePowerLoading(true);

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
      setMachinePowerLoading(false);
    }
  };

  const handleDirectionChange = async (dir: "forward" | "reverse") => {
    if (!isMachineRunning || machineDirectionLoading) return;

    setMachineDirectionLoading(true);

    setPendingDirection(dir);

    try {
      const newDir = machineDirection === dir ? "stop" : dir;

      await setMachineDirection(newDir);

      setMachineDirectionState(newDir);
    } catch (error) {
      console.error("Direction change failed:", error);
    } finally {
      setMachineDirectionLoading(false);

      setPendingDirection(null);
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
    layerLoading,
    handleLayerChange,

    // Feeder state
    feederActive,
    isFeeding,
    activeFeeder,
    feedRate,
    feedLevel,
    powerLoading,
    feedingLoading,

    // Feeder handlers
    handleToggleFeederPower,
    handleFeederChange,

    // Machine state
    isMachineRunning,
    machineDirection,
    machinePowerLoading,
    machineDirectionLoading,
    pendingDirection,

    // Machine handlers
    handleTogglePower,
    handleDirectionChange,
  };
}
