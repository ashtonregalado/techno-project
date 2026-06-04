import {
  getStatus,
  startMachine,
  stopMachine,
  updateFeedRate,
} from "@/api/esp32";
import { useState } from "react";

export function useFeeder() {
  const [isFeeding, setIsFeeding] = useState(false);

  const [isMachineRunning, setIsMachineRunning] = useState(false);

  const [feedRate, setFeedRate] = useState(5);

  const [feedLevel, setFeedLevel] = useState(80);

  const [loading, setLoading] = useState(false);

  const refreshStatus = async () => {
    try {
      const data = await getStatus();

      setIsFeeding(data.feeding);
      setFeedRate(data.feedRate);
      setFeedLevel(data.feedLevel);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartFeed = async () => {
    try {
      setLoading(true);

      // await startFeed();

      setIsFeeding(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopFeed = async () => {
    try {
      setLoading(true);

      // await stopFeed();

      setIsFeeding(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRateChange = async (rate: number) => {
    try {
      setFeedRate(rate); // optimistic UI

      await updateFeedRate(rate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartMachine = async () => {
    try {
      setLoading(true);
      await startMachine();
      setIsMachineRunning(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopMachine = async () => {
    try {
      setLoading(true);
      await stopMachine();
      setIsMachineRunning(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   refreshStatus();

  //   const interval = setInterval(refreshStatus, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return {
    isFeeding,
    feedRate,
    feedLevel,
    loading,
    isMachineRunning,
    handleStartFeed,
    handleStopFeed,
    handleRateChange,
    handleStartMachine,
    handleStopMachine,
  };
}
