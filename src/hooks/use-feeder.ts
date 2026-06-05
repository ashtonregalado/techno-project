import { updateFeedRate } from "@/api/esp32";
import { useState } from "react";

type Direction = "forward" | "reverse" | null;

export function useFeeder() {
  // FEEDER
  const [isFeeding, setIsFeeding] = useState(false);
  const [feedRate, setFeedRate] = useState(5);
  const [feedLevel, setFeedLevel] = useState(80);
  const [feederLoading, setFeederLoading] = useState(false);

  // MACHINE
  const [isMachineRunning, setIsMachineRunning] = useState(false);
  const [machineDirection, setMachineDirection] = useState<Direction>(null);
  const [machineSpeed, setMachineSpeed] = useState(50);
  const [machineLoading, setMachineLoading] = useState(false);
  const [activeFeeder, setActiveFeeder] = useState<
    "left" | "right" | "both" | null
  >(null);

  // // GLOBAL STATUS SYNC
  // const refreshStatus = async () => {
  //   try {
  //     const data = await getStatus();

  //     setIsFeeding(data.feeding);
  //     setFeedRate(data.feedRate);
  //     setFeedLevel(data.feedLevel);

  //     setIsMachineRunning(data.machineRunning);
  //     setMachineDirection(data.direction ?? null);
  //     setMachineSpeed(data.speed ?? 50);
  //   } catch (error) {
  //     console.error("Status sync error:", error);
  //   }
  // };

  // =========================
  // FEEDER CONTROLS
  // =========================

  const handleStartFeed = async () => {
    if (feederLoading) return;

    try {
      setFeederLoading(true);

      // await startFeed();
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

      // await stopFeed();
      setIsFeeding(false);
      setActiveFeeder(null);
    } catch (error) {
      console.error(error);
    } finally {
      setFeederLoading(false);
    }
  };

  const handleRateChange = async (rate: number) => {
    setFeedRate(rate); // optimistic

    try {
      await updateFeedRate(rate);
    } catch (error) {
      console.error("Feed rate update failed:", error);
    }
  };

  const handleFeederChange = (feeder: "left" | "right" | "both" | null) => {
    setActiveFeeder((prev) => (prev === feeder ? null : feeder));
  };

  // =========================
  // MACHINE CONTROLS
  // =========================

  const handleStartMachine = async () => {
    if (machineLoading || isMachineRunning) return;

    try {
      setMachineLoading(true);

      // await startMachine();
      setIsMachineRunning(true);
    } catch (error) {
      console.error("Start machine error:", error);
    } finally {
      setMachineLoading(false);
    }
  };

  const handleStopMachine = async () => {
    if (machineLoading || !isMachineRunning) return;

    try {
      setMachineLoading(true);

      // await stopMachine();
      setIsMachineRunning(false);
      setMachineDirection(null);
    } catch (error) {
      console.error("Stop machine error:", error);
    } finally {
      setMachineLoading(false);
    }
  };

  const handleDirectionChange = async (dir: Direction) => {
    if (!isMachineRunning) return;

    try {
      setMachineDirection(dir);

      // OPTIONAL: ESP32 endpoint (recommended)
      // await updateDirection(dir);
    } catch (error) {
      console.error("Direction change failed:", error);
    }
  };

  const handleSpeedChange = async (speed: number) => {
    setMachineSpeed(speed);

    try {
      // OPTIONAL ESP32 call
      // await updateSpeed(speed);
    } catch (error) {
      console.error("Speed update failed:", error);
    }
  };

  // =========================
  // AUTO SYNC (REAL DEVICE)
  // =========================

  // useEffect(() => {
  //   refreshStatus();

  //   const interval = setInterval(refreshStatus, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return {
    // FEEDER
    isFeeding,
    feedRate,
    feedLevel,
    feederLoading,
    handleStartFeed,
    handleStopFeed,
    handleRateChange,

    // MACHINE
    isMachineRunning,
    machineDirection,
    machineSpeed,
    machineLoading,
    activeFeeder,
    handleFeederChange,
    handleStartMachine,
    handleStopMachine,
    handleDirectionChange,
    handleSpeedChange,
  };
}
