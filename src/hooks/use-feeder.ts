import { getStatus, startFeed, stopFeed, updateFeedRate } from "@/api/esp32";
import { useEffect, useState } from "react";

export function useFeeder() {
  const [isFeeding, setIsFeeding] = useState(false);

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

      await startFeed();

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

      await stopFeed();

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

  useEffect(() => {
    refreshStatus();

    const interval = setInterval(refreshStatus, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    isFeeding,
    feedRate,
    feedLevel,
    loading,
    handleStartFeed,
    handleStopFeed,
    handleRateChange,
  };
}
