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
  const [feederLoading, setFeederLoading] = useState(false);

  const handleToggleFeederPower = async () => {
    if (feederLoading) return;
    setFeederLoading(true);
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
      setFeederLoading(false);
    }
  };

  const handleFeederChange = async (feeder: FeederSide) => {
    if (feederLoading || !feederActive) return;
    setFeederLoading(true);
    try {
      await setFeederSide(feeder);
      setActiveFeeder(feeder);
      setIsFeeding(feeder !== null);
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

  const handleDirectionChange = async (dir: "forward" | "reverse") => {
    if (!isMachineRunning) return;
    const newDir = machineDirection === dir ? "stop" : dir;
    setMachineDirectionState(newDir);
    try {
      await setMachineDirection(newDir);
    } catch (error) {
      console.error("Direction change failed:", error);
      setMachineDirectionState(machineDirection);
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
